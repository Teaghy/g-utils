# g-tools

> 此项目仅示范性封装自身常用的工具函数.

## 安装

### yarn 安装方式

```bash
yarn add @teaghy/g-utils
```

### npm 安装方式

```bash
npm install @teaghy/g-utils
```

### 使用方式

```javascript
import { arrayToTree, treeToList } from '@teaghy/g-utils';
const arr = [
  {
    pid: 1,
    id: 2,
    name: '0-1-1',
  },
  {
    id: 0,
    name: '0-0',
  },
  {
    pid: 0,
    id: 3,
    name: '0-2',
  },
  {
    pid: 0,
    id: 1,
    name: '0-1',
  },
];
const treeData = arrayToTree(arr);
// console.log(treeData);

const list = treeToList(treeData);
// console.log(list);
```

### 函数文档

| 方法          | 描述           | 参数                                                                                                                                                                             | 返回值     |
|:----------- |:------------ |:------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |:------- |
| arrayToTree | 平行数据结构转树形结构  | (list, options) 接收两个参数: <br/>1. 平行数据结构数据 <br/>2. options: ReplaceFiledOptionsType 替换数据中的 id,pid,children 字段为 每个数据 中对应的字段 默认为 { id = 'id', pid = 'pid', children = 'children' } | `Array` |
| treeToList  | 树形结构转换平行数据结构 | (tree, options) 接收两个参数: <br/>1. 树形结构数据 <br/>2. options: ReplaceFiledOptionsType 替换数据中的 id,pid,children 字段为 每个数据 中对应的字段 默认为 { id = 'id', pid = 'pid', children = 'children' }   | `Array` |
