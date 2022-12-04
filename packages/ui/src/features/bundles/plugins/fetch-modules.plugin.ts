import type { OnLoadResult, Plugin } from 'esbuild-wasm';
import { createInstance } from 'localforage';

const modulesCache = createInstance({ name: 'modules-cache' });

const fetchModulesPlugin = (code: string): Plugin => ({
  name: 'fetch-modules',
  setup: ({ onLoad }) => {
    onLoad({ filter: /(^index\.js$)/ }, () => ({
      loader: 'jsx',
      contents: code,
    }));

    onLoad({ filter: /.*/ }, async ({ path }) => {
      const cachedResult = await modulesCache.getItem<OnLoadResult>(path);

      if (cachedResult != null) return cachedResult;
      return null;
    });

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
