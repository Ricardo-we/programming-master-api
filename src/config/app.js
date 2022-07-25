const express = require("express");
const app = express();
const cors = require("cors");
const path = require("path");

app.use(express.json());
app.use(cors());
app.set("view engine", "ejs");
app.use(express.urlencoded());
app.use(express.static(path.join(__dirname, "..", "public", "static")));
app.set("views", path.join(__dirname, "../public", "templates"));
// app.set(express.static(path.join("../", "admin", "templates")));

const APPS = ["admin", "users", "guides", "db-helpers"];

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
