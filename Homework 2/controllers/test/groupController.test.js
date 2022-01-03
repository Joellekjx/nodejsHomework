import {
	getGroup,
	getAllGroups,
	postGroup,
	editGroup,
	removeGroup,
} from '../groupController.js';
import GroupService from '../../services/group.js';

describe('removeGroup', () => {
	it('should delete group and send response correctly', async () => {
		jest.spyOn(GroupService, 'Delete').mockResolvedValueOnce(1);
		const mReq = {
			params: { id: '1' },
		};
		const mRes = { status: jest.fn().mockReturnThis(), send: jest.fn() };
		await removeGroup(mReq, mRes);
		expect(mRes.status).toBeCalledWith(200);
		expect(mRes.send).toBeCalledWith('Group has been deleted sucessfully');
	});

	it('should return Group does not exist if no such id', async () => {
		jest.spyOn(GroupService, 'Delete').mockResolvedValueOnce(0);
		const mReq = {
			params: { id: '1222' },
		};
		const mRes = { status: jest.fn().mockReturnThis(), send: jest.fn() };
		await removeGroup(mReq, mRes);
		expect(mRes.status).toBeCalledWith(200);
		expect(mRes.send).toBeCalledWith('Group does not exist');
	});
});

describe('editGroup', () => {
	it('should update group if name and permissions is provided and send response correctly', async () => {
		const updatedGroup = {
			id: '1',
			name: 'Group 2',
			permissions: ['READ', 'WRITE', 'SHARE'],
			createdAt: '2021-11-21T17:35:08.902Z',
			updatedAt: '2022-01-03T17:38:26.571Z',
		};
		jest.spyOn(GroupService, 'Update').mockResolvedValueOnce(updatedGroup);
		const mReq = {
			params: { id: '1' },
			body: {
				name: 'Group2',
				permissions: ['READ', 'WRITE'],
			},
		};
		const mRes = { status: jest.fn().mockReturnThis(), send: jest.fn() };
		await editGroup(mReq, mRes);
		expect(mRes.status).toBeCalledWith(200);
		expect(mRes.send).toBeCalledWith(updatedGroup);
	});

	it('should return 500 if permissions is not READ, WRITE, DELETE, SHARE or UPLOAD_FILES', async () => {
		const mReq = {
			params: { id: '1' },
			body: {
				name: 'Group2',
				permissions: ['READ', 'TEST'],
			},
		};
		const mRes = { status: jest.fn(), send: jest.fn() };
		await editGroup(mReq, mRes);
		expect(mRes.status).toBeCalledWith(500);
		expect(mRes.send).toBeCalledWith({
			error:
				'"permissions[1]" must be one of [READ, WRITE, DELETE, SHARE, UPLOAD_FILES]',
		});
	});
});

describe('postGroup', () => {
	it('should create new group if name and permissions is provided and send response correctly', async () => {
		jest
			.spyOn(GroupService, 'Create')
			.mockResolvedValueOnce({ name: 'Group2' });
		const mReq = {
			body: {
				name: 'Group2',
				permissions: ['READ', 'WRITE'],
			},
		};
		const mRes = { status: jest.fn().mockReturnThis(), send: jest.fn() };
		await postGroup(mReq, mRes);
		expect(mRes.status).toBeCalledWith(200);
		expect(mRes.send).toBeCalledWith(
			'Group Group2 has been created successfully'
		);
	});

	it('should return 500 if permissions is not READ, WRITE, DELETE, SHARE or UPLOAD_FILES', async () => {
		const mReq = {
			body: {
				name: 'Group2',
				permissions: ['READ', 'TEST'],
			},
		};
		const mRes = { status: jest.fn(), send: jest.fn() };
		await postGroup(mReq, mRes);
		expect(mRes.status).toBeCalledWith(500);
		expect(mRes.send).toBeCalledWith({
			error:
				'"permissions[1]" must be one of [READ, WRITE, DELETE, SHARE, UPLOAD_FILES]',
		});
	});
});

describe('getAllGroups', () => {
	it('should retrieve all group and send response correctly', async () => {
		const groupList = [
			{
				id: '1',
				name: 'group1',
				permissions: ['READ', 'WRITE', 'DELETE', 'SHARE', 'UPLOAD_FILES'],
				createdAt: '2021-11-21T17:35:08.902Z',
				updatedAt: '2021-11-21T17:35:08.902Z',
			},
			{
				id: '2',
				name: 'group2',
				permissions: ['READ', 'WRITE', 'DELETE', 'SHARE'],
				createdAt: '2021-11-21T17:35:08.902Z',
				updatedAt: '2021-11-21T17:35:08.902Z',
			},
			{
				id: '3',
				name: 'group3',
				permissions: ['READ', 'SHARE'],
				createdAt: '2021-11-21T17:35:08.902Z',
				updatedAt: '2021-11-21T17:35:08.902Z',
			},
			{
				id: '4',
				name: 'group4',
				permissions: ['READ'],
				createdAt: '2021-11-21T17:35:08.902Z',
				updatedAt: '2021-11-21T17:35:08.902Z',
			},
		];
		jest.spyOn(GroupService, 'RetrieveAll').mockResolvedValueOnce(groupList);
		const mReq = {};
		const mRes = { status: jest.fn().mockReturnThis(), send: jest.fn() };
		await getAllGroups(mReq, mRes);
		expect(mRes.status).toBeCalledWith(200);
		expect(mRes.send).toBeCalledWith(groupList);
	});
});

describe('getGroup', () => {
	it('should retrieve one group by id and send response correctly', async () => {
		const group = {
			id: '1',
			name: 'group1',
			permissions: ['READ', 'WRITE', 'DELETE', 'SHARE', 'UPLOAD_FILES'],
			createdAt: '2021-11-21T17:35:08.902Z',
			updatedAt: '2021-11-21T17:35:08.902Z',
		};
		jest.spyOn(GroupService, 'Retrieve').mockResolvedValueOnce(group);
		const mReq = { params: { id: '1' } };
		const mRes = { status: jest.fn().mockReturnThis(), send: jest.fn() };
		await getGroup(mReq, mRes);
		expect(mRes.status).toBeCalledWith(200);
		expect(mRes.send).toBeCalledWith(group);
	});

	it('should return empty when no such group', async () => {
		jest.spyOn(GroupService, 'Retrieve').mockResolvedValueOnce(null);
		const mReq = { params: { id: '100' } };
		const mRes = { status: jest.fn().mockReturnThis(), send: jest.fn() };
		await getGroup(mReq, mRes);
		expect(mRes.status).toBeCalledWith(200);
		expect(mRes.send).toBeCalledWith(null);
	});
});
