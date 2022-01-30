const Router = require("express");
const bcrypt = require("bcryptjs");
const User = require("../models/User");
const { check, validateResult } = require("express-validator");
const router = new Router();

router.post("/registration", async (req, res) => {
    try {
        const { email, password } = req.body;
        
        const alreadyExist = User.findOne({email});
        if (alreadyExist) return res.status(400).json({ message: `User with email ${email} already exist.` });

        const hashedPassword = await bcrypt.hash(password, 15);
        const user = new User({ email, password: hashedPassword });
        await user.save();
        return res.json({message: "User was created."});
    } catch (e) {
        console.log(e);
        res.send({ message: "Server error." });
    }
});