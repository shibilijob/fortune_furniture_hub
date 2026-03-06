import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import API from "../../api/API";
import { dataContext } from "../../context/AppContext";

function Orders() {
  const { user } = useContext(dataContext);
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) return;

    API.get("/getOrders")
      .then((res) => {
      setOrders(res.data.orders);
    })
    .catch((err) => {
      console.log(err.response?.data || err.message);
    })
    .finally(() => setLoading(false));
  }, [user]);

  if (loading) {
    return <p className="text-center mt-4">Loading orders...</p>;
  }

  return (
    <div>
  <h3 className="text-center text-2xl font-semibold mt-4">
    My Orders
  </h3>

  <div className="mt-4 px-6">
    {orders.length > 0 ? (
      orders.map((order) => (
        <div
          key={order._id}
          className="border p-4 rounded shadow mb-6"
        >
          <h4 className="font-bold mb-2">
            Order ID: {order.orderId}
          </h4>

          <p>Total Price: ₹ {order.totalPrice}</p>

          {order.products.map((item) => (
            <div
              key={item._id}
              className="flex gap-4 mt-3 border-t pt-3"
            >
              <img
                src={item.productId?.image}
                alt={item.productId?.name}
                className="w-20 h-20 object-cover"
              />

              <div>
                <p className="font-medium">
                  {item.productId?.name}
                </p>
                <p>₹ {item.price}</p>
                <p>Quantity: {item.quantity}</p>
              </div>
            </div>
          ))}
        </div>
      ))
    ) : (
      <p className="text-center">No orders available right now.</p>
    )}
  </div>
</div>
  );
}

export default Orders;
