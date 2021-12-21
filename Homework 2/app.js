import express from 'express';
import routes from './controllers/index.js';
import { Sequelize } from 'sequelize';
import { logger } from './logger/Logger.js';
import jwt from 'jsonwebtoken';
import cors from 'cors';

const PORT = 4000;
const app = express();

const logMiddleware = (req, res, next) => {
	let service = '';
	if (req.path.search('/user') > -1) {
		service = 'user-service';
	} else if (req.path.search('/group') > -1) {
		service = 'group-service';
	}

	logger.info({
		service,
		method: req.method,
		URL: req.url,
		params: req.params,
		body: req.body,
	});

	next();
};

const errorHandlerMiddleware = (err, req, res, next) => {
	logger.error(err.stack);
	res.status(500).send('Something broke!');
};

const checkToken = (req, res, next) => {
	if (req.path.search('/login') === -1) {
		const token = req.headers['x-access-token'];
		if (!token) {
			res.status(401).send({ success: false, message: 'No token provided' });
		}

		jwt.verify(token, 'secret', (err, decoded) => {
			if (err) {
				console.log(err);
				res
					.status(403)
					.send({ success: false, message: 'Failed to authenticate token.' });
			}
		});
	}
	next();
};

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
