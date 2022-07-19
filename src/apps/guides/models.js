const { DataTypes } = require("sequelize");
const { IDField } = require("flow-express/db/base-fields");
const { sequelize } = require("../../config/db.config");
const { oneToManyRelation } = require("flow-express/db/relations.utils");
const { DbHelperOption } = require("../db-helpers/models");

const ProgrammingLanguages = sequelize.define("programming_languages", {
	id: IDField,
	name: {
		type: DataTypes.STRING(300),
		unique: true,
		allowNull: false,
	},
	description: DataTypes.TEXT,
	is_framework: {
		type: DataTypes.BOOLEAN,
		defaultValue: false,
	},
	extension_name: DataTypes.STRING(10),
});

const GuidesModel = sequelize.define("guides", {
	id: IDField,
	pro_only: DataTypes.BOOLEAN,
	title: {
		type: DataTypes.STRING(300),
		allowNull: false,
	},
	introduction: DataTypes.TEXT,
	guide_contents_md: {
		type: DataTypes.TEXT,
		allowNull: false,
	},
});

const Tutorials = sequelize.define("tutorials", {
	id: IDField,
	title: DataTypes.STRING,
	md_body: {
		type: DataTypes.TEXT,
		allowNull: false,
	},
});

const programmingLanguageTranslationOption = {
	as: "programming_language_translation",
	foreignKey: { name: "db_helper_option_id", allowNull: false },
};
oneToManyRelation(
	DbHelperOption,
	ProgrammingLanguages,
	programmingLanguageTranslationOption,
);

const programmingLangGuideRelOptions = {
	foreignKey: { name: "programming_language_id", allowNull: false },
};
oneToManyRelation(
	ProgrammingLanguages,
	GuidesModel,
	programmingLangGuideRelOptions,
);

const guideTutorialRelOptions = {
	foreignKey: { name: "guide_id", allowNull: false },
};
oneToManyRelation(GuidesModel, Tutorials, guideTutorialRelOptions);

module.exports = { GuidesModel, ProgrammingLanguages, Tutorials };
