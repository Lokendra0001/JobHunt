const jwt = require('jsonwebtoken');

const secret = process.env.JWT_SECRET;

const generateTokenAndSendCookie = (user, res) => {
    const { _id, email, role } = user;
    const payload = {
        _id,
        email,
        role
    };

    const token = jwt.sign(payload, secret);
    res.cookie('plrC__r92qv98', token, {
        httpOnly: true,
        secure: true,
        sameSite: "lax",
        maxAge: 7 * 24 * 60 * 60 * 1000
    });
}

const getPayloadByToken = (token) => {
    return jwt.verify(token, secret);
}

module.exports = {
    generateTokenAndSendCookie,
    getPayloadByToken
}