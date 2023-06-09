/* eslint-disable jsx-a11y/anchor-is-valid */
import React from 'react'
import Sidebar from '../Partials/Sidebar';
import PartialNavbar from '../Partials/PartialNavbar';
import musicstream from '../../component/assets/musicstream.jpg';
import albumstream from '../../component/assets/albumstream.jpg';
import musics from '../../component/assets/musics.jpg'
import albums from '../../component/assets/albums.jpg';
import { FaEye, FaMoneyBill } from 'react-icons/fa'

function Dashboard() {

    var myDate = new Date();
    var hours= myDate.getHours();
    var greet;
  
    if (hours < 12)
        greet =  "morning";
    else if (hours >= 12 && hours <= 17)
        greet = "afternoon";
    else if (hours >= 17 && hours <= 24)
        greet = "evening";


  return (
    <div>
        <div className='bg-black/80'>
        <>
        <div className='flex flex-auto'>
            <Sidebar />

            <div className='grow'>
                <PartialNavbar />

                <div className='mx-3 mt-8'>
            
                    <header className="rounded-2xl inset-x-0 bottom-0 bg-gradient-to-r from-green-300 via-blue-500 to-purple-600">
                    <div className="max-w-screen-xl px-4 py-8 mx-auto sm:py-12 sm:px-6 lg:px-8">
                        <div className="sm:justify-between sm:items-center sm:flex">
                        <div className="text-center sm:text-left">
                            <h1 className="text-2xl font-bold text-gray-900 sm:text-3xl">
                            Good {greet}, 0xgt...4bxe
                            </h1>

                            <p className="mt-1.5 text-sm text-gray-900">
                            Check your statistics on Deyplay🎉
                            </p>
                        </div>

                        
                        </div>
                    </div>
                    </header>
                </div>


                <div className='flex m-3 pt-4'>
                  <h2 className='text-white font-bold'>
                    Some Actions
                  </h2>
                </div>

                <div className="container mx-auto p-4">
                <div className="flex flex-col items-center space-y-4 sm:flex-row sm:justify-between sm:space-y-0 mb-8">
                    <div className="flex items-center">
                    <FaMoneyBill className=' text-white w-6 h-6 lg:w-12 lg:h-12 pr-1' />
                    <h3 className="text-xl ml-2 font-bold text-white">
                        $17, 259
                    </h3>
                    </div>

                    <div className="flex items-center">
                    <div className="bg-white text-black hover:bg-black hover:text-white rounded-lg p-4 cursor-pointer">
                        <span>Calculate Royalties</span>
                    </div>
                    </div>

                    <div className="flex items-center">
                    <div className="bg-white text-black hover:bg-black hover:text-white rounded-lg p-4 cursor-pointer">
                        <span>Distribute Royalties</span>
                    </div>
                    </div>
                </div>

                <div className="w-full h-px bg-gray-200"></div>
                </div>

                <div className='flex m-3 pt-4'>
                  <h2 className='text-white font-bold'>
                    These Statistics
                  </h2>
                </div>


                <div className='relative m-3 grid grid-cols-2 lg:grid-cols-4 gap-x-8 gap-y-16'>


                    <article className="overflow-hidden rounded-lg border border-black/80 bg-black shadow-sm">
                            <a>
                        <img
                            alt="Office"
                            src={albums}
                            className="w-full h-40 p-4 object-cover"
                        />

                        <div className="p-4 sm:p-6">
                            <h3 className="font-medium text-white">
                                Total Amount From Albums
                            </h3>

                            <p className="line-clamp-3 flex text-sm/relaxed text-gray-500">
                            <FaMoneyBill className=' text-white w-6 h-6 lg:w-6 lg:h-6 pr-1' /> $1, 670
                            </p>

                        </div>
                        </a>
                        </article>

                        <article className="overflow-hidden rounded-lg border border-black/80 bg-black shadow-sm">
                            <a>
                        <img
                            alt="Office"
                            src={musics}
                            className="w-full h-40 p-4 object-cover"
                        />

                        <div className="p-4 sm:p-6">
                            <h3 className="font-medium text-white">
                                Total Amount From Musics
                            </h3>

                            <p className="line-clamp-3 flex text-sm/relaxed text-gray-500">
                            <FaMoneyBill className=' text-white w-6 h-6 lg:w-6 lg:h-6 pr-1' /> $13, 643
                            </p>

                        </div>
                        </a>
                        </article>

                        <article className="overflow-hidden rounded-lg border border-black/80 bg-black shadow-sm">
                            <a>
                        <img
                            alt="Office"
                            src={albumstream}
                            className="w-full h-40 p-4 object-cover"
                        />

                        <div className="p-4 sm:p-6">
                            <h3 className="font-medium text-white">
                                Albums Streams
                            </h3>

                            <p className="line-clamp-3 flex text-sm/relaxed text-gray-500">
                            <FaEye className=' text-white w-6 h-6 lg:w-6 lg:h-6 pr-1' /> 4, 370
                            </p>

                        </div>
                        </a>
                        </article>

                        <article className="overflow-hidden rounded-lg border border-black/80 bg-black shadow-sm">
                            <a>
                        <img
                            alt="Office"
                            src={musicstream}
                            className="w-full h-40 p-4 object-cover"
                        />

                        <div className="p-4 sm:p-6">
                            <h3 className="font-medium text-white">
                                Musics Streams
                            </h3>

                            <p className="line-clamp-3 flex text-sm/relaxed text-gray-500">
                            <FaEye className=' text-white w-6 h-6 lg:w-6 lg:h-6 pr-1' /> 73, 442
                            </p>

                        </div>
                        </a>
                        </article>

                    </div>

                    <div className='flex mt-4 justify-center m-3 pt-4'>
                    <h2 className='text-white font-bold'>
                        What next?
                    </h2>
                
                    </div>
                    

                    <div className="flex mb-96 justify-center items-center">
                    <span className="inline-flex justify-center -space-x-px overflow-hidden rounded-md border bg-white shadow-sm">
                        <button className="inline-block px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 focus:relative">
                        <a href="dashalbum">
                        Add Albums
                        </a>
                        </button>
                        <button className="inline-block px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 focus:relative">
                        <a href="dashmusic">
                        Add Musics
                        </a>
                        </button>
                    </span>
                    </div>



            </div>

            </div>
        </>
        
        </div>
    </div>
  )
}

export default Dashboard