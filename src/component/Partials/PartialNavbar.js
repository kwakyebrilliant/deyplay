/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useState } from 'react';
import { FaHome, FaMusic, FaRegFolder, FaHeart } from 'react-icons/fa';
import { MenuIcon, XIcon } from '@heroicons/react/outline';
import { Link, useNavigate } from 'react-router-dom';
import { ethers } from 'ethers';

const PartialNavbar = () => {
  const [nav, setNav] = useState(false);
  const handleClick = () => setNav(!nav);
  const handleClose = () => setNav(false);
  const [showModal, setShowModal] = useState(false);
  const handleClickModal = () => {
    setShowModal(true);
    handleClose();
  };
  const navigate = useNavigate();

  const Menu = () => {
    return (
      <div className='md:hidden' onClick={handleClick}>
        {!nav ? <MenuIcon className='w-5 text-white' /> : <XIcon className='w-5 text-white' />}
        <ul className={!nav ? 'hidden' : 'absolute bg-black w-fit z-10'}>
          <li className='border-zinc-900 w-fit text-white'>
            <Link to='/' className='flex' onClick={handleClose}>
              <FaHome className='text-2xl mr-4' />
              Home
            </Link>
          </li>
          <li className='border-zinc-900 w-fit text-white'>
            <Link to='/music' className='flex' onClick={handleClose}>
              <FaMusic className='text-2xl mr-4' />
              Music
            </Link>
          </li>
          <li className='border-zinc-900 w-fit text-white'>
            <Link to='/album' className='flex' onClick={handleClose}>
              <FaRegFolder className='text-2xl mr-4' />
              Album
            </Link>
          </li>
          <li className='border-zinc-900 w-fit text-white'>
            <Link to='/library' className='flex' onClick={handleClose}>
              <FaHeart className='text-2xl mr-4' />
              Library
            </Link>
          </li>
          <li className='border-zinc-900 w-fit text-white'>
            <a
              className='text-center cursor-pointer items-center px-8 py-2 text-black-600 bg-black border border-white rounded hover:bg-transparent hover:text-white active:text-white focus:outline-none focus:ring'
              type='submit'
              onClick={handleClickModal}
            >
              <span className='text-sm font-medium'>Connect Wallet</span>
            </a>
          </li>
        </ul>
        {showModal && <ConnectWalletModal showModal={showModal} setShowModal={setShowModal} navigate={navigate} />}
      </div>
    );
  };

  const ConnectWalletModal = () => {
    const [user, setUser] = useState('');
    const [isMetamaskConnected, setIsMetamaskConnected] = useState(false);

    const handleUserSelection = (e) => {
      setUser(e.target.value);
    };

    const handleModalClose = () => {
      setShowModal(false);
    };

    const connectToMetamask = async () => {
      if (window.ethereum) {
        try {
          await window.ethereum.request({ method: 'eth_requestAccounts' });
          setIsMetamaskConnected(true);
        } catch (error) {
          console.error(error);
        }
      }
    };

    const handleModalSubmit = () => {
      if (!isMetamaskConnected) {
        connectToMetamask();
        return;
      }

      if (user === 'user') {
        navigate('/', { state: user });
      } else if (user === 'artiste') {
        navigate('/dashboard', { state: user });
      }
      setShowModal(false);
    };

    return (
      <>
        {/* Modal content */}
        {showModal && (
          <div className='fixed inset-0 flex items-center justify-center z-50'>
            <div className='bg-white w-full max-w-md p-6 rounded-lg'>
              <h3 className='text-xl font-semibold mb-4'>Choose User</h3>
              <select
                name='HeadlineAct'
                id='HeadlineAct'
                className='mt-1.5 py-2 w-full rounded-lg border-gray-300 text-gray-700 sm:text-sm'
                required
                onChange={handleUserSelection}
              >
                <option>Please select</option>
                <option value='user'>User</option>
                <option value='artiste'>Artiste</option>
              </select>
              {isMetamaskConnected ? (
                <p className='text-green-500 mt-4'></p>
              ) : (
                user === 'user' && (
                  <button
                  className='mt-2 w-full bg-black hover:bg-transparent hover:text-black border-black text-white py-1.5 px-4 rounded'
                  onClick={connectToMetamask}
                >
                  Connect
                </button>
                )
              ) }
              {isMetamaskConnected ? (
                <p className='text-green-500 mt-4'></p>
              ) : (
                user === 'artiste' && (
                  <button
                  className='mt-2 w-full bg-black hover:bg-transparent hover:text-black border-black text-white py-1.5 px-4 rounded'
                  onClick={connectToMetamask}
                >
                  Connect
                </button>
                )
              ) }
              <div className='flex justify-end mt-4'>
                <button
                  className='text-black background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150'
                  type='button'
                  onClick={handleModalClose}
                >
                  Close
                </button>
                <button
                  className='text-black background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150'
                  type='button'
                  onClick={handleModalSubmit}
                >
                  Submit
                </button>
              </div>
            </div>
          </div>
        )}
      </>
    );
  };

  return (
    <nav className='bg-black/80 shadow-sm border-gray-200 lg:mx-2 px-2 py-2.5 rounded'>
      <div className='container flex justify-between items-center mx-auto'>
        <Menu />
        <div className='flex items-center mx-auto'>{/* Content */}</div>
        <div className='flex justify-end py-2'>
          <div className='hidden md:flex pr-4'>
            <button
              className='text-center cursor-pointer items-center px-8 py-2 mx-2 text-black-600 bg-white text-black border border-white rounded hover:bg-transparent hover:text-white active:text-white focus:outline-none focus:ring'
              type='submit'
              onClick={() => setShowModal(true)}
            >
              <span className='text-sm font-medium'>Connect Wallet</span>
            </button>
            {showModal && <ConnectWalletModal />}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default PartialNavbar;
