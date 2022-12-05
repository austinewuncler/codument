import { createAsyncThunk } from '@reduxjs/toolkit';
import { build } from 'esbuild-wasm';

import {
  cssPlugin,
  fetchModulesPlugin,
  modulesCachePlugin,
  resolvePathsPlugin,
} from '../plugins';
import type { CreateBundleInput } from './bundles.types';

export const createBundle = createAsyncThunk<string, CreateBundleInput>(
  'createBundler',
  async ({ code }) => {
    const { outputFiles } = await build({
      entryPoints: ['index.js'],
      bundle: true,
      write: false,
      plugins: [
        resolvePathsPlugin(),
        modulesCachePlugin(),
        cssPlugin(),
        fetchModulesPlugin(code),
      ],
      jsxFactory: '_React.createElement',
      jsxFragment: '_React.Fragment',
      define: {
        '"process.env.NODE_ENV"': '"production"',
        global: 'window',
      },
    });
    const bundle = outputFiles[0]?.text;
    if (bundle === undefined) throw new Error('bundle is undefined');
    return bundle;
  }
);
