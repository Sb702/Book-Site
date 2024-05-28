const User = require("../models/UserModel");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

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
      return res.status.json({ error: "User not found" });
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
        return res.status(400).json({ error: "Invalid credentials" });
    }

    // if user is found and password is valid, create a token
    const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET);

    // return the information including token as JSON and the user

    // res.status(200).send(user);
    res.json({ token, user });
  }