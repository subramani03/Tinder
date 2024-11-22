const { mongoose } = require("mongoose");
//tinder-server : fSCjC5bNcSfAwwkr

const connectDB = async() => {
  await mongoose.connect(
    "mongodb+srv://subramanimurugan420:fSCjC5bNcSfAwwkr@tinder.vclgx.mongodb.net/Tinder"
  );
};
module.exports=connectDB;