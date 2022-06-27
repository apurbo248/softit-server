const express = require("express");
const router = express.Router();
const verify = require("../auth/verifyToken");

const CategoryController = require("../Controllers/Category");

//For Registration
router.post("/category/register", verify, CategoryController.register);
router.get("/category/:id", verify, CategoryController.getSingleCategory);
router.get("/categorys", verify, CategoryController.getAllCategory);
router.put("/update_category_info/:id", verify, CategoryController.update);
router.delete("/delete_category/:id", verify, CategoryController.delete);


module.exports = router;
