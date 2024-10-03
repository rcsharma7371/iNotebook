const express = require("express");
const { Schema } = require("mongoose");
const User = require("../models/UserSchema");
const { body, validationResult } = require("express-validator");
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const fetchUser = require('../MiddleWare/fetchUser')

const router = express();

// router.use(express.json);

//Create a user using POST "/api/auth/createuser" Creating first time No login required;
const JWT_SECRET = "msd_Thala_07";

router.post(
  "/createuser",[
  body("name", "Enter a valid name").isLength({ min: 5 }),
  body("email", "enter valid email").isEmail(),
  body("password", "password must be 5 char").isLength({ min: 5 })],
  async (req, res) => {


    //Check whether the user with this email exist already
    try {
      const errors = validationResult(req.body);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }
      //check user's email already registered or not
      let user = await User.findOne({ email: req.body.email });
      console.log("Registered User",user)
      if (user) {
        return res.status(400).send("User Already registered");
      }
      const salt =await bcrypt.genSalt(10);
      const secPass = await bcrypt.hash(req.body.password, salt);


      //Create a new user and save to db
      user = await User.create({
        name: req.body.name,
        email: req.body.email,
        password: secPass,
      });
      
      const data = {
        id: user.id
      }

      const authToken = jwt.sign(data,JWT_SECRET);
      console.log(authToken);


      res.send({authToken});
    } catch (error) {
      console.log(error);
      res.status(500).send("Unwanted error occured");
    }
  }
);


//Authenticate a user using correct credentials POST "/api/auth/login" No login Required;

router.post(
  "/login",[
  body("email", "Enter valid email").isEmail(),
  body("password", "Password cannot be empty").isLength({ min: 5 })],
  async (req, res) => {


    //Check whether the user with this email exist already
    try {
      const errors = validationResult(req.body);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }

      let {email,password} = req.body;

      //check user's email already registered or not
      let user = await User.findOne({ email});
      if (!user) {
        return res.status(400).send("Please try to login with correct credentials");
      }

      const checkPassword = await bcrypt.compare(password,user.password);
      if(!checkPassword){
        return res.status(400).json({error:"Please try to login with correct credentials"})
      }

      const data = {
        id: user.id
      }

      const authToken = jwt.sign(data,JWT_SECRET);
      console.log(authToken);


      res.send({authToken});
    } catch (error) {
      console.log(error);
      res.status(500).send("Internal Server Error");
    }
  }
);


// Get user Data POST "/api/auth/getuser" Login required;

router.post(
  "/getuser",fetchUser,
  async (req, res) => {
    try {
      const userId = req.user;
      console.log(userId)
      const user = await User.findById(userId).select("-password");
      res.send(user);


     } catch (error) {
        console.log(error);
        res.status(500).send("Internal Server Error");
      }
  }
);

module.exports = router;
