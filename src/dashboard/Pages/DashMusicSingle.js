import React from 'react'
import Sidebar from '../Partials/Sidebar';
import PartialNavbar from '../Partials/PartialNavbar';
import coverimg from '../../component/assets/coverimg.jpeg';
import { FaUpload } from 'react-icons/fa';

function DashMusicSingle() {
  return (
    <div>
        <div className='bg-black/80'>
        <>

            <div className='flex flex-auto'>
            <Sidebar />

                <div className='grow'>
                    <PartialNavbar />

                    <div className="relative mx-2">
                        <img src={coverimg} alt="Background" className="w-full rounded object-cover h-96" />

                        <div className="absolute bg-black/30 inset-0 flex flex-col items-center justify-end p-6">
                        
                        <h3 className="text-xl font-medium text-white">
                            John Doe
                        </h3>
                        <p class="mt-1.5 max-w-[40ch] text-xs text-white">
                        Lorem ipsum dolor sit amet consectetur adipisicing elit. Dignissimos sequi
                        dicta impedit aperiam ipsum!
                        </p>

                        <div className="mt-4 flex flex-col items-center">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="h-12 w-12 text-white cursor-pointer"
                          viewBox="0 0 20 20"
                          fill="currentColor"
                        >
                          <path
                            fillRule="evenodd"
                            d="M5 4v12l10-6z"
                          />
                        </svg>

                        <div className="w-96 h-2 bg-gray-300 mt-2">
                          <div className="h-full bg-green-500" style={{ width: '80%' }} />
                        </div>
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