const mongoose = require("mongoose");

const connectionRequestSchema = mongoose.Schema(
  {
    fromUserId: {
      type: mongoose.Schema.ObjectId,
      required: true,
      ref:"User",
    },
    toUserId: {
      type: mongoose.Schema.ObjectId,
      required: true,
      ref:"User",
    },
    status: {
        type:String,
        required:true,
        enum:{
            values :["ignored","interested","accepted","rejected"],
            message: "{VALUE} is inccorect status type",
        }
    },
  },
  {
    timestamps: true,
  }
);

connectionRequestSchema.index({
    fromUserId:1,toUserId:1
})
const connectionRequestModel = mongoose.model("ConnectionRequest",connectionRequestSchema);
module.exports = connectionRequestModel;

