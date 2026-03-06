import React from 'react'


function AddLarge() {
  return (
    <div className='add_container flex gap-x-4 h-[450px] w-full px-10 mt-3'>
        <div className="bigimg w-[65%] ">
            <img className='h-[450px] w-[100%] rounded-xl' src='/images/ad-chairs.png' alt="sofa" />
        </div>
        <div className="smallimgs flex flex-col gap-y-4 w-[35%] h-[450px]">
            <img className='h-[48%] rounded-xl' src='/images/ad-small-1.png' alt="decor" />
            <img className='h-[48%] rounded-xl' src='/images/sofa-1.jpg' alt="bed" />
        </div>

    </div>
  )
}

export default AddLarge