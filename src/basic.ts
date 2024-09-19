import type { parentIdTypes, ReplaceFiledOptionsType, TreeNodeType } from './types';
/**
 * @description 平行数据结构转树形结构
 * @param {Array} list 需要转换的树结构
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
 * 树形转平铺list（广度优先，先横向再纵向）
 * @param {*} tree 树j结构数据
 * @param {string, null} parentId 树j结构数据
 * @param {*} option 对象键配置，默认值{ children: 'children' }
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
