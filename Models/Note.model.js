const mongoose = require("mongoose")

const noteShcema = mongoose.Schema({
    title:String,
    note:String,
    category:[],
    userID:String,
},{
    versionKey:false
})

const NoteModel = mongoose.model("note",noteShcema)

module.exports = {NoteModel}