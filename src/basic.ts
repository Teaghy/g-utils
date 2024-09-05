import type { TreeNodeType, ReplaceFiledOptionsType } from './types';
/**
 * @description 平行数据结构转树形结构
 * @param {Array} list 需要转换的树结构
 * @returns {Array}
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
    } else {
      result.push(itemMap.get(element[id]))
    }
  });
  return result;
}
