const express = require("express");
const app = express();
const cors = require("cors");

app.use(express.json());
app.use(cors());

const APPS = ["users", "guides", "admin"];

for (const appData of APPS) {
	if (typeof appData === "string") {
		const router = require(`../apps/${appData}/router.js`);
		app.use(router.getRouter());
	}
}

module.exports = {
	app,
	APPS,
};
