"use client";
import React, { useEffect, useState } from "react";
import { checkIfWalletConnected, connectWallet } from "../Utils/apiFeature";
import { useRouter } from "next/navigation";
import { ethers } from "ethers";
import { ChatAppAddress, ChatAppABI, RpcURL } from "./Constants";

export const ChatAppConnect = React.createContext();

export const ChatAppProvider = ({ children }) => {
  //UseState
  const [account, setAccount] = useState("");
  const [userName, setUserName] = useState("");
  const [friendLists, setFriendLists] = useState([]);
  const [friendMsg, setFriendMsg] = useState([]);
  const [loading, setLoading] = useState(false);
  const [userLists, setUserLists] = useState([]);
  const [error, setError] = useState("");

  //chat User Data
  const [currentUserName, setCurrentUserName] = useState("");
  const [currentUserAddress, setCurrentUserAddress] = useState("");

  const router = useRouter();

  const connectContract = async () => {
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    await window.ethereum.request({ method: "eth_requestAccounts" });
    const signer = provider.getSigner();
    const contract = new ethers.Contract(ChatAppAddress, ChatAppABI, signer);
    return contract;
  };

  const connectingWithContract = () => {
    const provider = new ethers.providers.JsonRpcProvider(
      "http://127.0.0.1:8545/"
    );
    // const provider = new ethers.providers.JsonRpcProvider("https://rpc.sepolia.org");
    const contract = new ethers.Contract(ChatAppAddress, ChatAppABI, provider);
    return contract;
  };

  const fetchData = async () => {
    try {
      const contract = connectingWithContract();
      // GET Account
      const connectAccount = await connectWallet();
      setAccount(connectAccount);

      if (connectAccount) {
        // GET User Name
        const username = await contract.getUsername(connectAccount);
        setUserName(username);

        // GET Friend Lists
        const friendLists = await contract.getMYFriendList(connectAccount);
        setFriendLists(friendLists);

        // GET User Lists
        const userList = await contract.getAllAppUser();
        setUserLists(userList);
      }
    } catch (error) {
      // setError("Please Install And Connect Your Wallet");
      console.log("Error in fetchData:", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  //READ MESSAGE
  const readMessage = async (myaddress, friendAddress) => {
    try {
      //GET Constract
      const contract = connectingWithContract();
      const read = await contract.readMessage(myaddress, friendAddress);
      setFriendMsg(read);
      // console.log(read);
    } catch (e) {
      setError("Currently you have no messages");
    }
  };

  // ADD FRIENDS
  const addFriends = async ({ name, accountAddress }) => {
    try {
      const contract = await connectContract();
      console.log(name, accountAddress);
      const addMyFriend = await contract.addFriend(accountAddress, name);
      setLoading(true);
      await addMyFriend.wait();
      setLoading(false);
      router.push("/");
      window.location.reload();
    } catch (error) {
      setError(`Error while adding friends: ${error.message}`);
    }
  };

  // SEND MESSAGE
  const sendMessage = async ({ msg, address, myaddress }) => {
    try {
      const contract = await connectContract();
      const addMessage = await contract.sendMessage(myaddress, address, msg);
      setLoading(true);
      await addMessage.wait();
      setLoading(false);
      window.location.reload();
    } catch (error) {
      console.error(error);
      setError("Please reload and try again");
    }
  };

  // SEND MESSAGE
  const sendBoardCastMessage = async (myaddress, msg) => {
    try {
      const contract = await connectContract();
      const addMessage = await contract.broadcastMessage(myaddress, msg);
      setLoading(true);
      await addMessage.wait();
      setLoading(false);
      window.location.reload();
    } catch (error) {
      console.error(error);
      setError("Please reload and try again");
    }
  };

  //READ INFO
  const readUser = async (userAddress) => {
    const contract = connectingWithContract();
    const userName = await contract.getUsername(userAddress);
    setCurrentUserName(userName);
    setCurrentUserAddress(userAddress);
  };
  return (
    <ChatAppConnect.Provider
      value={{
        readMessage,
        addFriends,
        sendMessage,
        readUser,
        connectWallet,
        checkIfWalletConnected,
        sendBoardCastMessage,
        account,
        userName,
        friendLists,
        friendMsg,
        loading,
        userLists,
        error,
        currentUserName,
        currentUserAddress,
      }}
    >
      {children}
    </ChatAppConnect.Provider>
  );
};
