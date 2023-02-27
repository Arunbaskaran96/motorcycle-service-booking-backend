const mongoose=require("mongoose")

const TypeModel=mongoose.Schema({
    title:{
        type:String,
        required:true
    },
    img:{
        type:String,
        required:true
    },
    img2:{
        type:String,
        required:true 
    },
    des:{
        type:String,
        required:true
    },
    price:{
        type:String,
        required:true
    }
})

module.exports=mongoose.model("servicetype",TypeModel)