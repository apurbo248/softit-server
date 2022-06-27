const express = require("express");
const router = express.Router();
const verify = require("../auth/verifyToken");

const ProductController = require("../Controllers/Product");

//For Registration
router.post("/product/register", ProductController.register);
router.get("/product/:id", verify, ProductController.getSingleProduct);
router.get("/products", verify, ProductController.getAllProduct);
router.put("/res/:id", verify, ProductController.update);
router.delete("/delete_product/:id", verify, ProductController.delete);

module.exports = router;
