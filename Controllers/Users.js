const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/Users");

const UserController = {
  register: async (req, res, next) => {
    const { name, email, password, confirmPassword } = req.body;

    if (!name || !email || !password || !confirmPassword) {
      return res.status(422).json({ msg: "Fill all field !" });
    }
    if (password !== confirmPassword) {
      return res.status(422).json({ msg: "Password does not matched !" });
    }

    try {
      const preUser = await User.findOne({ email });

      if (preUser) {
        res.status(422).json({ msg: "User already in present !" });
      }
      const hashPassword = await bcrypt.hash(password, 10);

      await User.create({
        name,
        email,
        password: hashPassword,
      });

      res.status(201).json({ success: true, msg: "Registration successful !" });
    } catch (err) {
      console.log(err);
    }
  },

  login: async (req, res, next) => {
    try {
      const { email, password } = req.body;

      if (!(email && password)) {
        return res.status(422).json({ msg: "Fill all field !" });
      }

      const user = await User.findOne({ email });
      if (user && (await bcrypt.compare(password, user.password))) {
        // Create token
        const token = jwt.sign(
          { id: user._id, email },
          process.env.ACCESS_TOKEN
        );

        return res
          .status(200)
          .json({ success: true, msg: "Login successful", token, user });
      }
      return res.status(422).json({ msg: "Invalid email/password !" });
    } catch (err) {
      console.log(err);
    }
  },

  //Update
  update: async (req, res) => {
    if (req.user.role === "admin") {
      if (req.body.password) {
        req.body.password = bcrypt.hashSync(req.body.password, 10);
      }
      try {
        const updateUser = await User.findByIdAndUpdate(
          req.params.id,
          {
            $set: req.body,
          },
          { new: true }
        );
        res.status(200).json({ success: true, updateUser });
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
        const user = await User.findById(req.params.id);
        if (!user) {
          return res.status(400).json("User not found...");
        }
        await user.remove();
        res.status(200).json({ success: true });
      } catch (err) {
        res.status(500).json(err);
      }
    } else {
      res.status(403).json("You dont't have access...");
    }
  },
  getProfile: async (req, res) => {
    try {
      const user = await User.findById(req.user.id).select("-password");

      res.status(201).json({ isAuthenticated: true, user });
    } catch (err) {
      res.status(500).json(err);
    }
  },
  //GET ALL USER
  getAllUser: async (req, res) => {
    if (req.user.role === "admin") {
      let query = {};
      if (req.query.keyword) {
        query.$or = [
          
          { name: { $regex: req.query.keyword, $options: "i " } },
          { phone: { $regex: req.query.keyword, $options: "i" } },
        ];
      }

      try {
        const users = await User.find(query);

        res.status(201).json(users);
      } catch (err) {
        res.status(500).json(err);
      }
    } else {
      res.status(403).json("You can view only your account...");
    }
  },
  //GET single user
  getSingleUser: async (req, res) => {
    if (req.user.role === "admin") {
      try {
        const user = await User.findById(req.params.id);

        res.status(201).json(user);
      } catch (err) {
        res.status(500).json(err);
      }
    } else {
      res.status(403).json("You dont't have access...");
    }
  },
};

module.exports = UserController;
