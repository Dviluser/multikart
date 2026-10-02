const card=require("../model/Card")
const cadget=async(req,res)=>{
    const Email=req.params.Email
    try{
      const  result=await card.find({Email:Email})
      console.log(result)
      if(result){
        res.send({statuscode:1,data:result})
      }else{
        res.send({statuscode:0})
      }
    }catch(err){
        console.log(err)
    }
     
}
module.exports={cadget}