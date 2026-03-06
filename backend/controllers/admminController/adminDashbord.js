import Order from "../../model/OrderModel.js"
import Product from "../../model/productModel.js"
import User from "../../model/User.js"

const getDashboardStatus = async (req, res) => {
    try {
        const totalProducts = await Product.countDocuments();
        const totalOrdersQty = await Order.aggregate([
            {
                $group: {
                _id: null,
                totalQuantity: { $sum: "$totalItems" }
                }
            }
            ]);

        const totalOrders = totalOrdersQty.length > 0
        ? totalOrdersQty[0].totalQuantity
        : 0;
        
        const totalUsers = await User.countDocuments();

        const revenue = await Order.aggregate([
            { $match: { status: 'Delivered' } },
            {
                $group: {
                    _id: null,
                    total: { $sum: '$totalPrice' }
                }
            }
        ]);

        const totalSales = revenue.length > 0 ? revenue[0].total : 0;

        const totalIncome=(totalSales*50/100)
        const tax = totalSales*10/100;
        const totalProfit = (totalIncome-tax)

        res.status(200).json({
            success: true,
            totalProducts,
            totalOrders,
            totalUsers,
            totalSales,
            totalIncome,
            totalProfit
        });

    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}
export default getDashboardStatus;