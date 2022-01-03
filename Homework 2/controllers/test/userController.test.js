import {
	getUser,
	postUser,
	editUser,
	getSuggestedListOfUser,
	removeUser,
} from '../userController.js';
import UserService from '../../services/user.js';

describe('removeUser', () => {
	it('should set isDeleted to true and send response correctly', async () => {
		const deletedUser = {
			id: '1',
			login: 'user1',
			password: '1133',
			age: 12,
			isDeleted: true,
			createdAt: '2021-11-21T17:35:08.902Z',
			updatedAt: '2022-01-03T17:11:08.507Z',
		};
		jest.spyOn(UserService, 'Delete').mockResolvedValueOnce(deletedUser);
		const mReq = {
			params: { id: '1' },
		};
		const mRes = { status: jest.fn().mockReturnThis(), send: jest.fn() };
		await removeUser(mReq, mRes);
		expect(mRes.status).toBeCalledWith(200);
		expect(mRes.send).toBeCalledWith(deletedUser);
	});

	it('should return undefined if no id provided', async () => {
		jest.spyOn(UserService, 'Delete').mockResolvedValueOnce(undefined);
		const mReq = {
			params: { id: '' },
		};
		const mRes = { status: jest.fn().mockReturnThis(), send: jest.fn() };
		await removeUser(mReq, mRes);
		expect(mRes.status).toBeCalledWith(200);
		expect(mRes.send).toBeCalledWith(undefined);
	});

	it('should return undefined if no such id', async () => {
		jest.spyOn(UserService, 'Delete').mockResolvedValueOnce(undefined);
		const mReq = {
			params: { id: '1222' },
		};
		const mRes = { status: jest.fn().mockReturnThis(), send: jest.fn() };
		await removeUser(mReq, mRes);
		expect(mRes.status).toBeCalledWith(200);
		expect(mRes.send).toBeCalledWith(undefined);
	});
});

describe('getSuggestedListOfUser', () => {
	it('should retrieve list of user when loginSubstring and limit provided and send response correctly', async () => {
		const userList = [
			{
				id: '1',
				login: 'user1',
				password: '1133',
				age: 12,
				isDeleted: false,
				createdAt: '2021-11-21T17:35:08.902Z',
				updatedAt: '2021-11-21T17:35:08.902Z',
			},
			{
				id: '2',
				login: 'user2',
				password: '1133',
				age: 22,
				isDeleted: false,
				createdAt: '2021-11-21T17:35:08.902Z',
				updatedAt: '2021-11-21T17:35:08.902Z',
			},
			{
				id: '43b53ff0-d400-4bf2-94b8-095067d89f2c',
				login: 'user3',
				password: 'zaaa2A',
				age: 30,
				isDeleted: false,
				createdAt: '2021-12-21T17:41:59.299Z',
				updatedAt: '2021-12-21T17:41:59.299Z',
			},
		];
		jest.spyOn(UserService, 'AutoSuggest').mockResolvedValueOnce(userList);
		const mReq = {
			query: { loginSubstring: 'user', limit: 3 },
		};
		const mRes = { status: jest.fn().mockReturnThis(), send: jest.fn() };
		await getSuggestedListOfUser(mReq, mRes);
		expect(mRes.status).toBeCalledWith(200);
		expect(mRes.send).toBeCalledWith(userList);
	});

	it('should return undefined if limit not provided', async () => {
		jest.spyOn(UserService, 'AutoSuggest').mockResolvedValueOnce(undefined);
		const mReq = {
			query: { loginSubstring: 'user' },
		};
		const mRes = { status: jest.fn().mockReturnThis(), send: jest.fn() };
		await getSuggestedListOfUser(mReq, mRes);
		expect(mRes.status).toBeCalledWith(200);
		expect(mRes.send).toBeCalledWith(undefined);
	});
});

describe('editUser', () => {
	it('should edit user if login, password and age is provided and send response correctly', async () => {
		const user = {
			id: '100',
			login: 'tester001',
			password: '1133',
			age: 12,
			isDeleted: false,
			createdAt: '2021-11-21T17:35:08.902Z',
			updatedAt: '2021-11-21T17:35:08.902Z',
		};
		jest.spyOn(UserService, 'Update').mockResolvedValueOnce(user);
		const mReq = {
			params: { id: '100' },
			body: { login: 'tester001', password: 'zaaa2A', age: 30 },
		};
		const mRes = { status: jest.fn().mockReturnThis(), send: jest.fn() };
		await editUser(mReq, mRes);
		expect(mRes.status).toBeCalledWith(200);
		expect(mRes.send).toBeCalledWith(user);
	});

	it('should return 500 if login is not provided', async () => {
		const mReq = {
			params: { id: '100' },
			body: { password: 'zaaa2A', age: 30 },
		};
		const mRes = { status: jest.fn(), send: jest.fn() };
		await editUser(mReq, mRes);
		expect(mRes.status).toBeCalledWith(500);
		expect(mRes.send).toBeCalledWith({ error: '"login" is required' });
	});

	it('should return 500 if password is not provided', async () => {
		const mReq = {
			params: { id: '100' },
			body: { login: 'tester001', age: 30 },
		};
		const mRes = { status: jest.fn(), send: jest.fn() };
		await editUser(mReq, mRes);
		expect(mRes.status).toBeCalledWith(500);
		expect(mRes.send).toBeCalledWith({ error: '"password" is required' });
	});

	it('should return 500 if age is not provided', async () => {
		const mReq = {
			params: { id: '100' },
			body: { login: 'tester001', password: 'zaaa2A' },
		};
		const mRes = { status: jest.fn(), send: jest.fn() };
		await editUser(mReq, mRes);
		expect(mRes.status).toBeCalledWith(500);
		expect(mRes.send).toBeCalledWith({ error: '"age" is required' });
	});

	it('should return undefined when no id provided', async () => {
		jest.spyOn(UserService, 'Update').mockResolvedValueOnce(undefined);
		const mReq = {
			params: { id: '' },
			body: { login: 'tester001', password: 'zaaa2A' },
		};
		const mRes = { status: jest.fn().mockReturnThis(), send: jest.fn() };
		await getUser(mReq, mRes);
		expect(mRes.status).toBeCalledWith(200);
		expect(mRes.send).toBeCalledWith(undefined);
	});
});

describe('postUser', () => {
	it('should create new user if login, password and age is provided and send response correctly', async () => {
		jest
			.spyOn(UserService, 'Signup')
			.mockResolvedValueOnce({ login: 'tester001' });
		const mReq = {
			body: { login: 'tester001', password: 'zaaa2A', age: 30 },
		};
		const mRes = { status: jest.fn().mockReturnThis(), send: jest.fn() };
		await postUser(mReq, mRes);
		expect(mRes.status).toBeCalledWith(200);
		expect(mRes.send).toBeCalledWith(
			'User tester001 have been created successfully'
		);
	});

	it('should return 500 if login is not provided', async () => {
		const mReq = {
			body: { password: 'zaaa2A', age: 30 },
		};
		const mRes = { status: jest.fn(), send: jest.fn() };
		await postUser(mReq, mRes);
		expect(mRes.status).toBeCalledWith(500);
		expect(mRes.send).toBeCalledWith({ error: '"login" is required' });
	});

	it('should return 500 if password is not provided', async () => {
		const mReq = {
			body: { login: 'tester001', age: 30 },
		};
		const mRes = { status: jest.fn(), send: jest.fn() };
		await postUser(mReq, mRes);
		expect(mRes.status).toBeCalledWith(500);
		expect(mRes.send).toBeCalledWith({ error: '"password" is required' });
	});

	it('should return 500 if age is not provided', async () => {
		const mReq = {
			body: { login: 'tester001', password: 'zaaa2A' },
		};
		const mRes = { status: jest.fn(), send: jest.fn() };
		await postUser(mReq, mRes);
		expect(mRes.status).toBeCalledWith(500);
		expect(mRes.send).toBeCalledWith({ error: '"age" is required' });
	});
});

describe('getUser', () => {
	it('should retrieve one user by id and send response correctly', async () => {
		const user = {
			id: '1',
			login: 'user1',
			password: '1133',
			age: 12,
			isDeleted: false,
			createdAt: '2021-11-21T17:35:08.902Z',
			updatedAt: '2021-11-21T17:35:08.902Z',
		};
		jest.spyOn(UserService, 'Retrieve').mockResolvedValueOnce(user);
		const mReq = { params: { id: '1' } };
		const mRes = { status: jest.fn().mockReturnThis(), send: jest.fn() };
		await getUser(mReq, mRes);
		expect(mRes.status).toBeCalledWith(200);
		expect(mRes.send).toBeCalledWith(user);
	});

	it('should return undefined when no id provided', async () => {
		jest.spyOn(UserService, 'Retrieve').mockResolvedValueOnce(undefined);
		const mReq = { params: { id: '' } };
		const mRes = { status: jest.fn().mockReturnThis(), send: jest.fn() };
		await getUser(mReq, mRes);
		expect(mRes.status).toBeCalledWith(200);
		expect(mRes.send).toBeCalledWith(undefined);
	});

	it('should return empty when no such user', async () => {
		jest.spyOn(UserService, 'Retrieve').mockResolvedValueOnce(null);
		const mReq = { params: { id: '100' } };
		const mRes = { status: jest.fn().mockReturnThis(), send: jest.fn() };
		await getUser(mReq, mRes);
		expect(mRes.status).toBeCalledWith(200);
		expect(mRes.send).toBeCalledWith(null);
	});
});
