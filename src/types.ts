type TreeNodeKeyType = string | number;

export type parentIdTypes = string | null;

export interface TreeNodeType {
  [key: string]: any | TreeNodeKeyType;
}

export interface ReplaceFiledOptionsType {
  id?: string;
  pid?: string;
  children?: string;
}

export interface RenderHooksFnType {
  (arg?: any): any;
  _once?: boolean;
  _hookType?: string;
}

export interface CompareDiffOptionType {
  indexEffect?: boolean; // 是否检测索引变化
  key?: string; // 对象对比的唯一键
  oldKey?: string; // 旧对象的唯一键
  childrenKey?: string; // 子节点属性名称
  compareMethod?: (...arg: any) => boolean; // 比较的方法
}

export interface CompareResultType {
  id: number;
  _new: any;
  _old: any;
}
