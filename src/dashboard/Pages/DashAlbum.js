import React, { useState } from 'react';
import Sidebar from '../Partials/Sidebar';
import PartialNavbar from '../Partials/PartialNavbar';
import albums from '../../component/assets/albums.jpg';

function DashAlbum() {

  const [inputs, setInputs] = useState(['']);

  const handleAddInput = () => {
    setInputs([...inputs, '']);
  };

  const handleChangeInput = (index, value) => {
    const updatedInputs = [...inputs];
    updatedInputs[index] = value;
    setInputs(updatedInputs);
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

                          <div className="py-4">
                            <label className="block text-white text-sm font-bold mb-2" htmlFor="royalties">
                              Royalties
                              <button className="px-3 mx-4 py-1 bg-white border-none text-black font-bold rounded hover:bg-black hover:text-white focus:outline-none"
                              onClick={handleAddInput}>
                              Add Royalties
                            </button> 
                            </label>
                            {inputs.map((input, index) => (
                            <div className="flex items-center mt-4" key={index}>
                            <input
                              className="w-full mb-6 px-3 text-white py-2 rounded-lg border border-gray-300 focus:outline-none bg-transparent"
                              type="text"
                              id="royalties"
                              name="royalties"
                              placeholder="Address of Royalties owner"
                              value={input}
                              onChange={(e) => handleChangeInput(index, e.target.value)}
                              required
                            />
                          </div>
                          ))}
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