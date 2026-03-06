import User from "../../model/User.js"

const getAllUsers = async(req,res)=>{
    try {
        const userList = await User.find().select("-password")
        if(userList.length == 0){
            return res.status(400).json({message:'not found users'})
        }
        res.status(200).json({message:'showing all users',userList})
        
    } catch (error) {
        res.status(500).json({error:error.message})
    }
}

const getSpecificUser = async(req,res)=>{
    try {
        console.log(req.params);
        
        const userId = req.params.userId
        if(!userId){
            return res.status(400).json({message:'not fount user id'})
        }
        const user = await User.findById(userId).select("-password")
        if(!user){
            return res.status(400).json({message:'user not fount'})
        }
        res.status(200).json({message:'success',user})
    } catch (error) {
        res.status(500).json({error:error.message})
    }
}
const updateUserStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    const user = await User.findById(id)
    if(!user){
        return res.status(404).json({message:'user not found'})
    }
    if(user.role == 'admin'){
        return res.status(400).json({message:'admin can not be blocked'})
    }
    const updatedUser = await User.findByIdAndUpdate(
      id,
      { status },
      { returnDocument:"after" }
    );

    res.status(200).json({ message: "User updated", updatedUser });

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export {getAllUsers,getSpecificUser,updateUserStatus}

