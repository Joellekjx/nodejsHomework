import Sequelize from 'sequelize';
import userModel from './user.js';

const sequelize = new Sequelize('nodejs_homework_3', 'postgres', null, {
	dialect: 'postgres',
	host: '127.0.0.1',
	port: 3000,
});

export default {
	User: userModel(sequelize, Sequelize.DataTypes),
};
