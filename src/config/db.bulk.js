const dbHelperOptions = require("../utils/data-bulk/data/db-helper-options.json");
const dbHelpers = require("../utils/data-bulk/data/db-helpers.json");
const { bulkData } = require("../utils/data-bulk/bulk-data.util");
const { DbHelper, DbHelperOption } = require("../apps/db-helpers/models");

const modelsData = [
	{ model: DbHelper, data: dbHelpers },
	{ model: DbHelperOption, data: dbHelperOptions },
];

module.exports = (bulk = false) => {
	if (bulk) return bulkData(modelsData);
	else return false;
};
