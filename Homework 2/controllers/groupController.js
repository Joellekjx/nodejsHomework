import Joi from 'joi';
import { logger } from '../logger/Logger.js';
import GroupService from '../services/group.js';

const schema = Joi.object({
	permissions: Joi.array().items(
		Joi.string().valid('READ', 'WRITE', 'DELETE', 'SHARE', 'UPLOAD_FILES')
	),
});

export const getGroup = async (req, res) => {
	const { id } = req.params;
	try {
		const group = await GroupService.Retrieve(id);
		sendSuccess(res, 200, group);
	} catch (err) {
		catchError(req, res, err);
	}
};

export const getAllGroups = async (req, res) => {
	try {
		const group = await GroupService.RetrieveAll();
		sendSuccess(res, 200, group);
	} catch (err) {
		catchError(req, res, err);
	}
};

export const postGroup = async (req, res) => {
	const newGroup = req.body;
	try {
		await schema.validateAsync({
			permissions: newGroup.permissions,
		});
		const createdGroup = await GroupService.Create(newGroup);
		sendSuccess(
			res,
			200,
			`Group ${createdGroup.name} has been created successfully`
		);
	} catch (err) {
		catchError(req, res, err);
	}
};

export const editGroup = async (req, res) => {
	const { id } = req.params;
	const group = req.body;
	try {
		await schema.validateAsync({
			permissions: group.permissions,
		});
		const updatedGroup = await GroupService.Update(id, group);
		sendSuccess(res, 200, updatedGroup);
	} catch (err) {
		catchError(req, res, err);
	}
};

export const removeGroup = async (req, res) => {
	const { id } = req.params;
	try {
		const deletedGroup = await GroupService.Delete(id);
		sendSuccess(
			res,
			200,
			deletedGroup
				? 'Group has been deleted sucessfully'
				: 'Group does not exist'
		);
	} catch (err) {
		catchError(req, res, err);
	}
};

const sendSuccess = (res, status, toSendObj) => {
	res.status(status);
	res.send(toSendObj);
};

const catchError = (req, res, err) => {
	logger.error({
		service: 'group-service',
		method: req.method,
		URL: req.url,
		params: req.params,
		body: req.body,
		msg: err.message,
	});
	res.status(500);
	res.send({
		error: err.message,
	});
};
