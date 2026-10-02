const {Schema,model}=require("mongoose")
const  userschema=Schema({
    Subcategory:{
        type:String,
    },
    File:{
        type:String,
    },
    catid:{
        type:String
    }
})
const Never2=model("stuuudata",userschema)
module.exports=Never2