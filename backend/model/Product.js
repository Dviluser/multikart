const {Schema,model}=require("mongoose")
const userschema=Schema({
    ProductName:{
        type:String,
    },
    ProductQuantity:{
        type:String
    },
    ProductPrize:{
        type:String
    },
    ProductDescription:{
        type:String
    },
    File:{
         type:String
    },
    Size:{
        type:String,
    },
    subid:{
        type:String,
    },
    Review:{
        type:String

    }
})
const promodel=model("product",userschema)
module.exports=promodel