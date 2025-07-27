const { Schema, model, default: mongoose } = require('mongoose');
const bcrypt = require('bcrypt');

const userSchema = new Schema({
    fullName: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
        index: true // Makes login faster
    }
    ,
    password: {
        type: String,
        required: true,
        select: false
    },
    role: {
        type: String,
        enum: ["Seeker", "Recruiter", "CompanyOwner"],
        required: true
    },

    profilePic: String,
    phoneNo: String,
    location: String,

    resume: String,
    skills: [String], //optional
    portfolioLink: String,
    experience: String,

    company_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "companies"
    }

}, { timestamps: true });

// Convert the userPwd into Hashed Pwd
userSchema.pre('save', async function (next) {
    if (!this.isModified('password')) return next();
    this.password = await bcrypt.hash(this.password, 10);
    next();
});


// Compare the enteredPwd with Hashed Pwd
userSchema.methods.comparePwd = async function (enteredPwd) {
    return await bcrypt.compare(enteredPwd, this.password);
};


const User = model('users', userSchema);

module.exports = User;
