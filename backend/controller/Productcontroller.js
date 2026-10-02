const promodel=require("../model/Product")
const products=async(req,res)=>{
    try{
     const  ProductName=req.body.ProductName
     const  ProductQuantity=req.body.ProductQuantity
     const  ProductPrize=req.body.ProductPrize
     const  ProductDescription=req.body.ProductDescription
     const  File=req.file.filename
     const  Size=req.body.Size
     const subid=req.body.subid
     const Review=req.body.Review
     const Email=req.body.Email
   const user=await promodel({ProductName,ProductQuantity,ProductPrize,ProductDescription,File,Size,subid,Review,Email})
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
module.exports={products}