import { ethers } from "ethers";
import Web3Modal from "web3modal";
// import { ChatAppAddress, ChatAppABI } from "../Context/ChatAppContext";
import { ChatAppAddress, ChatAppABI, RpcURL } from "../Context/Constants";

export const checkIfWalletConnected = async () => {
  try {
    if (!window.ethereum) return console.log("Install MetaMask")
    const accounts = await window.ethereum.request({
      method: "eth_accounts",
    });
    // if (accounts.length === 0) {
    //   throw new Error("No wallet connected.");
    // }
    return accounts[0];
  } catch (error) {
    console.log("Install MetaMask");
    // return null; // Return null to indicate no wallet is connected
  }
};

export const connectWallet = async () => {
  try {
    if (!window.ethereum) return console.log("Install MetaMask")
    const accounts = await window.ethereum.request({
      method: "eth_requestAccounts",
    });
    const firstAccount = accounts[0]
    return firstAccount;
  } catch (error) {
    console.log(error.message);
    return null; // Return null to indicate the connection failed
  }
};

// const fetchContract = (signerOrProvider) =>
//   new ethers.Contract(ChatAppAddress, ChatAppABI, signerOrProvider);

export const connectingWithContract = async () => {
  try {
      await window.ethereum.request({ method: "eth_requestAccounts" });
      // const provider2 = new ethers.providers.JsonRpcProvider(RpcURL);
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const contract = new ethers.Contract(ChatAppAddress, ChatAppABI, provider);
      return contract;
  } catch (error) {
    console.log(error.message);
  }
};

export const convertTime = (time) => {
  const newTime = new Date(time.toNumber());

  const realTime =
    newTime.getHours() +
    "/" +
    newTime.getMinutes() +
    "/" +
    newTime.getSeconds() +
    " Date:" +
    newTime.getDate() +
    "/" +
    (newTime.getMonth() + 1) +
    "/" +
    newTime.getFullYear();

  return realTime;
};
