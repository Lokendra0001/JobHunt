const { Schema, model } = require('mongoose');
const bcrypt = require('bcrypt');

const userSchema = new Schema({
    fullName: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    role: {
        type: String,
        enum: ["seeker", "recruiter"],
        required: true
    },

    profilePic: String,
    phoneNo: String,
    location: String,

    resume: String,
    skills: [String],
    portfolioLink: String,
    experience: String,

    companyName: String,
    companyLogo: String,
    companyDescription: String,
    companyWebsiteUrl: String

}, { timestamps: true });

// Convert the userPwd into Hashed Pwd
userSchema.pre('save', async function (next) {
    const userPwd = this.password;
    const hashedPwd = await bcrypt.hash(userPwd, 10);
    this.password = hashedPwd;
    next();
});

// Compare the enteredPwd with Hashed Pwd
userSchema.methods.comparePwd = async function (enteredPwd) {
    return await bcrypt.compare(enteredPwd, this.password);
};


const User = model('users', userSchema);

module.exports = User;
