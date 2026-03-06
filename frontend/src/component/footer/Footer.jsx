import React from 'react'

function Footer() {
  return (
    <div className='bg-gray-800 flex justify-center mt-4 pt-4 w-full text-white'><hr />
        <div className='w-[93%]'>
            <div className='inline  md:flex justify-between '>
                <div className='w-full md:w-[40%]'>
                    <p ><b><u>Delivery across kerala:</u></b> Malappuram, Kozhikkode, Kannur, Palakkad, Thrissur, Ernakulam, Idukki, Kottayam, Pathanamthitta, Kollam, Trivandrum, Alappuzha, Kasaragod, kottarakkara, Manjeri, Areakode, Perinthalmanna and more cities</p>
                </div>
                <div className='w-[35%]'>
                    <h6>We accepts:</h6>
                    <img src="/footer-cards.png" alt="" />
                </div>
            </div>
            <hr />


            <div className='flex justify-between'>
                <div className=' md:flex w-[62%]'>
                    <div>
                        <img className='w-30 md:w-70' src="/logo.png" alt="" />
                    </div>
                    <div className=''>
                        <p className='text-xs md:text-sm'>Terms of Use Security Return & Refund Payment Policy Grievance Cell</p>
                        <p className='text-xs md:text-sm'>© 2015-2025 Fortunehub.com. All rights reserved.</p>
                        <p className='text-xs md:text-sm'>The Fortune Furniture hub Private Limited</p>
                    </div>
                </div>
                <div className='w-[35%]'>
                    <div>
                        <p className='text-sm md:text-lg'>Registred Offiece</p>
                        <p className='text-xs md:text-sm'>The Fortune Furnitur hub's Pvt.Ltd.-101-104, Noora Tower,<br/>
                                                Thurakkal, Manjeri, Malappuram-673639.<br/>
                                                Corporate Identity Number:U36100RJ201Y9526R7</p>
                    </div>
                </div>
            </div>
        </div>
    </div>
  )
}

export default Footer