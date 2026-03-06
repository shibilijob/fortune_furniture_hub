import Cart from "../../model/cartmodel.js";


const addToCart = async(req,res)=>{
    try {
        const userId = req.user._id;
        const {productId,quantity} = req.body;
        
        const cartItem = await Cart.findOne({userId,productId})

        if(cartItem){
            cartItem.quantity = quantity;
            await cartItem.save()

            return res.status(200).json({message:'quantity updated',cart:cartItem})
        }

        const newItem = await Cart.create({
            userId,
            productId,
            quantity
        })

        res.status(201).json({message:'item added to cart',cart:newItem})
        
    } catch (error) {
        res.status(500).json({error:error.message})
    }
}

const removeFromCart = async (req, res) => {
  try {
    const userId = req.user._id;
    const { productId } = req.params;

    await Cart.findOneAndDelete({ userId, productId });

    res.json({
      success: true,
      message: "Item removed from cart",
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

const getCart = async(req,res)=>{
    try {
        const userId = req.user._id
        const cartItems = await Cart.find({userId})
        .populate('productId')
        .sort({createdAt:-1})

        res.status(200).json({
        success: true,
        count: cartItems.length,
        cart: cartItems,
        });
    } catch (error) {
        res.status(500).json({error:error.message})
    }
}

const updateCartQty = async (req,res)=>{
    const userId = req.user._id
    const {productId} = req.params
    const {action} = req.body

    const cartItem = await Cart.findOne({userId,productId})
    if(!cartItem){
        return res.status(401).json({message:'cart not found'})
    }

    if(action === 'inc'){
        cartItem.quantity += 1;
    }else{
        cartItem.quantity -= 1
    }

    if(cartItem.quantity<=0){
        await cartItem.deleteOne()
        return res.status(400).json({message:'item deleted from cart'})
    }
    await cartItem.save()
    res.status(200).json({message:'cart quantity updated',cart:cartItem})

}

export {addToCart,removeFromCart,getCart, updateCartQty}