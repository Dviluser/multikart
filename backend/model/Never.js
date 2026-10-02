const {Schema,model}=require("mongoose")
const userschema=Schema({
    Category:{
        type:String,
    },
     File:{
        type:String,
     }
})
const stumodel=model("studata",userschema)
module.exports=stumodel