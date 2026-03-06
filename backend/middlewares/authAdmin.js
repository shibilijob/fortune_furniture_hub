import User from "../model/User.js";


const isAdmin = async(req,res,next)=>{
    try {
        const userId = req.user._id;
        const user = await User.findById(userId)
        if(!user){
            return res.status(400).json({message:'user not found'})
        }
        if(user.role =='admin'){
            next()
        }else{
            res.status(404).json({message:'access denied'})
        }
    } catch (error) {
        res.status(500).json({error:error.message})
    }
}
export default isAdmin;