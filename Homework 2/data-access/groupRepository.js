import models from '../models/index.js';
const Group = models.Group;

export const getGroupById = async (id) => {
	return await Group.findByPk(id)
		.then((data) => data.dataValues)
		.catch((err) => console.log(err));
};

export const getAllGroups = async () => {
	return await Group.findAll({})
		.then((data) => data)
		.catch((err) => console.log(err));
};

export const createGroup = async (newGroup) => {
	return await Group.create({
		id: newGroup.id,
		name: newGroup.name,
		permissions: newGroup.permissions,
	})
		.then((data) => data.dataValues)
		.catch((err) => console.log(err));
};

export const updateGroup = async (id, group) => {
	return await Group.update(group, {
		where: { id },
		returning: true, // Set to true so that the affected row is returned as an array in the second value of the returned array
	})
		.then((data) => data[1][0])
		.catch((err) => console.log(err));
};

export const deleteGroup = async (id) => {
	return await Group.destroy({
		where: { id },
	})

		.then((data) => data)
		.catch((err) => console.log(err));
};
