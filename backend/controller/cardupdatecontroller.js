const card=require("../model/Card")
const cardupdate=async(req,res)=>{
    try{
         const id=req.params.id
     const  ProductQuantity=req.body.Quantity
     const Totalcost=req.body.total
    
   
    const result=await card.updateOne({_id:id},{ProductQuantity:ProductQuantity,Totalcost:Totalcost},{new:true})
  if(result){
    res.send({statuscode:1,mssg:"data store successfully"})
   }else{
       res.send({statuscode:0,mssg:"data not successfully"})
   }
    }catch(err){
        console.log(err)
    }
}
module.exports={cardupdate}