require('dotenv').config();
import chalk from 'chalk';
import { ClientService } from './class/ClientService';
const { v4: uuidv4 } = require('uuid');

console.log(chalk.cyan('Started Anchiale Client...'));

const uuid = uuidv4();

const service = new ClientService(uuid);

service.tempTestService();
