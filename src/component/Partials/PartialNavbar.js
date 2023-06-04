/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useState } from 'react'

import { FaHome, FaMusic, FaRegFolder, FaHeart } from 'react-icons/fa'

import { MenuIcon, XIcon } from '@heroicons/react/outline';
import { Link } from 'react-router-dom';



const PartialNavbar = () => {

    const [nav, setNav] = useState(false)
    
    const handleClick = () => setNav(!nav)

    const handleClose =()=> setNav(!nav)

    const [showModal, setShowModal] = useState(false);

    

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
                    onClick={() => setShowModal(true)}
                    >
                    <span className="text-sm font-medium">
                    Connect Wallet
                    </span>
                    </a>

                    {showModal ? (
                                <>
                                <div
                                    className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none"
                                >
                                    <div className="relative w-full my-6 mx-auto max-w-3xl">
                                    {/*content*/}
                                    <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                                        {/*header*/}
                                        <div className="flex items-start justify-between p-5 border-b border-solid border-slate-200 rounded-t">
                                        <h3 className="text-xl font-semibold">
                                            Choose User
                                        </h3>
                                        <button
                                            className="p-1 ml-auto bg-transparent border-0 text-black opacity-5 float-right text-3xl leading-none font-semibold outline-none focus:outline-none"
                                            onClick={() => setShowModal(false)}
                                        >
                                            <span className="bg-transparent text-black opacity-5 h-6 w-6 text-2xl block outline-none focus:outline-none">
                                            ×
                                            </span>
                                        </button>
                                        </div>
                                        {/*body*/}
                                        <div className="relative space-y-4 p-6 flex-auto">
                                        
                                        <div>
                                       

                                        <select
                                            name="HeadlineAct"
                                            id="HeadlineAct"
                                            className="mt-1.5 py-2 w-full rounded-lg border-gray-300 text-gray-700 sm:text-sm"
                                        >
                                            <option value="">Please select</option>
                                            <option value="user">User</option>
                                            <option value="artiste">Artiste</option>
                                        </select>
                                        </div>

                                    
 
                                        </div>
                                        {/*footer*/}
                                        <div className="flex items-center justify-end p-6 border-t border-solid border-slate-200 rounded-b">
                                        <button
                                            className="text-black background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                                            type="button"
                                            onClick={() => setShowModal(false)}
                                        >
                                            Close
                                        </button>
                                        </div>
                                    </div>
                                    </div>
                                </div>
                                <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
                                </>
                            ) : null}
            
            
                </div>
                            
                             
                    
                
                </div>
            </div>
        </nav>
  )
}

export default PartialNavbar