const { DataTypes } = require("sequelize");
const { IDField } = require("flow-express/db/base-fields");
const { sequelize } = require("../../config/db.config");

const AdminRegisteredModels = sequelize.define("admin", {
	id: IDField,
	model_name: {
		type: DataTypes.STRING,
		unique: true,
		allowNull: false,
	},
});

module.exports = { AdminRegisteredModels };
