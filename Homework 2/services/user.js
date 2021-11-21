import {
	createUser,
	deleteUser,
	getAutoSuggestUsers,
	getUserById,
	updateUser,
} from '../data-access/userRepository.js';
import { v4 as uuidv4 } from 'uuid';

export default {
	Signup: async (user) => {
		const id = uuidv4();
		const addedUser = await createUser({ ...user, id });
		return addedUser;
	},
	Update: async (id, user) => {
		const updatedUser = await updateUser(id, user);
		return updatedUser;
	},
	Retrieve: async (id) => {
		const user = await getUserById(id);
		return user;
	},
	Delete: async (id) => {
		const deletedUser = await deleteUser(id);
		return deletedUser;
	},
	AutoSuggest: async (loginSubstring, limit) => {
		const userList = await getAutoSuggestUsers(loginSubstring, limit);
		return userList;
	},
};
