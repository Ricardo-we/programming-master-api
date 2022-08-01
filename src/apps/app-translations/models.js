const { DataTypes } = require("sequelize");
const { IDField } = require("flow-express/db/base-fields");
const { sequelize } = require("../../config/db.config");
const { oneToManyRelation } = require("flow-express/db/relations.utils");
const { DbHelperOption } = require("../db-helpers/models");

const AppTranslation = sequelize.define("apptranslations", {
	id: IDField,
	jsonContent: {
		type: DataTypes.TEXT,
		validate: {
			isJson: (jsonContent) => JSON.parse(jsonContent),
		},
	},
});
oneToManyRelation(DbHelperOption, AppTranslation, {
	as: "language_code",
	foreignKey: {
		name: "language_id",
		allowNull: false,
	},
});

module.exports = { AppTranslation };
