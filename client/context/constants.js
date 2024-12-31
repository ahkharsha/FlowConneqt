import { ethers } from "ethers";
import Web3Modal from "web3modal";
import axios from "axios";

import socialMediaDapp from "./SocialMediaDapp.json";

export const CONTRACT_ABI = socialMediaDapp.abi;
export const CONTRACT_ADDRESS = "0x667e64FDf36fB1512DEfFca951dDFc3f56461bd5";

export const PINATA_API_KEY = "6913532cb8a350b6dbb3";
export const PINATA_SECRECT_KEY = "0c93e6871fd49b760c5aa1461e5fb4c86e6bd3e6bdf61c3220efdc0aee4020b4";

// NETWORK
const networks = {
  flow_mainnet: {
    chainId: `0x${Number(747).toString(16)}`,
    chainName: "Flow Mainnet",
    nativeCurrency: {
      name: "FLOW",
      symbol: "FLOW",
      decimals: 18,
    },
    rpcUrls: ["https://mainnet.evm.nodes.onflow.org/"],
    blockExplorerUrls: ["https://evm.flowscan.io/"],
  },
  flow_testnet: {
    chainId: `0x${Number(545).toString(16)}`,
    chainName: "Flow Testnet",
    nativeCurrency: {
      name: "FLOW",
      symbol: "FLOW",
      decimals: 18,
    },
    rpcUrls: ["https://testnet.evm.nodes.onflow.org/"],
    blockExplorerUrls: ["https://evm-testnet.flowscan.io/"],
  },
  localhost: {
    chainId: `0x${Number(31337).toString(16)}`,
    chainName: "localhost",
    nativeCurrency: {
      name: "FLOW",
      symbol: "FLOW",
      decimals: 18,
    },
    rpcUrls: ["http://127.0.0.1:8545/"],
    blockExplorerUrls: ["https://evm-testnet.flowscan.io/"],
  },
};

const changeNetwork = async ({ networkName }) => {
  try {
    if (!window.ethereum) throw new Error("No crypto wallet found");
    await window.ethereum.request({
      method: "wallet_addEthereumChain",
      params: [
        {
          ...networks[networkName],
        },
      ],
    });
  } catch (err) {
    console.log(err.message);
  }
};

export const handleNetworkSwitch = async () => {
  const networkName = "flow_testnet";
  await changeNetwork({ networkName });
};

export const checkIfWalletConnected = async () => {
  if (!window.ethereum) return console.log("Please Install MetaMask");
  const network = await handleNetworkSwitch();

  const account = await window.ethereum.request({ method: "eth_accounts" });

  if (account.length) {
    return account[0];
  } else {
    console.log("Please Install MetaMask & Connect, Reload");
  }
};

export const connectWallet = async () => {
  try {
    if (!window.ethereum) return alert("Please install MetaMask");
    const network = await handleNetworkSwitch();
    const accounts = await window.ethereum.request({
      method: "eth_requestAccounts",
    });

    return accounts[0];
  } catch (error) {
    console.log(error);
  }
};
