/* eslint-disable jsx-a11y/anchor-is-valid */
import React from 'react'
import gm from '../assets/gm.jpeg';

function CoversCard() {
  return (
    <div className='flex mx-3'>
        <a href="#" className="relative object-cover w-full block group">
        <img
            src={gm}
            alt=""
            className="w-full object-cover rounded transition duration-500 group-hover:opacity-90 sm:h-[450px]"
        />

        <div className="absolute bg-black/50 inset-0 flex flex-col items-start justify-end p-6">
            <h3 className="text-xl font-medium text-white">John Doe</h3>

            <p className="mt-1.5 max-w-[40ch] text-xs text-white">
            I can fly
            </p>

            <span
            className="inline-block px-5 py-3 mt-3 text-xs font-medium tracking-wide text-white uppercase bg-black"
            >
            Shop Now
            </span>
        </div>
        </a>

    </div>
  )
}

export default CoversCard