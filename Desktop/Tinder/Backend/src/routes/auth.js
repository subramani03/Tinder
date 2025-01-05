const express = require("express");
const { UserAuth} = require("../middleware/auth");
const UserModel = require("../models/user");
const bcrypt = require("bcrypt");

const authRouter=express.Router();

 // POST signup method
 authRouter.post("/signup", async (req, res) => {
    try {
      const { firstName, lastName, password, email, } = req?.body;
      const passwordHash = await bcrypt.hash(password, 10);
      const user = new UserModel({
        firstName,
        lastName,
        password: passwordHash,
        email,
      });
      await user.save();
      const token = await user.getJWT(); 
      res.cookie("token", token, { expires: new Date(Date.now() +  7* 24 * 60 * 60 * 1000)});
      res.status(200).send(user);
    } catch (err) {
      res.status(400).send("error:" + err.message);
    }
  });
  
  // POST login method
authRouter.post("/login", async (req, res) => {
    try {
        console.log("login "+req.body)
      const { password, email } = req.body;
      const user = await UserModel.findOne({ email: email });
      if (!user) {
        throw new Error("user not found");
      }
      const passwordcomapre = await user.validatePassword(password);  //schema methods for validating password
      if (passwordcomapre) {
        const token = await user.getJWT();   // schema methods foe creating jwt token
        res.cookie("token", token, { expires: new Date(Date.now() +  7* 24 * 60 * 60 * 1000)});
        res.send(user);
      } else {
        throw new Error("user credencial wrong");
      }
    } catch (err) {
      res.status(404).send("error:" + err.message);
    }
  });
  
  // POST logout method
  authRouter.post("/logout", async (req, res) => {
    try {
        res.cookie("token",null, { expires: new Date(Date.now())});
        console.log("logouted")
        res.send("logouted succesfully"); 
    } catch (err){
      res.status(404).send("error:" + err.message);
    }
  });
  


module.exports={
    authRouter
}