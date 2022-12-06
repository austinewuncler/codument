import { startServer } from '@marckode/server';
import { Command } from 'commander';
import { basename, dirname, join } from 'path';

const isProduction = process.env.NODE_ENV === 'production';

const serveCommand = new Command('serve')
  .command('serve')
  .description('start server')
  .argument('[filename]', 'file to edit', 'notebook.json')
  .option('-p, --port <number>', 'port to run server on', '3000')
  .action(async (filename: string, { port }: { port: string }) => {
    try {
      const dir = join(process.cwd(), dirname(filename));
      await startServer(parseInt(port), basename(filename), dir, isProduction);
      console.log(
        `Opened ${filename}. Navigate to http://localhost:${port} to edit the file.`
      );
    } catch (error: any) {
      if (error.code === 'EADDRINUSE')
        console.error(
          `port ${port} is in use, try running on a different port`
        );
      else console.log(error.message);
      process.exit(1);
    }
  });

export default serveCommand;
