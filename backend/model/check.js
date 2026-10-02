const {Schema,model}=require("mongoose")
const userschema=Schema({
    Address:{
        type:String,
    },
    Pincode:{
        type:String,
    },
    Mobile:{
        type:String
    },

     Email:{
        type:String
     },
  Products:[
      {
      
ProductName: String,     
ProductQuantity: String,
      ProductPrize: String,
      ProductDescription: String,
      File:String
    }
  ],
  Status:{
    type:String,
    enum:["Processing","Shipped","Out for Delivery","Delivered","Cancelled"],
    default:"Processing"
  },
  Courier:{
    type:String
  },
  TrackingNumber:{
    type:String
  },
  CurrentLocation:{
    type:String
  },
  EstimatedDelivery:{
    type:Date
  },
  TimelineHistory:[
    {
      Status:String,
      Location:String,
      Note:String,
      Date:{type:Date,default:Date.now}
    }
  ]
},{timestamps:true})
const checkmodel=model("check",userschema)
module.exports=checkmodel