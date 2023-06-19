/* eslint-disable no-unused-vars */
/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from 'react';
import Sidebar from '../Partials/Sidebar';
import PartialNavbar from '../Partials/PartialNavbar';
import { FaMoneyBill, FaEye } from 'react-icons/fa';

import { useLocation } from 'react-router-dom'

import { ethers } from 'ethers';


function DashMusicSingle() {

    let location = useLocation();
    const tracks = location.state;
    console.log(location);

    

  return (
    <div>
        <div className='bg-black/80'>
        <>

            <div className='flex flex-auto'>
            <Sidebar />

                <div className='grow'>
                    <PartialNavbar />

                    <div className="relative mx-2">
                        <img src={tracks.imageUrl} alt={tracks.title}  className="w-full rounded object-cover h-96" />

                        <div className="absolute bg-black/30 inset-0 flex flex-col items-center justify-end p-6">
                        
                        <h3 className="text-xl font-medium text-white">
                        {tracks.artist.slice(0, 6)}…{tracks.artist.slice(tracks.artist.length - 6)}
                        </h3>

                        <div className="px-4 pt-4 sm:px-6">
                            <div className='flex'>
                                <h3 className="font-bold flex text-sm/relaxed text-white">
                                <FaEye className=' text-white w-6 h-6 lg:w-6 lg:h-6 pr-1' /> {ethers.utils.formatEther(tracks.totalStreams)}
                                </h3>
                                <h3 className="font-bold flex px-2 text-sm/relaxed text-white">
                                <FaMoneyBill className=' text-white w-6 h-6 lg:w-6 lg:h-6 pr-1' /> {ethers.utils.formatEther(tracks.totalPurchases)}
                                </h3>
                            </div>
                        </div>

                        <div className="mt-4 flex flex-col items-center">

                        <h3 className="font-bold text-base bg-white p-2 rounded-e-full text-black">
                            ${ethers.utils.formatEther(tracks.price)}
                        </h3>
                        
                        </div>
                        </div>
                   
                    </div>


                    <div className='flex mx-3 pt-4'>
                    <h2 className="text-2xl text-white font-bold">Your Track</h2>
                
                    </div>


                    <div className='flex mx-3 mb-40 pt-4'>
                        <div className="flex w-full">
                            <div className="px-8 w-full">
                                  <p className="line-clamp-3 text-sm/relaxed text-white">
                                    {tracks.title}
                                  </p>
                                  <audio controls className="my-4 w-full">
                                    <source src={tracks.audioFile} />
                                  </audio>

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

export default DashMusicSingle