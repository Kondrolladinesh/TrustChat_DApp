"use client";
import React, { useContext } from "react";

import Style from "./Friend.module.css";
import Card from "./Card/Card";
import Chat from "./Chat/Chat";

import { ChatAppConnect } from "../../../../Context/ChatAppContext";
const Friend = () => {
  const {
    sendMessage,
    account,
    friendLists,
    readMessage,
    friendMsg,
    userName,
    loading,
    currentUserName,
    currentUserAddress,
    readUser,
  } = useContext(ChatAppConnect);

  return (
    <div className={Style.Friend}>
      <div className={Style.Friend_box}>
        <div className={Style.Friend_box_left}>
          {friendLists.map((el, i) => (
            <Card
              key={i + 1}
              el={el}
              i={i}
              account={account}
              readMessage={readMessage}
              readUser={readUser}
            />
          ))}
        </div>
        <div className={Style.Friend_box_right}>
          <Chat
            functionName={sendMessage}
            readMessage={readMessage}
            friendMsg={friendMsg}
            account={account}
            userName={userName}
            loading={loading}
            currentUserName={currentUserName}
            currentUserAddress={currentUserAddress}
          />
        </div>
      </div>
    </div>
  );
};

export default Friend;
