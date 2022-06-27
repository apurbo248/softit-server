const Category = require("../models/Category");

const CategoryController = {
  register: async (req, res, next) => {
    const { name, description } = req.body;

    if (!name || !description) {
      return res.status(422).json({ msg: "Fill all field !" });
    }

    try {
      await Category.create({
        name,
        description,
      });

      res
        .status(201)
        .json({ success: true, msg: "Category added successfully" });
    } catch (err) {
      console.log(err);
    }
  },

  //Update
  update: async (req, res) => {
    if (req.user.role === "admin") {
      try {
        const updateCategory = await Category.findByIdAndUpdate(
          req.params.id,
          {
            $set: req.body,
          },
          { new: true }
        );
        res.status(200).json({ success: true, updateCategory });
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
        const category = await Category.findById(req.params.id);
        if (!category) {
          return res.status(400).json("Category not found...");
        }
        await category.remove();
        res.status(200).json({ success: true });
      } catch (err) {
        res.status(500).json(err);
      }
    } else {
      res.status(403).json("You dont't have access...");
    }
  },

  getAllCategory: async (req, res) => {
    if (req.user.role === "admin") {
      try {
        const category = await Category.find();

        res.status(201).json(category);
      } catch (err) {
        res.status(500).json(err);
      }
    } else {
      res.status(403).json("You can view only your account...");
    }
  },

  getSingleCategory: async (req, res) => {
    if (req.user.role === "admin") {
      try {
        const category = await Category.findById(req.params.id);

        res.status(201).json(category);
      } catch (err) {
        res.status(500).json(err);
      }
    } else {
      res.status(403).json("You dont't have access...");
    }
  },
};

module.exports = CategoryController;
