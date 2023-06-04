/* eslint-disable jsx-a11y/anchor-is-valid */
import React from 'react'
import coverimg from '../assets/coverimg.jpeg';
import { FaPlayCircle } from 'react-icons/fa'

function CoversCard() {
  return (
    <div className='flex mx-3'>
        <a className="relative object-cover w-full block group">
        <img
            src={coverimg}
            alt=""
            className="w-full object-cover rounded transition duration-500 group-hover:opacity-90 sm:h-[450px]"
        />

        <div className="absolute bg-black/50 inset-0 flex flex-col items-start justify-end p-6">
            <h3 className="text-xl font-medium text-white">John Doe</h3>

            <p className="mt-1.5 max-w-[40ch] text-xs text-white">
            I can fly
            </p>


            <a
            className="inline-flex mt-3 items-center gap-2 rounded border border-black bg-black px-8 py-3 text-white hover:bg-white hover:text-black focus:outline-none focus:ring"
            href="/musicsingle"
            >
            <span className="text-sm font-medium"> $1 for </span>

            <FaPlayCircle className=' lg:w-[35px] lg:h-[35px] hover:text-black' />
            </a>


        </div>
        </a>

    </div>
  )
}

export default CoversCard