const HDWalletProvider = require("truffle-hdwallet-provider-privkey");
const privateKeys = ["446fbba87648ed7cbfb410e1fdc97ceb8a79b8f69e5094a1befd9b248cdc9175"]; // private keys

module.exports = {
  networks: {
    development: {
      host: "127.0.0.1",
      port: 7545,     // ganache
      network_id: "*" // Match any network id
    },
    awsNetwork: {
      provider: () => {
        return new HDWalletProvider(privateKeys, "http://13.125.217.83:8545")
      },
      network_id: 15,
      gas: 2000000,
      gasPrice: 10000000000
    }
  }
};
