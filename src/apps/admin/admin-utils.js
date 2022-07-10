const { AdminRegisteredModels } = require("./models");

const registerModels = async (modelNamesList = []) => {
	const models = modelNamesList.map((model) => ({ model_name: model }));
	const modelsResult = [];
	for (const modelFilterParams of models) {
		const registered = await AdminRegisteredModels.findOrCreate({
			where: modelFilterParams,
		});
		modelsResult.push(registered);
	}
	return modelsResult;
};

module.exports = { registerModels };
