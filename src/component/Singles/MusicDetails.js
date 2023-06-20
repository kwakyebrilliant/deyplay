import React, { useRef, useState } from 'react';
import Sidebar from '../Partials/Sidebar'
import PartialNavbar from '../Partials/PartialNavbar'

import { useLocation } from 'react-router-dom';

import { ethers } from 'ethers';

function MusicDetails() {
    let location = useLocation();
    const tracks = location.state;

    const audioRef = useRef(null);
    const [isPlaying, setIsPlaying] = useState(false);
    const [progress, setProgress] = useState(0);

    const handleTogglePlay = () => {
        if (isPlaying) {
        audioRef.current.pause();
        } else {
        audioRef.current.play();
        }
        setIsPlaying(!isPlaying);
    };

    const handleProgressChange = () => {
        const progressValue = (audioRef.current.currentTime / audioRef.current.duration) * 100;
        setProgress(progressValue);
    };

  return (
    <div>
         <div className='bg-black/80'>
            <>

            <div className='flex flex-auto'>
                <Sidebar />

                <div className='grow'>

                    <PartialNavbar />

                    <div className='mx-3 mt-8 mb-12'>
                        

                    </div>


                </div>


            </div>
            
            </>
        </div>

    </div>
  )
}

export default MusicDetails