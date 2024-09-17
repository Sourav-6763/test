const express = require("express");
const router = express.Router();
const User = require("../models/user");
const bcrypt = require("bcrypt");

// !register route
//frontend theke backend a data sent korte gele post use korte hoy
router.post("/register", async (req, res) => {
  const { email, username, password } = req.body;

  try {
    // Check if the email already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(409).json({ message: "Email already exists" });
    }

    // Hash the password
    const saltRounds = 10; // Adjust as needed
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    let newUser = new User({ email, username, password: hashedPassword });

    await newUser.save();
    res.status(201).json({ message: "Signup successful" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "change username and email" });
  }
});

//!login

router.post("/signin", async (req, res) => {
  try {
    // Find the user by email
    const user = await User.findOne({ email: req.body.email });

    // Check if user exists
    if (!user) {
      return res.status(200).json({ message: "Please signup" });
    }

    // Check if the password is correct
    const isPasswordCorrect = bcrypt.compareSync(
      req.body.password,
      user.password
    );
    if (!isPasswordCorrect) {
      return res.status(200).json({ message: "Incorrect password" });
    }

    // Respond with user data and token
    const { password, ...others } = user._doc;
    res.status(200).json({ others });
  } catch (error) {
    res.status(200).json({ message: "Server error" });
  }
});

module.exports = router;
