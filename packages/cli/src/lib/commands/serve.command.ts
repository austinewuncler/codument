import { startServer } from '@markode/server';
import { Command } from 'commander';
import { basename, dirname, join } from 'path';

const serveCommand = new Command('serve')
  .command('serve')
  .description('start server')
  .argument('[filename]', 'file to edit', 'notebook.json')
  .option('-p, --port <number>', 'port to run server on', '3000')
  .action((filename, options: { port: string }) => {
    const dir = join(process.cwd(), dirname(filename));
    void startServer(parseInt(options.port), basename(filename), dir);
  });

export default serveCommand;
