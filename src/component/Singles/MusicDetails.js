import React, { useRef, useState, useEffect } from 'react';
import Sidebar from '../Partials/Sidebar'
import PartialNavbar from '../Partials/PartialNavbar';
import { FaMoneyBill, FaEye } from 'react-icons/fa';
import { PlayIcon, PauseIcon } from '@heroicons/react/solid';

import { useLocation } from 'react-router-dom';

import { ethers } from 'ethers';
import Deyplay from '../../artifacts/contracts/Deyplay.sol/Deyplay.json';
const deyplayAddress = "0x19E55FB04d159a7266fce87Cd6Bd4A35C6EC3FE7";


function MusicDetails() {
    let location = useLocation();
    const tracks = location.state;

    const audioRef = useRef(null);
    const [isPlaying, setIsPlaying] = useState(false);
    const [progress, setProgress] = useState(0);

    const handleTogglePlay = () => {
        if (isPlaying) {
        audioRef.current.pause();
        } else {
        audioRef.current.play();
        }
        setIsPlaying(!isPlaying);
    };

    const handleProgressChange = () => {
        const progressValue = (audioRef.current.currentTime / audioRef.current.duration) * 100;
        setProgress(progressValue);
    };

    const purchaseTrack = async () => {
      try {
          const provider = new ethers.providers.Web3Provider(window.ethereum);
          const signer = provider.getSigner();

          const contract = new ethers.Contract(deyplayAddress, Deyplay.abi, signer);
          const transaction = await contract.purchaseTrack(tracks.trackId, {
              value: tracks.price
          });
          await transaction.wait();

          // Track purchased successfully
          console.log("Track purchased successfully!");
      } catch (error) {
          console.error("Error purchasing track:", error);
      }
  };



  return (
    <div>
         <div className='bg-black/80'>
            <>

            <div className='flex flex-auto'>
                <Sidebar />

                <div className='grow'>

                    <PartialNavbar />

                    <div className='mx-3 mt-8 mb-16'>
                    <div className='relative grid grid-cols-1'>
                <article className="overflow-hidden lg:h-min lg:w-full rounded-lg bg-gradient-to-b from-black to-transparent shadow-sm">
                  <img
                    alt={tracks.title}
                    src={tracks.imageUrl}
                    className="w-full h-96 p-4 object-cover"
                  />

                  <div className="px-4 pt-4 sm:pt-4 sm:px-6">
                    <div className='flex justify-between'>
                      <h3 className="font-bold text-3xl text-white">
                        {tracks.title}
                      </h3>
                      <div className='flex'>
                        <button
                          className='mx-2 bg-white text-black hover:bg-black hover:text-white p-2 cursor-pointer'
                          onClick={purchaseTrack}
                        >
                          Buy
                        </button>
                        <h3 className="font-bold text-base bg-white p-2 rounded-e-full text-black">
                        ${ethers.utils.formatEther(tracks.price)}
                        </h3>
                      </div>
                     
                    </div>

                    <p className="line-clamp-3 text-sm/relaxed text-gray-500">
                      {tracks.artist.slice(0, 6)}…{tracks.artist.slice(tracks.artist.length - 6)}
                    </p>
                  </div>

                  <div className="px-4 pt-4 sm:px-6">
                    <div className='flex'>
                      <h3 className="font-bold flex text-sm/relaxed text-gray-500">
                        <FaEye className=' text-white w-6 h-6 lg:w-6 lg:h-6 pr-1' /> {tracks.totalStreams}
                      </h3>
                      <h3 className="font-bold flex px-2 text-sm/relaxed text-gray-500">
                        <FaMoneyBill className=' text-white w-6 h-6 lg:w-6 lg:h-6 pr-1' /> {tracks.totalPurchases}
                      </h3>
                    </div>
                  </div>

                  <div className="px-4 py-4 sm:px-6">
                    <h3 className="text-sm/relaxed text-white">
                    Stream Amount- ${ethers.utils.formatEther(tracks.streamAmount)}
                    </h3>
                  </div>

                  <div className="px-4 py-4 sm:px-6">
                    <h3 className="text-sm/relaxed text-white">
                      {tracks.description}
                    </h3>
                  </div>

                  <div className="px-4 py-4 sm:px-6">
                  <div className="flex items-center justify-center">
                    <div className="w-12 h-12 text-black rounded-full bg-white flex items-center justify-center">
                        {isPlaying ? (
                        <PauseIcon className="h-6 w-6" onClick={handleTogglePlay} />
                        ) : (
                        <PlayIcon className="h-6 w-6" onClick={handleTogglePlay} />
                        )}
                    </div>
                    </div>
                    <div className="flex items-center mt-4">
                    <div className="flex-1">
                        <div className="relative">
                        <div className="h-1 bg-gray-700 rounded-full">
                            <div
                            className="h-1 bg-blue-500 rounded-full"
                            style={{ width: `${progress}%` }}
                            ></div>
                        </div>
                        </div>
                    </div>
                    </div>
                    <audio
                    ref={audioRef}
                    src={tracks.audioFile}
                    onTimeUpdate={handleProgressChange}
                    crossOrigin="anonymous"
                    />
                </div>

                </article>
              </div>
                        

                    </div>


                </div>


            </div>
            
            </>
        </div>

    </div>
  )
}

export default MusicDetails