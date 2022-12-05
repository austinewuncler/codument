import type { OnLoadResult, Plugin } from 'esbuild-wasm';

import { modulesCache } from '../utils';

const modulesCachePlugin = (): Plugin => ({
  name: 'modules-cache',
  setup: ({ onLoad }) => {
    onLoad({ filter: /.*/ }, async ({ path }) => {
      const cachedResult = await modulesCache.getItem<OnLoadResult>(path);

      if (cachedResult != null) return cachedResult;
      return null;
    });
  },
});

export default modulesCachePlugin;
