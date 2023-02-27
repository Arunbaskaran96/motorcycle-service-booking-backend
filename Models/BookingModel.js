const mongoose=require("mongoose")

// const BookModel=mongoose.Schema({
//     _id:mongoose.Schema.Types.ObjectId,
//     name:{
//         type:String,
//         required:true
//     },
//     email:{
//         type:String,
//         required:true
//     },
//     contact:{
//         type:Number,
//         required:true
//     },
//     model:{
//         type:String,
//         required:true
//     },
//     type:{
//         type:String,
//         required:true
//     },
//     issue:{
//         type:String,
//         required:true
//     },
//     createdat:{
//         type:Date,
//         default:Date.now
//     },
//     status:{
//         type:String,
//         default:"Inprocess"
//     },
//     amount:{
//         type:String,
//         default:""
//     },
//     servicedby:{
//         type:String,
//         default:""
//     },
// })

// const BookingModel=mongoose.Schema({
//     bookedby:{
//         type:mongoose.Schema.Types.ObjectId,
//         ref:"Users",
//         required:true
//     },
//     book:BookModel
// })


const BookModel=mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true
    },
    contact:{
        type:Number,
        required:true
    },
    model:{
        type:String,
        required:true
    },
    type:{
        type:String,
        required:true
    },
    issue:{
        type:String,
        required:true
    },
    createdat:{
        type:Date,
        default:Date.now
    },
    status:{
        type:String,
        default:"Inprocess"
    },
    amount:{
        type:String,
        default:""
    },
    servicedby:{
        type:String,
        default:""
    },
    bookedby:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Users",
        required:true
    }
})

// const BookingModel=mongoose.Schema({
//     bookedby:{
//         type:mongoose.Schema.Types.ObjectId,
//         ref:"Users",
//         required:true
//     },
//     book:BookModel
// })

module.exports=mongoose.model("booking",BookModel)