import type { OnLoadResult, Plugin } from 'esbuild-wasm';

import { modulesCache } from '../utils';

const cssPlugin = (): Plugin => ({
  name: 'css',
  setup: ({ onLoad }) => {
    onLoad({ filter: /.css$/ }, async ({ path }) => {
      const response = await fetch(path);
      const text = await response.text();
      const escaped = text
        .replace(/\n/g, '')
        .replace(/"/g, '\\"')
        .replace(/'/g, "\\'");
      const contents = `
        const style = document.createElement('style');
        style.innerText = '${escaped as string}';
        document.head.appendChild(style);
      `;
      const result: OnLoadResult = {
        loader: 'jsx',
        contents,
        resolveDir: new URL('./', response.url).pathname,
      };
      await modulesCache.setItem(path, result);
      return result;
    });
  },
});

export default cssPlugin;
