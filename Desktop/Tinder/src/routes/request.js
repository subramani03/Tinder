const express = require("express");
const { UserAuth } = require("../middleware/auth");
const UserModel = require("../models/user");
const connectionRequestModel = require("../models/connectionRequest");

let requestRouter = express.Router();

//POST SendConnectionRequest method
requestRouter.post(
  "/request/send/:status/:toId",
  UserAuth,
  async (req, res) => {
    // userAuth is middleware
    try {
      const fromUserId = req.user._id;
      const toUserId = req.params.toId;
      const status = req.params.status;

      // checking to user exist
      const isUserIdExist = await UserModel.findById({ _id: toUserId });
      if (!isUserIdExist) {
        throw new Error("user not found");
      }

      // checking status type
      const checkStatusType = ["interested", "ignored"].includes(status);
      if (!checkStatusType) {
        throw new Error("invalid status type");
      }

      // connection request send to same user id
      if (fromUserId.equals(toUserId)) {
        throw new Error("user cannot send request to themselves");
      }

      // checking request already exist in the database
      const isRequestExist = await connectionRequestModel.findOne({
        $or: [
          {
            fromUserId,
            toUserId,
          },
          {
            fromUserId: toUserId,
            toUserId: fromUserId,
          },
        ],
      });      
      if(isRequestExist){
        throw new Error("Request already exist");
        
      }
      const connectionRequest = new connectionRequestModel({
        fromUserId,
        toUserId,
        status,
      });
      await connectionRequest.save();
      res.send(
        req.user.firstName + " has send an " + status + " connection request"
      );
    } catch (err) {
      res.status(400).send("error:" + err.message);
    }
  }
);

//POST reviewConnectionRequest method
requestRouter.post(
  "/request/review/:status/:connectionId",
  UserAuth,
  async (req, res) => {
    // userAuth is middleware
    try {
      const loggedinUser = req.user._id;
      const connectionId = req.params.connectionId;
      const status = req.params.status;

      // checking to user exist
      const connectionRequest = await connectionRequestModel.findOne({ _id:connectionId,
        toUserId:loggedinUser,
        status:"interested"
       });
       console.log(connectionRequest);
      if (!connectionRequest) {
        throw new Error("no connection request found");
      }

      // checking status type
      const checkStatusType = ["accepted", "rejected"].includes(status);
      if (!checkStatusType) {
        throw new Error("invalid status type");
      }
      connectionRequest.status=status;
      const data=await connectionRequest.save();
      res.send(data);
    } catch (err) {
      res.status(400).send("error:" + err.message);
    }
  }
);
module.exports = {
  requestRouter,
};
