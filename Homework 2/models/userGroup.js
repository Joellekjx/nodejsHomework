export default (sequelize, DataTypes) => {
	const UserGroup = sequelize.define('userGroup', {
		id: {
			type: DataTypes.STRING,
			allowNull: false,
			primaryKey: true,
		},
	});

	return UserGroup;
};
