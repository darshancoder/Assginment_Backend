const express = require("express")

const {NoteModel}  = require("../Models/Note.model")

const notesRouter = express.Router()

notesRouter.get("/",async (req,res) => {
    const notes = await NoteModel.find()
    res.send(notes)
})

notesRouter.post("/create",async (req,res) =>{
    const payload = req.body
    try{
        const new_note = new NoteModel(payload)
        await new_note.save()
        res.send({msg:"Note Created Successfully"})

    }
    catch(e){
        console.log(e);
        res.send({"Err":"Something went Wrong"})
    }
})


notesRouter.patch("/update/noteID",async (req,res) => {
    const noteID = req.params.noteID
    const userID= req.body.userID
    const note = await NoteModel.findOne({_id:noteID})
    if(userID !== note.userID){
        res.send("Not authorised !!")
    }else{
        await NoteModel.findByIdAndUpdate({_id:noteID},payload)
        res.send({mSG:"Note updated Successfully"})

    }
})

notesRouter.delete("/delete/:noteID", async (req,res) => {
    const noteID= req.params.noteID
    const userID = req.body.userID
    const note = await NoteModel.findOne({_id:noteID})
    if(userID !== note.userID){
        res.send("Not authorisede")
    }else{
        await NoteModel.findByIdAndDelete({_id:noteID})
        res.send({MSG:"NOte deleted Successfully"})
    }
})


module.exports = {notesRouter}