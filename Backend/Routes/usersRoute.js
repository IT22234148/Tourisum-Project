const express = require("express");
const router = express.Router();
const User = require("../Model/user");

router.post("/register", async (req, res) => {
    try {
        const newUser = await User.create(req.body);
        res.status(201).send('User Registration Successful');
    } catch (error) {
        console.error(error);
        res.status(400).json({ error: 'Registration failed' });
    }
});

// Other routes if any...

module.exports = router;
