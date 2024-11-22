let UserAuth = (req, res, next) => {
  console.log("user auth handler");
  next();
  // res.send("datas inseted into the data base");
};

let adminAuth = (req, res, next) => {
  console.log("admin auth handler");
  next();
  // res.send("datas inseted into the data base");
};
module.exports = { UserAuth, adminAuth };
