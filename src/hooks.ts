import type { RenderHooksFnType } from './types';

interface HookOptions {
  once?: boolean;
}

interface RenderHooksReturn {
  addRenderHooks: (fn: RenderHooksFnType, options?: HookOptions) => void;
  removeRenderHooks: (fn: RenderHooksFnType) => void;
  runRenderHooks: () => void;
}

const renderHooks = new Set<RenderHooksFnType>();

/**
 * @description 用于创建渲染钩子hooks
 * @param {string} hooksType - 创建构造函数的唯一标识
 * @returns {object} RenderHooksReturn - 返回值
 */
export function useRenderHooks(hooksType: string = 'default'): RenderHooksReturn {
  // 验证 hooksType 参数
  if (typeof hooksType !== 'string') {
    throw new TypeError('hooksType must be a string');
  }

  /**
   * 添加渲染钩子函数
   * @param {RenderHooksFnType} fn - 要添加的钩子函数
   * @param {HookOptions} options - 配置选项
   */
  function addRenderHooks(fn: RenderHooksFnType, { once = false }: HookOptions = {}): void {
    if (typeof fn !== 'function') {
      throw new TypeError('The provided hook must be a function');
    }

    if (renderHooks.has(fn)) {
      console.warn('Hook function already exists');
      return;
    }

    fn._hookType = hooksType;
    if (once) {
      fn._once = once;
    }
    renderHooks.add(fn);
  }

  /**
   * 移除渲染钩子函数
   * @param {RenderHooksFnType} fn - 要移除的钩子函数
   */
  function removeRenderHooks(fn: RenderHooksFnType): void {
    if (!renderHooks.has(fn)) {
      console.warn('Hook function does not exist');
      return;
    }
    renderHooks.delete(fn);
  }

  /**
   * 执行当前类型的所有渲染钩子函数
   */
  function runRenderHooks(): void {
    const hooksToRemove: RenderHooksFnType[] = [];

    renderHooks.forEach((fn: RenderHooksFnType) => {
      if (fn._hookType !== hooksType)
        return;

      try {
        fn();

        if (fn._once) {
          hooksToRemove.push(fn);
        }
      }
      catch (error) {
        console.error('Error executing render hook:', error);
        // 可选：出错时也移除这个 hook
        if (fn._once) {
          hooksToRemove.push(fn);
        }
      }
    });

    // 批量移除需要删除的 hooks
    hooksToRemove.forEach(fn => renderHooks.delete(fn));
  }

  return {
    addRenderHooks,
    removeRenderHooks,
    runRenderHooks,
  };
}
