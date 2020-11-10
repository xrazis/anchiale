import chalk from 'chalk';
import { ClientSocket } from './controllers/ClientSocket';
import { Sensor } from './controllers/Sensor';

console.log(chalk.cyan('Started Anchiale measure...'));

const socket = new ClientSocket('/', 3000);

const sensor = new Sensor();
