const express = require("express");
const { UserAuth } = require("../middleware/auth");
const ChatModel = require("../models/Chat");
const UserModel = require("../models/user");

const chatRouter = express.Router();

chatRouter.get("/chat/:targetuserId", UserAuth, async (req, res) => {
  const user  = req.user;
  const targetuserId = req?.params?.targetuserId;
  try {
    let chat = await ChatModel.findOne({
      participants: { $all: [user?._id, targetuserId] },
    }).populate({path:"messages.senderId",select:"firstName"});

    if (!chat) {
      chat = new ChatModel({
        participants: [user?._id, targetuserId],
        messages: [],
      });
    }

    let targetUser= await UserModel.findById(targetuserId);
    console.log(targetUser);


    await chat.save();
    res.send({chat:chat,targetUser:targetUser});
  } catch (err) {
    res.status(401).send({ error: err.message });
  }
});

module.exports = { chatRouter };
