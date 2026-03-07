import React,{useContext, useEffect, useState} from 'react'
import {useNavigate, useParams} from 'react-router-dom'
import { dataContext } from '../../context/AppContext';
import swal from 'sweetalert';
import API from '../../api/API';


function ProductDetailPage() {

  const [product,setProduct]=useState(null)
  const {id}=useParams()

  const {addToCart,user,handleCartCouter}=useContext(dataContext)
  const navigate=useNavigate()

  useEffect(()=>{
  API.get(`/user/productDetails/${id}`)
  .then((res)=>{
    setProduct(res.data.product)
  })
  .catch((err)=>{
    console.log(err)
  })
  },[id])



if(!product){
  return(
    <div className="text-center py-20 text-gray-500">
      Loading product...
    </div>
  )
}
  return (
    <div className="flex flex-col md:flex-row items-center justify-center min-h-screen bg-gray-100 p-6">
      <div className="bg-white rounded-lg shadow-lg p-6 flex flex-col md:flex-row max-w-4xl w-full">
        <img
          src={product.image}
          alt={product.name}
          className="w-72 h-72 object-cover rounded-md mx-auto md:mx-0"
        />

        <div className="md:ml-8 mt-6 md:mt-0 flex flex-col justify-between">
          <div>
            <h1 className="text-2xl font-semibold text-gray-800">{product.name}</h1>
            <p className="text-xl text-red-500 font-bold mt-2">₹ {product.price}</p>
            <p className="text-gray-600 mt-4">{product.description}</p>
          </div>

          <div className="mt-6 flex gap-4 space-x-4">
            <button
              onClick={()=>{
                addToCart(product);
                
                swal({
                  title:'Item added to cart',
                  text:'go to cart page to place order',
                  icon:'success'

                })
              }}
              className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded transition"
            >
              Add to Cart
            </button>

            <button
              onClick={()=>{
            if(user){
              addToCart(product)
              navigate('/CartPage')
            }else{
              navigate('/login')
            }
          }  
          }
              className="bg-green-600 hover:bg-green-700 text-white font-medium py-2 px-4 rounded transition"
            >
              Buy Now
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProductDetailPage