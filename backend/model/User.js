const {Schema,model}=require("mongoose")
const userschema=Schema({
    Firstname:{
        type:String,
    },
    Lastname:{
        type:String,
        
    },
    Email:{
        type:String,
    },
    Password:{
        type:String
    },
    Role:{
        type:String
    }

})
const usermodel=model("register",userschema)
module.exports=usermodel