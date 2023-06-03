/* eslint-disable jsx-a11y/anchor-is-valid */
import React from 'react'
import coverimg from '../assets/coverimg.jpeg';
import gm from '../assets/gm.jpeg';
import kl from '../assets/kl.jpeg';
import { FaPlayCircle } from 'react-icons/fa'

function AlbumCard() {
  return (
    <div className='mx-3'>


        <div className='relative grid grid-cols-2 lg:grid-cols-6 gap-x-8 gap-y-16'>


        <article className="overflow-hidden rounded-lg border border-black/80 bg-black shadow-sm">
                <a>
            <img
                alt="Office"
                src={gm}
                className="w-full h-40 p-4 object-cover"
            />

            <div className="p-4 sm:p-6">
                <h3 className="font-medium text-white">
                    John Doe
                </h3>

                <p className="line-clamp-3 text-sm/relaxed text-gray-500">
                I can fly
                </p>

            </div>
            </a>
            </article>

            <article className="overflow-hidden rounded-lg border border-black/80 bg-black shadow-sm">
                <a href='#'>
            <img
                alt="Office"
                src={coverimg}
                className="w-full h-40 p-4 object-cover"
            />

            <div className="p-4 sm:p-6">
                <h3 className="font-medium text-white">
                    John Doe
                </h3>

                <p className="line-clamp-3 text-sm/relaxed text-gray-500">
                I can fly
                </p>

            </div>
            </a>
            </article>

            <article className="overflow-hidden rounded-lg border border-black/80 bg-black shadow-sm">
                <a href='#'>
            <img
                alt="Office"
                src={gm}
                className="w-full h-40 p-4 object-cover"
            />

            <div className="p-4 sm:p-6">
                <h3 className="font-medium text-white">
                    John Doe
                </h3>

                <p className="line-clamp-3 text-sm/relaxed text-gray-500">
                I can fly
                </p>

            </div>
            </a>
            </article>

            <article className="overflow-hidden rounded-lg border border-black/80 bg-black shadow-sm">
                <a href='#'>
            <img
                alt="Office"
                src={kl}
                className="w-full h-40 p-4 object-cover"
            />

            <div className="p-4 sm:p-6">
                <h3 className="font-medium text-white">
                    John Doe
                </h3>

                <p className="line-clamp-3 text-sm/relaxed text-gray-500">
                I can fly
                </p>

            </div>
            </a>
            </article>

            <article className="overflow-hidden rounded-lg border border-black/80 bg-black shadow-sm">
                <a href='#'>
            <img
                alt="Office"
                src={coverimg}
                className="w-full h-40 p-4 object-cover"
            />

            <div className="p-4 sm:p-6">
                <h3 className="font-medium text-white">
                    John Doe
                </h3>

                <p className="line-clamp-3 text-sm/relaxed text-gray-500">
                I can fly
                </p>

            </div>
            </a>
            </article>

            <article className="overflow-hidden rounded-lg border border-black/80 bg-black shadow-sm">
                <a href='#'>
            <img
                alt="Office"
                src={coverimg}
                className="w-full h-40 p-4 object-cover"
            />

            <div className="p-4 sm:p-6">
                <h3 className="font-medium text-white">
                    John Doe
                </h3>

                <p className="line-clamp-3 text-sm/relaxed text-gray-500">
                I can fly
                </p>

            </div>
            </a>
            </article>

        </div>


    </div>
  )
}

export default AlbumCard