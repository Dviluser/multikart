const stumodel=require("../model/Never")
const catup=async(req,res)=>{
    try{
        const  Category=req.body.Category
        const id=req.params.catid
        let File;
      if(!req.file){
         File=req.body.oldpic
      }else{
       File=req.file.filename
      }
   
        const result=await stumodel.updateOne({_id:id},{Category,File},{new:true})
        if(result){
            res.send({statuscode:1,mssg:"data store successfilly"})
        }else{
            res.send({statuscode:0,mssg:"data  not store successfilly"})
        }
    }catch(err){
        console.log(err)
    }
}
module.exports={catup}