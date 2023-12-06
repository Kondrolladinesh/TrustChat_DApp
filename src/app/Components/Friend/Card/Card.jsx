import React from "react";
import Image from "next/image";

import Style from "./Card.module.css";
import images from "../../../../../images";

const Card = ({ readMessage, el, i, readUser, account }) => {
  return (
    <div
      className={Style.Card}
      onClick={() => (readMessage(account, el.pubkey), readUser(el.pubkey))}
    >
      <div className={Style.Card_box}>
        <div className={Style.Card_box_left}>
          <Image
            src={images.profile}
            alt="username"
            width={50}
            height={50}
            className={Style.Card_box_left_img}
          />
        </div>
        <div className={Style.Card_box_right}>
          <div className={Style.Card_box_right_middle}>
            <h4>{el.name}</h4>
            <p>{el.pubkey.slice(21)}..</p>
          </div>
          <div className={Style.Card_box_right_end}>
            <small>{i + 1}</small>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Card;
