const express=require("express")
const router=express.Router()

const mongoose=require("mongoose")

const ReviewModel=require("../Models/ReviewModel")
const AuthVerify=require("./Middleware/Verify")
const UserVerify=require("./Middleware/Userid")


router.post("/review/:id",AuthVerify,UserVerify,async(req,res)=>{
    try {
        const id=req.UniqueId
        const newReview=new ReviewModel({
            reviewedby:id,
            serviceid:req.params.id,
            review:req.body.review
        })
    
        await newReview.save()
        res.status(200).json({message:"created"})
    } catch (error) {
        console.log(error)
        res.status(500).json({message:"something went wrong"})
    }
})


router.get("/reviews",(req,res)=>{
    ReviewModel.find().populate("serviceid").then(result=>{
        if(result){
            res.status(200).json(result)
        }else{
            res.status(200).json({message:"no data found"})
        }
    }).catch(err=>{
        console.log(err)
        res.status(500).json({message:"something went wrong"})
    })
})



router.get("/review/:id",AuthVerify,(req,res)=>{
    ReviewModel.findOne({id:req.params.id}).populate("serviceid").then(result=>{
        if(result){
            res.status(200).json(result)
        }else{
            res.status(200).json({message:"no data found"})
        }
    }).catch(err=>{
        console.log(err)
        res.status(500).json({message:"something went wrong"})
    })
})




module.exports=router