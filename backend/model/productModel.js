import mongoose from "mongoose";

const productSchema = new mongoose.Schema(
  {
    name: {type: String,required: true,trim: true},

    category: {type: String,required: true,lowercase: true,trim: true},

    price: {type: Number,required: true,min: 0},

    image: {type: String},

    description: {type: String,trim: true},

    isDeleted: {type: Boolean,default: false}

  },
  {
    timestamps: true,
  },
);


const Product = mongoose.model("Product", productSchema);
export default Product;