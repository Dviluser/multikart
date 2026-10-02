const usermodel=require("../model/User")
const student1=async(req,res)=>{

try{
    const  Email=req.body.Email
    const  Password=req.body.Password
 const result=await usermodel.findOne({Email:Email})
 if(result){
   if(result.Password==Password){
      res.send({statuscode:1,mssg:"login successfully",data:result})
   }else{
      res.send({statuscode:0,mssg:"innvalid credentials"})
   }
 }else{
   res.send({statuscode:2,mssg:"registered your self first"})
 }
}catch(err){
   console.log(err)
}
}
module.exports={student1}
