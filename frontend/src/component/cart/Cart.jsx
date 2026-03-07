import React, { useContext, useEffect } from 'react'
import { dataContext } from '../../context/AppContext'
import API from '../../api/API'

function Cart() {
    const {cartItems,removeFromCart,updateQuantity,subTotal,fetchCart}=useContext(dataContext)
  function generateOrderId() {
  return "ORD-" + Date.now();
}
  async function handlePlaceOrder() {
  try {

    const orderId = generateOrderId();

    const products = cartItems.map((item) => ({
      productId: item.productId._id,
      quantity: item.quantity
    }));

    await API.post("/user/createOrder", {
      products,
      orderId
    });

    swal("Thank you!", "Order placed", "success");

    fetchCart();

  } catch (error) {
    console.log(error.response?.data || error.message);
  }
}

 // If no items in cart
  if (cartItems.length === 0) {
    return (
      <div className="text-center py-20 text-gray-500">
        Your cart is empty 🛒
      </div>
    );
  }
  
  return (
    <div className='flex justify-center mt-4'>
        <div className="bg-gray-200 w-[85%] rounded-lg">
            <h3 className='text-center'>Your Cart</h3>
            <div className="flex px-4 ">
                <div className='w-[27%]  text-center'><p>item</p></div>
                <div className='w-[25%]  text-center'><p>Price</p></div>
                <div className='w-[25%]  text-center'><p>Quantity</p></div>
                <div className='w-[25%]  text-center'><p>Total</p></div>
            </div><hr className='' />
            <div>
                {cartItems.map((item)=>(
                  <div key={item._id}>
                    <div className='flex justify-around px-4'>
                    <div className='w-[27%]  text-center' ><img className='w-40 h-40 rounded-lg' src={item.productId?.image} alt="" /></div>
                    <div className='w-[25%]  flex items-center justify-center'><p>{item.productId?.price}</p></div>
                    {/* Quantity counter */}
                    <div className="w-[25%] flex justify-center items-center gap-2">
                      <button
                        onClick={() => updateQuantity(item.productId._id, "dec")}
                        className="bg-gray-300 hover:bg-gray-400 text-gray-800 px-2 py-1 rounded"
                      >
                        -
                      </button>
                      <span className="w-8 text-center font-semibold">
                        {item.quantity}
                      </span>
                      <button
                        onClick={() => updateQuantity(item.productId._id, "inc")}
                        className="bg-gray-300 hover:bg-gray-400 text-gray-800 px-1 py-1 rounded"
                      >
                        +
                      </button>
                    </div>
                    <div className='w-[25%]  text-center flex items-center justify-center'><p>{item.productId.price*item.quantity}</p></div>
                    <button 
                    className="ml-2 text-red-500 hover:text-red-700" 
                    onClick={()=>removeFromCart(item.productId._id)}>✖</button>

                  </div>
                  <hr />
                  </div>
                
                ))}
                
            </div>
            <div className='flex justify-end px-4 mb-5 '>
                <div className='w-[24%] '>
                    <p>Sub Total</p>
                    <h3 className='text-end'>{subTotal}</h3>
                    <div className='flex justify-end'>
                      <button 
                        onClick={handlePlaceOrder}
                        className="bg-green-500 hover:bg-green-600 text-white py-2 px-6 rounded-lg shadow-md transition-all duration-200">
                        Place Order
                        </button>
                      </div>
                </div>
                
            </div> 
        </div>
    </div>
  )
}

export default Cart