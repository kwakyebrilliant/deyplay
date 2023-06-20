import React, { useEffect, useState } from 'react';
import Sidebar from '../Partials/Sidebar'
import PartialNavbar from '../Partials/PartialNavbar'
import musics from '../assets/musics.jpg';
import { FiSearch } from 'react-icons/fi';

import { Link } from 'react-router-dom'

import { ethers } from 'ethers';
import Deyplay from '../../artifacts/contracts/Deyplay.sol/Deyplay.json';
const deyplayAddress = "0xE94C4eF5f0ac10D6dfa9338FcAFB6fF67841FAB0";

function Music() {
    const [account, setAccount] = useState('');
    const [contract, setContract] = useState(null);
    const [web3Provider, setWeb3Provider] = useState(null);
    const [tracks, setTracks] = useState([]);

    useEffect(() => {
        const init = async () => {
          const provider = new ethers.providers.Web3Provider(window.ethereum);
          setWeb3Provider(provider);
    
          await window.ethereum.enable();
    
          const [account] = await provider.listAccounts();
          setAccount(account);
    
          const contract = new ethers.Contract(deyplayAddress, Deyplay.abi, provider);
          setContract(contract);
        };
    
        init();
      }, []);

      useEffect(() => {
        const fetchTracks = async () => {
          try {
            // Connect to Ethereum provider
            const provider = new ethers.providers.Web3Provider(window.ethereum);
    
            // Get signer (required for contract methods that modify state)
            await provider.getSigner();
    
            // Instantiate the contract object
            const contract = new ethers.Contract(deyplayAddress, Deyplay.abi, provider);
    
            // Call the listAllTracks function
            const trackIds = await contract.listAllTracks();
    
            // Convert BigNumber objects to JavaScript numbers
            const trackIdsArray = trackIds.map((trackId) => trackId.toNumber());
    
            // Fetch additional details for each track
            const trackDetailsPromises = trackIdsArray.map(async (trackId) => {
              const track = await contract.getTrack(trackId);
              return {
                id: track.id,
                title: track.title,
                description: track.description,
                artist: track.artist,
                imageUrl: track.imageUrl,
                audioFile: track.audioFile,
                price: track.price,
                totalStreams: track.totalStreams,
                totalPurchases: track.totalPurchases,
                royaltiesOwners: track.royaltiesOwners,
                royaltiesPercentages: track.royaltiesPercentages
              };
            });
    
            // Wait for all track details to be fetched
            const trackDetails = await Promise.all(trackDetailsPromises);
    
            // Set the retrieved track details in the state
            setTracks(trackDetails);
          } catch (error) {
            console.error('Error fetching tracks:', error);
          }
        };
    
        fetchTracks();
      }, []);


    return (
        <div>
            <div className='bg-black/80'>
            <>
    
            <div className='flex flex-auto'>
                <Sidebar />
    
                <div className='grow'>
                    <PartialNavbar />

                    
                    <div className="relative mx-2">
                        <img src={musics} alt="Background" className="w-full rounded object-cover h-96" />

                        <div className="absolute bg-black/30 inset-0 flex flex-col items-center justify-end p-6">
                        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 flex items-center rounded-md bg-gradient-to-r from-purple-500 to-pink-500 p-2">
                            <input
                            className="w-64 bg-transparent focus:outline-none text-white placeholder-white"
                            type="text"
                            placeholder="Search..."
                            />
                            <button className="ml-2 text-white">
                            <FiSearch className='text-black' />
                            </button>
                        </div>
                        
                        <h3 className="text-xl font-medium text-white">
                        {account.slice(0, 6)}…{account.slice(account.length - 6)}
                        </h3>
                        <p class="mt-1.5 max-w-[40ch] text-xs text-white">
                        Lorem ipsum dolor sit amet consectetur adipisicing elit. Dignissimos sequi
                        dicta impedit aperiam ipsum!
                        </p>
                        </div>
                   
                    </div>

                    <div className='flex m-3 pt-4'>
                    <h2 className='text-white font-bold'>
                        Your Music
                    </h2>
                
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
                                price: track.price,
                                totalStreams: track.totalStreams,
                                totalPurchases: track.totalPurchases,
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

export default Music