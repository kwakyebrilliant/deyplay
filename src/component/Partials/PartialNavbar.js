import React, { useState, useEffect } from 'react';
import { FaHome, FaMusic } from 'react-icons/fa';
import { MenuIcon, XIcon } from '@heroicons/react/outline';
import { Link } from 'react-router-dom';

const PartialNavbar = () => {
  const [nav, setNav] = useState(false);
  const [address, setAddress] = useState(null);

  useEffect(() => {
    // Check if MetaMask is installed and connected
    if (window.ethereum && window.ethereum.selectedAddress) {
      setAddress(window.ethereum.selectedAddress);
    } else {
      setAddress(null);
    }
  }, []);

  const handleClick = () => setNav(!nav);
  const handleClose = () => setNav(!nav);

  return (
    <nav className="bg-black/80 shadow-sm border-gray-200 lg:mx-2 px-2 py-2.5 rounded relative z-10">
      <div className="container flex justify-between items-center mx-auto">
        <div className="md:hidden" onClick={handleClick}>
          {!nav ? <MenuIcon className="w-5 text-white" /> : <XIcon className="w-5 text-white" />}

          <ul className={!nav ? 'hidden' : 'absolute bg-black w-fit'}>
            <li className="border-zinc-900 w-fit text-white">
              <Link to="/" className="flex" onClick={handleClose}>
                <FaHome className="text-2xl mr-4" />Home
              </Link>
            </li>
            <li className="border-zinc-900 w-fit text-white">
              <Link to="/music" className="flex" onClick={handleClose}>
                <FaMusic className="text-2xl mr-4" />Music
              </Link>
            </li>
            <li className="border-zinc-900 w-fit text-white">
              {address ? (
                <span className="text-sm text-black rounded-lg p-3 bg-white font-medium">{address.slice(0, 6)}…{address.slice(address.length - 6)}</span>
              ) : (
                <a
                  className="text-center cursor-pointer items-center px-8 py-2 text-black-600 bg-black border border-white rounded hover:bg-transparent hover:text-white active:text-white focus:outline-none focus:ring"
                  type="submit"
                  href="/login"
                >
                  <span className="text-sm font-medium">Connect Wallet</span>
                </a>
              )}
            </li>
          </ul>
        </div>
        <div className="flex items-center mx-auto"></div>
        <div className="flex justify-end py-2">
          <div className="hidden md:flex pr-4">
            {address ? (
              <span className="text-sm text-black rounded-lg p-3 bg-white font-medium">{address.slice(0, 6)}…{address.slice(address.length - 6)}</span>
            ) : (
              <a
                className="text-center cursor-pointer items-center px-8 py-2 mx-2 text-black-600 bg-white border border-white rounded hover:bg-transparent hover:text-white active:text-white focus:outline-none focus:ring"
                type="submit"
                href="/login"
              >
                <span className="text-sm font-medium">Connect Wallet</span>
              </a>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default PartialNavbar;
