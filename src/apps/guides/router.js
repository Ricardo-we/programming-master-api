const GuidesController = require("./controller");
const ProgrammingLanguagesController = require("./controllers/programming-languages.controller");
const BaseRouter = require("flow-express/general/BaseRouter.js");
const TutorialsController = require("./controllers/tutorials.controller");

const programmingLanguagesController = new ProgrammingLanguagesController();
const guidesController = new GuidesController();
const tutorialsController = new TutorialsController();
const router = new BaseRouter("/guides", ":id", guidesController);
// GUIDES
router.router.get("/guides/:id/tutorials", guidesController.getGuideTutorials);
// PROGRAMMING-LANGUAGES
router.registerRoute(programmingLanguagesController, "/programming-languages", {
	params: ":id",
});
// TUTORIALS
router.registerRoute(tutorialsController, "/tutorials", {
	params: ":id",
});
router.router.get(
	"/programming-languages/:id/guides",
	programmingLanguagesController.getProgrammingLanguageGuides,
);

module.exports = router;
