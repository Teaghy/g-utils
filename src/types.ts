type TreeNodeKeyType = string | number

export type parentIdTypes = String | null;

export interface TreeNodeType {
  [key: string]: any | TreeNodeKeyType
}

export interface ReplaceFiledOptionsType {
  id?: string
  pid?: string
  children?: string
}