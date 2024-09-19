import path from 'node:path';
/// <reference types="vitest/config" />
import { defineConfig } from 'vite';

export default defineConfig({
  build: {
    lib: {
      entry: path.resolve(__dirname, 'src/index.ts'),
      name: 'g-utils',
      fileName: format => `g-utils.${format}.js`,
    },
  },
});
