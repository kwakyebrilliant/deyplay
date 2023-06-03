import React from 'react'
import Sidebar from '../Partials/Sidebar'
import PartialNavbar from '../Partials/PartialNavbar'
import coverimg from '../assets/coverimg.jpeg';
import { FiSearch } from 'react-icons/fi';

function Music() {
    return (
        <div>
            <div className='bg-black/80'>
            <>
    
            <div className='flex flex-auto'>
                <Sidebar />
    
                <div className='grow'>
                    <PartialNavbar />

                    
                    <div className="relative mx-2">
                        <img src={coverimg} alt="Background" className="w-full rounded object-cover h-96" />
                        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 flex items-center rounded-md bg-gradient-to-r from-purple-500 to-pink-500 p-2">
                            <input
                            className="w-64 bg-transparent focus:outline-none text-white placeholder-white"
                            type="text"
                            placeholder="Search..."
                            />
                            <button className="ml-2 text-white">
                            <FiSearch />
                            </button>
                        </div>
                   
                    </div>
    
                </div>
    
            </div>
            </>
            </div>
        </div>
      )
}

export default Music