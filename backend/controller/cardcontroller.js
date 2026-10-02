const card=require("../model/Card")
const  cardd=async(req,res)=>{
    try{
     const  ProductName=req.body.ProductName
     const  ProductQuantity=req.body.ProductQuantity
     const  ProductPrize=req.body.ProductPrize
     const  ProductDescription=req.body.ProductDescription
     const  File=req.body.File
    const  Pid=req.body.Pid
    const Totalcost=req.body.Totalcost
    const Email=req.body.Email
     const user=await card({ProductName,ProductQuantity,ProductPrize,ProductDescription,File,Pid,Totalcost,Email})
   const result=await user.save();
   if(result){
    res.send({statuscode:1,mssg:"data store successfully"})
   }else{
       res.send({statuscode:0,mssg:"data not successfully"})
   }

    }catch(err){
        console.log(err)
    }
}
module.exports={cardd}
