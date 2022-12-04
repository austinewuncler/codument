import type { Plugin } from 'esbuild-wasm';

const resolvePathsPlugin = (): Plugin => ({
  name: 'resolve-paths',
  setup({ onResolve }) {
    onResolve({ filter: /(^index\.js$)/ }, () => ({
      path: 'index.js',
      namespace: 'a',
    }));

    onResolve({ filter: /^\.+\// }, ({ path, resolveDir }) => ({
      namespace: 'a',
      path: new URL(path, `https://unpkg.com${resolveDir}/`).href,
    }));

    onResolve({ filter: /.*/ }, async ({ path }) => ({
      namespace: 'a',
      path: `https://unpkg.com/${path}`,
    }));
  },
});

export default resolvePathsPlugin;
