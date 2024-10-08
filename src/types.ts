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
