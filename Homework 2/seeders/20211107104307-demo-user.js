'use strict';

module.exports = {
	up: async (queryInterface, Sequelize) => {
		/**
		 * Add seed commands here.
		 *
		 * Example:
		 * await queryInterface.bulkInsert('People', [{
		 *   name: 'John Doe',
		 *   isBetaMember: false
		 * }], {});
		 */

		await queryInterface.bulkInsert(
			'Users',
			[
				{
					id: '1',
					login: 'user1',
					password: '1234',
					age: 11,
					isDeleted: false,
					createdAt: new Date(),
					updatedAt: new Date(),
				},
				{
					id: '2',
					login: 'user2',
					password: '1234',
					age: 12,
					isDeleted: false,
					createdAt: new Date(),
					updatedAt: new Date(),
				},
				{
					id: '3',
					login: 'user3',
					password: '1234',
					age: 20,
					isDeleted: false,
					createdAt: new Date(),
					updatedAt: new Date(),
				},
			],
			{}
		);
	},

	down: async (queryInterface, Sequelize) => {
		/**
		 * Add commands to revert seed here.
		 *
		 * Example:
		 * await queryInterface.bulkDelete('People', null, {});
		 */
	},
};
