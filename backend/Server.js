const  express=require("express")
const connectDB=require("./config/db")
const cors=require("cors")
const app=express()
const path = require("path")
app.use(cors())
app.use(express.json())
const router=require("./routes/userrouter")
const {serveUpload}=require("./middleware/upload")
const PORT = process.env.PORT || 5000

app.get("/",(req,res)=>{
    res.send({statuscode:1,mssg:"Multikart API is running"})
})
// on vercel every request can hit a fresh instance, so make sure the database is connected first
app.use(async(req,res,next)=>{
    try{
        await connectDB()
        next()
    }catch(err){
        console.log(err)
        res.status(500).send({statuscode:0,mssg:"database connection failed"})
    }
})
app.use("/api",router)
// new uploads are stored in mongodb, old ones are still served from the uploads folder
app.get("/uploads/:filename",serveUpload)
app.use("/uploads", express.static(path.join(__dirname, "uploads")))

// vercel imports this file as a serverless function, so only listen when run directly
if(require.main===module){
    app.listen(PORT,()=>{
        console.log(`Server is run on ${PORT} port`)
    })
}
module.exports=app
