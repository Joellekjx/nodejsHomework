import express from 'express';
import {
	getUser,
	postUser,
	editUser,
	getSuggestedListOfUser,
	removeUser,
} from './usersController.js';

const router = express.Router();

router.use(express.json());

router.get('/user/:id', getUser);
router.post('/user', postUser);
router.put('/user/:id', editUser);
router.get('/users', getSuggestedListOfUser);
router.delete('/user/:id', removeUser);

router.all('*', (req, res) => {
	res.sendStatus(404);
});

export default router;
