/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useState, useEffect } from 'react';
import Sidebar from '../Partials/Sidebar';
import PartialNavbar from '../Partials/PartialNavbar';
import library from '../../component/assets/library.jpg';
import { FiSearch } from 'react-icons/fi';
import { Link } from 'react-router-dom'

import { ethers } from 'ethers';
import Deyplay from '../../artifacts/contracts/Deyplay.sol/Deyplay.json';
const deyplayAddress = "0x338e99E07393674879915e280dB643A88B802439";


function DashLibrary() {

    const [tracks, setTracks] = useState([]);
    const [currentAccount, setCurrentAccount] = useState('');
    const [filter, setFilter] = useState('');
  
    useEffect(() => {
        connectToMetaMask();
      // eslint-disable-next-line react-hooks/exhaustive-deps
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
              description: track.description,
              artist: track.artist,
              imageUrl: track.imageUrl,
              audioFile: track.audioFile,
              totalStreams: track.totalStreams.toNumber(),
              totalPurchases: track.totalPurchases,
              streamAmount: track.streamAmount,
              royaltiesOwners: track.royaltiesOwners,
              royaltiesPercentages: track.royaltiesPercentages
            };
          })
        );
  
        setTracks(trackDetails);
      } catch (error) {
        console.error('Error fetching tracks by artist:', error);
      }
    }
    


      function filterTracks() {
        const filteredTracks = tracks.filter((track) =>
          track.title.toLowerCase().includes(filter.toLowerCase())
        );
    
    
        setTracks(filteredTracks);
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
                            value={filter}
                            onChange={(e) => setFilter(e.target.value)}
                            />
                            <button onClick={filterTracks} className="ml-2 text-black">
                            <FiSearch className='text-black' />
                            </button>
                        </div>
                        
                        <h3 className="text-xl font-medium text-white">
                        
                        <h3 className="text-xl font-medium text-white">
                          {currentAccount.slice(0, 6)}…{currentAccount.slice(currentAccount.length - 6)}
                        </h3>
                        </h3>
                        <p className="mt-1.5 max-w-[40ch] text-xs text-white">
                        This is a list of all songs uploaded by you on deyplay. You can view their details by clicking on each file.
                        </p>
                        </div>
                   
                    </div>



                <div className='flex m-3 pt-4'>
                  <h2 className="text-2xl text-white font-bold mb-4">Songs Uploaded</h2>
                
                </div>

                <div className='mx-3 mb-60'>
                {tracks.length === 0 ? (
                        <h1 className="font-bold text-5xl text-center text-white">No tracks available</h1>
                    ) : (
                  <div className='relative grid grid-cols-2 lg:grid-cols-6 gap-x-8 gap-y-16'>

                  {tracks.map((track) => (

                  <article key={track.id} className="overflow-hidden rounded-lg border border-black/80 bg-black shadow-sm">
                          <Link to='/dashmusicsingle'
                            state={{
                                id: track.id,
                                title: track.title,
                                description: track.description,
                                artist: track.artist,
                                imageUrl: track.imageUrl,
                                audioFile: track.audioFile,
                                totalStreams: track.totalStreams,
                                totalPurchases: track.totalPurchases,
                                streamAmount: track.streamAmount,
                                royaltiesOwners: track.royaltiesOwners,
                                royaltiesPercentages: track.royaltiesPercentages
                            }}
                          >
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


                      </Link>
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