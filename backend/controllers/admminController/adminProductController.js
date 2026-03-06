import Product from "../../model/productModel.js"
import cloudinary from "../../config/cloudinary.js"

const getAllProducts = async(req,res)=>{
    try {
        const allProducts = await Product.find()
        
        res.status(200).json({success:true,allProducts})
    } catch (error) {
        res.status(500).json({error:error.message})
    }
}

const createProduct = async (req, res) => {
  try {
    const {name, description, price, category } = req.body;

    if (!name || !description || !price || !category) {
      return res.status(400).json({
        success: false,
        message: "All fields are required",
      });
    }

    if (!req.file) {
      return res.status(400).json({
        success: false,
        message: "Product image is required",
      });
    }

    const product = await Product.create({
      name,
      category,
      price,
      image: req.file.path,
      description
    });

    res.status(201).json({
      success: true,
      message: "Product created successfully",
      product,
    });
  } catch (error) {
    console.log("CREATE PRODUCT ERROR:", error);
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
}

const deleteProduct = async(req,res)=>{
    try {
        const productId = req.params.id;
        if(!productId){
            return res.status(400).json({message:'productId not found'})
        }
        const deletedProduct = await Product.findByIdAndDelete(productId)
        if(!deletedProduct){
            return res.status(400).json({message:'invalid product id'})
        }
        res.status(200).json({message:'product deleted successfully'})
    } catch (error) {
        res.status(500).json({error:error.message})
    }
}

const updateProduct = async (req, res) => {
  try {
    const productId = req.params.id;
    const updateData = {};

    if (req.body.name) {
      updateData.name = req.body.name;
    }

    if (req.body.description) {
      updateData.description = req.body.description;
    }

    if (req.body.price !== undefined) {
      updateData.price = req.body.price;
    }

    if (req.body.category) {
      updateData.category = req.body.category.toLowerCase();
    }

    if (req.file) {
      updateData.image = req.file.path;
    }

    if (Object.keys(updateData).length === 0) {
      return res.status(400).json({
        success: false,
        message: "No data provided for update",
      });
    }

    const product = await Product.findByIdAndUpdate(productId, updateData, {
      new: true,
      runValidators: true,
    });

    if (!product) {
      return res.status(404).json({
        success: false,
        message: "Product Not Found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Product updated successfully",
      product,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to update product",
      error: error.message,
    });
  }
};

const uploadImage = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: "No file uploaded" });
    }

    const result = await new Promise((resolve, reject) => {
      cloudinary.uploader.upload_stream(
        { folder: "products" },
        (error, result) => {
          if (error) reject(error);
          else resolve(result);
        }
      ).end(req.file.buffer);
    });

    res.status(200).json({
      success: true,
      imageUrl: result.secure_url,
      public_id: result.public_id,
    });

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export {createProduct,deleteProduct,updateProduct,getAllProducts,uploadImage}