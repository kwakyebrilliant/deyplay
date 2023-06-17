/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useState, useEffect } from 'react';
import Sidebar from '../Partials/Sidebar';
import PartialNavbar from '../Partials/PartialNavbar';
import library from '../../component/assets/library.jpg';
import coverimg from '../../component/assets/coverimg.jpeg';
import gm from '../../component/assets/gm.jpeg';
import kl from '../../component/assets/kl.jpeg';
import { FiSearch } from 'react-icons/fi';

import { ethers } from 'ethers';
import Deyplay from '../../artifacts/contracts/Deyplay.sol/Deyplay.json';
const deyplayAddress = "0xeA74cd9bd65e9D2dA128EF304914ead1122E2796";


function DashLibrary() {

    const [tracks, setTracks] = useState([]);
    const [currentAccount, setCurrentAccount] = useState('');
  
    useEffect(() => {
      connectToMetaMask();
    }, []);
  
    async function connectToMetaMask() {
      try {
        await window.ethereum.enable();
        const provider = new ethers.providers.Web3Provider(window.ethereum);
        const signer = provider.getSigner();
        const contract = new ethers.Contract(deyplayAddress, Deyplay.abi, signer);
  
        const accounts = await provider.listAccounts();
        setCurrentAccount(accounts[0]);
  
        fetchTracksByArtist(contract, accounts[0]);
      } catch (error) {
        console.error('Error connecting to MetaMask:', error);
      }
    }
  
    async function fetchTracksByArtist(contract, artistAddress) {
      try {
        const trackIds = await contract.listTracksByArtist(artistAddress);
  
        const trackDetails = await Promise.all(
          trackIds.map(async (trackId) => {
            const track = await contract.getTrack(trackId); // Update to the correct getter function
            return {
              id: track.id,
              title: track.title,
              artist: track.artist,
              imageUrl: track.imageUrl,
              audioFile: track.audioFile,
              price: track.price,
            };
          })
        );
  
        setTracks(trackDetails);
      } catch (error) {
        console.error('Error fetching tracks by artist:', error);
      }
    }
    


  return (
    <div>
        <div className='bg-black/80'>
        <>
        <div className='flex flex-auto'>
            <Sidebar />

            <div className='grow'>
                <PartialNavbar />


                <div className="relative mx-2">
                        <img src={library} alt="Background" className="w-full rounded object-cover h-96" />

                        <div className="absolute bg-black/30 inset-0 flex flex-col items-center justify-end p-6">

                        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 flex items-center rounded-md bg-gradient-to-r from-purple-500 to-pink-500 p-2">
                            <input
                            className="w-64 bg-transparent focus:outline-none text-white placeholder-white"
                            type="text"
                            placeholder="Search..."
                            />
                            <button className="ml-2 text-black">
                            <FiSearch className='text-black' />
                            </button>
                        </div>
                        
                        <h3 className="text-xl font-medium text-white">
                        
                        <h3 className="text-xl font-medium text-white">
                          {currentAccount.slice(0, 6)}…{currentAccount.slice(currentAccount.length - 6)}
                        </h3>
                        </h3>
                        <p className="mt-1.5 max-w-[40ch] text-xs text-white">
                        Lorem ipsum dolor sit amet consectetur adipisicing elit. Dignissimos sequi
                        dicta impedit aperiam ipsum!
                        </p>
                        </div>
                   
                    </div>


                <div className='flex m-3 pt-4'>
                  <h2 className="text-2xl text-white font-bold mb-4">Album Uploaded</h2>
                
                </div>

                <div className='mx-3'>

                <div className='relative grid grid-cols-2 lg:grid-cols-6 gap-x-8 gap-y-16'>


                <article className="overflow-hidden rounded-lg border border-black/80 bg-black shadow-sm">
                        <a>
                    <img
                        alt="Office"
                        src={gm}
                        className="w-full h-40 p-4 object-cover"
                    />


                    <div className="p-4 sm:p-6">
                        <h3 className="font-medium text-white">
                            John Doe
                        </h3>

                        <p className="line-clamp-3 text-sm/relaxed text-gray-500">
                        I can fly
                        </p>

                    </div>


                    </a>
                    </article>

                    <article className="overflow-hidden rounded-lg border border-black/80 bg-black shadow-sm">
                        <a>
                    <img
                        alt="Office"
                        src={coverimg}
                        className="w-full h-40 p-4 object-cover"
                    />

                    <div className="p-4 sm:p-6">
                        <h3 className="font-medium text-white">
                            John Doe
                        </h3>

                        <p className="line-clamp-3 text-sm/relaxed text-gray-500">
                        I can fly
                        </p>

                    </div>
                    </a>
                    </article>

                    <article className="overflow-hidden rounded-lg border border-black/80 bg-black shadow-sm">
                        <a>
                    <img
                        alt="Office"
                        src={gm}
                        className="w-full h-40 p-4 object-cover"
                    />

                    <div className="p-4 sm:p-6">
                        <h3 className="font-medium text-white">
                            John Doe
                        </h3>

                        <p className="line-clamp-3 text-sm/relaxed text-gray-500">
                        I can fly
                        </p>

                    </div>
                    </a>
                    </article>

                    <article className="overflow-hidden rounded-lg border border-black/80 bg-black shadow-sm">
                        <a>
                    <img
                        alt="Office"
                        src={kl}
                        className="w-full h-40 p-4 object-cover"
                    />

                    <div className="p-4 sm:p-6">
                        <h3 className="font-medium text-white">
                            John Doe
                        </h3>

                        <p className="line-clamp-3 text-sm/relaxed text-gray-500">
                        I can fly
                        </p>

                    </div>
                    </a>
                    </article>

                    <article className="overflow-hidden rounded-lg border border-black/80 bg-black shadow-sm">
                        <a>
                    <img
                        alt="Office"
                        src={coverimg}
                        className="w-full h-40 p-4 object-cover"
                    />

                    <div className="p-4 sm:p-6">
                        <h3 className="font-medium text-white">
                            John Doe
                        </h3>

                        <p className="line-clamp-3 text-sm/relaxed text-gray-500">
                        I can fly
                        </p>

                    </div>
                    </a>
                    </article>

                    <article className="overflow-hidden rounded-lg border border-black/80 bg-black shadow-sm">
                        <a>
                    <img
                        alt="Office"
                        src={coverimg}
                        className="w-full h-40 p-4 object-cover"
                    />

                    <div className="p-4 sm:p-6">
                        <h3 className="font-medium text-white">
                            John Doe
                        </h3>

                        <p className="line-clamp-3 text-sm/relaxed text-gray-500">
                        I can fly
                        </p>

                    </div>
                    </a>
                    </article>

                </div>


                </div>



                <div className='flex m-3 pt-4'>
                  <h2 className="text-2xl text-white font-bold mb-4">Songs Uploaded</h2>
                
                </div>

                <div className='mx-3 mb-12'>
                {tracks.length === 0 ? (
                        <p className="text-lg text-center">No tracks available</p>
                    ) : (
                  <div className='relative grid grid-cols-2 lg:grid-cols-6 gap-x-8 gap-y-16'>

                  {tracks.map((track) => (

                  <article key={track.id} className="overflow-hidden rounded-lg border border-black/80 bg-black shadow-sm">
                          <a href='dashmusicsingle'>
                      <img
                          src={track.imageUrl} 
                          alt={track.title} 
                          className="w-full h-40 p-4 object-cover"
                      />


                      <div className="p-4 sm:p-6">
                          <h3 className="font-medium text-white">
                          {track.artist.slice(0, 6)}…{track.artist.slice(track.artist.length - 6)}
                          </h3>

                          <p className="line-clamp-3 text-sm/relaxed text-gray-500">
                          {track.title}
                          </p>

                      </div>


                      </a>
                      </article>

                  ))}
                  </div>
                  )}


                  </div>

                

            </div>

        </div>
        </>
        
        </div>
    </div>
  )
}

export default DashLibrary