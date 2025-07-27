const mongoose = require("mongoose");
const { Schema, model } = mongoose;

const companySchema = new Schema(
  {
    companyName: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      index: true,
    },
    companyLogo: {
      type: String,
      default: "https://i.pinimg.com/736x/ec/d9/c2/ecd9c2e8ed0dbbc96ac472a965e4afda.jpg",
    },
    companyWebsiteUrl: String, //optional
    companyDescription: {
      type: String,
      required: true,
      maxlength: 1000,
    },
    location: {
      type: String,
      required: true
    },
    recruiters: [
      {
        type: Schema.Types.ObjectId,
        ref: "users",
      },
    ],

    industry: {
      type: String,
      enum: [
        "Information Technology",
        "Healthcare",
        "Finance",
        "Education",
        "Retail",
        "Manufacturing",
        "Media",
        "Consulting",
        "Government",
        "Other",
      ],
      required: true,
    },

    hiringForRoles: {
      type: String,
      enum: [
        "Frontend Developer",
        "Backend Developer",
        "Fullstack Developer",
        "UI/UX Designer",
        "Digital Marketer",
        "Sales Executive",
        "HR Manager",
        "Accountant",
        "Customer Support",
        "DevOps Engineer",
        "QA Engineer",
        "Other",
      ],
      default: [],
    },
  },
  { timestamps: true }
);

const Company = model("companies", companySchema);
module.exports = Company;
