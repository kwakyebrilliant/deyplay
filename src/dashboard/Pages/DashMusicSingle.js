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
    

    const [tracks, setTracks] = useState([]);
    const [albums, setAlbums] = useState([]);
    const [currentAccount, setCurrentAccount] = useState('');
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
    
          fetchTracks();
          fetchAlbums();
        } catch (error) {
          console.error('Error connecting to MetaMask:', error);
        }
      }


      async function fetchTracks() {
        try {
          const provider = new ethers.providers.Web3Provider(window.ethereum);
          const contract = new ethers.Contract(deyplayAddress, Deyplay.abi, provider);
    
          const trackCount = await contract.getTrackCount();
          const trackPromises = [];
          for (let i = 0; i < trackCount; i++) {
            trackPromises.push(contract.getTrack(i));
          }
          const trackResults = await Promise.all(trackPromises);
          const tracks = trackResults.map((result) => ({
            id: result[0].toNumber(),
            title: result[1],
            artist: result[2],
            audioFile: result[3],
            royaltiesOwners: result[4],
            royaltiesPercentages: result[5],
            streamCount: result[6].toNumber(),
            purchaseCount: result[7].toNumber(),
            price: ethers.utils.formatEther(result[8]),
            imageUrl: result[9],
          }));
    
          setTracks(tracks);
        } catch (error) {
          console.error('Error fetching tracks:', error);
        }
      }

      async function fetchAlbums() {
        try {
          const provider = new ethers.providers.Web3Provider(window.ethereum);
          const contract = new ethers.Contract(deyplayAddress, Deyplay.abi, provider);
    
          const albumCount = await contract.getAlbumCount();
          const albumPromises = [];
          for (let i = 0; i < albumCount; i++) {
            albumPromises.push(contract.getAlbum(i));
          }
          const albumResults = await Promise.all(albumPromises);
          const albums = albumResults.map((result) => ({
            id: result[0].toNumber(),
            title: result[1],
            artist: result[2],
            description: result[3],
            royaltiesOwners: result[4],
            royaltiesPercentages: result[5],
            trackIds: result[6].map((trackId) => trackId.toNumber()),
            streamCount: result[7].toNumber(),
            purchaseCount: result[8].toNumber(),
            price: ethers.utils.formatEther(result[9]),
            imageUrl: result[10],
          }));
    
          setAlbums(albums);
        } catch (error) {
          console.error('Error fetching albums:', error);
        }
      }


      async function addTrackToAlbum() {
        try {
          const provider = new ethers.providers.Web3Provider(window.ethereum);
          const signer = provider.getSigner();
          const contract = new ethers.Contract(deyplayAddress, Deyplay.abi, signer);
    
          await contract.addTrackToAlbum(selectedTrackId, selectedAlbumId);
    
          // Refresh the tracks and albums after adding the track to the album
          fetchTracks();
          fetchAlbums();
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
                                            name="HeadlineAct"
                                            id="HeadlineAct"
                                            className="w-full px-3 text-white py-2 rounded-lg border border-gray-300 focus:outline-none bg-transparent"
                                        >
                                            <option>Please select</option>
                                            <option value="user">I can fly</option>
                                            <option value="artiste">I can fly</option>
                                        </select>
                                    </div>

                                    <div className="flex mb-96 pt-4 items-center">
                                        <label
                                        htmlFor="file-input"
                                        className="flex items-center justify-center w-48 h-12 px-4 py-2 text-sm font-medium text-black bg-white hover:bg-black hover:text-white rounded-md cursor-pointer"
                                        >
                                        <FaUpload className="mr-2" />
                                        Add to Album
                                        <input
                                            id="file-input"
                                            type="file"
                                            className="hidden"
                                        />
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