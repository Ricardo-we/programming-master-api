const { DataTypes } = require("sequelize");
const { IDField } = require("flow-express/db/base-fields");
const { oneToManyRelation } = require("flow-express/db/relations.utils");
const { sequelize } = require("../../config/db.config");

const BaseHelper = {
	id: IDField,
	code: DataTypes.STRING(30),
	name: {
		type: DataTypes.STRING(255),
		allowNull: false,
		validate: {
			notNull: { msg: "DbHelper requires name" },
		},
	},
};

const DbHelper = sequelize.define("db_helper", BaseHelper);
const DbHelperOption = sequelize.define("db_helper_option", BaseHelper);

// HELPER TO HELPER-OPTION
oneToManyRelation(DbHelper, DbHelperOption, {
	as: "db_helper_options",
	foreignKey: { name: "db_helper_id", allowNull: false },
});

module.exports = { DbHelper, DbHelperOption };
