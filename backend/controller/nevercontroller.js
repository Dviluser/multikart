
const stumodel = require("../model/Never");
const student=async(req,res)=>{

try{
   const  Category=req.body.Category
    const File=req.file.filename
   const user=await stumodel({Category,File})
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
module.exports={student}
