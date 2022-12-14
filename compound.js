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
          "name": "_ids",
          "type": "uint256[]"
        }
      ],
      "name": "compound",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    }
  ];

  const provider = new ethers.providers.JsonRpcProvider(rpcUrl);

  const wallet = new ethers.Wallet(privateKey, provider);

  const contract = new ethers.Contract(contAddr, vpndAbi, provider);
  await contract.connect(wallet).compound([0,2,3,4]);
  res.send('success');
};
