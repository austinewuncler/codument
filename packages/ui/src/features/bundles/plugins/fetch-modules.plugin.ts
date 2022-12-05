import type { OnLoadResult, Plugin } from 'esbuild-wasm';

import { modulesCache } from '../utils';

const fetchModulesPlugin = (code: string): Plugin => ({
  name: 'fetch-modules',
  setup: ({ onLoad }) => {
    onLoad({ filter: /(^index\.js$)/ }, () => ({
      loader: 'jsx',
      contents: code,
    }));

    onLoad({ filter: /.*/ }, async ({ path }) => {
      const response = await fetch(path);
      const text = await response.text();
      const result: OnLoadResult = {
        loader: 'jsx',
        contents: text,
        resolveDir: new URL('./', response.url).pathname,
      };
      await modulesCache.setItem(path, result);
      return result;
    });
  },
});

export default fetchModulesPlugin;
