const { authMiddleware } = require("../../utils/middleware/auth.middleware");
const routeModels = require("./models");
const GuidesController = require("./controller");
const ProgrammingLanguagesController = require("./controllers/programming-languages.controller");
const BaseRouter = require("flow-express/general/BaseRouter.js");
const TutorialsController = require("./controllers/tutorials.controller");

const middlewares = {
	get: authMiddleware,
	post: authMiddleware,
	put: authMiddleware,
	getOne: authMiddleware,
};

const programmingLanguagesController = new ProgrammingLanguagesController();
const guidesController = new GuidesController();
const tutorialsController = new TutorialsController();
const router = new BaseRouter(
	"/guides",
	":id",
	guidesController,
	middlewares,
	routeModels.GuidesModel.getAttributes(),
);

// GUIDES
router.router.get(
	"/guides/:id/tutorials",
	authMiddleware,
	guidesController.getGuideTutorials,
);
// PROGRAMMING-LANGUAGES
router.registerRoute(programmingLanguagesController, "/programming-languages", {
	params: ":id",
	routeFieldsTemplate: routeModels.ProgrammingLanguages.getAttributes(),
	middlewares,
});
// TUTORIALS
router.registerRoute(tutorialsController, "/tutorials", {
	params: ":id",
	routeFieldsTemplate: routeModels.Tutorials.getAttributes(),
	middlewares,
});
router.router.get(
	"/programming-languages/:id/guides",
	authMiddleware,
	programmingLanguagesController.getProgrammingLanguageGuides,
);

module.exports = router;
