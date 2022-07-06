const userController = require("../controllers/userController");
const userRouter = require("express").Router();
const {check} = require("express-validator");

userRouter.post("/registration", [
    check("email", "Email is not correct").isEmail(),
    check("password", "Password can not be less than 5 and more than 10 characters").isLength({min: 6})
], userController.registration);
userRouter.post("/login", userController.login);
// userRouter.get("/users", userController.createRoles);

module.exports = userRouter;