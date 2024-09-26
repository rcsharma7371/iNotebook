const express = require("express");
const router = express();
const fetchUser = require("../MiddleWare/fetchUser");
const Notes = require("../models/NotesSchema");
// const { Schema } = require("mongoose");
const jwt = require('jsonwebtoken');
const { body, validationResult } = require("express-validator");

//Get All the Notes using : GET '/api/notes/fetchallnotes'. Login required
router.get("/fetchallnotes", fetchUser, async (req, res) => {
  const notes = await Notes.find({ user: req.user.id });
  res.json(notes);
});

//: Add a new Note using :  POST '/api/notes/addnotes'. Login required

router.post(
  "/addnotes",
  fetchUser,
  [
    body("title", "Enter a valid Title").isLength({ min: 3 }),
    body("description", "Description must be 5 char").isLength({ min: 5 }),
  ],
  async (req, res) => {

     try{
     const {title,description,tag} = req.body;

     //If there is errors, return Bad request and the errors
    const errors = validationResult(req.body);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const notes = new Notes({
     title,description,tag,user:req.user.id
    });

    const saveNotes = await notes.save();

    res.json(saveNotes);
}catch(error){
     res.status(500).send("Internal Server Error")
}
  }
);
module.exports = router;
