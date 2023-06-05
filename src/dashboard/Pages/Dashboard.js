import React from 'react'
import Sidebar from '../Partials/Sidebar';
import PartialNavbar from '../Partials/PartialNavbar';

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
                            Good {greet}, 0xgt...4bxe
                            </h1>

                            <p className="mt-1.5 text-sm text-gray-900">
                            Check your statistics on Deyplay🎉
                            </p>
                        </div>

                        
                        </div>
                    </div>
                    </header>
                </div>

                <div className='flex m-3 pt-4'>
                  <h2 className='text-white font-bold'>
                    These statistics
                  </h2>
            
                </div>



            </div>

            </div>
        </>
        
        </div>
    </div>
  )
}

export default Dashboard