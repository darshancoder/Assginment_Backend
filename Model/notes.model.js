const mongoose = require("mongoose")

const noteSchema = new mongoose.Schema({
    title:String,
    content:String,
    userID : String,
},{
    versionKey:false
})

const NoteModel = mongoose.model("note",noteSchema)
module.exports = {NoteModel}