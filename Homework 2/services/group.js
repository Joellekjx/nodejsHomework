import {
	getGroupById,
	getAllGroups,
	createGroup,
	updateGroup,
	deleteGroup,
} from '../data-access/groupRepository.js';
import { v4 as uuidv4 } from 'uuid';

export default {
	Create: async (group) => {
		const id = uuidv4();
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
