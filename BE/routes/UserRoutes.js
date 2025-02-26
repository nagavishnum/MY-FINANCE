const express = require('express');
const router = express.Router();
const User = require('../models/User');

// ✅ Register a new user
router.post('/register', async (req, res) => {
  try {
    console.log(req.body);
    const { username, email } = req.body;

    let userExists = await User.findOne({ email });
    if (userExists) return res.status(400).json({ message: "User already exists!" });

    const newUser = new User({ username, email });
    await newUser.save();

    res.status(201).json({ message: "User registered successfully!" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.get('/getByEmail/:email', async (req, res) => {
    try {
      const { email } = req.params;
      const user = await User.findOne({ email });
  
      if (!user) return res.status(404).json({ message: "User not found!" });
  
      res.status(200).json(user);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
});

router.get('/allUsers', async (req, res) => {
    try {
      const users = await User.find({});
      if (!users || users.length === 0) {
        return res.status(404).json({ message: "No users found!" });
      }
  
      res.status(200).json(users);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
});  

module.exports = router;
