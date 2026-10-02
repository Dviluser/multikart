const promodel=require("../model/Product")
const pget=async(req,res)=>{
    const subid=req.params.pid
try{
   const result=await promodel.find({subid:subid})
   if(result){
    res.send({statuscode:1,mssg:"data  get sucessfully" ,data:result})
   }else{
    res.send({statuscode:0,mssg:"data not get sucessfully"})
   }

}catch(err){
    console.log(err)
}
}
module.exports={pget}