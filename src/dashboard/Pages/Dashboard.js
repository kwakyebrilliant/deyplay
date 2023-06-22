/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useEffect, useState } from 'react';
import Sidebar from '../Partials/Sidebar';
import PartialNavbar from '../Partials/PartialNavbar';
import musicstream from '../../component/assets/musicstream.jpg';
import albums from '../../component/assets/albums.jpg';
import { FaEye, FaMoneyBill, FaFileUpload } from 'react-icons/fa'

import { ethers } from 'ethers';
import Deyplay from '../../artifacts/contracts/Deyplay.sol/Deyplay.json';
const deyplayAddress = "0x144a3ba7066548874212EE81A1D45fe24432D397";

function Dashboard() {

    var myDate = new Date();
    var hours= myDate.getHours();
    var greet;
  
    if (hours < 12)
        greet =  "morning";
    else if (hours >= 12 && hours <= 17)
        greet = "afternoon";
    else if (hours >= 17 && hours <= 24)
        greet = "evening";


        const [web3Provider, setWeb3Provider] = useState(null);
        const [contract, setContract] = useState(null);
        const [account, setAccount] = useState('');
        const [totalUploaded, setTotalUploaded] = useState(0);
        const [totalStreams, setTotalStreams] = useState(0);
        const [artistBalance, setArtistBalance] = useState(0);
      
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
      
        const handleGetStats = async () => {
          if (!contract || !account) return;
      
          try {
            const totalUploaded = await contract.getTotalTracksUploadedByArtist(account);
            setTotalUploaded(totalUploaded.toNumber());
      
            const totalStreams = await contract.getTotalTrackStreams(account);
            setTotalStreams(totalStreams.toNumber());
      
            const artistBalance = await contract.getArtistBalance(account);
            setArtistBalance(ethers.utils.formatEther(artistBalance));
          } catch (error) {
            console.error('Error:', error);
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

                <div className='mx-3 mt-8'>
            
                    <header className="rounded-2xl inset-x-0 bottom-0 bg-gradient-to-r from-green-300 via-blue-500 to-purple-600">
                    <div className="max-w-screen-xl px-4 py-8 mx-auto sm:py-12 sm:px-6 lg:px-8">
                        <div className="sm:justify-between sm:items-center sm:flex">
                        <div className="text-center sm:text-left">
                            <h1 className="text-2xl font-bold text-gray-900 sm:text-3xl">
                            Good {greet}, {account.slice(0, 6)}…{account.slice(account.length - 6)}
                            </h1>

                            <p className="mt-1.5 text-sm text-gray-900">
                            Check your statistics on Deyplay🎉
                            </p>
                        </div>

                        
                        </div>
                    </div>
                    </header>
                </div>


                <div className='m-3 pt-4'>
                  <h2 className='text-white font-bold'>
                    Some Actions
                  </h2>
                  <div className="flex pt-4 items-center">
                    <div   onClick={handleGetStats} className="bg-white text-black hover:bg-black hover:text-white rounded-lg p-2 cursor-pointer">
                        <span>Get Statistics</span>
                    </div>
                    </div>
                </div>

                <div className="container mx-auto p-4">
                <div className="flex flex-col items-center space-y-4 sm:flex-row sm:justify-between sm:space-y-0 mb-8">
                    <div className="flex items-center">
                    <FaMoneyBill className=' text-white w-6 h-6 lg:w-12 lg:h-12 pr-1' />
                    <h3 className="text-xl ml-2 font-bold text-white">
                    {artistBalance} ETH
                    </h3>
                    </div>

                    <div className="flex items-center">
                    <div className="bg-white text-black hover:bg-black hover:text-white rounded-lg p-4 cursor-pointer">
                        <span>Calculate Royalties</span>
                    </div>
                    </div>

                    <div className="flex items-center">
                    <div className="bg-white text-black hover:bg-black hover:text-white rounded-lg p-4 cursor-pointer">
                        <span>Distribute Royalties</span>
                    </div>
                    </div>
                </div>

                <div className="w-full h-px bg-gray-200"></div>
                </div>

                <div className='flex m-3 pt-4'>
                  <h2 className='text-white font-bold'>
                    These Statistics
                  </h2>
                </div>


                <div className='relative m-3 grid grid-cols-1 lg:grid-cols-2 gap-x-8 gap-y-16'>


                    <article className="overflow-hidden rounded-lg border border-black/80 bg-black shadow-sm">
                            <a>
                        <img
                            alt="Office"
                            src={albums}
                            className="w-full h-80 p-4 object-cover"
                        />

                        <div className="p-4 sm:p-6">
                            <h3 className="font-medium text-white">
                                Total Musics Uploaded
                            </h3>

                            <p className="line-clamp-3 flex text-sm/relaxed text-gray-500">
                            <FaFileUpload className=' text-white w-6 h-6 lg:w-4 lg:h-4 pr-1' />
                            {totalUploaded}
                            </p>

                        </div>
                        </a>
                        </article> 

                        <article className="overflow-hidden rounded-lg border border-black/80 bg-black shadow-sm">
                            <a>
                        <img
                            alt="Office"
                            src={musicstream}
                            className="w-full h-80 p-4 object-cover"
                        />

                        <div className="p-4 sm:p-6">
                            <h3 className="font-medium text-white">
                                Musics Streams
                            </h3>

                            <p className="line-clamp-3 flex text-sm/relaxed text-gray-500">
                            <FaEye className=' text-white w-6 h-6 lg:w-6 lg:h-6 pr-1' />
                            {totalStreams}
                            </p>

                        </div>
                        </a>
                        </article>

                    </div>

                    <div className='flex mt-4 justify-center m-3 pt-4'>
                    <h2 className='text-white font-bold'>
                        What next?
                    </h2>
                
                    </div>
                    

                    <div className="flex mb-20 justify-center items-center">
                    <span className="inline-flex justify-center -space-x-px overflow-hidden rounded-md border bg-white shadow-sm">
                        <button className="inline-block px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 focus:relative">
                        <a href="dashmusic">
                        Add Musics
                        </a>
                        </button>
                    </span>
                    </div>



            </div>

            </div>
        </>
        
        </div>
    </div>
  )
}

export default Dashboard