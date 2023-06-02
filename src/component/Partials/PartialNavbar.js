/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useState } from 'react'

import { FaHome, FaMusic, FaRegFolder, FaHeart } from 'react-icons/fa'

import { MenuIcon, XIcon } from '@heroicons/react/outline';
import { Link } from 'react-router-dom';



const PartialNavbar = () => {

    const [nav, setNav] = useState(false)
    
    const handleClick = () => setNav(!nav)

    const handleClose =()=> setNav(!nav)

    

  return (
    <nav className='bg-black/80 shadow-sm border-gray-200 lg:mx-2 px-2 py-2.5 rounded'>
            <div className='container flex justify-between items-center mx-auto'>

            <div className='md:hidden' onClick={handleClick}>
            {!nav ? <MenuIcon className='w-5 text-white' /> : <XIcon className='w-5 text-white' />}

            <ul className={!nav ? 'hidden' : 'absolute bg-black w-fit'}>
                <li className='border-zinc-900 w-fit text-white'><Link to="/" className='flex' onClick={handleClose}><FaHome className='text-2xl mr-4' />Home</Link></li>
                <li className='border-zinc-900 w-fit text-white'><Link to="/music" className='flex' onClick={handleClose}><FaMusic className='text-2xl mr-4' />Music</Link></li>
                <li className='border-zinc-900 w-fit text-white'><Link to="/album" className='flex' onClick={handleClose}><FaRegFolder className='text-2xl mr-4' />Album</Link></li>
                <li className='border-zinc-900 w-fit text-white'><Link to="/library" className='flex' onClick={handleClose}><FaHeart className='text-2xl mr-4' />Library</Link></li>
                <li className='border-zinc-900 w-fit text-white'>
                <a
                    className="text-center cursor-pointer items-center px-8 py-2 text-black-600 bg-black border border-white rounded hover:bg-transparent hover:text-white active:text-white focus:outline-none focus:ring"
                    type="submit"
                    href='#'
                    >
                    <span className="text-sm font-medium">
                    Connect Wallet
                    </span>
                    </a>
                </li>
            </ul>
          
            </div>
                <div className='flex items-center mx-auto'>
                </div>

                <div className='flex justify-end py-2'>

                <div className='hidden md:flex pr-4'>
         
                    <a
                    className="text-center cursor-pointer items-center px-8 py-2 mx-2 text-black-600 bg-white border border-white rounded hover:bg-transparent hover:text-white active:text-white focus:outline-none focus:ring"
                    type="submit"
                    href='#'
                    >
                    <span className="text-sm font-medium">
                    Connect Wallet
                    </span>
                    </a>
            
            
                </div>
                            
                             
                    
                
                </div>
            </div>
        </nav>
  )
}

export default PartialNavbar