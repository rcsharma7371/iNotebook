const mongoose = require('mongoose');

const NotesSchema = new mongoose.Schema({
    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    title:{
        type: String,
    },
    description:{
        type: String,
    },
    tag:{
        type:String,
        default:"general"
    },
    date:{
        type:Date,
        default:Date.now
    }
});

module.exports = mongoose.model("Note",NotesSchema);