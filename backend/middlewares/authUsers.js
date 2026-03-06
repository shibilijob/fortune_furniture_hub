import jwt from "jsonwebtoken"
import User from "../model/User.js";

const protect =async (req,res,next)=>{
    try {
        const token = req.cookies.jwt
        if(!token){
            return res.status(401).json({message:'no token exist'})
        }
        const decodedToken = jwt.verify(token,process.env.JWT_SECRET)
        
        const user = await User.findById(decodedToken.id).select("-password")
        if(!user){
            return res.status(401).json({message:'user not found'})
        }
        req.user=user
        next()

    } catch (error) {
        res.status(401).json({error:error.message})
    }
}
export default protect;