const Never2=require("../model/Never2")
const student2=async(req,res)=>{
    try{
     const  Subcategory=req.body.Subcategory
     const  File=req.file.filename
     const catid=req.body.catid
        
   const user=await Never2({Subcategory,File,catid})
   const result=await user.save();
   if(result){
    res.send({statuscode:1,mssg:"data store successfully"})
   }else{
       res.send({statuscode:0,mssg:"data not successfully"})
   }
    }catch(err){
        console.log(err)
    }
}
module.exports={student2}