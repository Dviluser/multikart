const {Schema,model}=require("mongoose")
const userschema=Schema({
    filename:{
        type:String,
        unique:true
    },
    contentType:{
        type:String,
    },
    data:{
        type:Buffer,
    }
})
const uploadmodel=model("upload",userschema)
module.exports=uploadmodel
