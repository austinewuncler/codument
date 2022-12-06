import fastifyHttpProxy from '@fastify/http-proxy';
import fastifyStatic from '@fastify/static';
import Fastify from 'fastify';
import { dirname } from 'path';

import { getCellsRoute } from './lib';

const fastify = Fastify();

export const startServer = async (
  port: number,
  filename: string,
  dir: string,
  isProduction: boolean
): Promise<void> => {
  await fastify.register(getCellsRoute(filename, dir), { prefix: 'cells' });
  if (isProduction)
    await fastify.register(fastifyStatic, {
      root: dirname(require.resolve('@codument/ui/dist/index.html')),
    });
  else
    await fastify.register(fastifyHttpProxy, {
      upstream: 'http://localhost:5173',
      websocket: true,
    });
  await fastify.listen({ port });
};
