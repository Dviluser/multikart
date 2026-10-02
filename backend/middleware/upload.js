const multer=require("multer")
const uploadmodel=require("../model/Upload")
// vercel has a read-only filesystem, so files are kept in memory and saved to mongodb instead of uploads/
const memory=multer({storage:multer.memoryStorage(),limits:{fileSize:4*1024*1024}})

const single=(field)=>{
    const parse=memory.single(field)
    return (req,res,next)=>{
        parse(req,res,async(err)=>{
            if(err){
                return res.send({statuscode:0,mssg:err.message})
            }
            if(!req.file){
                return next()
            }
            try{
                const filename=`${Date.now()}-${req.file.originalname}`
                await uploadmodel.create({filename,contentType:req.file.mimetype,data:req.file.buffer})
                req.file.filename=filename
                next()
            }catch(e){
                console.log(e)
                res.send({statuscode:0,mssg:"file not uploaded"})
            }
        })
    }
}

const serveUpload=async(req,res,next)=>{
    try{
        const file=await uploadmodel.findOne({filename:req.params.filename})
        if(!file){
            return next()
        }
        res.set("Content-Type",file.contentType)
        res.set("Cache-Control","public, max-age=31536000, immutable")
        res.send(file.data)
    }catch(err){
        console.log(err)
        next()
    }
}
module.exports={single,serveUpload}
