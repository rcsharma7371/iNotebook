const express = require("express");
const router = express();
const fetchUser = require("../MiddleWare/fetchUser");
const Notes = require("../models/NotesSchema");
// const { Schema } = require("mongoose");
const jwt = require("jsonwebtoken");
const { body, validationResult } = require("express-validator");

//Get All the Notes using : GET '/api/notes/fetchallnotes'. Login required
router.get("/fetchallnotes", fetchUser, async (req, res) => {
  console.log("Req user ",req.user)
  const notes = await Notes.find({ user: req.user });
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
    try {
      const { title, description, tag = "General" } = req.body;

      //If there is errors, return Bad request and the errors
      const errors = validationResult(req.body);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }
      // console.log(req)
      const notes = new Notes({
        title,
        description,
        tag,
        user: req.user
      });

      const saveNotes = await notes.save();

      res.json(saveNotes);
    } catch (error) {
      res.status(500).send("Internal Server Error");
    }
  }
);
//: Update an existign notes :  POST '/api/notes/updatenotes/'. Login required
router.put(
  "/updatenotes/:id",
  fetchUser,
  [body("description", "Description must be 5 char").isLength({ min: 5 })],
  async (req, res) => {
    try {
      const { id } = req.params;
      let { title, description, tag } = req.body;

      //If there is errors, return Bad request and the errors
      const errors = validationResult(req.body);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }

      //if title is null replace with existing title
      if (!title) {
        title = await Notes.findById(id).title;
      }
      if (!description) {
        description = await Notes.findById(id).description;
      }
      if (!tag) {
        tag = await Notes.findById(id).tag;
      }
      // console.log("User details",req);
      // If notes is not found send 404 response
      const note = await Notes.findById(id);

      if (!note) {
        return res.status(404).json({ error: "Notes not found" });
      }

      //If user trying to update another users notes return forbidden response
      if(note.user.toString() != req.user){
        return res.status(403).json({error : "Please update your own notes"});
      }
      const notes = await Notes.findByIdAndUpdate(
        id,
        { title, description, tag },
        { new: true }
      );
      console.log("Updated Notes : ",notes)

      res.json({
        message: "Notes Saved Successfully",
        title,
        description,
        tag,
      });
    } catch (error) {
      console.log(error);
      res
        .status(500)
        .send("Internal Server Error, Please try again after some time");
    }
  }
);


//: Delete an existign notes :  POST '/api/notes/deletenotes/:id'. Login required

router.delete("/deletenotes/:id", fetchUser, async (req, res) => {
  try {
    const { id } = req.params;

    //If there is errors, return Bad request and the errors
    const errors = validationResult(req.body);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    // If notes is not found or already deleted send 404 response
    const note = await Notes.findById(id);
    if (!note) {
      return res.status(404).json({ error: "Notes not found" });
    }
    //If user trying to delete another users notes return forbidden response
    if(note.user.toString() != req.user){
      return res.status(403).json({error : "Please update your own notes"});
    }
    const deletedNotes = await Notes.findByIdAndDelete(id);

    res.json({ message: "Notes Deleted", deletedNotes });
  } catch (error) {
    res
      .status(500)
      .send("Internal Server Error, Please try again after some time");
  }
});

module.exports = router;
