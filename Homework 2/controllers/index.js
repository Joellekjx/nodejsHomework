import express from 'express';
import {
	getUser,
	postUser,
	editUser,
	getSuggestedListOfUser,
	removeUser,
	login,
} from './userController.js';
import {
	getGroup,
	getAllGroups,
	postGroup,
	editGroup,
	removeGroup,
} from './groupController.js';
import { getAllUserGroups, addUsersToGroup } from './userGroupController.js';

const router = express.Router();

router.use(express.json());

router.post('/user/login', login);

router.get('/user/:id', getUser);
router.post('/user', postUser);
router.put('/user/:id', editUser);
router.get('/users', getSuggestedListOfUser);
router.delete('/user/:id', removeUser);

router.get('/group/:id', getGroup);
router.get('/group', getAllGroups);
router.post('/group', postGroup);
router.put('/group/:id', editGroup);
router.delete('/group/:id', removeGroup);

router.get('/userGroup', getAllUserGroups);
router.post('/userGroup', addUsersToGroup);

router.all('*', (req, res) => {
	res.sendStatus(404);
});

export default router;
