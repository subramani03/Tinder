const express = require("express");
const { UserAuth } = require("../middleware/auth");
const userRouter = express.Router();
const connectionRequestModel = require("../models/connectionRequest");
const UserModel = require("../models/user");

userRouter.get("/user/request/received", UserAuth, async (req, res) => {
  try {
    const loggedinUser = req.user._id;
    const connectionRequest = await connectionRequestModel
      .find({
        toUserId: loggedinUser,
        status: "interested",
      })
      .populate("fromUserId", "firstName lastName age gender");
    if(connectionRequest.length === 0) {
        return res.send("feed not found");
    }
    res.send(connectionRequest);
  } catch (err) {
    res.status(400).send("error:" + err.message);
  }
});

userRouter.get("/user/connection", UserAuth, async (req, res) => {
  try {
    const loggedinUser = req.user._id;
    const connectionRequest = await connectionRequestModel
      .find({
        $or: [{ toUserId: loggedinUser }, { fromUserId: loggedinUser }],
        status: "accepted",
      })
      .populate("fromUserId", "firstName lastName age gender")
      .populate("toUserId", "firstName lastName age gender");

    // console.log(connectionRequest.map((row)=>{
    //     if(row.fromUserId._id.equals(loggedinUser)){
    //         return row.toUserId;
    //     }
    //     else{
    //         return row.fromUserId
    //     }
    // }));
    let connectionData = connectionRequest.map((row) => {
      return row.fromUserId._id.equals(loggedinUser)
        ? row.toUserId
        : row.fromUserId;
    });
    if (connectionData.length === 0) {
        return res.send("matches not found!");
    }
    res.send(connectionData);
  } catch (err) {
    res.status(400).send("error:" + err.message);
  }
});

userRouter.get("/feed", UserAuth, async (req, res) => {
  try {
    const loggedinUser = req.user._id;

    //pagination
    const page = req.query.page;
    const limit = req.query.limit;
    const skip = (page - 1) * limit;

    const connectionRequest = await connectionRequestModel.find({
      $or: [{ toUserId: loggedinUser }, { fromUserId: loggedinUser }],
    });

    const hideUsers = new Set();
    connectionRequest.forEach((user) => {
      hideUsers.add(user.fromUserId.toString());
      hideUsers.add(user.toUserId.toString());
    });

    const userFeed = await UserModel.find({
      $and: [
        { _id: { $ne: loggedinUser } },
        { _id: { $nin: Array.from(hideUsers) } },
      ],
    })
      .select(" firstName lastName age gender about")
      .skip(skip)
      .limit(limit);
    console.log();
    if (userFeed.length === 0) {
      return res.send("feed not found");
    }
    res.json({ feed: userFeed });
  } catch (err) {
    res.status(400).send("error:" + err.message);
  }
});

module.exports = { userRouter };
