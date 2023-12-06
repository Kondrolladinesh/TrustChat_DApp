"use client";
import React, { useContext } from "react";
import { UserCard } from "../Components/index";
import Style from "./alluser.module.css";
import { ChatAppConnect } from "../../../Context/ChatAppContext";

const allusers = () => {
  const { userLists, addFriends } = useContext(ChatAppConnect);
  return (
    <div>
      <div className={Style.alluser_info}>
        <h1>Find Your Friends</h1>
      </div>
      <div className={Style.alluser}>
        {userLists && userLists.length > 0 ? (
          userLists.map((el, i) => (
            <UserCard key={i + 1} el={el} i={i} addFriends={addFriends} />
          ))
        ) : (
          <p>No users found.</p>
        )}
      </div>
    </div>
  );
};

export default allusers;
