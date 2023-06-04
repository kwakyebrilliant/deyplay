/* eslint-disable jsx-a11y/img-redundant-alt */
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

                    <div className='relative grid grid-cols-1 lg:grid-cols-2'>


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

                    <div>

                        <div className="flex p-4 rounded-lg hover:bg-black/80 text-white hover:text-white">
                        <div className="p-4 flex justify-center items-center">
                            <p className="text-lg font-bold">1</p>
                        </div>
                        <div className="">
                            <img src={gm} alt="Image" className="w-52 h-28 rounded-lg object-cover" />
                        </div>
                        <div className="p-4">
                            <p className="text-lg font-bold mb-2">Title</p>
                            <p className="text-base">Description</p>
                        </div>
                        </div>

                    </div>


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