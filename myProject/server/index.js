const express = require("express");
const app = express();
const mongoose = require("mongoose");
const cors = require("cors");
const session = require("express-session");
const flash = require("connect-flash");
const userRoute = require("./routes").userRoute;
const orderRoute = require("./routes").orderRoute;

mongoose
  .connect("mongodb://localhost:27017/myProjectDB")
  .then(() => {
    console.log("連結到myProjectDB");
  })
  .catch((e) => {
    console.log(e);
  });

// Session middleware
app.use(
  session({
    secret: "your_secret_key",
    resave: false,
    saveUninitialized: true,
  })
);

app.use(flash());

//middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

app.use("/user", userRoute);
app.use("/order", orderRoute);

app.listen(8080, () => {
  console.log("8080...");
});
