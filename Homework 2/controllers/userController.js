import Joi from 'joi';
import UserService from '../services/user.js';

const schema = Joi.object({
	login: Joi.string().required(),
	password: Joi.string()
		.pattern(new RegExp('^(?=.*\\d)(?=.*[a-zA-Z]).{0,}$'))
		.required(),
	age: Joi.number().integer().min(4).max(130).required(),
});

export const getUser = async (req, res) => {
	const { id } = req.params;
	try {
		const user = await UserService.Retrieve(id);
		sendSuccess(res, 200, user);
	} catch (err) {
		catchError(res, err);
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
		catchError(res, err);
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
		catchError(res, err);
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
		catchError(res, err);
	}
};

export const removeUser = async (req, res) => {
	const { id } = req.params;
	try {
		const deletedUser = await UserService.Delete(id);
		sendSuccess(res, 200, deletedUser);
	} catch (err) {
		catchError(res, err);
	}
};

const sendSuccess = (res, status, toSendObj) => {
	res.status(status);
	res.send(toSendObj);
};

const catchError = (res, err) => {
	res.status(400);
	res.send({
		error: err.message,
	});
};
