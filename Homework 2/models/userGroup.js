import userModel from './user.js';
import groupModel from './group.js';

export default (sequelize, DataTypes) => {
	const UserGroup = sequelize.define('userGroup', {
		id: {
			type: DataTypes.STRING,
			allowNull: false,
			primaryKey: true,
		},
		// groupId: {
		// 	allowNull: false,
		// 	type: DataTypes.STRING,
		// 	reference: {
		// 		model: groupModel,
		// 		key: 'id',
		// 	},
		// },
		// userId: {
		// 	allowNull: false,
		// 	type: DataTypes.STRING,
		// 	reference: {
		// 		model: userModel,
		// 		key: 'id',
		// 	},
		// },
	});
	return UserGroup;
};
