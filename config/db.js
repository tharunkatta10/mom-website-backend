const mongoose=require("mongoose")
const connectDb=async()=>{   
    try{
        const conn=await mongoose.connect(process.env.MONGDB_URL); //comes from .env file
        console.log(`mongodb connected at ${conn.connection.host}`)
    }
    catch(e)
    {
        console.log(`error in connecting mongodb ${e}`)
        process.exit(1)
    }
}

module.exports =connectDb   // exported to index.js