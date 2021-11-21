import {
	getAllUserGroup,
	addUsersToGroup,
} from '../data-access/userGroupRepository.js';

export default {
	RetrieveAll: async () => {
		const allGroups = await getAllUserGroup();
		return allGroups;
	},
	AddUsersToGroup: async (groupId, userIds) => {
		const addedUsers = await addUsersToGroup(groupId, userIds);
		return addedUsers;
	},
};
