const User = require('../models/users_model');
const { generateTokenAndSendCookie } = require("../libs/auth");

const handleUserSignup = async (req, res) => {
    try {
        const { fullName, email, password, role } = req.body;
        const user = await User.create({ fullName, email, password, role });
        generateTokenAndSendCookie(user, res);
        res.status(201).json({ message: "User Signup Successfully" });
    } catch (err) {
        res.status(500).json({ message: `Internal Server Error : ${err.message} ` })
    }
}

const handleUserNormalLogin = async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email });
        if (!user) return res.status(404).json({ message: "Email is Invalid!" });

        const isPwdCorrect = await user.comparePwd(password);
        if (!isPwdCorrect) return res.status(401).json({ message: "Password is Invalid!" });

        generateTokenAndSendCookie(user, res);
        res.status(200).json({ message: "User Login Successfully", user });
    } catch (err) {
        res.status(500).json({ message: `Internal Server Error : ${err.message} ` })
    }
};

module.exports = {
    handleUserSignup,
    handleUserNormalLogin,
}