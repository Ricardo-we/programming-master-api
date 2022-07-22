const { Sequelize } = require("sequelize");
const sequelize = new Sequelize({
	dialect: "sqlite",
	storage: "db.sqlite",
});

const authenticate = async () => {
	await sequelize.authenticate();
};

const syncTables = async (models = [], alter = false, force = false) => {
	for (const model of models) {
		await model.sync({ alter, force });
	}
};

module.exports = {
	sequelize,
	authenticate,
	syncTables,
};
