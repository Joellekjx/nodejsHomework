type User = {
	id: string;
	login: string;
	password: string;
	age: number;
	isDeleted: boolean;
};

type updateCreateUserDetails = {
	login: string;
	password: string;
	age: number;
};

const users: Array<User> = [];

export const getUserById = (id: string) => {
	const user = users.find((user) => user.id === id);
	if (user === undefined) {
		return 'User not found';
	}
	return user;
};

export const createUser = (newUser: updateCreateUserDetails) => {
	const userId = users.length + 1; // since its soft delete, using the size of the users array to set an id number
	users.push({
		id: `${userId}`,
		login: newUser.login,
		password: newUser.password,
		age: newUser.age,
		isDeleted: false,
	});
	return users;
};

export const updateUser = (id: string, user: updateCreateUserDetails) => {
	const userToUpdate = users.find((user) => user.id === id);
	if (userToUpdate === undefined) {
		return 'User not found';
	}
	userToUpdate.age = user.age;
	userToUpdate.login = user.login;
	userToUpdate.password = user.password;
	return users;
};

export const getAutoSuggestUsers = (loginSubstring: string, limit: number) => {
	const autoSuggestUsers = users
		.filter((user) =>
			user.login.toLowerCase().includes(loginSubstring.toLowerCase())
		)
		.sort((a, b) => a.login.localeCompare(b.login))
		.slice(0, limit);
	if (autoSuggestUsers.length === 0) {
		return 'No user found';
	}
	return autoSuggestUsers;
};

export const deleteUser = (id: string) => {
	const userToUpdate = users.find((user) => user.id === id);
	if (userToUpdate === undefined) {
		return 'User not found';
	}
	userToUpdate.isDeleted = true;
	return users;
};
