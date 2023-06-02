import React from 'react'
import Sidebar from '../Partials/Sidebar'
import PartialNavbar from '../Partials/PartialNavbar'

function Music() {
    return (
        <div>
            <div className='text-black'>
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

export default Music