import { assert, expect, test } from 'vitest'
import { arrayToTree } from '../src/index';

test('list to tree', () => {
  const arr = [
    {
      pid: 1,
      id: 2,
      name: '0-1-1'
    },
    {
      id: 0,
      name: '0-0',
    },
    {
      pid: 0,
      id: 3,
      name: '0-2'
    },
    {
      pid: 0,
      id: 1,
      name: '0-1'
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
          name: '0-2'
        },
        {
          pid: 0,
          id: 1,
          name: '0-1',
          children: [
            {
              pid: 1,
              id: 2,
              name: '0-1-1'
            },
          ]
        },
       
      ]
    },
  ])
})