const express = require("express");
const bodyParser = require("body-parser");
const multer = require("multer");
const app = express();
const cors = require("cors");
const path = require("path");

const staticDir = path.join(__dirname, "..", "public", "static");

app.use(express.json());
app.use(cors());
app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({ extended: true }));
app.use(multer({ dest: `${staticDir}/img` }).any());
app.use(express.static(staticDir));
app.set("views", path.join(__dirname, "../public", "templates"));

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
