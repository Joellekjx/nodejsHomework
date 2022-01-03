import { logger } from '../logger/Logger.js';

export const logMiddleware = (req, res, next) => {
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

export const errorHandlerMiddleware = (err, req, res, next) => {
	logger.error(err.stack);
	res.status(500).send('Something broke!');
};
