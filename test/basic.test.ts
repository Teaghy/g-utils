import { expect } from 'vitest'
import { arrayToTree, treeToList } from '../src/index'

it('list to tree', () => {
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
  ]
  expect(arrayToTree(arr)).toEqual([
    {
      id: 0,
      name: '0-0',
      children: [
        {
          pid: 0,
          id: 3,
          name: '0-2',
        },
        {
          pid: 0,
          id: 1,
          name: '0-1',
          children: [
            {
              pid: 1,
              id: 2,
              name: '0-1-1',
            },
          ],
        },

      ],
    },
  ])
})

const testData = {
  id: 1,
  name: '工厂总部',
  children: [
    {
      id: 2,
      name: '生产部',
      children: [
        {
          id: 3,
          name: '组装车间',
          children: [
            {
              id: 4,
              name: '组装线1',
              children: [
                {
                  id: 5,
                  name: '工位1',
                },
                {
                  id: 6,
                  name: '工位2',
                },
                {
                  id: 7,
                  name: '工位3',
                },
              ],
            },
            {
              id: 8,
              name: '组装线2',
              children: [
                {
                  id: 9,
                  name: '工位1',
                },
                {
                  id: 10,
                  name: '工位2',
                },
                {
                  id: 11,
                  name: '工位3',
                },
              ],
            },
          ],
        },
        {
          id: 12,
          name: '喷漆车间',
          children: [
            {
              id: 13,
              name: '喷漆线1',
              children: [
                {
                  id: 14,
                  name: '工位1',
                },
                {
                  id: 15,
                  name: '工位2',
                },
              ],
            },
            {
              id: 16,
              name: '喷漆线2',
              children: [
                {
                  id: 17,
                  name: '工位1',
                },
                {
                  id: 18,
                  name: '工位2',
                },
              ],
            },
          ],
        },
        {
          id: 19,
          name: '包装车间',
          children: [
            {
              id: 20,
              name: '包装线1',
              children: [
                {
                  id: 21,
                  name: '工位1',
                },
                {
                  id: 22,
                  name: '工位2',
                },
                {
                  id: 23,
                  name: '工位3',
                },
              ],
            },
            {
              id: 24,
              name: '包装线2',
              children: [
                {
                  id: 25,
                  name: '工位1',
                },
                {
                  id: 26,
                  name: '工位2',
                },
                {
                  id: 27,
                  name: '工位3',
                },
              ],
            },
          ],
        },
      ],
    },
    {
      id: 28,
      name: '质量部',
      children: [
        {
          id: 29,
          name: '检测车间',
          children: [
            {
              id: 30,
              name: '检测线1',
              children: [
                {
                  id: 31,
                  name: '工位1',
                },
                {
                  id: 32,
                  name: '工位2',
                },
              ],
            },
            {
              id: 33,
              name: '检测线2',
              children: [
                {
                  id: 34,
                  name: '工位1',
                },
                {
                  id: 35,
                  name: '工位2',
                },
              ],
            },
          ],
        },
        {
          id: 36,
          name: '维修车间',
          children: [
            {
              id: 37,
              name: '维修线1',
              children: [
                {
                  id: 38,
                  name: '工位1',
                },
                {
                  id: 39,
                  name: '工位2',
                },
              ],
            },
            {
              id: 40,
              name: '维修线2',
              children: [
                {
                  id: 41,
                  name: '工位1',
                },
                {
                  id: 42,
                  name: '工位2',
                },
              ],
            },
          ],
        },
      ],
    },
    {
      id: 43,
      name: '仓储部',
      children: [
        {
          id: 44,
          name: '原料仓',
          children: [
            {
              id: 45,
              name: '原料区1',
            },
            {
              id: 46,
              name: '原料区2',
            },
            {
              id: 47,
              name: '原料区3',
            },
          ],
        },
        {
          id: 48,
          name: '成品仓',
          children: [
            {
              id: 49,
              name: '成品区1',
            },
            {
              id: 50,
              name: '成品区2',
            },
            {
              id: 51,
              name: '成品区3',
            },
          ],
        },
      ],
    },
  ],
}
it('tree to list', () => {
  const treeData = treeToList([testData])
  const arr2 = arrayToTree(treeData)
  const treeData2 = treeToList(arr2)
  expect(treeData).toEqual(treeData2)
})
