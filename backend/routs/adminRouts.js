import express from "express";
import protect from "../middlewares/authUsers.js";
import isAdmin from "../middlewares/authAdmin.js";
import {getAllUsers,getSpecificUser, updateUserStatus } from "../controllers/admminController/adminUserController.js";
import {getProductDetails} from "../controllers/userController/productController.js";
import {createProduct, deleteProduct, getAllProducts, updateProduct, uploadImage } from "../controllers/admminController/adminProductController.js";
import getDashboardStatus from "../controllers/admminController/adminDashbord.js";
import {changeToDeliver, changeToShipp, getAllOrders} from "../controllers/admminController/adminOrderController.js";
import logoutUser from "../controllers/logout.js";
import upload from "../middlewares/imageUpload.js";


const router = express.Router()

router.get('/allUsers',protect,isAdmin,getAllUsers)
router.patch('/userStatus/:id',protect,isAdmin,updateUserStatus)
router.get('/specifcUser/:userId',protect,isAdmin,getSpecificUser)
router.get('/allProducts',protect,isAdmin,getAllProducts)
router.get('/productDetails/:productId',protect,isAdmin,getProductDetails)
router.post('/createProduct',protect,isAdmin,upload.single('image'),createProduct)
router.delete('/deleteProduct/:id',protect,isAdmin,deleteProduct)
router.put('/updateProduct/:id',protect,isAdmin,upload.single('image'),updateProduct)
router.post('/uploadImage',upload.single('image'),uploadImage)
router.get('/dashbordStatus',protect,isAdmin,getDashboardStatus)
router.get('/allOrders',protect,isAdmin,getAllOrders)
router.put('/changeToShip/:orderId',protect,isAdmin,changeToShipp)
router.put('/changeToDeliver/:orderId',protect,isAdmin,changeToDeliver)
router.post('/logout',logoutUser)


export default router