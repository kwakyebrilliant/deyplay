import React from 'react'
import Sidebar from '../Partials/Sidebar'
import PartialNavbar from '../Partials/PartialNavbar'
import coverimg from '../assets/coverimg.jpeg';
import { FiSearch } from 'react-icons/fi';
import AlbumCard from '../Cards/AlbumCard';

function Album() {
    return (
        <div>
            <div className='bg-black/80'>
            <>
    
            <div className='flex flex-auto'>
                <Sidebar />
    
                <div className='grow pb-12'>
                    <PartialNavbar />

                    
                    <div className="relative mx-2">
                        <img src={coverimg} alt="Background" className="w-full rounded object-cover h-96" />

                        <div className="absolute bg-black/30 inset-0 flex flex-col items-center justify-end p-6">

                        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 flex items-center rounded-md bg-gradient-to-r from-purple-500 to-pink-500 p-2">
                            <input
                            className="w-64 bg-transparent focus:outline-none text-white placeholder-white"
                            type="text"
                            placeholder="Search..."
                            />
                            <button className="ml-2 text-white">
                            <FiSearch className='text-white' />
                            </button>
                        </div>
                        
                        <h3 className="text-xl font-medium text-white">
                            John Doe
                        </h3>
                        <p class="mt-1.5 max-w-[40ch] text-xs text-white">
                        Lorem ipsum dolor sit amet consectetur adipisicing elit. Dignissimos sequi
                        dicta impedit aperiam ipsum!
                        </p>
                        </div>
                   
                    </div>

                    <div className='flex m-3 pt-4'>
                    <h2 className='text-white font-bold'>
                        Albums You Like
                    </h2>
                
                    </div>


                    {/* Album Card imported */}
                    <AlbumCard />
    
                </div>
    
            </div>
            </>
            </div>
        </div>
      )
}

export default Album