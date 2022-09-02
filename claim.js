const { ethers } = require('ethers');
const dotenv = require('dotenv');
dotenv.config();

// @user - TO-DO: Enter your details in the .env.example file and delete '.example' from filename
exports.helloWorld = async (req, res) => {
  const contAddr = '0xc7be5348f9e46be76aa7bf153cdc0113f6988ca0'; // VPND Contract Address
  const privateKey = process.env.privateKey;
  const rpcUrl = process.env.rpcUrl;

  //compound(uint256[] tokenIds)
  const vpndAbi = [
    {
      "inputs": [
        {
          "internalType": "uint256[]",
          "name": "tokenIds",
          "type": "uint256[]"
        },
        {
          "internalType": "bool",
          "name": "unstake",
          "type": "bool"
        }
      ],
      "name": "claim",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    }
  ];

  // A Web3Provider wraps a standard Web3 provider, which is
  // what MetaMask injects as window.ethereum into each page
  const provider = new ethers.providers.JsonRpcProvider(rpcUrl);

  const wallet = new ethers.Wallet(privateKey, provider);

  const contract = new ethers.Contract(contAddr, vpndAbi, provider);
  await contract.connect(wallet).claim([1], false);

  res.send('success');
};
