const express=require("express")
const router=express.Router()

const mongoose=require("mongoose")
const EmployerModel=require("../Models/EmployerModel")
const AuthVerify=require("../Controllers/Middleware/Verify")

router.post("/employer",AuthVerify,(req,res)=>{
    const newEmployer=new EmployerModel({
        name:req.body.name,
        email:req.body.email,
        qualification:req.body.qualification,
        mobile:req.body.mobile,
        city:req.body.city,
        role:req.body.role,
        salary:req.body.salary
    })
    newEmployer.save().then(result=>{
        if(result){
            res.status(200).json({message:"Created"})
        }else{
            res.status(400).json({message:"no data found"})
        }
    }).catch(err=>{
        console.log(err)
        res.status(500).json({message:"something went wrong"})
    })
})


router.get("/employers",AuthVerify,(req,res)=>{
    const employe=EmployerModel.find().then(result=>{
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


router.get("/employer/:id",AuthVerify,(req,res)=>{
    const employe=EmployerModel.findOne({_id:req.params.id}).then(result=>{
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

router.delete("/employer/:id",AuthVerify,(req,res)=>{
    const employe=EmployerModel.findOneAndDelete({_id:req.params.id}).then(result=>{
        if(result){
            res.status(200).json({message:"Deleted"})
        }else{
            res.status(200).json({message:"no data found"})
        }
    }).catch(err=>{
        console.log(err)
        res.status(500).json({message:"something went wrong"})
    })
})


router.put("/employer/:id",AuthVerify,(req,res)=>{
    const employe=EmployerModel.findOneAndUpdate({_id:req.params.id},{$set:req.body}).then(result=>{
        if(result){
            res.status(200).json({message:"Updated"})
        }else{
            res.status(200).json({message:"no data found"})
        }
    }).catch(err=>{
        console.log(err)
        res.status(500).json({message:"something went wrong"})
    })
})


module.exports=router