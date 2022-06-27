const express = require("express");
const router = express.Router();
const verify = require("../auth/verifyToken");

const UserController = require("../Controllers/Users");

//For Registration
router.post("/user/register", UserController.register);
router.post("/user/login", UserController.login);
router.get("/me", verify, UserController.getProfile);
router.get("/user/:id", verify, UserController.getSingleUser);

router.get("/users", verify, UserController.getAllUser);

router.put("/update_user_info/:id", verify, UserController.update);
router.delete("/delete_user/:id", verify, UserController.delete);

module.exports = router;
