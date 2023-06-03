import React from 'react'
import Sidebar from '../Partials/Sidebar'
import PartialNavbar from '../Partials/PartialNavbar'
import AlbumCard from '../Cards/AlbumCard'
import MusicCard from '../Cards/MusicCard'

function Library() {
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
                            Welcome Back, Brilliant!
                            </h1>

                            <p className="mt-1.5 text-sm text-gray-900">
                            Check your statistics on LOGCHAIN 🎉
                            </p>
                        </div>

                        
                        </div>
                    </div>
                    </header>
                    </div>

                    <div className='flex m-3 pt-4'>
                  <h2 className='text-white font-bold'>
                    Purchased Albums
                  </h2>
            
                </div>

                {/* Album Card imported */}
                <AlbumCard />


                <div className='flex m-3 pt-4'>
                  <h2 className='text-white font-bold'>
                    Purchased Musics
                  </h2>
            
                </div>

                {/* Music Card imported */}
                <MusicCard />
    
                </div>
    
            </div>
            </>
            </div>
        </div>
      )
}

export default Library