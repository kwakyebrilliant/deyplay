/* eslint-disable jsx-a11y/img-redundant-alt */
import React, { useState } from 'react';
import Sidebar from '../Partials/Sidebar';
import PartialNavbar from '../Partials/PartialNavbar';
import musics from '../../component/assets/musics.jpg';
import { FaUpload } from 'react-icons/fa';

import { Web3Storage } from 'web3.storage';

import { ethers } from 'ethers';
import Deyplay from '../../artifacts/contracts/Deyplay.sol/Deyplay.json';
// const deyplayAddress = "0x7b06D17d015500968AA413611f763F5e10F17Df2";


function DashMusic() {

  const [inputs, setInputs] = useState(['', '']);

  const handleAddInput = () => {
    setInputs((prevInputs) => [...prevInputs, '', '']);
  };

  const handleInputChange = (e, index) => {
    const newInputs = [...inputs];
    newInputs[index] = e.target.value;
    setInputs(newInputs);
  };


  const [audioFile, setAudioFile] = useState(null);
  const [imageFile, setImageFile] = useState(null);

  const handleAudioFileChange = (event) => {
    const file = event.target.files[0];
    setAudioFile(file);
  };

  const handleImageFileChange = (event) => {
    const file = event.target.files[0];
    setImageFile(file);
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
                        <img src={musics} alt="Background" className="w-full rounded object-cover h-96" />

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
                    <h2 className="text-2xl text-white font-bold mb-4">Music Upload Form</h2>
              
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
                              placeholder="Song Title"
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
                              placeholder="Song Price"
                              required
                            />
                          </div>

                          <div className="container mx-auto p-4">
                            <h1 className="text-sm font-bold text-white">
                              Add Royalties
                              <button className="px-3 mx-4 py-1 bg-white border-none text-black font-bold rounded hover:bg-black hover:text-white focus:outline-none"
                                onClick={handleAddInput}>
                                Add Royalties
                              </button> 
                              
                            </h1>
                            <p class="text-xs mt-6 text-white mb-8">
                            You have the opportunity to list all individuals entitled to royalties.
                            Provide the address of a royalty owner in the first input and enter a figure from 1-100
                            to that address in the second input, do not add the percentage sign.
                            Use the "Add Royalties" button to add other royalty owners.
                            </p>

                            {inputs.map((input, index) => (
                              <div key={index} className="mb-6">
                                <label className="block mb-2 text-lg font-medium text-white">
                                  Input {index + 1}
                                </label>
                                <input
                                  type="text"
                                  value={input}
                                  onChange={(e) => handleInputChange(e, index)}
                                  className="w-full mb-3 px-3 text-white py-2 rounded-lg border border-gray-300 focus:outline-none bg-transparent"
                                />
                              </div>
                            ))}
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
                                    <source src={URL.createObjectURL(audioFile)} />
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
                                    src={URL.createObjectURL(imageFile)}
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
                              Upload Music
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

export default DashMusic