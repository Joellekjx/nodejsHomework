import Joi from 'joi';
import { logger } from '../logger/Logger.js';
import UserService from '../services/user.js';
import jwt from 'jsonwebtoken';

const schema = Joi.object({
	login: Joi.string().required(),
	password: Joi.string()
		.pattern(new RegExp('^(?=.*\\d)(?=.*[a-zA-Z]).{0,}$'))
		.required(),
	age: Joi.number().integer().min(4).max(130).required(),
});

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

export const getUser = async (req, res) => {
	const { id } = req.params;
	try {
		const user = await UserService.Retrieve(id);
		sendSuccess(res, 200, user);
	} catch (err) {
		catchError(req, res, err);
	}
};

export const postUser = async (req, res) => {
	const newUser = req.body;
	try {
		await schema.validateAsync({
			login: newUser.login,
			password: newUser.password,
			age: newUser.age,
		});
		const newUserDetails = await UserService.Signup(newUser);
		sendSuccess(
			res,
			200,
			`User ${newUserDetails.login} have been created successfully`
		);
	} catch (err) {
		catchError(req, res, err);
	}
};

export const editUser = async (req, res) => {
	const { id } = req.params;
	const user = req.body;
	try {
		await schema.validateAsync({
			login: user.login,
			password: user.password,
			age: user.age,
		});
		const updatedUser = await UserService.Update(id, user);
		sendSuccess(res, 200, updatedUser);
	} catch (err) {
		catchError(req, res, err);
	}
};

export const getSuggestedListOfUser = async (req, res) => {
	const { loginSubstring = '', limit = '10' } = req.query;
	try {
		const userList = await UserService.AutoSuggest(
			loginSubstring,
			parseInt(limit)
		);
		sendSuccess(res, 200, userList);
	} catch (err) {
		catchError(req, res, err);
	}
};

export const removeUser = async (req, res) => {
	const { id } = req.params;
	try {
		const deletedUser = await UserService.Delete(id);
		sendSuccess(res, 200, deletedUser);
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
		service: 'user-service',
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
