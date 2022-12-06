#!/usr/bin/env node
import { program } from 'commander';

import { serveCommand } from './lib';

program.addCommand(serveCommand);

program.parse(process.argv);
