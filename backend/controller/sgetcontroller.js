const Never2=require("../model/Never2")
const  sget=async(req,res)=>{
     const sub=req.params.catid
    try{
       
       const result=await Never2.find({catid:sub})
       
       if(result){
     
        res.send({statuscode:1,data:result})
       }else{
        res.send({statuscode:0})
       }
    }catch(err){
        console.log(err)
    }
}
module.exports={sget}