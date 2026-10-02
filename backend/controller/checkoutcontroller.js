const checkmodel=require("../model/check")
const check=async(req,res)=>{

    try{
     const Address=req.body.Address
     const Pincode=req.body.Pin
     const Mobile=req.body.Mobile
     const Email=req.body.Email
    const Products=req.body.arr
     const response=await checkmodel({Address,Pincode,Mobile,Email,Products})
     const result= await response.save()
     if(result){
        res.send({statuscode:1})
     }else{
        res.send({statuscode:0})
     }
    }catch(err){
        console.log(err)
    }
}
module.exports={check}