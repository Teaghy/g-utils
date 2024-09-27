import type { RenderHooksFnType } from './types';

const renderHooks = new Set();
/**
 * @desc 用于创建渲染钩子hooks
 * @param {string} hooksType 创建构造函数的唯一标识
 */
export function useRenderHooks(hooksType = 'default'): any {
  function addRenderHooks(fn: RenderHooksFnType, { once = false } = {}): void {
    if (typeof fn !== 'function') {
      throw new TypeError('The provided hook must be a function.');
    }
    // 给render函数添加唯一标识 可以分模块根据传入不同的参数使用
    fn._hookType = hooksType;
    if (once) {
      fn._once = once;
    }
    renderHooks.add(fn);
  }

  function removeRenderHooks(fn: RenderHooksFnType): void {
    renderHooks.delete(fn);
  }

  function runRenderHooks(): void {
    renderHooks.forEach((fn: any) => {
      if (fn._hookType !== hooksType)
        return;
      try {
        fn(); // 执行钩子函数
      }
      catch (error) {
        console.error('Error executing render hook:', error);
      }
      // 如果只需要执行一遍, 执行完成后删除
      if (fn._once) {
        renderHooks.delete(fn);
      }
    });
  }

  return {
    addRenderHooks,
    removeRenderHooks,
    runRenderHooks,
  };
}
