export default (sequelize, DataTypes) => {
	const Group = sequelize.define('group', {
		id: {
			type: DataTypes.STRING,
			allowNull: false,
			primaryKey: true,
		},
		name: {
			allowNull: false,
			type: DataTypes.STRING,
		},
		permissions: {
			allowNull: false,
			type: DataTypes.ARRAY(DataTypes.STRING),
		},
	});

	Group.associate = () => {
		Group.belongsTo(userGroup, {
			foreignKey: 'groupId',
			onDelete: 'CASCADE',
		});
	};

	return Group;
};
