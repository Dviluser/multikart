const stumodel=require("../model/Never")
const addcat=async(req,res)=>{
try{
    const result=await stumodel.find()
    if(result){
        res.send({statuscode:1,data:result})
    }else{
               res.send({statuscode:0}) 
    }
}catch(err){
    console.log(err)
}
}
module.exports={addcat}