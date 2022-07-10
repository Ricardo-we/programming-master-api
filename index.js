const APP_PORT = process.env.PORT || 5005;
const { app, APPS } = require("./src/config/app");
const { syncTables, authenticate } = require("./src/config/db.config");
const { registerModels } = require("./src/apps/admin/admin-utils");

app.listen(APP_PORT, () => {
	try {
		let models = [];

		for (const app of APPS) {
			const appName = typeof app === "object" ? app?.name : app;
			const model = Object.values(
				require(`./src/apps/${appName}/models.js`),
			);
			for (const singleModel of model) {
				models.push(singleModel);
			}
		}
		authenticate();
		// SET VALUES TO TRUE FOR MAKE DB CHANGES
		registerModels(models.map((model) => model.getTableName()));
		syncTables(models);
		console.log("Listening on port " + APP_PORT);
	} catch (error) {
		console.error(error);
	}
});
