import React from 'react'
import Sidebar from '../Partials/Sidebar';
import PartialNavbar from '../Partials/PartialNavbar';
import coverimg from '../../component/assets/coverimg.jpeg';

function DashMusicSingle() {
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

                        <div className="absolute bg-black/30 inset-0 flex flex-col items-center justify-end p-6">
                        
                        <h3 className="text-xl font-medium text-white">
                            John Doe
                        </h3>
                        <p class="mt-1.5 max-w-[40ch] text-xs text-white">
                        Lorem ipsum dolor sit amet consectetur adipisicing elit. Dignissimos sequi
                        dicta impedit aperiam ipsum!
                        </p>

                        <div className="mt-4 flex flex-col items-center">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="h-12 w-12 text-white cursor-pointer"
                          viewBox="0 0 20 20"
                          fill="currentColor"
                        >
                          <path
                            fillRule="evenodd"
                            d="M5 4v12l10-6z"
                          />
                        </svg>

                        <div className="w-96 h-2 bg-gray-300 mt-2">
                          <div className="h-full bg-green-500" style={{ width: '80%' }} />
                        </div>
                        </div>
                        </div>
                   
                    </div>


                    <div className='flex mx-3 pt-4'>
                    <h2 className="text-2xl text-white font-bold">Music Upload Form</h2>
                
                    </div>

                    <div className='flex mx-3'>
                        <p class="text-xs text-white">
                        You have the opportunity to add this song to an album
                        </p>
                    </div>

                    



                </div>

            </div>
        
        </>
        </div>
    </div>
  )
}

export default DashMusicSingle