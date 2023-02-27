const express=require("express")
const router=express.Router()
const mongoose=require("mongoose")
const bcrypt=require("bcrypt")

const UserModel=require("../../Models/UserModels")
const VerifyAuth=require("../../Controllers/Middleware/Verify")
const UserVerify=require("../Middleware/Userid")

router.post("/register",async(req,res)=>{
    try {
        const salt=await bcrypt.genSalt(10)
        const hash=await bcrypt.hash(req.body.password,salt)
        req.body.password=hash
        const newUser=new UserModel({
            name:req.body.name,
            email:req.body.email,
            password:req.body.password,
            mobile:req.body.mobile,
            city:req.body.city
        })
    
        await newUser.save()
        res.status(200).json({message:"created"})
    } catch (error) {
        console.log(error)
        res.status(500).json({message:"something went wrong"})
    }
})



router.get("/users",VerifyAuth,UserVerify,async(req,res)=>{
    try {
        const users=await UserModel.find({role:"user"})
        if(users){
            res.status(200).json(users)
        }else{
            res.status(200).json({message:"no data found"})
        }
    } catch (error) {
        console.log(error)
        res.status(500).json({message:"something went wrong"})
    }
})


router.get("/user/:id",VerifyAuth,UserVerify,async(req,res)=>{
    try {
        const users=await UserModel.findOne({_id:req.params.id})
        if(users){
            res.status(200).json(users)
        }else{
            res.status(200).json({message:"no data found"})
        }
    } catch (error) {
        console.log(error)
        res.status(500).json({message:"something went wrong"})
    }
})



module.exports=router