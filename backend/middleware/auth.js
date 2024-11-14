import jwt from 'jsonwebtoken';

export const authMiddleware=async(req,res,next)=>{
    const {token}=req.headers;
    if(!token){
        return res.json({
            success:false,
            message:"not Authorized",
        })

    }

    try{
        const token_decode=jwt.verify(token,process.env.JWT_TOKEN)
        req.body.userId=token_decode.id;
        console.log("Decoded userId:", req.body.userId);
        next();

    }catch(error){
        console.log(error);
        return res.json({
            success:false,
            message:"Error in auth.js"
        })
    }

}