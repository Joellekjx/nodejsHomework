import { sequelize } from '../app.js';
import models from '../models/index.js';
import { v4 as uuidv4 } from 'uuid';

const UserGroup = models.UserGroup;
const User = models.User;
const Group = models.Group;

export const getAllUserGroup = async () => {
	return await UserGroup.findAll({})
		.then((data) => data)
		.catch((err) => console.log(err));
};

export const addUsersToGroup = async (groupId, userIds) => {
	const t = await sequelize.transaction();

	return await sequelize.transaction(async (t) => {
		const user = await User.findAll(
			{
				where: { id: userIds },
			},
			{ transaction: t }
		);
		const group = await Group.findByPk(groupId, { transaction: t });

		if (group && user) {
			const newRecords = userIds.map((userId) => {
				return { id: uuidv4(), groupId, userId };
			});
			return await UserGroup.bulkCreate(newRecords);
		}

		return Error('Group or User was not found');
	});
};
