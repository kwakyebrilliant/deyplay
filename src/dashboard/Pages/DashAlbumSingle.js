/* eslint-disable jsx-a11y/img-redundant-alt */
import React, { useState } from 'react';
import Sidebar from '../Partials/Sidebar';
import PartialNavbar from '../Partials/PartialNavbar';
import library from '../../component/assets/library.jpg';
import { FaMoneyBill, FaEye, FaUpload } from 'react-icons/fa'
import { useLocation } from 'react-router-dom'


import { ethers } from 'ethers';
import { Web3Storage } from 'web3.storage';
import Deyplay from '../../artifacts/contracts/Deyplay.sol/Deyplay.json';
const deyplayAddress = "0x10032186693ebe3e611182B7dfe51a8a7d95853E";

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


    const [title, setTitle] = useState('');
    const [imageFile, setImageFile] = useState('');
    const [audioFile, setAudioFile] = useState('');
    const [price, setPrice] = useState('');


    async function handleAudioFileChange(event) {
      const audiofileUploaded = event.target.files[0];
      setAudioFile(URL.createObjectURL(event.target.files[0]));
      const client = makeStorageClient()
      const cid = await client.put([audiofileUploaded])
      console.log('stored files with cid:', cid)
  
      const res = await client.get(cid)
      console.log(`Got a response! [${res.status}] ${res.statusText}`)
      if (!res.ok) {
        throw new Error(`failed to get ${cid} - [${res.status}] ${res.statusText}`)
      }
  
  
      const filess = await res.files();
      setAudioFile(`https://${cid}.ipfs.dweb.link/${audiofileUploaded.name}`);
      console.log(audioFile)
      console.log(audiofileUploaded)
      for (const file of filess) {
        console.log(`${file.cid} -- ${file.path} -- ${file.size}`)
      }
      return cid
  
    };
  
  
    async function handleImageFileChange(event) {
      const imagefileUploaded = event.target.files[0];
      setImageFile(URL.createObjectURL(event.target.files[0]));
      const client = makeStorageClient()
      const cid = await client.put([imagefileUploaded])
      console.log('stored files with cid:', cid)
  
      const res = await client.get(cid)
      console.log(`Got a response! [${res.status}] ${res.statusText}`)
      if (!res.ok) {
        throw new Error(`failed to get ${cid} - [${res.status}] ${res.statusText}`)
      }
  
  
      const filess = await res.files();
      setImageFile(`https://${cid}.ipfs.dweb.link/${imagefileUploaded.name}`);
      console.log(imageFile)
      console.log(imagefileUploaded)
      for (const file of filess) {
        console.log(`${file.cid} -- ${file.path} -- ${file.size}`)
      }
      return cid
  
    };



  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // Connect to Ethereum provider
      const provider = new ethers.providers.Web3Provider(window.ethereum);

      // Prompt user to connect their wallet
      await provider.send('eth_requestAccounts', []);

      // Get the signer (current user)
      const signer = provider.getSigner();

      // Create the contract instance
      const contract = new ethers.Contract(deyplayAddress, Deyplay.abi, signer);

      // Call the addTrackToAlbum function
      const albumId = 1; // Replace with the desired album ID
      await contract.addTrackToAlbum(albumId, title, audioFile, imageFile, ethers.utils.parseEther(price));

      // Clear the form
      setTitle('');
      setAudioFile('');
      setImageFile('');
      setPrice('');
    } catch (error) {
      console.error(error);
    }
  };

  
    return (
        <div>
          <div className='bg-black/80'>
            <div className='flex flex-auto'>
              <Sidebar />
    
              <div className='grow'>
                <PartialNavbar />
    
                <div className='mx-3 mt-8'>
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
                          <img src={albums.audioFiles} alt="Image" className="w-36 h-24 rounded-lg object-cover" />
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

                <div className='mx-3 mt-12'>
                  <div className="flex w-full">
                    <div className="px-8 w-full">
                    <hr className="border-t border-gray-300 my-6" />

                      <form>

                      <div className="mb-4">
                        <h1 className='text-white text-3xl font-bold mb-4'>
                          Add Track To Album
                        </h1>
                      </div>

                        <div className="mb-4">
                            <label className="block text-white text-sm font-bold mb-2" htmlFor="title">
                              Title
                            </label>
                            <input
                              className="w-full px-3 text-white py-2 rounded-lg border border-gray-300 focus:outline-none bg-transparent"
                              type="text"
                              id="title"
                              name="natitleme"
                              placeholder="Song Title"
                              value={title} 
                              onChange={(e) => setTitle(e.target.value)}
                              required
                            />
                        </div>

                        <div className="mb-4">
                            <label className="block text-white text-sm font-bold mb-2" htmlFor="price">
                              Price
                            </label>
                            <input
                              className="w-full px-3 text-white py-2 rounded-lg border border-gray-300 focus:outline-none bg-transparent"
                              type="number"
                              id="price"
                              name="price"
                              placeholder="Song Price"
                              value={price} 
                              onChange={(e) => setPrice(e.target.value)}
                              required
                            />
                          </div>


                          <div className="container mx-auto px-4">
                            <h1 className="text-3xl font-bold text-white mb-8">File Upload</h1>
                            <div className="grid grid-cols gap-6">
                              <div className="mb-6">
                                <label className="block mb-2 text-lg font-medium text-white">
                                  Audio File
                                </label>
                                <div className="flex items-center">
                                  <label
                                    htmlFor="audio-file-input"
                                    className="flex items-center justify-center w-48 h-12 px-4 py-2 text-sm font-medium text-black bg-white rounded-md cursor-pointer hover:bg-black hover:text-white focus:outline-none"
                                  >
                                    Choose Audio
                                    <input
                                      id="audio-file-input"
                                      type="file"
                                      accept="audio/*"
                                      onChange={handleAudioFileChange}
                                      className="hidden"
                                    />
                                  </label>
                                </div>
                                {audioFile && (
                                  <audio controls className="my-4 w-full">
                                    <source src={audioFile} />
                                  </audio>
                                )}
                              </div>
                              <div className="mb-6">
                                <label className="block mb-2 text-lg font-medium text-white">
                                  Image File
                                </label>
                                <div className="flex items-center">
                                  <label
                                    htmlFor="image-file-input"
                                    className="flex items-center justify-center w-48 h-12 px-4 py-2 text-sm font-medium text-black bg-white rounded-md cursor-pointer hover:bg-black hover:text-white focus:outline-none"
                                  >
                                    Choose Image
                                    <input
                                      id="image-file-input"
                                      type="file"
                                      accept="image/*"
                                      onChange={handleImageFileChange}
                                      className="hidden"
                                    />
                                  </label>
                                </div>
                                {imageFile && (
                                  <img
                                    src={imageFile}
                                    alt="Image Preview"
                                    className="my-4 sm:w-24 sm:h-24 lg:w-full lg:h-96 object-cover rounded"
                                  />
                                )}
                              </div>
                            </div>
                          </div>

                          <div className="flex mb-12 ml-4 items-center">
                            <label
                              htmlFor="file-input"
                              className="flex items-center justify-center w-48 h-12 px-4 py-2 text-sm font-medium text-black bg-white hover:bg-black hover:text-white rounded-md cursor-pointer"
                              onClick={handleSubmit}
                            >
                              <FaUpload className="mr-2" />
                              Upload Music
                            </label>
                          </div>


                      </form>

                    </div>
                  </div>
                </div>


              </div>
            </div>
          </div>
        </div>
      );
}

export default DashAlbumSingle