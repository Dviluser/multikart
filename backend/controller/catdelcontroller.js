const stumodel=require("../model/Never")
const catdel=async(req,res)=>{
    try{
        const id=req.params.id
const result=await stumodel.deleteOne({_id:id})
if(result){
    res.send({statuscode:1})
}else{
    res.send({statuscode:0})
}
    }catch(err){
    console.log(err)
    }
}
module.exports={catdel}