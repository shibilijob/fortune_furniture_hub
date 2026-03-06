import Order from "../../model/OrderModel.js"

const getAllOrders = async(req,res)=>{
    try {
        const allOrders = await Order.find()
        .populate('userId','name email')
        res.status(200).json({success:true,allOrders})
    } catch (error) {
        res.status(500).json({error:error.message})
    }
}

const changeToShipp = async(req,res)=>{
    try {
        const {orderId} = req.params
        const {status} = req.body

        const updatedOrder = await Order.findOneAndUpdate(
            {orderId:orderId},
            {status:status},
            {new:true}
        )
 
        if(!updatedOrder){
            return res.status(404).json({message:'not found order'})
        }
        res.status(200).json({success:true,updatedOrder})

    } catch (error) {
        res.status(500).json({error:error.message})
    }
}

const changeToDeliver = async(req,res)=>{
    try {
        const {orderId} = req.params
        const {status} = req.body

        const updatedOrder = await Order.findOneAndUpdate(
            {orderId:orderId},
            {status:status},
            {returnDocument:'after'}
        )
 
        if(!updatedOrder){
            return res.status(404).json({message:'not found order'})
        }
        res.status(200).json({success:true,updatedOrder})

    } catch (error) {
        res.status(500).json({error:error.message})
    }
}
export {getAllOrders,changeToShipp,changeToDeliver}