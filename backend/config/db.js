const mongoose = require('mongoose')
 const dotenv=require("dotenv")
dotenv.config()
// connection is cached so serverless invocations reuse it instead of reconnecting every request
let cached=global.mongooseConnection
if(!cached){
    cached=global.mongooseConnection={promise:null}
}
const ConnectDB=async()=>{
    if(mongoose.connection.readyState===1){
        return mongoose.connection
    }
    if(!cached.promise){
        cached.promise=mongoose.connect(process.env.MONGODB_URL).then((m)=>{
            console.log("database connect")
            return m.connection
        })
    }
    try{
        return await cached.promise
    }catch(err){
        cached.promise=null
        throw err
    }
}
module.exports=ConnectDB
