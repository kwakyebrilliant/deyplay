/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useEffect, useState, useRef } from 'react';
import Sidebar from '../Partials/Sidebar';
import PartialNavbar from '../Partials/PartialNavbar';
import { PlayIcon, PauseIcon } from '@heroicons/react/solid';

import { Link } from 'react-router-dom'

import { ethers } from 'ethers';
import Deyplay from '../../artifacts/contracts/Deyplay.sol/Deyplay.json';
const deyplayAddress = "0x19E55FB04d159a7266fce87Cd6Bd4A35C6EC3FE7";

function Homepage() {

    const [shuffledTracks, setShuffledTracks] = useState([]);
    const [tracks, setTracks] = useState([]);

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

    useEffect(() => {
      // Shuffle the tracks array
      const shuffled = [...tracks].sort(() => Math.random() - 0.5);
      setShuffledTracks(shuffled);
    }, [tracks]);


  return (
    <div>
        <div className='bg-black/80'>
        <>

        <div className='flex flex-auto'>
            <Sidebar />

            <div className='grow'>
                <PartialNavbar />

                <div className='flex mx-3'>
                {shuffledTracks.length === 0 ? (
                      <h1 className="font-bold text-5xl text-center text-white mb-60">No tracks available</h1>
                    ) : (
                    <div>
                      {shuffledTracks.map((track) => (
                <a key={track.id} className="relative object-cover w-full block group">
                <img
                    src={track.imageUrl} 
                    alt={track.title}
                    className="w-screen object-cover rounded transition duration-500 group-hover:opacity-90 sm:h-[450px]"
                />

                <div className="absolute bg-black/50 inset-0 flex flex-col items-start justify-end p-6">
                    <h3 className="text-xl font-medium text-white">
                    {track.artist.slice(0, 6)}…{track.artist.slice(track.artist.length - 6)}
                    </h3>

                    <p className="mt-1.5 max-w-[40ch] text-xs text-white">
                    {track.title}
                    </p>

                    <div className='w-full'>
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
                    src={track.audioFile}
                    onTimeUpdate={handleProgressChange}
                    crossOrigin="anonymous"
                    />

                    </div>

                </div>
                
                </a>
                      ))}
                </div>
              )}
            </div>

                <div className='flex m-3 pt-4'>
                  <h2 className='text-white font-bold'>
                    Musics
                  </h2>
            
                </div>

                <div className='mx-3 mb-4'>
                    {shuffledTracks.length === 0 ? (
                      <h1 className="font-bold text-5xl text-center text-white mb-60">No tracks available</h1>
                    ) : (
                      <div className='relative grid grid-cols-2 lg:grid-cols-6 gap-x-8 gap-y-16'>
                        {shuffledTracks.map((track) => (
                          <article key={track.id} className="overflow-hidden rounded-lg border border-black/80 bg-black shadow-sm">
                            <Link to='/musicdetails'
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


                <div className='flex m-3 pt-4'>
                  <h2 className='text-white font-bold'>
                    Most Streamed
                  </h2>
            
                </div>

                <div className='mx-3 mb-12'>
                {tracks.length === 0 ? (
                  <h1 className="font-bold text-5xl text-center text-white mb-60">No tracks available</h1>
                ) : (
                  <div className='relative grid grid-cols-2 lg:grid-cols-6 gap-x-8 gap-y-16'>
                    {tracks.slice(-1).map((track) => (
                      <article key={track.id} className="overflow-hidden rounded-lg border border-black/80 bg-black shadow-sm">
                        <Link
                          to='/musicdetails'
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

export default Homepage