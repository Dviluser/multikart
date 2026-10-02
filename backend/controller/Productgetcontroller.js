const promodel=require("../model/Product")
const proget=async(req,res)=>{
   
    try{
     const result=await promodel.find()
    console.log(result)
 if(result){
    res.send({statuscode:1,mssg:"data store successfully",data:result})
   }else{
       res.send({statuscode:0,mssg:"data not successfully"})
   }
    }catch(err){
        console.log(err)
    }
}
module.exports={proget}