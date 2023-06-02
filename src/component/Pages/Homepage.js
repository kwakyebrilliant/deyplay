import React from 'react'
import Sidebar from '../Partials/Sidebar'
import PartialNavbar from '../Partials/PartialNavbar'

function Homepage() {
  return (
    <div>
        <div className='bg-black/80'>
        <>

        <div className='flex flex-auto'>
            <Sidebar />

            <div className='grow'>
                <PartialNavbar />


                <div className='flex m-5 py-4'>
                  <h2 className='text-white font-bold'>
                    Best Albums
                  </h2>
            
                </div>


                <div className='flex m-5 py-4'>
                  <h2 className='text-white font-bold'>
                    Most Streamed
                  </h2>
            
                </div>

            </div>

        </div>
        </>
        </div>
    </div>
  )
}

export default Homepage