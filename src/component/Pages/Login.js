import React, { useState } from 'react';

function Login() {
  const [user, setUser] = useState('');

  const connectWallet = () => {
    if (window.ethereum) {
      // MetaMask is installed
      window.ethereum
        .request({ method: 'eth_requestAccounts' })
        .then((accounts) => {
          // Connect successful, do something with the accounts
          console.log('Connected accounts:', accounts);
          // Redirect based on user type
          if (user === 'user') {
            window.location.href = '/';
          } else if (user === 'artiste') {
            window.location.href = '/dashboard';
          }
        })
        .catch((error) => {
          // Handle error
          console.error('Error connecting to MetaMask:', error);
        });
    } else {
      // MetaMask is not installed
      console.log('MetaMask is not installed');
      // You can show an error message or redirect to an installation page
    }
  };

  return (
    <div>
      <div className="mx-auto max-w-screen-xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-lg">
          <h1 className="text-center text-2xl font-bold text-black sm:text-3xl">Connect Address</h1>

          <p className="mx-auto mt-4 max-w-md text-center text-gray-500">
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Obcaecati sunt dolores deleniti inventore quaerat
            mollitia?
          </p>

          <form className="mb-0 mt-6 space-y-4 rounded-lg p-4 shadow-lg sm:p-6 lg:p-8">
            <p className="text-center text-lg font-medium">Choose user type</p>

            <div>
              <select
                className="w-full rounded-lg border-gray-200 p-4 pe-12 mb-4 text-sm shadow-sm"
                required
                onChange={(e) => {
                  setUser(e.target.value);
                }}
              >
                <option>Please select</option>
                <option value="user">User</option>
                <option value="artiste">Artiste</option>
              </select>
            </div>

            {user === 'user' && (
              <button
                type="button"
                onClick={connectWallet}
                className="block w-full rounded-lg bg-black px-5 py-3 text-sm font-medium text-white hover:bg-transparent hover:text-black border-black"
              >
                Connect Wallet
              </button>
            )}

            {user === 'artiste' && (
              <button
                type="button"
                onClick={connectWallet}
                className="block w-full rounded-lg bg-black px-5 py-3 text-sm font-medium text-white hover:bg-transparent hover:text-black border-black"
              >
                Connect Wallet
              </button>
            )}
          </form>
        </div>
      </div>
    </div>
  );
}

export default Login;
