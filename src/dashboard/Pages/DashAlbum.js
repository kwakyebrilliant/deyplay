/* eslint-disable jsx-a11y/img-redundant-alt */
import React, { useState, useEffect } from 'react';
import Sidebar from '../Partials/Sidebar';
import PartialNavbar from '../Partials/PartialNavbar';
import albums from '../../component/assets/albums.jpg';
import { FaUpload } from 'react-icons/fa';

import { ethers } from 'ethers';
import { Web3Storage } from 'web3.storage';
import Deyplay from '../../artifacts/contracts/Deyplay.sol/Deyplay.json';
const deyplayAddress = "0x8E2C526010fB7176dEfa639e17303Be74E21c034";


function getAccessToken () {
   
  return 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJkaWQ6ZXRocjoweDE0ZGU4NTUwMjAxMTdENDIyY0IxOTRBREJiZERlOTJGZjBkYzkxNzciLCJpc3MiOiJ3ZWIzLXN0b3JhZ2UiLCJpYXQiOjE2ODY0ODYwNjYyNjksIm5hbWUiOiJEZXlwbGF5In0.7IJOEuXqeiau_nue9GSlHWWcpnROnPE6TP24oy4e9No'
}

function makeStorageClient () {
  return new Web3Storage({ token: getAccessToken() })
}

function DashAlbum() {

  const [title, setTitle] = useState('');
  const [artist, setArtist] = useState('');
  const [imageFile, setImageFile] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('');
  const [royaltiesOwners, setRoyaltiesOwners] = useState('');
  const [royaltiesPercentages, setRoyaltiesPercentages] = useState('');
  const [isMetamaskConnected, setIsMetamaskConnected] = useState(false);
  const [connectedAddress, setConnectedAddress] = useState('');


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


  useEffect(() => {
    // Check if MetaMask is connected
    if (typeof window.ethereum !== 'undefined') {
      setIsMetamaskConnected(true);

      // Get the connected address
      window.ethereum
        .request({ method: 'eth_accounts' })
        .then((accounts) => {
          if (accounts.length > 0) {
            setConnectedAddress(accounts[0]);
          }
        })
        .catch((error) => {
          console.error('Failed to get connected address:', error);
        });
    } else {
      setIsMetamaskConnected(false);
      setConnectedAddress('');
    }
  }, []);


  const handleFormSubmit = async (event) => {
    event.preventDefault();

    // Connect to the Ethereum provider
    const provider = new ethers.providers.Web3Provider(window.ethereum);

    // Get the signer
    const signer = provider.getSigner();

    // Instantiate the contract with the signer
    const contract = new ethers.Contract(deyplayAddress, Deyplay.abi, signer);

    // Prepare the royalties owners and percentages arrays
    const owners = royaltiesOwners.split(',');
    const percentages = royaltiesPercentages.split(',').map(Number);

    // Call the addAlbum function on the smart contract
    try {
      const transaction = await contract.addAlbum(
        title,
        artist,
        imageFile,
        description,
        ethers.utils.parseEther(price),
        owners,
        percentages
      );

      // Wait for the transaction to be mined
      await transaction.wait();

      // Reset the form fields
      setTitle('');
      setArtist('');
      setImageFile('');
      setDescription('');
      setPrice('');
      setRoyaltiesOwners([]);
      setRoyaltiesPercentages([]);

      // Display a success message or perform any other actions
      console.log('Album added successfully!');
    } catch (error) {
      // Handle the error appropriately
      console.error('Failed to add album:', error);
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
                        {isMetamaskConnected ? (
                        <h3 className="text-xl font-medium text-white">
                          {connectedAddress.slice(0, 6)}…{connectedAddress.slice(connectedAddress.length - 6)}
                        </h3>
                        ) : (
                          <h3 className="text-xl font-medium text-white">
                          Please connect your MetaMask
                        </h3>
                        )}
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
                              name="title"
                              placeholder="Album Title"
                              value={title} 
                              onChange={(e) => setTitle(e.target.value)}
                              required
                            />
                          </div>

                          <div className="mb-4">
                            <label className="block text-white text-sm font-bold mb-2" htmlFor="artist">
                              Your Address
                            </label>
                            <input
                              className="w-full px-3 text-white py-2 rounded-lg border border-gray-300 focus:outline-none bg-transparent"
                              type="text"
                              id="artist"
                              name="artist"
                              placeholder="Artiste Address"
                              value={artist} 
                              onChange={(e) => setArtist(e.target.value)}
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
                              value={price} 
                              onChange={(e) => setPrice(e.target.value)}
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
                              value={description}
                              onChange={(e) => setDescription(e.target.value)}
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
                            <label className="block text-white text-sm font-bold mb-2" htmlFor="royaltiesOwners">
                              Royalty Owners
                            </label>
                            <input
                              className="w-full px-3 text-white py-2 rounded-lg border border-gray-300 focus:outline-none bg-transparent"
                              type="text"
                              id="royaltiesOwners"
                              name="royaltiesOwners"
                              placeholder="Royalties Owners (comma-separated addresses)"
                              value={royaltiesOwners}
                              onChange={(e) => setRoyaltiesOwners(e.target.value)}
                              required
                            />
                          </div>

                          <div className="mb-4">
                            <label className="block text-white text-sm font-bold mb-2" htmlFor="royaltiesPercentages">
                              Royalty Owners Percentage
                            </label>
                            <input
                              className="w-full px-3 text-white py-2 rounded-lg border border-gray-300 focus:outline-none bg-transparent"
                              type="text"
                              id="royaltiesPercentages"
                              name="royaltiesPercentages"
                              placeholder="Royalties Percentages (comma-separated)"
                              value={royaltiesPercentages}
                              onChange={(e) => setRoyaltiesPercentages(e.target.value)}
                              required
                            />
                          </div>
                          </div>

                          <div className="container mx-auto px-4">
                            <h1 className="text-3xl font-bold text-white mb-8">File Upload</h1>
                            <div className="grid grid-cols gap-6">
                            
                              
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
                              onClick={handleFormSubmit}
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