const {Schema,model}=require("mongoose")
const userschema=Schema({
    Email:{
        type:String,
    },
    Password:{
        type:String,
    }
})
const Never1=model("stuudata",userschema)
module.exports=Never1