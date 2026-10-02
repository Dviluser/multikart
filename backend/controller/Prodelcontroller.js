const promodel=require("../model/Product")
const prodel=async(req,res)=>{
    try{
       const id=req.params.id
            const result =await promodel.deleteOne({_id:id})
 if(result){
    res.send({statuscode:1,mssg:"data delete successfully"})
   }else{
       res.send({statuscode:0,mssg:"data not deleted"})
   }
    }catch(err){
        console.log(err)
    }
}
module.exports={prodel}