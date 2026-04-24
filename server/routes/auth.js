const express = require("express");
const router = express.Router();
const User = require("../models/user");

console.log("AUTH FILE RUNNING");

router.post("/signup", async (req, res) => {
  try {
    const user = new User(req.body);
    await user.save();
    res.json({ message: "User registered successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Login
router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email, password });

    if (!user) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    res.json({
      message: "Login successful",
      user: user
    });

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});
module.exports = router;