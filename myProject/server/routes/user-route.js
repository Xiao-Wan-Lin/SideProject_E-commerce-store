const router = require("express").Router();
const User = require("../models/").user;
const jwt = require("jsonwebtoken");
const Joi = require("joi");

const regisetrValidation = (data) => {
  const schema = Joi.object({
    username: Joi.string().min(3).max(50).required(),
    email: Joi.string().min(6).max(50).required().email(),
    password: Joi.string().min(6).max(255).required(),
  });
  return schema.validate(data);
};

const loginValidation = (data) => {
  const schema = Joi.object({
    email: Joi.string().min(6).max(50).required().email(),
    password: Joi.string().min(6).max(255).required(),
  });
  return schema.validate(data);
};

router.post("/register", async (req, res) => {
  //確認註冊數據是否符合規範
  let { error } = regisetrValidation(req.body);
  if (error) return res.status(400).send(error.details[0].message);
  //確認信箱是否被註冊過
  const emailExist = await User.findOne({ email: req.body.email });
  if (emailExist) return res.status(400).send("此信箱已經被註冊過了");

  let { username, email, password } = req.body;
  let newUser = new User({ username, email, password });
  try {
    let saved_User = await newUser.save();
    return res.send({
      msg: "success saved user",
      saved_User,
    });
  } catch (e) {
    return res.status(500).send("伺服器錯誤，無法儲存使用者");
  }
});

router.post("/login", async (req, res) => {
  let { error } = loginValidation(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  const foundUser = await User.findOne({ email: req.body.email });
  if (!foundUser) {
    return res.status(401).send("無法找到使用者");
  }

  foundUser.comparePassword(req.body.password, (err, isMatch) => {
    if (err) {
      console.log(err);
      return res.status(500).send(err);
    }

    if (isMatch) {
      const playload = { _id: foundUser._id, email: foundUser.email };
      const token = jwt.sign(playload, "IMJWTSECRET");
      return res.send({
        message: "login success",
        token: "JWT " + token,
        user: foundUser,
      });
    } else {
      return res.status(401).send("帳號或密碼錯誤，請重新輸入");
    }
  });
});

module.exports = router;
