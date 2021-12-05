import UserGroupService from '../services/userGroup.js';

export const getAllUserGroups = async (req, res) => {
	try {
		const userGroup = await UserGroupService.RetrieveAll();
		sendSuccess(res, 200, userGroup);
	} catch (err) {
		catchError(req, res, err);
	}
};

export const addUsersToGroup = async (req, res) => {
	const newUserGroup = req.body;
	try {
		const userGroup = await UserGroupService.AddUsersToGroup(
			newUserGroup.groupId,
			newUserGroup.userIds
		);
		sendSuccess(res, 200, userGroup);
	} catch (err) {
		catchError(req, res, err);
	}
};

const sendSuccess = (res, status, toSendObj) => {
	res.status(status);
	res.send(toSendObj);
};

const catchError = (res, err) => {
	res.status(400);
	res.send({
		error: err.message,
	});
};
