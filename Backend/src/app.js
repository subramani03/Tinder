const express = require("express");
const app = express();
const UserModel = require("./models/user");
const connectDB = require("./config/database");
const cookieParser = require("cookie-parser");
var cors = require('cors')
require('dotenv').config();
require("./utils/cronjobs");

//socket connection
const initiateSocket = require("./utils/socket");
const http = require('http');
const server = http.createServer(app);
initiateSocket(server);

app.use(
  cors({
    origin: "http://localhost:5173", // Make sure this matches the frontend origin exactly
    methods: ["GET", "POST", "PATCH", "DELETE", "PUT"], // Ensure PATCH is included
    allowedHeaders: ["Content-Type", "Authorization"], // Allow these headers
    credentials: true, // Allow cookies and credentials
  })
);
app.use(cookieParser());
app.use(express.json());


//routers
const {authRouter} = require('./routes/auth');
const {profileRouter} = require('./routes/profile');
const {requestRouter} = require('./routes/request');
const {userRouter} = require('./routes/user');
const {chatRouter} = require('./routes/chat');

app.use("/",authRouter);
app.use("/",profileRouter);
app.use("/",requestRouter);
app.use("/",userRouter);
app.use("/",chatRouter);


//for creating unique emails
UserModel.syncIndexes()
  .then(() => console.log("Indexes synced successfully"))
  .catch((err) => console.error("Error syncing indexes:", err));


//DATABASE function call
connectDB()
  .then(() => {
    console.log("database connected succesfully");
    server.listen(process.env.PORT, () => {
      console.log("listening to the port 3000");
    });
  })
  .catch((err) => {
    console.log("error:" + err.message);
  });


