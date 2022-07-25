const { AdminRegisteredModels } = require("./models");

class Admin {
	constructor() {
		this.models = {};
	}

	async registerModel(modelName, model) {
		await AdminRegisteredModels.findOrCreate({
			where: { model_name: modelName },
		});

		this.models[modelName] = model;
	}

	async registerMultipleModels(modelList) {
		for (const model of modelList) {
			await this.registerModel(model.getTableName(), model);
		}
	}

	async getModelData(model_name) {
		const model = await AdminRegisteredModels.findOne({
			where: { model_name },
		});
		let attributesData = this.models[model?.model_name].rawAttributes;
		attributesData = Object.values(attributesData).map((attr) => ({
			...attr,
			type: attr.type.key,
		}));
		return attributesData;
	}
}

const admin = new Admin();

module.exports = admin;
