import React, { createContext,useEffect,useState } from 'react'
import axios from 'axios';
import API from '../api/API';

export const dataContext=createContext()

function AppContext({children}) {
    const [cartItems, setCartItems] = useState([]);
    const [user,setUser]=useState(null)
    const [cartCount,setCartCount]=useState(0)
    const [searchText, setSearchText] = useState("");

    
  useEffect(() => {
    setCartCount(cartItems.length);
  }, [cartItems]);


  useEffect(()=>{
    const storedUser=localStorage.getItem("user")
    if(storedUser){
      setUser(JSON.parse(storedUser))
    }
  },[])
  // Sync localStorage whenever user changes
  useEffect(() => {
    if (user) {
      localStorage.setItem("user", JSON.stringify(user));
    } else {
      localStorage.removeItem("user");
    }
  }, [user]);

  // Load cart when user logs in
    useEffect(() => {
    if (user) {
      fetchCart();
    }
  }, [user]);

  async function fetchCart() {
    try {
      const res = await API.get("/getCart");
      setCartItems(res.data.cart);
    } catch (error) {
      console.log(error.response?.data || error.message);
    }
  }

  // Add an item to the cart
  async function addToCart(product) {
  try {
    await API.post("/addToCart", {
      productId: product._id,
      quantity: 1,
    });

    fetchCart();
  } catch (error) {
    console.log(error.response?.data || error.message);
  }
  }

  // remove product from cart
  async function removeFromCart(productId) {
  try {
    await API.delete(`/removeFromCart/${productId}`);
    fetchCart();
  } catch (error) {
    console.log(error.response?.data || error.message);
  }
  }

  // Update item quantity (+/-)
  async function updateQuantity(productId, action) {
  try {
    await API.put(`/updateQty/${productId}`, {
      action,
    });

    fetchCart();
  } catch (error) {
    console.log(error.response?.data || error.message);
  }
  }

  // Calculate subtotal
  const subTotal = cartItems.reduce(
  (acc, item) =>
    acc + (item.productId?.price || 0) * item.quantity,
  0
  );
  

  // update cart count
  function handleCartCounter(){
    setCartCount(cartCount+1)
  }

    
  return (
    
        <dataContext.Provider
        value={{
            cartItems,
            setCartItems,
            addToCart, 
            removeFromCart,
            subTotal,
            updateQuantity,
            fetchCart,
            user,
            setUser,
            cartCount,
            setCartCount,
            handleCartCounter,
            searchText,
            setSearchText}}
        >
            {children}
        </dataContext.Provider>
    
  )
}

export default AppContext