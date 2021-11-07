'use strict';
module.exports = {
	up: async (queryInterface, Sequelize) => {
		await queryInterface.createTable('users', {
			id: {
				allowNull: false,
				autoIncrement: true,
				primaryKey: true,
				type: Sequelize.INTEGER,
			},
			id: {
				type: Sequelize.STRING,
			},
			login: {
				type: Sequelize.STRING,
			},
			password: {
				type: Sequelize.STRING,
			},
			age: {
				type: Sequelize.NUMBER,
			},
			isDeleted: {
				type: Sequelize.BOOLEAN,
			},
			createdAt: {
				allowNull: false,
				type: Sequelize.DATE,
			},
			updatedAt: {
				allowNull: false,
				type: Sequelize.DATE,
			},
		});
	},
	down: async (queryInterface, Sequelize) => {
		await queryInterface.dropTable('users');
	},
};
