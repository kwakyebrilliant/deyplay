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