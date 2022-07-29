const routeModels = require("./models");
const GuidesController = require("./controller");
const ProgrammingLanguagesController = require("./controllers/programming-languages.controller");
const BaseRouter = require("flow-express/general/BaseRouter.js");
const TutorialsController = require("./controllers/tutorials.controller");

const programmingLanguagesController = new ProgrammingLanguagesController();
const guidesController = new GuidesController();
const tutorialsController = new TutorialsController();
const router = new BaseRouter(
	"/guides",
	":id",
	guidesController,
	undefined,
	routeModels.GuidesModel.getAttributes(),
);

// GUIDES
router.router.get("/guides/:id/tutorials", guidesController.getGuideTutorials);
// PROGRAMMING-LANGUAGES
router.registerRoute(programmingLanguagesController, "/programming-languages", {
	params: ":id",
	routeFieldsTemplate: routeModels.ProgrammingLanguages.getAttributes(),
});
// TUTORIALS
router.registerRoute(tutorialsController, "/tutorials", {
	params: ":id",
	routeFieldsTemplate: routeModels.Tutorials.getAttributes(),
});
router.router.get(
	"/programming-languages/:id/guides",
	programmingLanguagesController.getProgrammingLanguageGuides,
);

module.exports = router;
