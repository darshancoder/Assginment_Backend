const express = require("express")
const {UserModel} = require("../Models/Users.model")
const bcrypt = require('bcrypt')
const jwt = require("jsonwebtoken")
const usersRouter = express.Router()

usersRouter.get("/",async(req,res) =>{
    let data = await UserModel.find()
    console.log("data find successfullly")
    res.send(data)

})

usersRouter.post("/signup",async (req,res) => {
    const {email,password} = req.body
    const userPresent = await UserModel.findOne({email})

    if(userPresent?.email){
        res.send("Try loggin in, already exist")
    }else{
        try{
            bcrypt.hash(password, 4, async function(e,hash) {
                const user = await UserModel.insertMany({email,password:hash})
                // await user.save()
                res.send("Sign up Successfully")
            })
            
        }catch(e){
            console.log(e);
            res.send({"MSG":"Something went wrong"})
        }
    }
})

usersRouter.post("/login", async(req,res) => {
    const {email,password} = req.body
    const isPresent = await UserModel.findOne({email})
    if(isPresent){
        const id = isPresent._id
        const hash_password = isPresent.password
        bcrypt.compare(password,hash_password, function(e,result){
            if(result== true){
                const token = jwt.sign({userID:id},'hush')
                res.send({res:"login SUcess","Token":token})
            }
        })
             

      

    }else{
        res.send({"Err":"Login Failed !"})

    }
    
})



module.exports = {usersRouter}