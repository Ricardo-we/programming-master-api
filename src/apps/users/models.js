const { DataTypes } = require("sequelize");
const { IDField } = require("flow-express/db/base-fields");
const { sequelize } = require("../../config/db.config");
const { DbHelperOption } = require("../db-helpers/models");
const { oneToManyRelation } = require("flow-express/db/relations.utils");

const UsersModel = sequelize.define("users", {
	id: IDField,
	fullname: DataTypes.STRING(255),
	password: DataTypes.STRING(300),
	email: {
		type: DataTypes.STRING(300),
		validate: {
			isEmail: true,
		},
	},
	token: DataTypes.STRING,
});

const UserInterests = sequelize.define("user_interests", {
	id: IDField,
	interest: DataTypes.STRING(255),
});

const Profile = sequelize.define("user_profile", {
	id: IDField,
	plan: {
		type: DataTypes.STRING(300),
		defaultValue: "basic",
	},
});
const userToRelOptions = { foreignKey: { name: "user_id", allowNull: false } };

UsersModel.hasMany(UserInterests, userToRelOptions);
UserInterests.belongsTo(UsersModel, userToRelOptions);

oneToManyRelation(DbHelperOption, UsersModel, {
	foreignKey: { name: "language_id", allowNull: false },
});

UsersModel.hasOne(Profile, userToRelOptions);
Profile.belongsTo(UsersModel, userToRelOptions);

module.exports = { UsersModel, Profile, UserInterests };
