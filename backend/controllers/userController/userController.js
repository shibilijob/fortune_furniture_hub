import User from "../../model/User.js"
import bcrypt from "bcrypt"
import generateToken from "../../util/genToken.js"

const registerUser = async(req,res)=>{
    try {
        const {username,email,password} = req.body
        if(!username || !email || !password){
            return res.status(400).json({message:'fill all fields'})
        }
        const existedUser = await User.findOne({email})
        if(existedUser){
            return res.status(400).json({message:'user already exist'})
        }

        const salt = await bcrypt.genSalt(10)
        const hashedPassword = await bcrypt.hash(password,salt)

        const newUser =await User.create({username,email,password:hashedPassword})

        generateToken(res,newUser._id)
        return res.status(201).json({newUser,message:'user created successfully'})
        
    } catch (error) {
        res.status(500).json({error:error.message})
    }
    
}

// login
const loginUser = async(req,res)=>{
    try {
        const {email,password} = req.body;
        const user = await User.findOne({email})
        if(!user){
            return res.status(401).json({message:'invalid email'})
        }
        const isMatch =await bcrypt.compare(password,user.password)
        if(!isMatch){
            return res.status(401).json({message:'invalid email or password'})
        }
        generateToken(res,user._id);
        const userData = {
      _id: user._id,
      name: user.username,
      email: user.email,
      role: user.role
    };
        res.status(200).json({
            message:'login successfull',
            userData
        })
        
    } catch (error) {
        res.status(500).json({error:error.message})
    }
}


export {registerUser,loginUser}