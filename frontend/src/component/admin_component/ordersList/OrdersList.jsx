import React, { useEffect, useState } from 'react'
import ADMIN_API from '../../../api/ADMIN_API'
import { EyeIcon } from '@heroicons/react/24/outline'

function OrdersList() {

  const [orders, setOrders] = useState([])

  const fetchOrders = async () => {
    try {
      const res = await ADMIN_API.get('/allOrders')
      setOrders(res.data.allOrders)
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    fetchOrders()
  }, [])

  const handleChangeToShip = async (orderId) => {
  try {
    await ADMIN_API.put(
      `/changeToShip/${orderId}`,
      { status: "Shipped" }
    )

    fetchOrders()

  } catch (error) {
    console.log(error)
  }
}

const handleChangeToDeliver = async (orderId) => {
  try {
    await ADMIN_API.put(
      `/changeToDeliver/${orderId}`,
      { status: "Delivered" }
    )

    fetchOrders()

  } catch (error) {
    console.log(error)
  }
}

  return (
    <div className="bg-white min-h-screen">
      <div className="mx-auto bg-gradient-to-b from-gray-800 to-gray-900 shadow-xl rounded-xl overflow-hidden">

        {/* Header */}
        <div className="flex justify-between px-6 py-4 border-b border-gray-700">
          <h2 className="text-3xl font-bold text-white">Order List</h2>
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="min-w-[800px] w-full divide-y divide-gray-700">

            <thead>
              <tr>
                {["Order ID", "Customer", "Total Items", "Total Price", "Status", "Operation"].map((header) => (
                  <th
                    key={header}
                    className="px-6 py-3 text-left text-xs font-semibold text-gray-300 uppercase"
                  >
                    {header}
                  </th>
                ))}
              </tr>
            </thead>

            <tbody className="bg-gray-900 divide-y divide-gray-700">
              {orders.map((order) => (
                <tr
                  key={order._id}
                  className="hover:bg-gray-700 transition-colors duration-200"
                >
                  <td className="px-6 py-4 text-white">{order._id.slice(-6)}</td>
                  <td className="px-6 py-4 text-gray-300">{order.userId?.email}</td>
                  <td className="px-6 py-4 text-white">{order.totalItems}</td>
                  <td className="px-6 py-4 text-white">₹{order.totalPrice}</td>

                  <td className="px-6 py-4">
                    <span className={`px-3 py-1 rounded-full text-sm font-medium 
                      ${order.status === "Delivered"
                        ? "bg-green-500 text-white"
                        : order.status === "Pending"
                        ? "bg-yellow-500 text-black"
                        : "bg-red-500 text-white"
                      }`}>
                      {order.status}
                    </span>
                  </td>

                  <td className="px-6 py-4 flex gap-2">
                     {order.status === "Pending" && (
                        <button
                          onClick={() => handleChangeToShip(order.orderId)}
                          className="bg-blue-600 hover:bg-blue-700 text-white px-3 py-1 rounded-lg"
                        >
                          Mark Shipped
                        </button>
                      )}

                      {order.status === "Shipped" && (
                        <button
                          onClick={() => handleChangeToDeliver(order.orderId)}
                          className="bg-green-600 hover:bg-green-700 text-white px-3 py-1 rounded-lg"
                        >
                          Mark Delivered
                        </button>
                      )}
                  </td>

                </tr>
              ))}
            </tbody>

          </table>
        </div>
      </div>
    </div>
  )
}

export default OrdersList