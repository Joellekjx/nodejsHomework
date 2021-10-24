import express from 'express';
import {
	createUser,
	deleteUser,
	getAutoSuggestUsers,
	getUserById,
	updateUser,
} from './repositories/userRepository';
import Joi from 'joi';

const schema = Joi.object({
	login: Joi.string().required(),
	password: Joi.string()
		.pattern(new RegExp('^(?=.*\\d)(?=.*[a-zA-Z]).{0,}$'))
		.required(),
	age: Joi.number().integer().min(4).max(130).required(),
});

const app = express();
const PORT = 3000;
app.listen(PORT, () => console.log(`listening on port: ${PORT}`));
const router = express.Router();
router.use(express.json());

router.get('/user/:id', async (req, res) => {
	const { id } = req.params;
	const user = getUserById(id);
	sendSuccess(res, 200, user);
});

router.post('/user', async (req, res) => {
	const newUser = req.body;
	try {
		await schema.validateAsync({
			login: newUser.login,
			password: newUser.password,
			age: newUser.age,
		});
		const userList = createUser(newUser);
		sendSuccess(res, 200, userList);
	} catch (err: any) {
		catchError(res, err);
	}
});

router.put('/user/:id', async (req, res) => {
	const { id } = req.params;
	const user = req.body;
	try {
		await schema.validateAsync({
			login: user.login,
			password: user.password,
			age: user.age,
		});
		const userList = updateUser(id, user);
		sendSuccess(res, 200, userList);
	} catch (err: any) {
		catchError(res, err);
	}
});

router.get('/users', async (req, res) => {
	const { loginSubstring = '', limit = '10' } = req.query;
	const userList = getAutoSuggestUsers(
		loginSubstring as string,
		parseInt(limit as string)
	);
	sendSuccess(res, 200, userList);
});

router.delete('/user/:id', async (req, res) => {
	const { id } = req.params;
	const userList = deleteUser(id);
	sendSuccess(res, 200, userList);
});

router.all('*', (req, res) => {
	res.sendStatus(404);
});

const sendSuccess = (res: any, status: number, toSendObj: any) => {
	res.status(status);
	res.send(toSendObj);
};

const catchError = (res: any, err: any) => {
	res.status(400);
	res.send({
		error: err.message,
	});
};

app.use(router);
