const express = require("express");
require("dotenv").config();
const { UserRoutes } = require("./Routes/User.Route");

const { connection } = require("./config/db");

const app = express();

app.use(express.json());

app.get("/", (req, res) => {
  console.log("WElcome");
  res.send({ MSG: "Welcome" });
});

app.use("/users", UserRoutes);

app.listen(process.env.PORT, async () => {
  try {
    await connection;
    console.log("Connection to success to db");
  } catch (e) {
    console.log("Connection to DB failed");
    console.log(e);
  }
  console.log(`Listing on the ${process.env.PORT}`);
});
