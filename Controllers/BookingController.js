const express=require("express")
const router=express.Router()
const mongoose=require("mongoose")

const BookingModel=require("../Models/BookingModel")
const AuthVerify=require("../Controllers/Middleware/Verify")
const UserVerify=require("../Controllers/Middleware/Userid")

router.post("/booking",AuthVerify,UserVerify,async(req,res)=>{
    try {
        const newBooking=new BookingModel({
            bookedby:req.UniqueId,
            name:req.body.name,
            email:req.body.email,
            contact:req.body.contact,
            type:req.body.type,
            model:req.body.model,
            issue:req.body.issue
            
        })
    
        await newBooking.save()
        res.status(200).json({message:"Booked"})
    } catch (error) {
        console.log(error)
        res.status(500).json({message:"something went wrong"})
    }
})


// router.post("/booking",AuthVerify,UserVerify,async(req,res)=>{
//     try {
//         const newBooking=new BookingModel({
//             bookedby:req.UniqueId,
//             book:{
//                 name:req.body.name,
//                 email:req.body.email,
//                 contact:req.body.contact,
//                 type:req.body.type,
//                 model:req.body.model,
//                 issue:req.body.issue
//             }
//         })
    
//         await newBooking.save()
//         res.status(200).json({message:"Booked"})
//     } catch (error) {
//         console.log(error)
//         res.status(500).json({message:"something went wrong"})
//     }
// })

router.get("/bookingdetails",AuthVerify,(req,res)=>{
    BookingModel.find({status:"Inprocess"}).populate("bookedby").then(result=>{
        if(result){
            res.status(200).json(result)
        }else{
            res.status(200).json({message:"no booking found"})
        }
    }).catch(err=>{
        console.log(err)
        res.status(500).json({message:"something went wrong"})
    })
})


router.get("/completedbookingdetails",AuthVerify,(req,res)=>{
    BookingModel.find({status:"Completed"}).then(result=>{
        if(result){
            res.status(200).json(result)
        }else{
            res.status(200).json({message:"no booking found"})
        }
    }).catch(err=>{
        console.log(err)
        res.status(500).json({message:"something went wrong"})
    })
})

router.get("/completed/:id",AuthVerify,(req,res)=>{
    BookingModel.findOne({_id:req.params.id}).then(result=>{
        if(result){
            res.status(200).json(result)
        }else{
            res.status(400).json({message:"no data found"})
        }
    }).catch(err=>{
        res.status(500).json({message:"Something went wrong"})
    })
})

router.get("/bookingdetail/:id",AuthVerify,(req,res)=>{
    BookingModel.findOne({_id:req.params.id}).then((result)=>{
        if(result){
            res.status(200).json(result)
        }else{
            res.status(200).json({message:"no booking found"})
        }
    }).catch(err=>{
        console.log(err)
        res.status(500).json({message:"something went wrong"})
    })
})

router.get("/userbooking",AuthVerify,UserVerify,async(req,res)=>{
    const id=req.UniqueId

    const UserBooking=await BookingModel.aggregate([
        {
          '$match': {
            'bookedby': id
          }
        }, {
          '$match': {
            'status': 'Inprocess'
          }
        }
      ]).then(result=>{
        if(result){
            res.status(200).json(result)
        }else{
            res.status(200).json({message:"no bookings found"})
        }
    }).catch(err=>{
        console.log(err)
        res.status(500).message({message:"something went wrong"})
    })
    
})

router.get("/userbookings",AuthVerify,UserVerify,async(req,res)=>{
    try {
        const id=req.UniqueId

        const UserBooking=await BookingModel.aggregate([
            {
              '$match': {
                'bookedby': id
              }
            }, {
              '$match': {
                'status': 'Completed'
              }
            }
          ])
        if(UserBooking){
            res.status(200).json(UserBooking)
        }else{
            res.status(200).status({message:"no data found"})
        }
    } catch (error) {
        console.log(error)
        res.status(500).json({message:"something went wrong"})
    }    
})


router.put("/completed/:id",AuthVerify,(req,res)=>{
    const bookingid= BookingModel.findOneAndUpdate({_id:req.params.id},{$set:req.body}).then(result=>{
        if(result){
            res.status(200).json({message:"updated"})
        }else{
            res.status(400).json({message:"no data found"})
        }
    }).catch(err=>{
        console.log(err)
        res.status(500).json({message:"something went wrong"})
    })
})


module.exports=router