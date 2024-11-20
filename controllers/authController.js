const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const User = require("../models/User");

const generateToken = (id) => jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: "1h" });

exports.registerUser = async (req, res, next) => {
  try {
    const { name, email, password } = req.body;
    const user = await User.create({ name, email, password });
    res.status(201).json({ id: user._id, name: user.name, email: user.email });
  } catch (err) {
    next(err);
  }
};

exports.loginUser = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user || !(await bcrypt.compare(password, user.password)))
      return res.status(401).json({ error: "Invalid credentials" });

    const token = generateToken(user._id);
    res.status(200).json({ token });
  } catch (err) {
    next(err);
  }
};
