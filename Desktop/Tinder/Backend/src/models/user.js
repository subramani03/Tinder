const { Mongoose, default: mongoose } = require("mongoose");
const validator = require("validator");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");


const userSchema = mongoose.Schema(
  {
    firstName: {
      type: String,
      required: true,
      minLength: 4,
      maxLength: 50,
    },
    lastName: {
      type: String,
      required: true,
      minLength: 1,
      maxLength: 50,
    },
    email: {
      type: String,
      unique: true,
      required: true,
      minLength: 4,
      maxLength: 50,
      validate(value) {
        if (!validator.isEmail(value)) {
          throw new Error("Invalid email address");
        }
      },
    },
    age: {
      type: Number,
      min: 18,
      max: 100,
    },
    gender: {
      type: String,
      validate(value) {
        if (
          !["male", "female", "others", "Male", "Female", "Others"].includes(
            value
          )
        ) {
          throw new Error("please provide valid gender");
        }
      },
    },
    password: {
      type: String,
      required: true,
      validate(value) {
        if (!validator.isStrongPassword(value)) {
          throw new Error("please enter strong password");
        }
      },
    },

    about: {
      type: String,
      default: "This is default description about the user",
    },
  },
  { timestamps: true }
);

userSchema.methods.getJWT = async function () {
  const user=this;
  const token = await jwt.sign({ _id: user._id }, "mani@0301", {
    expiresIn: "7d",
  });
  return token;
};

userSchema.methods.validatePassword = async function (password) {
  const user=this;
  const passwordcomapre = await bcrypt.compare(password, user.password);
  return passwordcomapre;
};
const UserModel = mongoose.model("User", userSchema);

module.exports = UserModel;
