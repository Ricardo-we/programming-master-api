const { Sequelize } = require("sequelize");
const sequelize = new Sequelize({
	dialect: "sqlite",
	storage: "db.sqlite",
});

const authenticate = async () => {
	await sequelize.authenticate();
};

const syncTables = async (models = [], alter = false, force = false) => {
	if (sequelize.getDialect() === "sqlite") {
		sequelize.query("PRAGMA foreign_keys = false;");
	}
	for (const model of models) {
		await model.sync({ alter, force });
	}
	if (sequelize.getDialect() === "sqlite") {
		sequelize.query("PRAGMA foreign_keys = true;");
	}
};

module.exports = {
	sequelize,
	authenticate,
	syncTables,
};
