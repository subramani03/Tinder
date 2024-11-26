const express = require("express");
const UserModel = require("../models/user");
const bcrypt = require("bcrypt");

const { UserAuth } = require("../middleware/auth");

const profileRouter = express.Router();

//GET profile view  method
profileRouter.get("/profile/view", UserAuth, async (req, res) => {
  // userAuth is middleware
  try {
    const user = req.user;
    res.send(user);
    console.log("user profile founded");
  } catch (err) {
    res.status(400).send("error:" + err.message);
  }
});

//GET profile edit method
profileRouter.patch("/profile/edit", UserAuth, async (req, res) => {
  // userAuth is middleware
  try {
    const user = req.user;
    const ALLOWED_UPDATES = [
      "firstName",
      "lastName",
      "age",
      "email",
      "gender",
      "about",
    ];
    const newData = req.body;
    const isUpdateAllowed = Object.keys(newData).every((k) =>
      ALLOWED_UPDATES.includes(k)
    );
    if (!isUpdateAllowed) {
      throw new Error("cannot edit profile");
    }
    console.log(user._id);
    let updatedUser = await UserModel.findByIdAndUpdate(user._id, newData, {
      runValidators: true,
    });
    console.log("user profile updated");
    res.send(updatedUser);
  } catch (err) {
    res.status(400).send("error:" + err.message);
  }
});

//GET profile edit password method
profileRouter.patch("/profile/editPassword", UserAuth, async (req, res) => {
  // userAuth is middleware
  try {
    const user = req.user;
    const { oldPassword, newPassword } = req.body;
    const isUpdateAllowed = await bcrypt.compare(oldPassword, user.password);
    if (isUpdateAllowed) {
      let passwordHash = await bcrypt.hash(newPassword, 10);
      let updatedUser = await UserModel.findByIdAndUpdate(
        user._id,
        { password: passwordHash },
        {
          runValidators: true,
        }
      );
      console.log("user's password updated");
      res.send(updatedUser);
    } else {
      throw new Error("invalid old password");
    }
  } catch (err) {
    res.status(400).send("error:" + err.message);
  }
});

module.exports = {
  profileRouter,
};
