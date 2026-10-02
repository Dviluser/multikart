const promodel=require("../model/Product")
const proupdate=async(req,res)=>{
    try{
     const ProductName=req.body.ProductName
     const  ProductQuantity=req.body.ProductQuantity
     const ProductPrize=req.body.ProductPrize
     const ProductDescription=req.body.ProductDescription
     const Size=req.body.Size
     const id=req.params.proid
     let File;
     if(!req.file){
        File=req.body.oldpic
     }else{
        File=req.file.filename
     }
     const result=await promodel.updateOne({_id:id},{ProductName:ProductName,ProductQuantity:ProductQuantity,ProductPrize:ProductPrize,ProductDescription:ProductDescription,Size:Size,File:File},{new:true})
     if(result){
        res.send({statuscode:1,mssg:"data has been updated"})
     }else{
         res.send({statuscode:0,mssg:"data has been not updated"})
     }

    }catch(err){
        console.log(err)
    }
}
module.exports={proupdate}