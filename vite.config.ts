import path from 'node:path'
/// <reference types="vitest/config" />
import { defineConfig } from 'vite'

export default defineConfig({
  test: {
    /* for example, use global to avoid globals imports (describe, test, expect): */
    // globals: true,
  },
  build: {
    lib: {
      entry: path.resolve(__dirname, 'src/index.ts'),
      name: 'g-utils',
      fileName: format => `g-utils.${format}.js`,
    },
  },
})
