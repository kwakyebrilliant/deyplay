/* eslint-disable jsx-a11y/img-redundant-alt */
import React, { useState } from 'react';
import Sidebar from '../Partials/Sidebar';
import PartialNavbar from '../Partials/PartialNavbar';
import albums from '../../component/assets/albums.jpg';
import { FaUpload } from 'react-icons/fa';

import { ethers } from 'ethers';
import { Web3Storage } from 'web3.storage';
import Deyplay from '../../artifacts/contracts/Deyplay.sol/Deyplay.json';
const deyplayAddress = "0x2725086017dEA86B54f99C904366921E4603a484";

// Connect to the Ethereum network using ethers.js
const provider = new ethers.providers.Web3Provider(window.ethereum);
const signer = provider.getSigner();

// Instantiate the smart contract
const contract = new ethers.Contract(deyplayAddress, Deyplay.abi, signer);

function getAccessToken () {
   
  return 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJkaWQ6ZXRocjoweDE0ZGU4NTUwMjAxMTdENDIyY0IxOTRBREJiZERlOTJGZjBkYzkxNzciLCJpc3MiOiJ3ZWIzLXN0b3JhZ2UiLCJpYXQiOjE2ODY0ODYwNjYyNjksIm5hbWUiOiJEZXlwbGF5In0.7IJOEuXqeiau_nue9GSlHWWcpnROnPE6TP24oy4e9No'
}

function makeStorageClient () {
  return new Web3Storage({ token: getAccessToken() })
}

function DashAlbum() {

  
  const [title, setTitle] = useState("");
  const [artist, setArtist] = useState("");
  const [audioFiles, setAudioFiles] = useState([]);
  const [imageFile, setImageFile] = useState(null);
  const [price, setPrice] = useState(0);
  const [royaltiesOwners, setRoyaltiesOwners] = useState([]);
  const [royaltiesPercentages, setRoyaltiesPercentages] = useState([]);


  const handleAudioFileChange = (e, index) => {
    const file = e.target.files[0];

    if (file && file.type.includes('audio')) {
      setAudioFiles((prevFiles) => {
        const newFiles = [...prevFiles];
        newFiles[index] = file;
        return newFiles;
      });
    }
  };

  const handleAddAudioFiles = () => {
    setAudioFiles((prevFiles) => [...prevFiles, null]);
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


  const handleInputChange = (event) => {
    const target = event.target;
    const name = target.name;
    const value = target.value;

    // Handle input fields except audio files
    if (name === "title") setTitle(value);
    else if (name === "artist") setArtist(value);
    else if (name === "imageFile") setImageFile(value);
    else if (name === "price") setPrice(parseFloat(value));
    else if (name === "royaltiesOwners") {
      const owners = value.split(",");
      setRoyaltiesOwners(owners);
    } else if (name === "royaltiesPercentages") {
      const percentages = value.split(",").map(Number);
      setRoyaltiesPercentages(percentages);
    }
  };


  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      // Convert the royalties percentages to integers (e.g., 10% => 10)
      const royalties = royaltiesPercentages.map((percentage) => parseInt(percentage));

      // Call the smart contract's addAlbum function
      await contract.addAlbum(title, artist, imageFile, audioFiles, price, royaltiesOwners, royalties);

      // Clear the form fields
      setTitle("");
      setArtist("");
      setImageFile("");
      setAudioFiles([]);
      setPrice(0);
      setRoyaltiesOwners([]);
      setRoyaltiesPercentages([]);

      alert("Album added successfully!");
    } catch (error) {
      console.error(error);
      alert("Failed to add the album. Please try again.");
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


                <div className="relative mx-2">
                        <img src={albums} alt="Background" className="w-full rounded object-cover h-96" />

                        <div className="absolute bg-black/30 inset-0 flex flex-col items-center justify-end p-6">
                        
                        <h3 className="text-xl font-medium text-white">
                          0xgt...4bxe
                        </h3>
                        <p class="mt-1.5 max-w-[40ch] text-xs text-white">
                        Lorem ipsum dolor sit amet consectetur adipisicing elit. Dignissimos sequi
                        dicta impedit aperiam ipsum!
                        </p>
                        </div>
                   
                </div>


                <div className='flex m-3 pt-4'>
                  <h2 className="text-2xl text-white font-bold mb-4">Album Upload Form</h2>
                
                </div>

                <div className='flex m-3 pt-4'>
                  <div className="flex w-full">
                      <div className="px-8 w-full">

                        <form>
                        <div className="mb-4">
                            <label className="block text-white text-sm font-bold mb-2" htmlFor="title">
                              Title
                            </label>
                            <input
                              className="w-full px-3 text-white py-2 rounded-lg border border-gray-300 focus:outline-none bg-transparent"
                              type="text"
                              id="title"
                              name="natitleme"
                              placeholder="Album Title"
                              value={title} 
                              onChange={handleInputChange}
                              required
                            />
                          </div>

                          <div className="mb-4">
                            <label className="block text-white text-sm font-bold mb-2" htmlFor="address">
                              Your Address
                            </label>
                            <input
                              className="w-full px-3 text-white py-2 rounded-lg border border-gray-300 focus:outline-none bg-transparent"
                              type="text"
                              id="address"
                              name="address"
                              placeholder="Artiste Address"
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
                              placeholder="Album Price"
                              required
                            />
                          </div>

                          <div className="mb-4">
                            <label className="block text-white text-sm font-bold mb-2" htmlFor="description">
                              Description
                            </label>
                            <textarea
                              className="w-full px-3 text-white py-2 rounded-lg border border-gray-300 focus:outline-none bg-transparent"
                              type="text"
                              id="description"
                              name="description"
                              placeholder="Album Description"
                              required
                              rows='4'
                            >
                              </textarea>
                          </div>

                          <div className="container mx-auto p-4">
                            <h1 className="text-sm font-bold text-white">
                              Add Royalties     
                            </h1>
                            <p class="text-xs mt-6 text-white mb-8">
                            You have the opportunity to list all individuals entitled to royalties.
                            Provide the address of a royalty owner in the first input and enter a figure from 1-100
                            to that address in the second input, do not add the percentage sign.
                            Use the "Add Royalties" button to add other royalty owners.
                            </p>

                            <div className="mb-4">
                            <label className="block text-white text-sm font-bold mb-2" htmlFor="owners">
                              Royalty Owners
                            </label>
                            <input
                              className="w-full px-3 text-white py-2 rounded-lg border border-gray-300 focus:outline-none bg-transparent"
                              type="text"
                              id="owners"
                              name="owners"
                              placeholder="Royalties Owners (comma-separated addresses)"
                              required
                            />
                          </div>

                          <div className="mb-4">
                            <label className="block text-white text-sm font-bold mb-2" htmlFor="percentage">
                              Royalty Owners Percentage
                            </label>
                            <input
                              className="w-full px-3 text-white py-2 rounded-lg border border-gray-300 focus:outline-none bg-transparent"
                              type="number"
                              id="percentage"
                              name="percentage"
                              placeholder="Royalties Percentages (comma-separated)"
                              required
                            />
                          </div>
                          </div>

                          <div className="container mx-auto px-4">
                            <h1 className="text-3xl font-bold text-white mb-8">File Upload</h1>
                            <div className="grid grid-cols gap-6">

                            <label className="block text-white text-sm font-bold mb-2" htmlFor="royalties">
                              Audio File
                              <button className="px-3 mx-4 py-1 bg-white border-none text-black font-bold rounded hover:bg-black hover:text-white focus:outline-none"
                              onClick={handleAddAudioFiles}>
                              Add Audio File
                            </button> 
                            </label>

                           

                            {audioFiles.map((file, index) => (
                              <div key={index} className="mb-6">
                                <label className="block mb-2 text-lg font-medium text-white">
                                  Audio File {index + 1}
                                </label>
                                <div className="flex items-center">
                                  <label
                                    htmlFor={`audio-file-input-${index}`}
                                    className="flex items-center justify-center w-48 h-12 px-4 py-2 text-sm font-medium text-black bg-white rounded-md cursor-pointer hover:bg-black hover:text-white focus:outline-none"
                                  >
                                    Choose Audio
                                    <input
                                      id={`audio-file-input-${index}`}
                                      type="file"
                                      accept="audio/*"
                                      onChange={(e) => handleAudioFileChange(e, index)}
                                      className="hidden"
                                    />
                                  </label>
                                  {file && (
                                    <audio controls className="ml-4 w-full">
                                      <source src={URL.createObjectURL(file)} />
                                    </audio>
                                  )}
                                </div>
                              </div>
                            ))}
                            
                              
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
                            >
                              <FaUpload className="mr-2" />
                              Upload Album
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

export default DashAlbum