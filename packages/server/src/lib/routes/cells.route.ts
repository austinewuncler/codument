import type { FastifyPluginAsync } from 'fastify';
import { mkdir, readFile, writeFile } from 'fs/promises';
import { join } from 'path';

interface Cell {
  id: string;
  content: string;
  type: 'code' | 'markdown';
}

const getCellsRoute = (filename: string, dir: string): FastifyPluginAsync => {
  const fullPath = join(dir, filename);
  const cellsRoute: FastifyPluginAsync = async (fastify) => {
    fastify.get('/', async () => {
      try {
        const result = await readFile(fullPath, { encoding: 'utf-8' });
        return JSON.parse(result);
      } catch (error: any) {
        if (error.code === 'ENOENT') {
          await mkdir(dir, { recursive: true });
          await writeFile(fullPath, '[]', 'utf-8');
          return [];
        } else {
          throw error;
        }
      }
    });

    fastify.post<{ Body: { cells: Cell[] } }>('/', async (req) => {
      const { cells } = req.body;
      await writeFile(fullPath, JSON.stringify(cells), 'utf-8');
      return { status: 'ok' };
    });
  };
  return cellsRoute;
};

export default getCellsRoute;
