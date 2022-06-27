const Product = require("../models/Product");

const ProductController = {
  register: async (req, res, next) => {
    const { name, description, categoryId } = req.body;

    if (!name || !description || !categoryId) {
      return res.status(422).json({ msg: "Fill all field !" });
    }

    try {
      await Product.create({
        name,
        description,
        categoryId,
      });

      res
        .status(201)
        .json({ success: true, msg: "Product added successfully" });
    } catch (err) {
      console.log(err);
    }
  },

  //Update
  update: async (req, res) => {
    if (req.user.role === "admin") {
      try {
        const updateProduct = await Product.findByIdAndUpdate(
          req.params.id,
          {
            $set: req.body,
          },
          { new: true }
        );
        res.status(200).json({ success: true, updateProduct });
      } catch (err) {
        res.status(500).json(err);
      }
    } else {
      res.status(403).json({ msg: "You dont't have access..." });
    }
  },

  //delete
  delete: async (req, res) => {
    if (req.user.role === "admin") {
      try {
        const product = await Product.findById(req.params.id);
        if (!product) {
          return res.status(400).json("product not found...");
        }
        await product.remove();
        res.status(200).json({ success: true });
      } catch (err) {
        res.status(500).json(err);
      }
    } else {
      res.status(403).json("You dont't have access...");
    }
  },

  getAllProduct: async (req, res) => {
    if (req.user.role === "admin") {
      try {
        const product = await Product.find();

        res.status(201).json(product);
      } catch (err) {
        res.status(500).json(err);
      }
    } else {
      res.status(403).json("You can view only your account...");
    }
  },

  getSingleProduct: async (req, res) => {
    if (req.user.role === "admin") {
      try {
        const product = await Product.findById(req.params.id);

        res.status(201).json(product);
      } catch (err) {
        res.status(500).json(err);
      }
    } else {
      res.status(403).json("You dont't have access...");
    }
  },
};

module.exports = ProductController;
