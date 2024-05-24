const User = require("../models/UserModel");
const bcrypt = require("bcryptjs");

exports.test = async (req, res) => {
    res.send("Test successful");
  }

exports.register = async (req, res) => {
    const { userName, email, password } = req.body;
  
    const user = new User({
      userName,
      email,
      password,
    });
  
    try {
      await user.save();
      res.send("User registered successfully");
    } catch (err) {
      res.send(err);
    }
  }
  
  exports.login = async (req, res) => {
    const { email, password } = req.body;

    const user = await User.findOne({ email });

    if (!user) {
      return res.send("User not found");
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.send("Incorrect password");
    }

    res.send("User logged in successfully");
  }