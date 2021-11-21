import {
	getGroupById,
	getAllGroups,
	createGroup,
	updateGroup,
	deleteGroup,
} from '../data-access/groupRepository.js';

export default {
	Create: async (group) => {
		const id = Math.floor(Math.random() * 100); //Random generate id from 0-100
		const createdGroup = await createGroup({ ...group, id });
		return createdGroup;
	},
	Update: async (id, group) => {
		const updatedGroup = await updateGroup(id, group);
		return updatedGroup;
	},
	Retrieve: async (id) => {
		const group = await getGroupById(id);
		return group;
	},
	RetrieveAll: async () => {
		const allGroups = await getAllGroups();
		return allGroups;
	},
	Delete: async (id) => {
		const deleted = await deleteGroup(id);
		return deleted;
	},
};
