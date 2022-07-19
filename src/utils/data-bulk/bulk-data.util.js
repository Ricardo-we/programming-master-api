const bulkData = async (
	bulkCreateModels = [{ model: undefined, data: undefined }],
) => {
	for (const modelAndData of bulkCreateModels) {
		if (modelAndData.data) {
			await modelAndData.model?.bulkCreate(modelAndData.data);
		}
	}
};

module.exports = { bulkData };
