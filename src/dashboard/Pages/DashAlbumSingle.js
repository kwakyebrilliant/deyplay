/* eslint-disable jsx-a11y/img-redundant-alt */
import React, { useState, useEffect } from 'react';
import Sidebar from '../Partials/Sidebar';
import PartialNavbar from '../Partials/PartialNavbar';
import library from '../../component/assets/library.jpg';
import { FaMoneyBill, FaEye } from 'react-icons/fa'
import { useLocation } from 'react-router-dom'


import { ethers } from 'ethers';
import { Web3Storage } from 'web3.storage';
import Deyplay from '../../artifacts/contracts/Deyplay.sol/Deyplay.json';
const deyplayAddress = "0xeEdBB02233a9dEbEDc47Dc718DfE31D12C586B37";

function getAccessToken () {
   
  return 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJkaWQ6ZXRocjoweDE0ZGU4NTUwMjAxMTdENDIyY0IxOTRBREJiZERlOTJGZjBkYzkxNzciLCJpc3MiOiJ3ZWIzLXN0b3JhZ2UiLCJpYXQiOjE2ODY0ODYwNjYyNjksIm5hbWUiOiJEZXlwbGF5In0.7IJOEuXqeiau_nue9GSlHWWcpnROnPE6TP24oy4e9No'
}

function makeStorageClient () {
  return new Web3Storage({ token: getAccessToken() })
}


function DashAlbumSingle() {

    let location = useLocation();
    const albums = location.state;
    console.log(location);

  
    return (
        <div>
          <div className='bg-black/80'>
            <div className='flex flex-auto'>
              <Sidebar />
    
              <div className='grow'>
                <PartialNavbar />
    
                <div className='mx-3 mt-8 mb-32'>
                  <div className='relative grid grid-cols-1 lg:grid-cols-2'>
                    <article className="overflow-hidden lg:h-min lg:w-11/12 rounded-lg bg-gradient-to-b from-black to-transparent shadow-sm">
                    
                     
                        <img
                          alt={albums.title}
                          src={albums.imageUrl}
                          className="w-full h-80 p-4 object-cover"
                        />
    
                        <div className="px-4 pt-4 sm:pt-4 sm:px-6">
                            <div className='flex justify-between'>
                                <h3 className="font-bold text-3xl text-white">
                                {albums.title}
                                </h3>
                                <h3 className="font-bold text-base bg-white p-2 rounded-e-full text-black">
                                ${ethers.utils.formatEther(albums.price)}
                                </h3>
                            </div>
    
                            <p className="line-clamp-3 text-sm/relaxed text-gray-500">
                            {albums.artist.slice(0, 6)}…{albums.artist.slice(albums.artist.length - 6)}
                            </p>
                        </div>
    
    
                        <div className="px-4 pt-4 sm:px-6">
                            <div className='flex'>
                                <h3 className="font-bold flex text-sm/relaxed text-gray-500">
                                <FaEye className=' text-white w-6 h-6 lg:w-6 lg:h-6 pr-1' /> {ethers.utils.formatEther(albums.totalStreams)}
                                </h3>
                                <h3 className="font-bold flex px-2 text-sm/relaxed text-gray-500">
                                <FaMoneyBill className=' text-white w-6 h-6 lg:w-6 lg:h-6 pr-1' /> {ethers.utils.formatEther(albums.totalPurchases)}
                                </h3>
                            </div>
                        </div>
    
    
    
                        <div className="px-4 py-4 sm:px-6">
                        <h3 className="text-sm/relaxed text-white">
                        {albums.description}
                        </h3>
                        </div>
    
                    </article>

    
                    <div className='overflow-y-scroll h-[500px]'>
    
                      <div className="flex p-4 rounded-lg cursor-pointer hover:bg-black/80 text-white hover:text-white">
                        <div className="p-4 flex justify-center items-center">
                          <p className="text-lg font-bold">1</p>
                        </div>
                        <div className="">
                          <img src={library} alt="Image" className="w-36 h-24 rounded-lg object-cover" />
                        </div>
                        <div className="p-4">
                          <p className="text-lg font-bold mb-2">Title</p>
                          <p className="text-base">Description</p>
                        </div>
                      </div>
    
                      <div className="flex p-4 rounded-lg cursor-pointer hover:bg-black/80 text-white hover:text-white">
                        <div className="p-4 flex justify-center items-center">
                          <p className="text-lg font-bold">2</p>
                        </div>
                        <div className="">
                          <img src={library} alt="Image" className="w-36 h-24 rounded-lg object-cover" />
                        </div>
                        <div className="p-4">
                          <p className="text-lg font-bold mb-2">Title</p>
                          <p className="text-base">Description</p>
                        </div>
                      </div>
    
                      <div className="flex p-4 rounded-lg cursor-pointer hover:bg-black/80 text-white hover:text-white">
                        <div className="p-4 flex justify-center items-center">
                          <p className="text-lg font-bold">3</p>
                        </div>
                        <div className="">
                          <img src={library} alt="Image" className="w-36 h-24 rounded-lg object-cover" />
                        </div>
                        <div className="p-4">
                          <p className="text-lg font-bold mb-2">Title</p>
                          <p className="text-base">Description</p>
                        </div>
                      </div>
    
                      <div className="flex p-4 rounded-lg cursor-pointer hover:bg-black/80 text-white hover:text-white">
                        <div className="p-4 flex justify-center items-center">
                          <p className="text-lg font-bold">4</p>
                        </div>
                        <div className="">
                          <img src={library} alt="Image" className="w-36 h-24 rounded-lg object-cover" />
                        </div>
                        <div className="p-4">
                          <p className="text-lg font-bold mb-2">Title</p>
                          <p className="text-base">Description</p>
                        </div>
                      </div>
    
                      <div className="flex p-4 rounded-lg cursor-pointer hover:bg-black/80 text-white hover:text-white">
                        <div className="p-4 flex justify-center items-center">
                          <p className="text-lg font-bold">5</p>
                        </div>
                        <div className="">
                          <img src={library} alt="Image" className="w-36 h-24 rounded-lg object-cover" />
                        </div>
                        <div className="p-4">
                          <p className="text-lg font-bold mb-2">Title</p>
                          <p className="text-base">Description</p>
                        </div>
                      </div>
    
    
                    </div>
    
                    
    
                  </div>
    
                </div>

                <div className='mx-3 mt-8 mb-32'>


                </div>


              </div>
            </div>
          </div>
        </div>
      );
}

export default DashAlbumSingle