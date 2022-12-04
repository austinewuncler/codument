import { build, initialize } from 'esbuild-wasm';

import { fetchModulesPlugin, resolvePathsPlugin } from './plugins';

export const initializeBundler = async (): Promise<void> =>
  await initialize({
    wasmURL: 'https://unpkg.com/esbuild-wasm/esbuild.wasm',
    worker: true,
  });

export const bundleCode = async (
  input: string
): Promise<string | undefined> => {
  const { outputFiles } = await build({
    entryPoints: ['index.js'],
    bundle: true,
    write: false,
    plugins: [resolvePathsPlugin(), fetchModulesPlugin(input)],
    jsxFactory: '_React.createElement',
    jsxFragment: '_React.Fragment',
  });
  return outputFiles[0]?.text;
};

export * from './components';
export * from './state';
