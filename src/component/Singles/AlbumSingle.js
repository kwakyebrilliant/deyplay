/* eslint-disable jsx-a11y/anchor-is-valid */
import React from 'react'
import Sidebar from '../Partials/Sidebar'
import PartialNavbar from '../Partials/PartialNavbar'
import gm from '../assets/gm.jpeg';


function AlbumSingle() {
  return (
    <div>
        <div className='bg-black/80'>
        <>

        <div className='flex flex-auto'>
            <Sidebar />

            <div className='grow'>
                <PartialNavbar />

                <div className='mx-3 mt-8'>

                    <div className='relative grid grid-cols-1 lg:grid-cols-2 gap-x-8 gap-y-16'>


                    <article className="overflow-hidden lg:w-96 mb-8 rounded-lg border border-black/80 bg-black shadow-sm">
                    <a>
                    <img
                        alt="Office"
                        src={gm}
                        className="w-full h-72 p-4 object-cover"
                    />


                    <div className="p-4 sm:p-6">
                        <h3 className="font-medium text-white">
                            John Doe
                        </h3>

                        <p className="line-clamp-3 text-sm/relaxed text-gray-500">
                        I can fly
                        </p>

                    </div>


                    </a>
                    </article>


                    </div>

                </div>




            </div>


        </div>
        
        </>

        </div>
    </div>
  )
}

export default AlbumSingle