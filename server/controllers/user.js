const User = require('../models/users_model');
const { generateTokenAndSendCookie } = require("../libs/auth");

const handleUserSignup = async (req, res) => {
    try {
        const { fullName, email, password, role } = req.body;
        const isAlreadyUser = await User.findOne({ email });
        if (isAlreadyUser) return res.status(400).json({ message: "User Already there! Please Login." })

        const user = await User.create({ fullName, email, password, role });
        generateTokenAndSendCookie(user, res);
        res.status(201).json({ message: "User Signup Successfully", user });
    } catch (err) {
        res.status(500).json({ message: `Internal Server Error : ${err} ` })
    }
}

const handleUserNormalLogin = async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email });
        if (!user) return res.status(404).json({ message: "Email is Invalid!" });

        const isPwdCorrect = await user.comparePwd(password);
        if (!isPwdCorrect) return res.status(401).json({ message: "Password is Invalid!" });

        const { password: _, ...userWithoutPassword } = user.toObject();

        generateTokenAndSendCookie(user, res);
        res.status(200).json({ message: "User Login Successfully", user: userWithoutPassword });
    } catch (err) {
        console.log(err)
        res.status(500).json({ message: `Internal Server Error : ${err.message} ` })
    }
};

const handleGetCurrentUser = async (req, res) => {
    try {
        const user_id = req.user._id;
        const user = await User.findById({ _id: user_id }).select('-password')
        res.status(200).json({ message: "User is Authenticated", user });
    } catch (err) {
        res.status(500).json({ message: `Internal Server Error : ${err.message} ` })
    }
};

const handleLogoutUser = async (req, res) => {
    try {
        res.clearCookie('plrC__r92qv98', {
            httpOnly: true,
            secure: true,
            sameSite: "lax",
            maxAge: 7 * 24 * 60 * 60 * 1000
        })
        res.status(200).json({ message: "Logout Successfully!" });
    } catch (err) {
        res.status(500).json({ message: `Internal Server Error : ${err} ` })
    }
}


module.exports = {
    handleUserSignup,
    handleUserNormalLogin,
    handleGetCurrentUser,
    handleLogoutUser,

}