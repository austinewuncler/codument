import { initialize } from 'esbuild-wasm';

export const initializeBundler = async (): Promise<void> =>
  await initialize({
    wasmURL: 'https://unpkg.com/esbuild-wasm/esbuild.wasm',
    worker: true,
  });

export * from './components';
export * from './state';
