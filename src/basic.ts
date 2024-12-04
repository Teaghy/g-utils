import type { CompareDiffOptionType, CompareResultType, parentIdTypes, ReplaceFiledOptionsType, TreeNodeType } from './types';
import { get, isEqual } from 'lodash-es';
/**
 * @description 平行数据结构转树形结构
 * @param {Array} list 需要转换的树结构
 * @param {object} options 对象键配置，默认值{ children = 'children', pid = 'pid', id = 'id' }
 * @param {string} options.children children的key
 * @param {string} options.pid pid的key
 * @param {string} options.id id的key
 * @returns {Array} 返回树形结构数据
 */
export function arrayToTree(list: TreeNodeType, { id = 'id', pid = 'pid', children = 'children' }: ReplaceFiledOptionsType = {}): any {
  const itemMap = new Map();
  list.forEach((element: TreeNodeType) => {
    itemMap.set(element[id], { ...element });
  });
  const result: TreeNodeType[] = [];
  list.forEach((element: TreeNodeType) => {
    if (itemMap.has(element[pid])) {
      const childrenNodes = itemMap.get(element[pid])[children] || [];
      itemMap.get(element[pid])[children] = childrenNodes;
      itemMap.get(element[pid])[children].push(itemMap.get(element[id]));
    }
    else {
      result.push(itemMap.get(element[id]));
    }
  });
  return result;
}

/**
 * @description 树形转平铺list（广度优先，先横向再纵向）
 * @param {Array} tree 树j结构数据
 * @param {string|null} parentId 树结构数据
 * @param {object} options 对象键配置，默认值{ children = 'children', pid = 'pid', id = 'id' }
 * @param {string} options.children children的key
 * @param {string} options.pid pid的key
 * @param {string} options.id id的key
 * @returns 平铺的列表
 */

export function treeToList(tree: TreeNodeType[], parentId: parentIdTypes = null, { children = 'children', pid = 'pid', id = 'id' } = { }): TreeNodeType[] {
  return tree.reduce((arr: TreeNodeType[], curr: TreeNodeType) => {
    const { [children]: childItem, ...params } = curr;
    if (childItem?.length) {
      return arr.concat([params], treeToList(childItem, curr[id]));
    }
    return arr.concat([{ ...params, ...(parentId ? { [pid]: parentId } : {}) }]);
  }, []);
}

function patch(newArr: TreeNodeType[], oldArr: TreeNodeType[], option: CompareDiffOptionType = {}): any {
  const { indexEffect = true, compareMethod, key = 'id', oldKey = 'id', childrenKey = 'children' } = option;
  const updates: Array<CompareResultType> = [];
  const adds: Array<CompareResultType> = [];
  const moves: Array<CompareResultType> = [];
  const oldDataPathMap = new Map();
  const oldIdMap = new Map();
  const getUniqueValue = (node: TreeNodeType, key: string): any => get(node, key);
  const getPath = (path: string, id: string | number, index: number): string => {
    const separator = path === 'root' ? '-' : '|';
    return indexEffect ? `${path}${separator}${index}-${id}` : `${path}${separator}${id}`;
  };
  function getOldData(data: TreeNodeType, path: string, index: number): void {
    const newPath = getPath(path, getUniqueValue(data, oldKey), index);
    oldDataPathMap.set(newPath, data);
    oldIdMap.set(getUniqueValue(data, oldKey), data);
    if (data[childrenKey]) {
      data[childrenKey].forEach((childData: TreeNodeType, childDataIndex: number) => {
        getOldData(childData, newPath, childDataIndex);
      });
    }
  }
  oldArr.forEach((rootNode: TreeNodeType, index: number) => getOldData(rootNode, 'root', index));

  // 比较两个数据是否相同的方法
  function compareNode(newNode: TreeNodeType, oldNode: TreeNodeType): boolean {
    if (compareMethod && typeof compareMethod === 'function') {
      try {
        return compareMethod(newNode, oldNode);
      }
      catch (error) {
        console.error(error);
      }
    }
    const { [childrenKey]: children, ...newNodeExt } = newNode;
    const { [childrenKey]: oldChildren, ...oldNodeExt } = oldNode;
    return isEqual(newNodeExt, oldNodeExt);
  }
  function recursionData(data: TreeNodeType, path: string, index: number): any {
    const currentKey = getPath(path, getUniqueValue(data, key), index);
    const existingNode = oldDataPathMap.get(currentKey);
    const existingIdNode = oldIdMap.get(getUniqueValue(data, key));
    const diffInfo = { id: getUniqueValue(data, key), _old: existingNode, _new: data };
    if (existingNode) {
      // 存在就去比较里面的值
      if (!compareNode(data, existingNode)) {
        // 这是修改的
        updates.push(diffInfo);
      }
    }
    else if (existingIdNode) {
      // 如果旧的不存在, 则去找id相同的
      diffInfo._old = existingIdNode;
      moves.push(diffInfo);
      if (!compareNode(data, existingIdNode)) {
        updates.push(diffInfo);
      }
    }
    else {
      adds.push(diffInfo);
    }

    if (data[childrenKey]) {
      data[childrenKey].forEach((childData: TreeNodeType, childDataIndex: number) => {
        recursionData(childData, currentKey, childDataIndex);
      });
    }
  }
  newArr.forEach((rootNode, index) => recursionData(rootNode, 'root', index));
  return {
    updates,
    adds,
    moves,
  };
}

export function getDiffTree(newData: TreeNodeType[], oldData: TreeNodeType[], option: CompareDiffOptionType = {}): any {
  const pathInfo = patch(newData, oldData, option);
  const { adds } = patch(oldData, newData, { ...option, key: option.oldKey, oldKey: option.key });
  const deletes = adds.map((item: CompareResultType) => ({
    id: item.id,
    _old: item._new,
    _new: item._old,
  }));
  return {
    ...pathInfo,
    deletes,
  };
}
