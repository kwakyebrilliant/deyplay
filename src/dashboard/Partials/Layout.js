import React from 'react'
import PartialNavbar from './PartialNavbar'
import Sidebar from './Sidebar'

const Layout = ({ children }) => {
  return (
    <>
    <div className='flex flex-auto'>
        <Sidebar />
        <div className='grow'>
            <PartialNavbar />
            <div className='m-5'>{children}</div>
        </div>
    </div>
</>
  )
}

export default Layout