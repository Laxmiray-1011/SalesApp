const express = require('express');
const router = express.Router();
const bcryptjs = require("bcryptjs");
const jwt = require("jsonwebtoken");
const mongoose = require("mongoose");
const UserModel = mongoose.model("UserModel");
const { JWT_SECRET } = require('../config/db');

router.post("/signup", async (req, res) => {
    const { firstName, lastName, email, password } = req.body;
    if (!firstName || !lastName || !password || !email) {
        return res.status(400).json({ error: "One or more mandatory fields are empty" });
    }

    try {
        const userInDB = await UserModel.findOne({ email: email });
        if (userInDB) {
            return res.status(500).json({ error: "User with this email already registered" });
        }

        const hashedPassword = await bcryptjs.hash(password, 16);
        const newUser = new UserModel({ firstName, lastName, email, password: hashedPassword });
        await newUser.save();
        res.status(201).json({ result: "User Signed up Successfully!" });
    } catch (err) {
        console.log(err);
        res.status(500).json({ error: "Internal Server Error" });
    }
});

router.post("/login", async (req, res) => {
    const { email, password } = req.body;
    if (!password || !email) {
        return res.status(400).json({ error: "One or more mandatory fields are empty" });
    }

    try {
        const userInDB = await UserModel.findOne({ email: email });
        if (!userInDB) {
            return res.status(401).json({ error: "Invalid Credentials" });
        }

        const didMatch = await bcryptjs.compare(password, userInDB.password);
        if (didMatch) {
            const jwtToken = jwt.sign({ _id: userInDB._id }, JWT_SECRET);
            const userInfo = { "_id": userInDB._id, "email": userInDB.email, "fullName": `${userInDB.firstName} ${userInDB.lastName}` };
            res.status(200).json({ result: { token: jwtToken, user: userInfo } });
        } else {
            return res.status(401).json({ error: "Invalid Credentials" });
        }
    } catch (err) {
        console.log(err);
        res.status(500).json({ error: "Internal Server Error" });
    }
});



module.exports = router;