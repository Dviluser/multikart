const Stripe=require("stripe")
const stripe=new Stripe(process.env.Secret_key)
module.exports=stripe
