require("@nomicfoundation/hardhat-toolbox");
const privateKey = '';

module.exports = {
  defaultNetwork: 'hardhat',
  networks: {
    hardhat: {
      chainId: 1313161555,
    },
    testnet_aurora: {
      url: 'https://testnet.aurora.dev',
      accounts: [privateKey],
    },
  },
  solidity: {
    version: '0.8.4',
      paths: {
    artifacts: './src/artifacts',
  },
    settings: {
      optimizer: {
        enabled: true,
        runs: 200,
      },
    },
  },
};