const express = require("express");
const { UserAuth, adminAuth } = require("./middleware/auth");
const app = express();
const UserModel = require("./models/user");
const connectDB = require("./config/database");
const { validateSignUpData } = require("./utils/validation");
const bcrypt = require("bcrypt");
const cookieParser = require("cookie-parser");
const jwt = require("jsonwebtoken");

app.use(cookieParser());
app.use(express.json());

//for creating unique emails
UserModel.syncIndexes()
  .then(() => console.log("Indexes synced successfully"))
  .catch((err) => console.error("Error syncing indexes:", err));

// Load data from the js object
// app.post("/signup", async (req, res) => {
//   const datas = {
//     firstName: "Mani",
//     lastName: "M",
//     age: 18,
//   };
//   const user = new UserModel(datas);
//   try {
//     await user.save();
//     console.log("dataaa loaded");
//     res.send("data inseted successfully");
//   } catch (err) {
//     res.status(400).send("error:"+err.message);
//   }
// });

// POST METHOD for login

app.post("/login", async (req, res) => {
  try {
    const { password, email } = req.body;
    const user = await UserModel.findOne({ email: email });
    if (!user) {
      throw new Error("user not found");
    }
    const passwordcomapre = await bcrypt.compare(password, user.password);
    if (passwordcomapre) {
      const token = await jwt.sign({ _id: user._id }, "mani@0301");
      res.cookie("token", token);
      res.send("login succesfully");
    } else {
      throw new Error("user credencial wrong");
    }
  } catch (err) {
    res.status(404).send("error:" + err.message);
  }
});

app.get("/profile", async (req, res) => {
  // const userId = req.body._id;
  // const userAge = req.body.age;
  try {
    const cookies = req.cookies;
    const { token } = cookies;
    const decodeMsg = await jwt.verify(token, "mani@0301");
    console.log(decodeMsg);
    const { _id } = decodeMsg;
    console.log(_id);
    if (_id) {
      const user = await UserModel.find({_id});
      console.log("user fetched");
      res.send(user);
    } else {
      throw new Error("user not found");
    }
  } catch (err) {
    res.status(400).send("error:" + err.message);
  }
});

// Load data from the js object
// app.post("/signup", async (req, res) => {
//   const datas = {
//     firstName: "Mani",
//     lastName: "M",
//     age: 18,
//   };
//   const user = new UserModel(datas);
//   try {
//     await user.save();
//     console.log("dataaa loaded");
//     res.send("data inseted successfully");
//   } catch (err) {
//     res.status(400).send("error:"+err.message);
//   }
// });

// POST METHOD
// get data from the user through postman

app.post("/signup", async (req, res) => {
  //   console.log(req.body);
  try {
    // validateSignUpData(req);
    // const user = new UserModel(req.body);
    const { firstName, lastName, password, email, age, gender } = req.body;
    const passwordHash = await bcrypt.hash(password, 10);
    const user = new UserModel({
      firstName,
      lastName,
      password: passwordHash,
      email,
      age,
      gender,
    });
    await user.save();
    res.send("data inseted successfully");
  } catch (err) {
    res.status(400).send("error:" + err.message);
  }
});

// GET METHOD
app.get("/feed", async (req, res) => {
  console.log(req.body);
  const userId = req.body._id;
  const userAge = req.body.age;
  try {
    let data = await UserModel.find({ _id: userId }); // get all the specific datas matches with the id
    // let data = await UserModel.find();                 //get all data
    //let data = await UserModel.findOne({age:userAge});     // get specific datas matches with the id
    //   let data = await UserModel.find({age:userAge});
    console.log("dataaa loaded from database");
    res.send(data);
  } catch (err) {
    res.status(400).send("error:" + err.message);
    F;
  }
});

// DELETE METHOD
app.delete("/feed", async (req, res) => {
  console.log(req.body);
  const userId = req.body._id;
  const userAge = req.body.age;
  try {
    let data = await UserModel.findByIdAndDelete(userId);
    console.log("dataaa deleted from database");
    res.send(data);
  } catch (err) {
    res.status(400).send("error:" + err.message);
  }
});

// PATCH METHOD
app.patch("/feed/:userId", async (req, res) => {
  console.log(req.body);
  const { firstName, lastName, password, email, age, gender } = req.body;
  const passwordHash = await bcrypt.hash(password, 10);
  const ALLOWED_UPDATES = [
    "firstName",
    "lastName",
    "password",
    "age",
    "gender",
  ];
  let isUpdateAllowed = Object.keys(req.body).every((k) =>
    ALLOWED_UPDATES.includes(k)
  );
  const userId = req.params.userId;
  const useremail = req.body.age;
  try {
    if (!isUpdateAllowed) {
      throw new Error("Update Not Allowed");
    }
    let data = await UserModel.findByIdAndUpdate(
      userId,
      {
        firstName,
        lastName,
        password: passwordHash,
        email,
        age,
        gender,
      },
      {
        runValidators: true,
      }
    );
    console.log("dataaa updated into database");
    res.send(data);
  } catch (err) {
    res.status(400).send("error:" + err.message);
  }
});

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

/*

app.post("/getUser/dataa", (req, res) => {
    console.log("dataaa readed");
    res.send("/getUser/dataa handeled");
  });  
app.use("/getUser", UserAuth, adminAuth);

app.post("/getUser/data", (req, res) => {
  console.log("dataaa readed");
  res.send("/getUser/data handeled");
});

app.post("/getUser/userdata", (req, res) =>{
  console.log("userdata readed");
  res.send("/getUser/userdata handeled");
});

app.use("/test", (req, res) => {
  console.log("use method readed");
  res.send("hello from test  server");
});

*/
