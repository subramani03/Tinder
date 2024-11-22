const { Mongoose, default: mongoose } = require("mongoose");
const validator = require('validator');

const userSchema = mongoose.Schema({
  firstName: {
    type: String,
    required: true,
    minLength: 4,
    maxLength: 50,
  },
  lastName: {
    type: String,
    required: true,
    minLength: 4,
    maxLength: 50,
  },
  email: {
    type: String,
    unique: true,
    required: true, 
    minLength: 4,
    maxLength: 50,
    validate(value){
        if(!validator.isEmail(value)){
            throw new Error("Invalid email address"); 
        }
    }
  },
  age: {
    type: Number,
    min: 18,
    max: 100,
  },
  gender: {
    type: String,
    validate(value){
        if(!["male","female","others","Male","Female","Others"].includes(value)){
            throw new Error("please provide valid gender"); 
        }
    } 
  },
  password: {
    type: String,
    required: true, 
    validate(value){
        if(!validator.isStrongPassword(value)){
            throw new Error("please enter strong password"); 
        }
    } 
  },

  about: {
    type: String,
    default: "This is default description about the user",
  },
},{timestamps:true});


const UserModel = mongoose.model("User", userSchema);

module.exports = UserModel;
