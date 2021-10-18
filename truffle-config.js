const HDWalletProvider = require("@truffle/hdwallet-provider");

require("babel-register");
require("babel-polyfill");

module.exports = {
  networks: {
    development: {
      host: "127.0.0.1",
      port: 7545,
      network_id: "*", // Match any network id
    },
    rinkeby: {
      provider: function() {
        return new HDWalletProvider({
          mnemonic: {
            phrase: process.env.MNEMONIC,
          },
          providerOrUrl: process.env.RINKEBY_URL,
        });
      },
      network_id: "*",
    },
  },
  contracts_directory: "./src/contracts/",
  contracts_build_directory: "./src/abis/",
  compilers: {
    solc: {
      version: "0.8.0",
      optimizer: {
        enabled: true,
        runs: 200,
      },
    },
  },
};
