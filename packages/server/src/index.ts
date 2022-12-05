import Fastify from 'fastify';

const fastify = Fastify({ logger: true });

export const startServer = async (
  port: number,
  filename: string,
  dir: string
): Promise<void> => {
  console.log(`serving traffic on port ${port}`);
  console.log(`saving/fetching cells from ${filename}`);
  console.log(`that file is in dir ${dir}`);
  await fastify.listen({ port });
};
