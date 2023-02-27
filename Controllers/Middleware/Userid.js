const Users=require("../../Models/UserModels")

module.exports=async(req,res,next)=>{
    if(req.Token.email){
        const user=await Users.findOne({email:req.Token.email})
        req.UniqueId=user._id

        next()
    }else{
        res.json({message:"User verify failed"})
    }
}