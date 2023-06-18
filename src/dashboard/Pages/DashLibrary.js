/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useState, useEffect } from 'react';
import Sidebar from '../Partials/Sidebar';
import PartialNavbar from '../Partials/PartialNavbar';
import library from '../../component/assets/library.jpg';
import { FiSearch } from 'react-icons/fi';
import { Link } from 'react-router-dom'

import { ethers } from 'ethers';
import Deyplay from '../../artifacts/contracts/Deyplay.sol/Deyplay.json';
const deyplayAddress = "0xf3d257D4Ee9AF5B663e1D3543CBe59eC98459B39";


function DashLibrary() {

    const [tracks, setTracks] = useState([]);
    const [albums, setAlbums] = useState([]);
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
          fetchAlbumsByArtist(contract, accounts[0]);
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
    
    async function fetchAlbumsByArtist(contract, artistAddress) {
        try {
          const albumIds = await contract.listAlbumsByArtist(artistAddress);
    
          const albumDetails = await Promise.all(
            albumIds.map(async (albumId) => {
              const album = await contract.getAlbum(albumId);
              return {
                id: album.id,
                title: album.title,
                artist: album.artist,
                imageUrl: album.imageUrl,
                description: album.description,
                price: album.price,
              };
            })
          );
    
          setAlbums(albumDetails);
        } catch (error) {
          console.error('Error fetching albums by artist:', error);
        }
      }

      function filterTracksAndAlbums() {
        const filteredTracks = tracks.filter((track) =>
          track.title.toLowerCase().includes(filter.toLowerCase())
        );
    
        const filteredAlbums = albums.filter((album) =>
          album.title.toLowerCase().includes(filter.toLowerCase())
        );
    
        setTracks(filteredTracks);
        setAlbums(filteredAlbums);
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
                            <button onClick={filterTracksAndAlbums} className="ml-2 text-black">
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

                <div className='mx-3 mb-12'>
                {albums.length === 0 ? (
                        <h1 className="font-bold text-5xl text-center text-white">No albums available</h1>
                    ) : (
                  <div className='relative grid grid-cols-2 lg:grid-cols-6 gap-x-8 gap-y-16'>

                {albums.map((album) => (

                  <article key={album.id} className="overflow-hidden rounded-lg border border-black/80 bg-black shadow-sm">
                          <Link to='/dashalbumsingle'
                          
                          >
                      <img
                          src={album.imageUrl} 
                          alt={album.title} 
                          className="w-full h-40 p-4 object-cover"
                      />


                      <div className="p-4 sm:p-6">
                          <h3 className="font-medium text-white">
                          {album.artist.slice(0, 6)}…{album.artist.slice(album.artist.length - 6)}
                          </h3>

                          <p className="line-clamp-3 text-sm/relaxed text-gray-500">
                          {album.title}
                          </p>

                      </div>


                      </Link>
                      </article>

                  ))}
                  </div>
                  )}


                  </div>



                <div className='flex m-3 pt-4'>
                  <h2 className="text-2xl text-white font-bold mb-4">Songs Uploaded</h2>
                
                </div>

                <div className='mx-3 mb-12'>
                {tracks.length === 0 ? (
                        <h1 className="font-bold text-5xl text-center text-white">No tracks available</h1>
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