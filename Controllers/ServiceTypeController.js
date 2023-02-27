const express=require("express")
const router=express.Router()

const ServiceType=require("../Models/ServiceTypeModel")
const AuthVerify=require("./Middleware/Verify")
const UserVerify=require("./Middleware/Userid")

router.post("/servicetype",AuthVerify,async(req,res)=>{
    try {
        const newService=new ServiceType({
            title:req.body.title,
            img:req.body.img,
            img2:req.body.img2,
            des:req.body.des,
            price:req.body.price
        })
        await newService.save()
        res.status(200).json({message:"created"})
    } catch (error) {
        console.log(error)
        res.status(500).json({message:"something went wrong"})
    }
})


router.get("/servicetypes",AuthVerify, async(req,res)=>{
    try {
        const types=await ServiceType.find()
        if(types){
            res.status(200).json(types)
        }else{
            res.status(200).json({message:"no Service Types found"})
        }
    } catch (error) {
        console.log(error)
        res.status(500).json({message:"something went wrong"})
    }
})

router.get("/servicetype/:id",AuthVerify, async(req,res)=>{
    try {
        const type=await ServiceType.findOne({_id:req.params.id})
        if(type){
            res.status(200).json(type)
        }else{
            res.status(200).json({message:"no type found"})
        }
    } catch (error) {
        console.log(error)
        res.status(500).json({message:"something went wrong"})
    }
})

module.exports=router