export default (sequelize, DataTypes) => {
	const User = sequelize.define('user', {
		id: {
			type: DataTypes.STRING,
			allowNull: false,
			primaryKey: true,
		},
		login: {
			allowNull: false,
			type: DataTypes.STRING,
		},
		password: {
			allowNull: false,
			type: DataTypes.STRING,
		},
		age: {
			allowNull: false,
			type: DataTypes.INTEGER,
		},
		isDeleted: {
			allowNull: false,
			type: DataTypes.BOOLEAN,
		},
	});

	User.sync();
	return User;
};
