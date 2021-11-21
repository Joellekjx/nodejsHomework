import Sequelize from 'sequelize';
import userModel from './user.js';
import groupModel from './group.js';
import userGroupModel from './userGroup.js';

const sequelize = new Sequelize('nodejs_homework_3', 'postgres', null, {
	dialect: 'postgres',
	host: '127.0.0.1',
	port: 3000,
});

const User = userModel(sequelize, Sequelize.DataTypes);
const Group = groupModel(sequelize, Sequelize.DataTypes);
const UserGroup = userGroupModel(sequelize, Sequelize.DataTypes);

User.hasOne(UserGroup, {
	foreignKey: 'userId',
	onDelete: 'cascade',
});
UserGroup.belongsTo(User);

Group.hasOne(UserGroup, {
	foreignKey: 'groupId',
	onDelete: 'cascade',
});
UserGroup.belongsTo(Group);

User.sync();
Group.sync();
UserGroup.sync();

export default {
	User,
	Group,
	UserGroup,
};
