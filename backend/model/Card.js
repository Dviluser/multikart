const {Schema,model}=require("mongoose")

const userschema=Schema({
    ProductName:{
        type:String,
},
   ProductQuantity:{
    type:String,
   },
   ProductPrize:{
    type:String,
   },
   ProductDescription:{
    type:String,
   },
   File:{
    type:String,
   },
    Pid:{
        type:String,
    },
    Totalcost:{
        type:Number,
    },
    Email:{
        type:String,
    }

})
const card=model("carddata",userschema)
module.exports=card