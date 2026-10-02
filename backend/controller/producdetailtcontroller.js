const promodel=require("../model/Product")
const pdetail=async(req,res)=>{
    const pid=req.params.pid
try{
   const result=await promodel.findOne({_id:pid})
   if(result){
    res.send({statuscode:1,mssg:"data  get sucessfully" ,data:result})
   }else{
    res.send({statuscode:0,mssg:"data not get sucessfully"})
   }

}catch(err){
    console.log(err)
}
}
module.exports={pdetail}