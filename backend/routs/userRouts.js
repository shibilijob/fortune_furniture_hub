import express from "express";
import {registerUser,loginUser} from "../controllers/userController/userController.js"
import protect from "../middlewares/authUsers.js";
import { getAllCategories, getProductDetails, getProductsBycategory } from "../controllers/userController/productController.js";
import { addToCart, getCart, removeFromCart, updateCartQty } from "../controllers/userController/cartController.js";
import { createOrder, getUserOrders } from "../controllers/userController/orderController.js";
import { toggleWishlist, getWishlist } from "../controllers/userController/wishlistControllerTemp.js";
import logoutUser from "../controllers/logout.js";
import validateRequest from "../middlewares/validateRequest.js";
import { loginValidatorSchema, registerValidatorSchema } from "../validation/userValidation.js";

const router = express.Router()

router.post('/registerUser',validateRequest(registerValidatorSchema),registerUser)
router.post('/login',validateRequest(loginValidatorSchema),loginUser)
router.get('/categories',getAllCategories)
router.get('/productByCategories',getProductsBycategory)
router.get('/productDetails/:productId',getProductDetails)
router.post('/addToCart',protect,addToCart)
router.delete('/removeFromCart/:productId', protect, removeFromCart);
router.get('/getCart',protect,getCart)
router.put('/updateQty/:productId',protect,updateCartQty)
router.post('/createOrder',protect,createOrder)
router.get('/getOrders',protect,getUserOrders)
router.post('/toggleWishlist/:productId',protect,toggleWishlist)
router.get('/getWishlist',protect,getWishlist)
router.post('/logout',logoutUser)


export default router;