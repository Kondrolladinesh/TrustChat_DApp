"use client";
import React, { useEffect, useState, useContext } from "react";
import Image from "next/image";
import Link from "next/link";
import { ChatAppConnect } from "../../../../Context/ChatAppContext";
import { Modal, Error, Model } from "../index";
import images from "../../../../images";
import Style from "./NavBar.module.css";
import { FaUserCircle } from "react-icons/fa";

const NavBar = () => {
  const menuItems = [
    {
      menu: "All Users",
      link: "allusers",
    },
    {
      menu: "CHAT",
      link: "/",
    },
    // {
    //   menu: "CONTACT",
    //   link: "/",
    // },
    // {
    //   menu: "SETTINGS",
    //   link: "/",
    // },
    // {
    //   menu: "FAQS",
    //   link: "/",
    // },
    {
      menu: "TERMS OF USE",
      link: "/",
    },
  ];

  //USESTATE
  const [active, setActive] = useState(2);
  const [open, setOpen] = useState(false);
  const [openModal, setOpenModal] = useState(false);

  const { account, userName, connectWallet, error } =
    useContext(ChatAppConnect);
  return (
    <div className={Style.NavBar}>
      <div className={Style.NavBar_box}>
        <div className={Style.NavBar_box_left}>
          <Image src={images.logo} alt="logo" width={50} height={50} />
        </div>
        <div className={Style.NavBar_box_right}>
          {/* DESKTOP */}
          <div className={Style.NavBar_box_right_menu}>
            {menuItems.map((el, i) => (
              <div
                onClick={() => setActive(i + 1)}
                key={i + 1}
                className={`${Style.NavBar_box_right_menu_items} ${
                  active == i + 1 ? Style.active_btn : ""
                }`}
              >
                <Link
                  className={Style.NavBar_box_right_menu_items_link}
                  href={el.link}
                >
                  {el.menu}
                </Link>
              </div>
            ))}
          </div>

          {/* Mobile */}
          {open && (
            <div className={Style.mobile_menu}>
              {menuItems?.map((el, i) => (
                <div
                  onClick={() => setActive(i + 1)}
                  key={i + 1}
                  className={`${Style.mobile_menu_items} ${
                    active == i + 1 ? Style.active_btn : ""
                  }`}
                >
                  <Link className={Style.mobile_menu_items_link} href={el.link}>
                    {el.menu}
                  </Link>
                </div>
              ))}
              <p className={Style.mobile_menu_btn}>
                <Image
                  src={images.close}
                  alt="close"
                  width={50}
                  height={50}
                  onClick={() => setOpen(false)}
                />
              </p>
            </div>
          )}
          {/* CONNECT WALLET */}
          <div className={Style.NavBar_box_right_connect}>
            {account == "" ? (
              <button onClick={() => connectWallet()}>
                {""}
                <span>Connect Wallet</span>
              </button>
            ) : (
              <button onClick={() => setOpenModal(true)}>
                {""}
                <Image
                  src={userName ? images.profile : images.add}
                  alt="Account Image"
                  width={30}
                  height={30}
                />
                {""}
                <small>{userName || "Create Account"}</small>
              </button>
            )}
          </div>
          <div
            className={Style.NavBar_box_right_open}
            onClick={() => setOpen(true)}
          >
            <Image src={images.open} alt="open" width={30} height={30} />
          </div>
        </div>
      </div>
      {openModal && (
        <div className={Style.modelBox}>
          <Model
            openBox={setOpenModal}
            title="WELCOME To"
            head="TRUST CHAT"
            info="TrustChat redefines digital conversations with decentralized security
             and user-controlled privacy. Powered by blockchain technology, our platform ensures
              end-to-end encryption, guaranteeing confidentiality." 
              // Seamlessly cross-platform, TrustChat
              //  empowers users with unprecedented control over their data, creating a trustworthy and
              //   transparent space for secure communication in the modern digital landscape."
            smallInfo={"Kindley select your name"}
            image={images.hero}
            address={account}
          />
        </div>
      )}
      {error == "" ? "" : <Error error={error} />}
    </div>
  );
};

export default NavBar;
