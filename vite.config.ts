/* eslint-disable @typescript-eslint/no-explicit-any */
import { createFilter, defineConfig, transformWithEsbuild, type Plugin } from 'vite'
import react from '@vitejs/plugin-react'
import { readFileSync } from 'fs';

function svgrPlugin(): Plugin {
  const filter = createFilter('**/*.svg');
  const postfixRE = /[?#].*$/s;

  return {
    name: 'svgr-plugin',
    async transform(code: any, id: any) {
      if (filter(id)) {
        const { transform } = await import('@svgr/core');
        const { default: jsx } = await import('@svgr/plugin-jsx');

        const filePath = id.replace(postfixRE, '');
        const svgCode = readFileSync(filePath, 'utf8');

        const componentCode = await transform(svgCode, undefined, {
          filePath,
          caller: {
            previousExport: code,
            defaultPlugins: [jsx],
          },
        });

        const res = await transformWithEsbuild(componentCode, id, {
          loader: 'jsx',
        });

        return {
          code: res.code,
          map: null,
        };
      }
    },
  };
}

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [svgrPlugin(), react()],
})
