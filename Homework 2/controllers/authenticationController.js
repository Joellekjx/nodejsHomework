import jwt from 'jsonwebtoken';
import { logger } from '../logger/Logger.js';
import UserService from '../services/user.js';

export const login = async (req, res) => {
	const { login, password } = req.body;
	try {
		const user = await UserService.Authenticate(login, password);
		if (!user || user.isDeleted) {
			return res.status(401).send({
				success: false,
				message: 'Bad username/password combination.',
			});
		}
		const payload = { id: user.id, login: user.login, age: user.age };
		const token = jwt.sign(payload, 'secret', { expiresIn: 120 });
		sendSuccess(res, 200, token);
	} catch (err) {
		catchError(req, res, err);
	}
};

const sendSuccess = (res, status, toSendObj) => {
	res.status(status);
	res.send(toSendObj);
};

const catchError = (req, res, err) => {
	logger.error({
		service: 'authentication-service',
		method: req.method,
		URL: req.url,
		params: req.params,
		body: req.body,
		msg: err.message,
	});
	res.status(500);
	res.send({
		error: err.message,
	});
};
