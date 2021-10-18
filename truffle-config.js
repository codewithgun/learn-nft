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
            phrase:
              "wish purpose collect rate acoustic conduct thing edit window antique shock off",
          },
          providerOrUrl:
            "https://rinkeby.infura.io/v3/97b7f9de638542a58b56fd32c9c5319a",
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
