import React, { useEffect, useState } from 'react'
import { FaCartShopping, FaRupeeSign, FaUsers } from 'react-icons/fa6'
import { FcSalesPerformance } from 'react-icons/fc'
import { GiCash, GiProfit, GiStoneBlock } from 'react-icons/gi'
import { TbCoinRupee } from 'react-icons/tb'
import ADMIN_API from '../../../api/ADMIN_API'


function DashBord() {

  const[dashbord,setDashbord]=useState({
    totalProducts: 0,
    totalOrders: 0,
    totalUsers: 0,
    totalSales: 0,
    totalIncome: 0,
    totalProfit: 0
  })

  const getDashbord = async()=>{
    const resp =await ADMIN_API.get('/dashbordStatus')
    setDashbord({
      totalProducts: resp.data.totalProducts,
      totalOrders: resp.data.totalOrders,
      totalUsers: resp.data.totalUsers,
      totalSales: resp.data.totalSales,
      totalIncome: resp.data.totalIncome,
      totalProfit: resp.data.totalProfit
    })
  }

  useEffect(()=>{
      getDashbord()
  },[])

  const cards = [
    {
      head: 'Total Products',
      duration: 'Last 30 days',
      value: dashbord.totalProducts,
      icon: <GiStoneBlock className="text-3xl text-sky-800" />,
      background: 'bg-sky-300',
    },
    {
      head: 'Total Orders',
      duration: 'Last 30 days',
      value: dashbord.totalOrders,
      icon: <FaCartShopping className="text-3xl text-green-800" />,
      background: 'bg-green-300',
    },
    {
      head: 'Total Customers',
      duration: 'Last 30 days',
      value: dashbord.totalUsers,
      icon: <FaUsers className="text-3xl text-yellow-800" />,
      background: 'bg-yellow-200',
    },
    {
      head: 'Total Sales',
      duration: 'Last 30 days',
      value: `₹${dashbord.totalSales}`,
      icon: <TbCoinRupee className="text-3xl text-red-800" />,
      background: 'bg-red-300',
    },
    {
      head: 'Total Income',
      duration: 'Last 30 days',
      value:`₹${dashbord.totalIncome}`,
      icon: <GiCash className="text-3xl text-violet-800" />,
      background: 'bg-violet-300',
    },
    {
      head: 'Total Profit',
      duration: 'Last 30 days',
      value:`₹${dashbord.totalProfit}`,
      icon: <FcSalesPerformance className="text-3xl text-pink-800" />,
      background: 'bg-pink-300',
    }
  ]

  return (
    <div className="flex">
      <div className="bg-gradient-to-r from-gray-800 to-black w-full rounded-lg p-3">
        <div className="flex flex-wrap justify-around gap-3">
          {cards.map((item, index) => (
            <div
              key={index}
              className={`${item.background} flex items-center justify-around rounded-lg w-64 h-40 px-3 shadow-md hover:shadow-gray-500/100`}
            >
              <div>
                <h3 className="text-lg font-semibold text-gray-800">{item.head}</h3>
                <p className="text-sm text-gray-600">{item.duration}</p>
                <h2 className="text-2xl font-bold text-gray-900">{item.value}</h2>
              </div>
              <div className="p-2 bg-white/50 rounded-full">{item.icon}</div>
            </div>
          ))}
        </div>

        <div className="mt-6">
          
        </div>
      </div>
    </div>
  )
}

export default DashBord
