import models from '../models/index.js';
import Sequelize from 'sequelize';
const Op = Sequelize.Op;
const User = models.User;

export const getUserByLogin = async (login, password) => {
	return await User.findOne({
		where: {
			login,
			password,
		},
	})
		.then((data) => data)
		.catch((err) => console.log(err));
};

export const getUserById = async (id) => {
	return await User.findByPk(id)
		.then((data) => data.dataValues)
		.catch((err) => console.log(err));
};

export const createUser = async (newUser) => {
	return await User.create({
		id: newUser.id,
		login: newUser.login,
		password: newUser.password,
		age: newUser.age,
		isDeleted: false,
	})
		.then((data) => data.dataValues)
		.catch((err) => console.log(err));
};

export const updateUser = async (id, user) => {
	return await User.update(user, {
		where: { id },
		returning: true, // Set to true so that the affected row is returned as an array in the second value of the returned array
	})
		.then((data) => data[1][0])
		.catch((err) => console.log(err));
};

export const getAutoSuggestUsers = async (loginSubstring, limit) => {
	return await User.findAll({
		limit,
		where: {
			login: {
				[Op.like]: `%${loginSubstring}%`,
			},
		},
	})
		.then((data) => data)
		.catch((err) => console.log(err));
};

export const deleteUser = async (id) => {
	return await User.update(
		{ isDeleted: true },
		{
			where: { id },
			returning: true, // Set to true so that the affected row is returned as an array in the second value of the returned array
		}
	)
		.then((data) => data[1][0])
		.catch((err) => console.log(err));
};
