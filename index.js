const APP_PORT = process.env.PORT || 5005;
const { app, APPS } = require("./src/config/app");
const { syncTables, authenticate } = require("./src/config/db.config");
const bulkAllModels = require("./src/config/db.bulk");
const admin = require("./src/apps/admin/admin-utils");
const { getAppsModels } = require("flow-express/utils/model-utils.js");

app.listen(APP_PORT, async () => {
	const reset = false;
	try {
		const models = getAppsModels(APPS);

		// SET VALUES TO TRUE FOR MAKE DB CHANGES
		// await authenticate();
		await syncTables(models, reset, reset);
		await bulkAllModels(reset);

		await admin.registerMultipleModels(models);
		console.log("Listening on port " + APP_PORT);
	} catch (error) {
		console.error("ERROR");
		console.error(error);
	}
});
