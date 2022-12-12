const express = require("express");
const { UserModel } = require("../Models/user.modle");

const UserRoutes = express.Router();

//Middleware Validtion
const CustomValidtor = (req,res,next) => {
  if(req.method === "POST"){
    if(req.body && req.body.Title &&  req.body.Note && req.body.Tags ){
      next()
    }else{
      res.send({"Error":"Please check your filed validation Failed !"})
    }
  }
}

//CREATE
UserRoutes.post("/createuser",CustomValidtor, async (req, res) => {
  try {
    const payload = req.body;
    console.log("payload:", payload);
    await UserModel.insertMany([payload]);
    res.send("Successfully add your post here");
  } catch (e) {
    console.log({ msg: "failed to Post \n" }, e.message);
    res.send({ msg: "Failed post your note" });
  }
});

// READ
UserRoutes.get("/notes", async (req, res) => {
  
  try {
    const { page = 1, limit = 2 } = req.query;
    const usersData = await UserModel.find()
      .limit(limit * 1)
      .skip((page - 1) * limit);
    res.send(usersData);
  } catch (e) {
    console.log({ msg: "failed to Post" }, e.message);
    res.send({ msg: "Failed post your note" });
  }
});

//Update
UserRoutes.patch("/update/:userID", async (req, res) => {
  const userID = req.params.userID;
  const payload = req.body;
  try {
    const userUpdate = await UserModel.findByIdAndUpdate(
      { _id: userID },
      payload
    );
    console.log(userUpdate);
    res.send("Update");
  } catch (e) {
    console.log({ msg: "failed to Post" }, e.message);
    res.send({ msg: "Failed post your note" });
  }
});

// delete
UserRoutes.delete("/delete/:userID", async (req, res) => {
  const { userID } = req.params;
  try {
    const userD = await UserModel.findByIdAndDelete({ _id: userID });
    res.send(`Sucessfully deleted User ${userID}`);
    console.log("Deleted");
  } catch (e) {
    console.log({ msg: "failed to Post " }, e.message);
    res.send({ msg: "Failed post your note" });
  }
});
module.exports = { UserRoutes };
