"use client";
import React, { useState, useContext } from "react";
import Image from "next/image";

import Style from "./Filter.module.css";
import images from "../../../../images";
import { ChatAppConnect } from "../../../../Context/ChatAppContext";
import { Model } from "../index";
import Modal from "react-modal";

const Filter = () => {
  const { account, addFriends, sendBoardCastMessage } =
    useContext(ChatAppConnect);
  const [addFriend, setAddFriend] = useState(false);
  const [AddBoardCast, setAddBoardCast] = useState(false);
  const [message, setMessage] = useState("");

  return (
    <div className={Style.Filter}>
      <div className={Style.Filter_box}>
        <div className={Style.Filter_box_left}>
          <div className={Style.Filter_box_left_search}>
            <Image src={images.search} alt="image" width={25} height={25} />
            <input type="text" placeholder="search.." />
          </div>
        </div>
        <div className={Style.Filter_box_right}>
          <button onClick={() => setAddBoardCast(true)}>
            <Image src={images.boardcast} alt="clear" width={30} height={30} />
            BOARDCAST
          </button>
          <button>
            <Image src={images.clear} alt="clear" width={25} height={25} />
            CLEAR CHAT
          </button>
          <button onClick={() => setAddFriend(true)}>
            <Image src={images.add} alt="clear" width={25} height={25} />
            ADD FRIEND
          </button>
        </div>
      </div>

      {/* MODEL COMPONENT */}
      {addFriend && (
        <div className={Style.Filter_model}>
          <Model
            openBox={setAddFriend}
            title="WELCOME TO"
            head="TRUST CHAT"
            info="TrustChat redefines digital conversations with decentralized security
            and user-controlled privacy. Powered by blockchain technology, our platform ensures
             end-to-end encryption, guaranteeing confidentiality."
            smallInfo="Kindley Select your Friend Name & Address.."
            image={images.hero}
            functionName={addFriends}
          />
        </div>
      )}
      {AddBoardCast && (
        <Modal
          isOpen={AddBoardCast}
          onRequestClose={() => setAddBoardCast(!AddBoardCast)}
          className={Style.Filter_BoardCast_modal}
        > 
        <h2>BoardCast Message</h2>
          <div>
            <textarea
              type="text"
              placeholder="type your message"
              onChange={(e) => setMessage(e.target.value)}
            />
            <button onClick={() => sendBoardCastMessage(account, message)}>
              SEND
            </button>
          </div>
        </Modal>
      )}
    </div>
  );
};

export default Filter;
