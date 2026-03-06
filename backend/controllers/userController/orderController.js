import Order from "../../model/OrderModel.js"
import Product from "../../model/productModel.js"
import Cart from "../../model/cartmodel.js"


const createOrder =async(req,res)=>{
    try {
        const userId = req.user._id
        const {products,orderId} = req.body

        if(!orderId){
            return res.status(400).json({message:'order id is required'})
        }
        if(!products || products.length <=0){
            return res.status(400).json({message: 'product not found'})
        }

        const existingOrder = await Order.findOne({orderId})
        if(existingOrder){
            return res.status(400).json({message:'order already exist'})
        }

        let totalPrice = 0;
        let totalItems = 0;
        let finalProducts =[];
        
        for (const item of products) {
            if (!item.productId || !item.quantity || item.quantity < 1) {
                return res.status(400).json({message: "Invalid product data"});
            }

            const product = await Product.findById(item.productId);

            if (!product) {
                return res.status(404).json({message: "Product not found"});
            }

            const orderPrice = product.price * item.quantity;

            totalPrice += orderPrice;
            totalItems += item.quantity;

            finalProducts.push({
                productId: product._id,
                quantity: item.quantity,
                price: product.price, 
            });
        }

        const order = await Order.create({
            userId,
            products: finalProducts,
            orderId,
            totalPrice,
            totalItems
        });

        // CLEAR CART
        await Cart.deleteMany({ userId });

        res.status(201).json({message: "Item Ordered successfully",order});

    } catch (error) {
        res.status(500).json({error:error.message})
    }
}

const getUserOrders = async(req,res)=>{
    try {
        const userId = req.user._id;
        const orders = await Order.find({userId})
        .populate('products.productId', 'name price image')
        .sort({createdAt:-1})

        if(orders.length === 0){
            return res.status(400).json({message:'no orders found'})
        }

        res.status(200).json({message:'this is orders',orders})

    } catch (error) {
        return res.status(500).json({error:error.message})
    }
}

export {createOrder,getUserOrders}