import React from 'react'
import { useNavigate } from 'react-router-dom'

function About() {
    const navigate=useNavigate()
  return (
    <div className="flex justify-center py-12 px-4 bg-gradient-to-b from-gray-100 to-white">
      <div className="bg-white shadow-lg rounded-2xl w-[90%] md:w-[80%] lg:w-[70%] p-8 md:p-12 text-gray-700">
        
        <h2 className="text-3xl md:text-4xl font-bold text-center text-primary mb-6">
          Transform Your Space with <span className="text-green-600">Fortune Furniture Hub</span>
        </h2>

        
        <div className="w-24 h-1 bg-green-500 mx-auto mb-8 rounded-full"></div>

        
        <p className="leading-relaxed text-lg text-gray-600 mb-4">
          Welcome to <span className="font-semibold text-gray-800">FORTUNE Furniture Hub</span>, 
          your trusted destination for stylish and affordable furniture in <span className="text-green-700 font-medium">Manjeri, Kerala</span>. 
          We specialize in providing high-quality home and office furniture designed to blend comfort, durability, 
          and modern aesthetics.
        </p>

        <p className="leading-relaxed text-lg text-gray-600 mb-4">
          At <span className="font-semibold text-gray-800">FORTUNE Furniture Hub</span>, we believe every home deserves furniture that reflects its personality. 
          From elegant sofas and dining sets to cozy bedroom collections and smart office pieces, 
          our wide range ensures theres something for every taste and space.
        </p>

        <p className="leading-relaxed text-lg text-gray-600 mb-4">
          We take pride in offering <span className="text-green-700 font-medium">delivery across Kerala</span>, 
          ensuring that no matter where you are, your dream furniture reaches you safely and on time.
        </p>

        <p className="leading-relaxed text-lg text-gray-600">
          Visit us in <span className="font-semibold text-gray-800">Manjeri</span> or explore our online collection 
          to discover furniture that transforms your space into a true reflection of your style.
        </p>

        
        <div className="text-center mt-10">
          <button onClick={()=>{navigate('/productPage')}} className="bg-green-600 hover:bg-green-700 text-white font-semibold py-3 px-8 rounded-lg shadow-md transition-all duration-200">
            Explore Our Collection
          </button>
        </div>
      </div>
    </div>
  )
}

export default About
