import express from 'express';
import routes from './controllers/index.js';
import { Sequelize } from 'sequelize';
import { logger } from './logger/Logger.js';
import cors from 'cors';
import { checkToken } from './middleware/jwtMiddleware.js';
import {
	logMiddleware,
	errorHandlerMiddleware,
} from './middleware/logMiddleware.js';

const PORT = 4000;
const app = express();

app.use(cors());
app.use(logMiddleware);
app.use(errorHandlerMiddleware);
app.use(checkToken);
app.use(routes);
app.use(express.static('public'));

export const sequelize = new Sequelize('nodejs_homework_3', 'postgres', '', {
	host: 'localhost',
	dialect: 'postgres',
	port: 3000,
	pool: {
		max: 5,
		min: 0,
		idle: 10000,
	},
});

sequelize
	.authenticate()
	.then(() => {
		console.log('Connection has been established successfully.');
	})
	.catch((err) => {
		console.log('Unable to connect to the database', err);
	});

app.listen(PORT, () => console.log(`App is listening on port ${PORT}`));

process.on('uncaughtException', function (err) {
	logger.error(`UNCAUGHT EXCEPTION: ${err.stack || err.message}`);
});
