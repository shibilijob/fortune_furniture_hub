import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'

function Categories() {
    const [categories, setCategories] = useState([])

    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const res = await axios.get("http://localhost:5000/user/categories")
                setCategories(res.data.categories)
            } catch (error) {
                console.error(error)
            }
        }
        fetchCategories()
    }, [])

    return (
        <div className="p-8 bg-gray-50 min-h-screen">
            <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">
                Categories
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                {categories.map((cat,index) => (
                    <Link
                        key={index}
                        to={`/products?category=${cat}`}
                        className="bg-gray-600 rounded-xl shadow hover:shadow-lg transition duration-300 transform hover:-translate-y-1 flex items-center justify-center p-6"
                    >
                        <span className="text-lg font-medium text-white">
                            {cat}
                        </span>
                    </Link>
                ))}
            </div>
        </div>
    )
}

export default Categories