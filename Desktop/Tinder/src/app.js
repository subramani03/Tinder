const express = require("express");
const app = express();
const UserModel = require("./models/user");
const connectDB = require("./config/database");
const cookieParser = require("cookie-parser");

app.use(cookieParser());
app.use(express.json());


//routers
const {authRouter} = require('./routes/auth');
const {profileRouter} = require('./routes/profile');
const {requestRouter} = require('./routes/request');
const {userRouter} = require('./routes/user');

app.use("/",authRouter);
app.use("/",profileRouter);
app.use("/",requestRouter);
app.use("/",userRouter);


//for creating unique emails
UserModel.syncIndexes()
  .then(() => console.log("Indexes synced successfully"))
  .catch((err) => console.error("Error syncing indexes:", err));


//DATABASE function call
connectDB()
  .then(() => {
    console.log("database connected succesfully");
    app.listen(3000, () => {
      console.log("listening to the port 3000");
    });
  })
  .catch((err) => {
    console.log("error:" + err.message);
  });


