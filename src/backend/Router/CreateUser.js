const express = require("express");
const router = express.Router();
const User = require("../models/User");
const { validationResult, body } = require("express-validator");
const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken")
const secretKey = "SisMeFromPrivacyPolicy@#%"

router.post(
    "/createuser",
    [
        body("name").isLength({ min: 3 }),
        body("email").isEmail(),
        body("password").isLength({ min: 7 })
    ],
    async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        const salt = await bcrypt.genSalt(10)
        let secPassword = await bcrypt.hash(req.body.password, salt)
        try {
            const newUser = await User.create({
                name: req.body.name,
                email: req.body.email,
                password: secPassword,
                location: req.body.location,
            });
            res.json({ success: true, user: newUser });
        } catch (error) {
            console.error(error);
            res.json({ success: false });
        }
    }
);
router.post(
    "/loginuser",
    [
        body("email").isEmail(),
        body("password").isLength({ min: 7 })
    ],
    async (req, res) => {
        let email = req.body.email;
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        try {
            const userData = await User.findOne({ email });
            if (!userData) {
                return res.status(400).json({ errors: "Please provide correct crendials" });
            }
            let pwdCompare = bcrypt.compare(req.body.password, userData.password)
            if (!pwdCompare) {
                return res.status(400).json({ errors: "Please provide correct crendials" });
            }
            const data = {
                user: {
                    id: userData.id
                }
            }
            const authToken = jwt.sign(data, secretKey)
            res.json({ success: true, authToken: authToken });
        } catch (error) {
            console.error(error);
            res.json({ success: false });
        }
    }
);


module.exports = router;
