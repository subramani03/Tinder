const jwt = require("jsonwebtoken");
const UserModel = require("../models/user");

let UserAuth = async (req, res, next) => {
  try {
    let cookie = req.cookies;
    let { token } = cookie;
    if (!token) {
      console.log(token)
      return res.status(401).send("please login");
    }
    const decodedMsg = await jwt.verify(token, "mani@0301");
    const { _id } = decodedMsg;
    const user = await UserModel.findOne({ _id });
    if (!user) {
      throw new Error("user not found");
    }
    req.user = user;
    next();
  } catch (err) {
    res.status(404).send("error:"+err.message);    
  }
};

module.exports = { UserAuth };
