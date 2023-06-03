/* eslint-disable jsx-a11y/anchor-is-valid */
import React from 'react'

function AlbumCard() {
  return (
    <div className='mx-3'>


        <div className='relative grid grid-cols-2 lg:grid-cols-6 gap-x-8 gap-y-16'>


            <article className="overflow-hidden rounded-lg border border-black/80 bg-black shadow-sm">
                <a href='#'>
            <img
                alt="Office"
                src="https://images.unsplash.com/photo-1600880292203-757bb62b4baf?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1770&q=80"
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

        AlbumCard


    </div>
  )
}

export default AlbumCard