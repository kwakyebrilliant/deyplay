require("@nomicfoundation/hardhat-toolbox");
const privateKey = 'f7b493fe5b4d0fde05524a0901c321bb65fb0177ebe07ccde9f99bc25ea1ebe6';

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