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
                      <h2 className='text-white font-bold'>
                        Share your music
                      </h2>
              
                    </div>


            </div>

        </div>
        </>
        
        </div>
    </div>
  )
}

export default DashMusic