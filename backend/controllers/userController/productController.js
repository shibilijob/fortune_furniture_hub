import Product from "../../model/productModel.js"


const getAllCategories = async(req,res)=>{
    const categories = await Product.distinct('category')

    res.status(200).json({message:'fetching succsuss',categories})
}

const getProductsBycategory = async(req,res)=>{
    try {
        const {category} = req.query;
        const products = await Product.find({category:category.toLowerCase()})
        res.status(200).json({
            success: true,
            count: products.length,
            products
            });
    } catch (error) {
        res.status(500).json({error:error.message})
    }
}

const getProductDetails = async(req,res)=>{
    try {
        const {productId} = req.params;
        const product = await Product.findById(productId)
        if(!product){
            return res.status(404).json({message:'product not found'})
        }
        res.status(200).json({message:'success',product})
    } catch (error) {
        res.status(500).json({error:error.message})
    }
}

export {getAllCategories,getProductsBycategory,getProductDetails};