import React from 'react'
import Sidebar from '../Partials/Sidebar';
import PartialNavbar from '../Partials/PartialNavbar';
import musics from '../../component/assets/musics.jpg';

function DashMusic() {
  return (
    <div>
        <div className='bg-black/80'>
        <>
        <div className='flex flex-auto'>
            <Sidebar />

            <div className='grow'>
                <PartialNavbar />


                <div className="relative mx-2">
                        <img src={musics} alt="Background" className="w-full rounded object-cover h-96" />

                        <div className="absolute bg-black/30 inset-0 flex flex-col items-center justify-end p-6">
                        
                        <h3 className="text-xl font-medium text-white">
                          0xgt...4bxe
                        </h3>
                        <p class="mt-1.5 max-w-[40ch] text-xs text-white">
                        Lorem ipsum dolor sit amet consectetur adipisicing elit. Dignissimos sequi
                        dicta impedit aperiam ipsum!
                        </p>
                        </div>
                   
                    </div>


                    <div className='flex m-3 pt-4'>
                    <h2 className="text-2xl text-white font-bold mb-4">Music Upload Form</h2>
              
                    </div>

                    <div className='flex m-3 pt-4'>

                    <div className="flex w-full">
                      <div className="px-8 w-full">
                        
                        <form>
                          <div className="mb-4">
                            <label className="block text-white text-sm font-bold mb-2" htmlFor="name">
                              Name
                            </label>
                            <input
                              className="w-full px-3 text-white py-2 rounded-lg border border-gray-300 focus:outline-none bg-transparent"
                              type="text"
                              id="name"
                              name="name"
                              placeholder="Your Name"
                              required
                            />
                          </div>
                          <div className="mb-4">
                            <label className="block text-white text-sm font-bold mb-2" htmlFor="email">
                              Email
                            </label>
                            <input
                              className="w-full px-3 text-white py-2 rounded-lg border border-gray-300 focus:outline-none bg-transparent"
                              type="email"
                              id="email"
                              name="email"
                              placeholder="Your Email"
                              required
                            />
                          </div>
                         
                        </form>
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

export default DashMusic