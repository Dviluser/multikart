const usermodel = require("../model/User");
const register=async(req,res)=>{
try{
   const Firstname=req.body.Firstname
   const Lastname=req.body.Lastname
   const Email=req.body.Email
   const Password=req.body.Password
   const Role=req.body.Role
   const user=await usermodel({Firstname,Lastname,Email,Password,Role})
   const result=await user.save();
   if(result){
    res.send({statuscode:1,mssg:"data store successfully"})
   }else{
    res.send({statuscode:0,mssg:"data not store"})
   }
}catch(err){
   console.log(err)
}
}
module.exports={register}
