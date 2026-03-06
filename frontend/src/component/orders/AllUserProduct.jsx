import React, { useEffect, useState, useContext } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { dataContext } from "../../context/AppContext";

function AllUserProduct() {

  const [products, setProducts] = useState([]);
  const { searchText } = useContext(dataContext);
  const navigate = useNavigate();
  

  // Filter
  const filteredProducts = products.filter((p) => {
    const name = p?.name?.toLowerCase() || "";
    const search = (searchText || "").toLowerCase();
    return name.includes(search);
  });

  // Fetch products
  useEffect(() => {
    axios.get('http://localhost:5000/products')
      .then((res) => setProducts(res.data))
      .catch((error) => console.log(error));
  }, []);

  const handleClick = (id) => {
    navigate(`/products/${id}`);
  };
console.log("SearchText from context:", searchText);
console.log("Filtered products:", filteredProducts);

  return (
    <div>
      <h3 className="text-center text-2xl font-semibold mt-4">All Products</h3>
      <p className='line-clamp-2 md:line-clamp-1 text-sm text-center px-3'>
        All products in one place; welcome to the ultimate collection where you can
        find products in different style, size, and type all at one place.
      </p>

      <div className='flex gap-4 flex-wrap justify-center mt-4'>
        {filteredProducts.map((i) => (
          <div
            className='w-40 md:w-60 cursor-pointer'
            key={i.id}
            onClick={() => handleClick(i.id)}
          >
            <img className='w-40 md:w-60' src={i.image} alt={i.name} />
            <p className='line-clamp-2 text-sm font-medium mt-2'>{i.name}</p>
            <h5>₹ {i.price}</h5>
          </div>
        ))}
      </div>
    </div>
  );
}

export default AllUserProduct;
