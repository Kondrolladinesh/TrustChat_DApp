"use client";
import React, { useState } from "react";
import Image from "next/image";
import Style from "./Chat.module.css";
import images from "../../../../../images";
import { convertTime } from "../../../../../Utils/apiFeature";
import { Loader } from "../../index";

const Chat = ({
  functionName,
  friendMsg,
  account,
  userName,
  loading,
  currentUserName,
  currentUserAddress,
}) => {
  const [message, setMessage] = useState("");

  return (
    <div className={Style.Chat}>
      {currentUserName && currentUserAddress ? (
        <div className={Style.Chat_user_info}>
          <Image src={images.accountName} alt="image" width={60} height={60} />
          <div className={Style.Chat_user_info_box}>
            <h4>{currentUserName}</h4>
            <p className={Style.show}>{currentUserAddress}</p>
          </div>
        </div>
      ) : (
        ""
      )}
      <div className={Style.Chat_box_box}>
        <div className={Style.Chat_box}>
          <div className={Style.Chat_box_left}>
            {friendMsg.map((el, i) => (
              <div>
                {el.sender == currentUserAddress ? (
                  <div className={Style.Chat_box_left_title}>
                    <Image
                      src={images.accountName}
                      alt="image"
                      width={50}
                      height={50}
                    />
                    <span>
                      {currentUserName} {""}
                      <small>Time:{convertTime(el.timestamp)}</small>
                    </span>
                  </div>
                ) : (
                  <div className={Style.Chat_box_left_title}>
                    <Image
                      src={images.accountName}
                      alt="image"
                      width={50}
                      height={50}
                    />
                    <span>
                      {userName} {""}
                      <small>Time:{convertTime(el.timestamp)}</small>
                    </span>
                  </div>
                )}
                <p key={i + 1}>
                  {el.msg}
                  {""}
                  {""}
                </p>
              </div>
            ))}
          </div>
        </div>
        {currentUserName && currentUserAddress ? (
          <div className={Style.Chat_box_send}>
            <div className={Style.Chat_box_send_img}>
              <Image src={images.smile} alt="smile" width={40} height={40} />
              <input
                type="text"
                placeholder="type your message"
                onChange={(e) => setMessage(e.target.value)}
              />
              <Image src={images.file} alt="file" width={40} height={40} />
              {loading == true ? (
                <Loader />
              ) : (
                <Image
                  src={images.send}
                  alt="file"
                  width={40}
                  height={40}
                  onClick={() =>
                    functionName({
                      msg: message,
                      address: currentUserAddress,
                      myaddress: account,
                    })
                  }
                />
              )}
            </div>
          </div>
        ) : (
          ""
        )}
      </div>
    </div>
  );
};

export default Chat;
