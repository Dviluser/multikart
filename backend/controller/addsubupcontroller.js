const stuuudata=require("../model/Never2")
const subup=async(req,res)=>{
   try{
    const  Subcategory=req.body. Subcategory
    const  id=req.params.catid
    let File;
    if(!req.file){
        File=req.body.oldpic
}else{
       File=req.file.filename 
    }
    const result=await stuuudata.updateOne({_id:id},{Subcategory:Subcategory,File:File},{new:true})
     if(result){
         res.send({statuscode:1,mssg:"data update successfully"})
     }else{
          res.send({statuscode:0,mssg:"data not store successfully"})
     }
    
   } catch(err){
    console.log(err)
   }
}
module.exports={subup}