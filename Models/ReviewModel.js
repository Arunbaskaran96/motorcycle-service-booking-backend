const mongoose=require("mongoose")

const ReviewModel=mongoose.Schema({
    reviewedby:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
        required:true,
    },
    review:{
        type:String,
        required:true
    },
    serviceid:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"booking",
        required:true,
    }
})

module.exports=mongoose.model("reviews",ReviewModel)