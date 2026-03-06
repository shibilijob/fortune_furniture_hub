import React, { useEffect, useState } from 'react';
import { PencilIcon, TrashIcon } from '@heroicons/react/24/outline';
import ADMIN_API from '../../../api/ADMIN_API';

function AllProduct() {
  const[products,setProducts]=useState([])
  const[ShowPopup,setShowPopup]=useState(false)
  const[showEdit,setShowEdit]=useState(false)
  const [editProductId, setEditProductId] = useState(null)
  const[newProduct,setNewProduct]=useState(
    {
      name:'',
      category:'',
      price:'',
      image:null,
      description:''
    }
  )

  useEffect(()=>{
    const fetchProducts = async()=>{
      try {
        const res = await ADMIN_API.get('/allProducts')
        setProducts(res.data.allProducts)
      } catch (error) {
        console.log('error in fetching all products')
      }
    }
    fetchProducts()
  },[])

  function handleShowPop(){
    setShowPopup(true)
  }

  async function handleAddProduct() {
  try {

    const formData = new FormData();
    formData.append("name", newProduct.name);
    formData.append("category", newProduct.category);
    formData.append("price", newProduct.price);
    formData.append("description", newProduct.description);
    formData.append("image", newProduct.image);

    await ADMIN_API.post('/createProduct', formData, {
      headers: {
        "Content-Type": "multipart/form-data"
      }
    });

    const res = await ADMIN_API.get('/allProducts');
    setProducts(res.data.allProducts);

    setNewProduct({
      name: '',
      category: '',
      price: '',
      image: null,
      description: ''
    });

  } catch (error) {
    console.log('product did not added');
  }

  setShowPopup(false);
}

  async function handleDelete(id){
    try {
      await ADMIN_API.delete(`/deleteProduct/${id}`)
      setProducts(products.filter(product=>product._id !== id))
    } catch (error) {
      console.log('deleting the product not done')
    }
  }

  //EDIT PRODUCT POPUP OPEN 
  function handleEdit(id) {
    const product = products.find((p) => p._id === id);
    setEditProductId(id);

    setNewProduct({
      name: product.name,
      category: product.category,
      price: product.price,
      image: product.image,
      description: product.description
    });

    setShowEdit(true);
  }

async function handleEditProduct() {
  try {

    const formData = new FormData();
    formData.append("name", newProduct.name);
    formData.append("category", newProduct.category);
    formData.append("price", newProduct.price);
    formData.append("description", newProduct.description);

    // Only append image if user selected new file
    if (newProduct.image instanceof File) {
      formData.append("image", newProduct.image);
    }

    const res = await ADMIN_API.put(
      `/updateProduct/${editProductId}`,
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );

    const updated = products.map((p) =>
      p._id === editProductId ? res.data.product : p
    );

    setProducts(updated);
    setShowEdit(false);

  } catch (error) {
    console.log("Error updating product");
  }
}

  function handleCancel() {
    setShowPopup(false);
    setShowEdit(false);
  }



  return (
    <div className=" bg-white min-h-screen">
      <div className=" mx-auto bg-gradient-to-b from-gray-800 to-gray-900 shadow-xl rounded-xl overflow-hidden">
        <div className="flex justify-between px-6 py-4 border-b border-gray-700">
          <h2 className="text-3xl font-bold text-white">Product List</h2>
          <button onClick={handleShowPop} className='text-white bg-green-500 !rounded-lg px-3 py-1 hover:bg-green-700'>Add Product</button>
        </div>
        <div className="overflow-x-auto">
          <table className="min-w-[600px] w-full divide-y divide-gray-700">
            <thead className="">
              <tr>
                {["Item", "Name", "Category", "Price", "Operation"].map((header) => (
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
              {products.map((product) => (
                <tr
                  key={product._id}
                  className="hover:bg-gray-700 transition-colors duration-200"
                >
                  <td><img className='px-4 py-4 w-32 h-32' src={product.image} alt="" /></td>
                  <td className="px-6 py-4 text-white">{product.name}</td>
                  <td className="px-6 py-4 text-gray-300">{product.category}</td>
                  <td className="px-6 py-4 text-white">{product.price}</td>
                  <td className="px-6 py-4 flex items-center gap-2">
                    <button onClick={()=>handleEdit(product._id)} className="flex items-center gap-1 bg-blue-600 hover:bg-blue-700 text-white px-3 py-1 !rounded-lg shadow ">
                      <PencilIcon  className="w-4 h-4" /> Edit
                    </button>
                    <button onClick={()=>handleDelete(product._id)} className="flex items-center gap-1 bg-red-600 hover:bg-red-700 text-white px-3 py-1 !rounded-lg shadow">
                      <TrashIcon className="w-4 h-4" /> Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {ShowPopup && 
      <div className=" fixed inset-0 flex justify-center mt-6 mb-6 bg-black/70 backdrop-blur-sm  p-6">
          <div className="w-[420px] bg-white rounded-2xl shadow-2xl border border-gray-200 p-6">
            
            <div className="text-center mb-3">
              <h3 className="text-2xl font-semibold text-gray-800 tracking-wide">
                Add Product
              </h3>
              <p className="text-gray-500 text-sm">Fill in the details below</p>
            </div>

            <hr className="mb-4" />

            <div className="flex flex-col gap-4 items-center text-center">
              <input
                value={newProduct.name}
                onChange={(e)=>setNewProduct({...newProduct,name:e.target.value})}
                className="w-80 border border-gray-300 rounded-xl px-4 py-2.5 shadow-sm focus:ring-2 focus:ring-black focus:outline-none"
                type="text"
                placeholder="Product Name"
              />
              <input
                value={newProduct.category}
                onChange={(e)=>setNewProduct({...newProduct,category:e.target.value})}
                className="w-80 border border-gray-300 rounded-xl px-4 py-2.5 shadow-sm focus:ring-2 focus:ring-black focus:outline-none"
                type="text"
                placeholder="Category"
              />
              <input
                value={newProduct.price}
                onChange={(e)=>setNewProduct({...newProduct,price:Number(e.target.value)})}
                className="w-80 border border-gray-300 rounded-xl px-4 py-2.5 shadow-sm focus:ring-2 focus:ring-black focus:outline-none"
                type="text"
                placeholder="Price"
              />
              <input
                value={newProduct.description}
                onChange={(e)=>setNewProduct({...newProduct,description:e.target.value})}
                className="w-80 border border-gray-300 rounded-xl px-4 py-2.5 shadow-sm focus:ring-2 focus:ring-black focus:outline-none"
                type="text"
                placeholder="Description"
              />

              <input
                type="file"
                onChange={(e) =>
                  setNewProduct({ ...newProduct, image: e.target.files[0] })
                }
                className="w-80 border border-gray-300 rounded-xl px-4 py-2.5 shadow-sm bg-gray-50 focus:ring-2 focus:ring-black focus:outline-none"
              />
            </div>

            <div className="flex justify-center gap-4 py-5">
              <button onClick={handleCancel} className="w-28 bg-gray-200 text-gray-700 !rounded-xl py-2 font-medium shadow hover:bg-gray-300 transition">
                Cancel
              </button>
              <button onClick={handleAddProduct} className="w-28 bg-black text-white !rounded-xl py-2 font-medium shadow hover:bg-gray-900 transition">
                Add
              </button>
            </div>
          </div>
      </div>}

    {/* edit popup */}
      {showEdit && (
        <div className="fixed inset-0 flex justify-center items-start mt-10 bg-black/70 p-6">
          <div className="w-[420px] bg-white rounded-2xl p-6 shadow-2xl">
            <h3 className="text-xl font-bold">Edit Product</h3>
            <hr className="my-3" />

            <div className="flex flex-col gap-4">
              <input
                value={newProduct.name}
                onChange={(e) => setNewProduct({ ...newProduct, name: e.target.value })}
                className="border p-2 rounded"
              />

              <input
                value={newProduct.category}
                onChange={(e) => setNewProduct({ ...newProduct, category: e.target.value })}
                className="border p-2 rounded"
              />

              <input
                value={newProduct.price}
                onChange={(e) => setNewProduct({ ...newProduct, price: Number(e.target.value) })}
                className="border p-2 rounded"
              />

              <input
                type="file"
                onChange={(e) =>
                  setNewProduct({ ...newProduct, image: e.target.files[0] })
                }
              />
            </div>

            <div className="flex gap-4 justify-center mt-5">
              <button className="bg-gray-300 px-4 py-1 rounded" onClick={handleCancel}>Cancel</button>
              <button className="bg-black text-white px-4 py-1 rounded" onClick={handleEditProduct}>Done</button>
            </div>
          </div>
        </div>
      )}

      


    </div>
  );
}



export default AllProduct;
