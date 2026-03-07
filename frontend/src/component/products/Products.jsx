import React, { useEffect, useState } from 'react'
import { useSearchParams, useNavigate } from 'react-router-dom'
import API from '../../api/API'

function Products() {

    const [products, setProducts] = useState([])
    const [searchParams] = useSearchParams()
    const navigate = useNavigate()

    const category = searchParams.get("category")

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const res = await API.get(
                    `/user/productByCategories?category=${category}`
                )
                setProducts(res.data.products)
            } catch (error) {
                console.log(error)
            }
        }

        if(category){
            fetchProducts()
        }

    }, [category])

    const handleClick = (id) => {
        navigate(`/products/${id}`)
    }

    return (
        <div>
            <h2 className="text-center text-2xl font-semibold mt-4">
                {category?.toUpperCase()}
            </h2>

            <div className="flex gap-4 flex-wrap justify-center mt-4">
                {products.length > 0 ? (
                    products.map((item) => (
                        <div
                            key={item._id}
                            className="w-40 md:w-60 cursor-pointer"
                            onClick={() => handleClick(item._id)}
                        >
                            <img src={item.image} alt="" />
                            <p>{item.name}</p>
                            <h4>₹ {item.price}</h4>
                        </div>
                    ))
                ) : (
                    <p>No products found</p>
                )}
            </div>
        </div>
    )
}

export default Products