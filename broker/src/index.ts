import chalk from 'chalk';
import { ServerSocket } from './controllers/ServerSocket';

console.log(chalk.cyan('Started Anchiale broker...'));

const socket = new ServerSocket('/', 3000);
