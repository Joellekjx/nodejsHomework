import {
	createUser,
	deleteUser,
	getAutoSuggestUsers,
	getUserById,
	updateUser,
} from '../data-access/userRepository.js';
import Joi from 'joi';

const schema = Joi.object({
	login: Joi.string().required(),
	password: Joi.string()
		.pattern(new RegExp('^(?=.*\\d)(?=.*[a-zA-Z]).{0,}$'))
		.required(),
	age: Joi.number().integer().min(4).max(130).required(),
});

export const getUser = async (req, res) => {
	const { id } = req.params;
	const user = await getUserById(id);
	sendSuccess(res, 200, user);
};

export const postUser = async (req, res) => {
	const newUser = req.body;
	try {
		await schema.validateAsync({
			login: newUser.login,
			password: newUser.password,
			age: newUser.age,
		});
		const addedUser = await createUser(newUser);
		sendSuccess(res, 200, addedUser);
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
		const isEditedSuccessfully = await updateUser(id, user);
		if (isEditedSuccessfully) {
			sendSuccess(res, 200, 'User details have been saved successfully');
		} else {
			catchError(res, { message: 'User does not exist' });
		}
	} catch (err) {
		console.log('error');
		catchError(res, err);
	}
};

export const getSuggestedListOfUser = async (req, res) => {
	const { loginSubstring = '', limit = '10' } = req.query;
	const userList = await getAutoSuggestUsers(loginSubstring, parseInt(limit));
	sendSuccess(res, 200, userList);
};

export const removeUser = async (req, res) => {
	const { id } = req.params;
	const isDeletedSuccessfully = await deleteUser(id);
	if (isDeletedSuccessfully) {
		sendSuccess(res, 200, 'User have been deleted successfully');
	} else {
		catchError(res, { message: 'User does not exist' });
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
