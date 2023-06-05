import React from 'react'
import Sidebar from '../Partials/Sidebar';
import PartialNavbar from '../Partials/PartialNavbar';

function DashMusic() {
  return (
    <div>
        <div className='bg-black/80'>
        <>
        <div className='flex flex-auto'>
            <Sidebar />

            <div className='grow'>
                <PartialNavbar />

                

            </div>

        </div>
        </>
        
        </div>
    </div>
  )
}

export default DashMusic