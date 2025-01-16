// const bcrypt=require('bcrypt');
// const UserModel = require("../models/user");

// const validateSignUpData =async (req)=>{
//    try{
//         const {firstName,lastName,password,email,age,gender}=req.body;
      
//     }
//     catch(err){
//         res.status(404).send(err.message);
//     }
// }

// module.exports={
//     validateSignUpData,
// }

// const data={
//     firstName: 'surya',
//     lastName: 'deva',
//     age: 20,
//     password: 'Surya@123',
//     gender: 'male',
//     email: 'surya222@gmail.com'
// }
// const ALLOWED_UPDATES=["firstName","lastName","password","age","gender"]


// console.log(Object.keys(data).every((k)=> ALLOWED_UPDATES.includes(k)));