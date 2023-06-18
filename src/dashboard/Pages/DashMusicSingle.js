/* eslint-disable no-unused-vars */
/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from 'react';
import Sidebar from '../Partials/Sidebar';
import PartialNavbar from '../Partials/PartialNavbar';
import { FaUpload, FaMoneyBill, FaEye } from 'react-icons/fa';

import { useLocation } from 'react-router-dom'

import { ethers } from 'ethers';
import Deyplay from '../../artifacts/contracts/Deyplay.sol/Deyplay.json';
const deyplayAddress = "0xf3d257D4Ee9AF5B663e1D3543CBe59eC98459B39";


function DashMusicSingle() {

    let location = useLocation();
    const trackss = location.state;
    console.log(location);
    

    const [currentAccount, setCurrentAccount] = useState('');
    const [albums, setAlbums] = useState([]);
    const [tracks, setTracks] = useState([]);
    const [selectedAlbumId, setSelectedAlbumId] = useState('');
    const [selectedTrackId, setSelectedTrackId] = useState('');

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
    
          fetchAlbums(contract);
          fetchTracks(contract);
        } catch (error) {
          console.error('Error connecting to MetaMask:', error);
        }
      }


      async function fetchTracks(contract) {
        try {
          const trackIds = await contract.listAllTracks();
    
          const trackDetails = await Promise.all(
            trackIds.map(async (trackId) => {
              const track = await contract.getTrack(trackId);
              return {
                id: track.id,
                title: track.title,
                artist: track.artist,
                imageUrl: track.imageUrl,
              };
            })
          );
    
          setTracks(trackDetails);
        } catch (error) {
          console.error('Error fetching tracks:', error);
        }
      }


      async function fetchAlbums(contract) {
        try {
          const albumIds = await contract.listAllAlbums();
    
          const albumDetails = await Promise.all(
            albumIds.map(async (albumId) => {
              const album = await contract.getAlbum(albumId);
              return {
                id: album.id,
                title: album.title,
                artist: album.artist,
                imageUrl: album.imageUrl,
              };
            })
          );
    
          setAlbums(albumDetails);
        } catch (error) {
          console.error('Error fetching albums:', error);
        }
      }


      async function handleAddTrackToAlbum() {
        try {
          const provider = new ethers.providers.Web3Provider(window.ethereum);
          const signer = provider.getSigner();
          const contract = new ethers.Contract(deyplayAddress, Deyplay.abi, signer);
    
          const trackId = ethers.BigNumber.from(selectedTrackId);
          const albumId = ethers.BigNumber.from(selectedAlbumId);
    
          await contract.addTrackToAlbum(albumId, trackId);
    
          // Refresh the albums after adding the track
          fetchAlbums(contract);
        } catch (error) {
          console.error('Error adding track to album:', error);
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
                        <img src={trackss.imageUrl} alt={trackss.title}  className="w-full rounded object-cover h-96" />

                        <div className="absolute bg-black/30 inset-0 flex flex-col items-center justify-end p-6">
                        
                        <h3 className="text-xl font-medium text-white">
                        {trackss.artist.slice(0, 6)}…{trackss.artist.slice(trackss.artist.length - 6)}
                        </h3>
                        <p className="line-clamp-3 text-sm/relaxed text-white">
                          {trackss.title}
                          </p>
                        <div className="px-4 pt-4 sm:px-6">
                            <div className='flex'>
                                <h3 className="font-bold flex text-sm/relaxed text-white">
                                <FaEye className=' text-white w-6 h-6 lg:w-6 lg:h-6 pr-1' /> {ethers.utils.formatEther(trackss.totalStreams)}
                                </h3>
                                <h3 className="font-bold flex px-2 text-sm/relaxed text-white">
                                <FaMoneyBill className=' text-white w-6 h-6 lg:w-6 lg:h-6 pr-1' /> {ethers.utils.formatEther(trackss.totalPurchases)}
                                </h3>
                            </div>
                        </div>

                        <div className="mt-4 flex flex-col items-center">

                        <h3 className="font-bold text-base bg-white p-2 rounded-e-full text-black">
                            ${ethers.utils.formatEther(trackss.price)}
                        </h3>
                        
                        </div>
                        </div>
                   
                    </div>


                    <div className='flex mx-3 pt-4'>
                    <h2 className="text-2xl text-white font-bold">Music Upload Form</h2>
                
                    </div>

                    <div className='flex mx-3'>
                        <p class="text-xs text-white">
                        You have the opportunity to add this song to an album
                        </p>
                    </div>


                    <div className='flex m-3 pt-4'>
                        <div className="flex w-full">
                            <div className="px-8 w-full">
                                <form>

                                    <div className="mb-4">
                                    <select
                                    id="albumSelect"
                                    value={selectedAlbumId}
                                    onChange={(e) => setSelectedAlbumId(e.target.value)}
                                    className="w-full px-3 text-white py-2 rounded-lg border border-gray-300 focus:outline-none bg-transparent"
                                    >
                                    <option value="">Select album</option>
                                    {albums.map((album) => (
                                        <option key={album.id} value={album.id}>
                                        {album.title}
                                        </option>
                                    ))}
                                    </select>
                                    </div>

                                    <div className="mb-4">
                                    <select
                                    id="trackSelect"
                                    value={selectedTrackId}
                                    onChange={(e) => setSelectedTrackId(e.target.value)}
                                    className="w-full px-3 text-white py-2 rounded-lg border border-gray-300 focus:outline-none bg-transparent"
                                    >
                                    <option value="">Select track</option>
                                    {tracks.map((track) => (
                                        <option key={track.id} value={track.id}>
                                        {track.title}
                                        </option>
                                    ))}
                                    </select>
                                    </div>

                                    <div className="flex mb-96 pt-4 items-center">
                                        <label
                                        htmlFor="file-input"
                                        onClick={handleAddTrackToAlbum}
                                        disabled={!selectedTrackId || !selectedAlbumId}
                                        className="flex items-center justify-center w-48 h-12 px-4 py-2 text-sm font-medium text-black bg-white hover:bg-black hover:text-white rounded-md cursor-pointer"
                                        >
                                        <FaUpload className="mr-2" />
                                        Add to Album
                                        </label>
                                    </div>
                                </form>

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