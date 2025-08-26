const jwt = require("jsonwebtoken")

async function verifyAdmin(req , res  , next){
    try{
        const token = req.headers.authorization.split(" ")[1]
        
        const decode = await jwt.decode(token , process.env.JWT_SECRET )
            req.adminId = decode._id 
            next()
              

    }catch(e){
        res.status(500).json({msg:"Internal server error" , error:e})
    }
    
}


module.exports = verifyAdmin