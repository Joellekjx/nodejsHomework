import models from '../models/index.js';
import Sequelize from 'sequelize';
const Op = Sequelize.Op;
const User = models.User;

export const getUserById = async (id) => {
	return await User.findByPk(id)
		.then((data) => data.dataValues)
		.catch((err) => console.log(err));
};

export const createUser = async (newUser) => {
	const userId = Math.floor(Math.random() * 100); //Random generate id from 0-100
	return await User.create({
		id: `${userId}`,
		login: newUser.login,
		password: newUser.password,
		age: newUser.age,
		isDeleted: false,
	})
		.then((data) => data.dataValues)
		.catch((err) => console.log(err));
};

export const updateUser = async (id, user) => {
	return await User.update(user, { where: { id } })
		.then((data) => {
			console.log(data);
			return data[0];
		})
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
	return await User.update({ isDeleted: true }, { where: { id } })
		.then((data) => {
			return data[0];
		})
		.catch((err) => console.log(err));
};
