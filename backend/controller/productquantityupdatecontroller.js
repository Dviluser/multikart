const promodel=require("../model/Product")
const ProductQuantity=async(req,res)=>{
    try{
         const id=req.params.id
     const  ProductQuantity=req.body.Quantity
    
   
    const result=await promodel.updateOne({_id:id},{ProductQuantity:ProductQuantity},{new:true})
  if(result){
    res.send({statuscode:1,mssg:"data store successfully"})
   }else{
       res.send({statuscode:0,mssg:"data not successfully"})
   }
    }catch(err){
        console.log(err)
    }
}
module.exports={ProductQuantity}