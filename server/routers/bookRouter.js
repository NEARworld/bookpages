const bookController = require("../controllers/bookController");
const bookRouter = require("express").Router();
const verifyRole = require("../middleware/verifyRole");

bookRouter.post("/create", verifyRole(["USER"]), bookController.createBook);
bookRouter.get("/info", bookController.getAllBooks);
bookRouter.get("/info/:id", bookController.getOneBook);

module.exports = bookRouter;