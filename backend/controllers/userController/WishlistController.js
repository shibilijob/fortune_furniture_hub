import Product from "../../model/productModel.js"
import Wishlist from "../../model/WishlistModel.js"

const toggleWishlist = async(req,res) =>{
    try {
       const userId = req.user._id
       const {productId} = req.params

       if(!productId){
        return res.status(400).json({message:'product id not found'})
       }
       const product = await Product.findById(productId)

       if(!product){
        return res.status(400).json({message:'product id is not valid'})
       }

       const item = await Wishlist.findOne({productId,userId})

       if(item){
        await Wishlist.deleteOne({ userId, productId })
        res.status(200).json({message:'product deleted from wishlist'})
       }else{
        await Wishlist.create({userId,productId})
        res.status(200).json({message:'product added to wishlist',product:product})
       }

    } catch (error) {
        res.status(500).json({error:error.message})
    }
}

const getWishlist = async(req,res)=>{
    try {
        const userId = req.user._id
        if(!userId){
            return res.status(400).json({message:'user not logined'})
        }

        const products = await Wishlist.find({userId})
        .populate('productId')
        .sort({'createdAt':-1});
        console.log(products);
        

        if(products.length === 0){
            return res.status(400).json({message:'no wishlist in this user'})
        }

        res.status(200).json({message:'showing wishlist',products})

    } catch (error) {
        res.status(500).json({error:error.message})
    }
}
export {toggleWishlist,getWishlist}