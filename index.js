const express = require("express")
require('dotenv').config()
const {connect} = require('./Config/db')
const { authenticate } = require("./Middlewares/athuentication")

const {notesRouter} = require("./Routers/note.route")
const {usersRouter} = require("./Routers/user.router")
const cors = require("cors")

const app = express()

app.use(express.json())
app.use(cors())

app.use("/users",usersRouter)

app.get("/",(req,res) => {
    res.send("Welcome To Home Page")
    console.log("Welcome To Console");
})

app.use(authenticate)
app.use("/notes",notesRouter)


app.listen(process.env.PORT, async() => {
    try{
        await connect()
        console.log("Database is connected to successfully");
    }catch(e){
        console.log(e.message);
        console.log("Database is connected to failed");
        
    }
    console.log(`http://localhost:${process.env.PORT}`)
})