import { startServer } from '@codument/server';
import colors from 'colors/safe';
import { Command } from 'commander';
import { basename, dirname, join } from 'path';

const isProduction = process.env.NODE_ENV === 'production';

const serveCommand = new Command('serve')
  .command('serve')
  .description('start server')
  .argument('[filename]', 'file to edit', 'notebook.json')
  .option(
    '-p, --port <number>',
    'port to run server on',
    isProduction ? '4000' : '3000'
  )
  .action(async (filename: string, { port }: { port: string }) => {
    try {
      let dir: string;
      if (isProduction) dir = join(process.cwd(), dirname(filename));
      else dir = join(process.cwd(), dirname(filename), 'notes');
      await startServer(parseInt(port), basename(filename), dir, isProduction);
      console.log(
        colors.green(
          `Serving file ${colors.italic(
            colors.bold(colors.magenta(join(dir, filename)))
          )} at ${colors.underline(colors.cyan(`http://localhost:${port}.`))}`
        )
      );
    } catch (error: any) {
      if (error.code === 'EADDRINUSE')
        console.error(
          colors.red(`port ${port} is in use, try running on a different port`)
        );
      else console.error(colors.red(error.message));
      process.exit(1);
    }
  });

export default serveCommand;
