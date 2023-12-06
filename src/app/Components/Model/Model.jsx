"use client";
import React, { useContext, useState } from "react";
import Image from "next/image";
import { FaUser, FaLocationDot } from "react-icons/fa6";

import Style from "./Model.module.css";
import images from "../../../../images";
import { ChatAppConnect } from "../../../../Context/ChatAppContext";
import { Loader } from "../../Components/index";
import { ethers } from "ethers";
import {
  ChatAppAddress,
  ChatAppABI,
} from "../../../../Context/Constants";

const Model = ({
  openBox,
  title,
  address,
  head,
  info,
  smallInfo,
  image,
}) => {
  const [name, setName] = useState("");
  const [accountAddress, setAccountAddress] = useState("");

  const { loading } = useContext(ChatAppConnect);

  const createAccount = async (name) => {
    try {
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      await window.ethereum.request({ method: "eth_requestAccounts" });
      const signer = provider.getSigner();
      const contract = new ethers.Contract(ChatAppAddress, ChatAppABI, signer);
      const getCreatedUser = await contract.createAccount(name);
      await getCreatedUser.wait();
      window.location.reload();
    } catch (error) {
      console.log(error);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    createAccount(name);
  };
  return (
    <div className={Style.Model}>
      <div className={Style.Model_box}>
        <div className={Style.Model_box_left}>
          <Image src={image} alt="buddy" width={550} height={550} />
        </div>
        <div className={Style.Model_box_right}>
          <h1>
            {title} <span>{head}</span>
          </h1>
          <p>{info}</p>
          <small>{smallInfo}</small>

          {loading == true ? (
            <Loader />
          ) : (
            <div className={Style.Model_box_rigth_name}>
              <div className={Style.Model_box_rigth_name_info}>
                <FaUser className={Style.icon} />
                <input
                  type="text"
                  placeholder="your name"
                  onChange={(e) => setName(e.target.value)}
                />
              </div>
              <div className={Style.Model_box_rigth_name_info}>
                <FaLocationDot className={Style.icon} />
                <input
                  type="text"
                  placeholder={address || "Enter address..."}
                  onChange={(e) => setAccountAddress(e.target.value)}
                />
              </div>

              <div className={Style.Model_box_rigth_name_btn}>
                <button type="submit" onClick={handleSubmit}>
                  {""}
                  <Image src={images.send} alt="send" width={30} height={30} />
                  {""}
                  Submit
                </button>
                <button onClick={() => openBox(false)}>
                  {""}
                  <Image
                    src={images.close}
                    alt="close"
                    width={30}
                    height={30}
                  />
                  {""}
                  Cancle
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Model;
