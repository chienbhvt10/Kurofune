import React, { useEffect, useState } from "react";
import "./home-layout.scss";
import SideBar from "../../../components/SideBar";
import HeaderHome from "../../../components/HeaderHome";
import Footer from "../../../components/Footer";
import { Outlet } from "react-router-dom";

const HomeLayout = ({ styleColor, navigateLinkData }) => {
  const [show, setShow] = useState(false);
  const toggleSideBar = () => {
    setShow(!show);
  };
  const closeSideBar = () => {
    setShow(false);
  };
  return (
    <div id="home-layout">
      <div className="block-main">
        {show ? <div id="overlay" onClick={toggleSideBar}></div> : <></>}
        <SideBar
          navigateLinkData={navigateLinkData}
          show={show}
          toggleSideBar={toggleSideBar}
          closeSideBar={closeSideBar}
          styleColor={styleColor}
        />
        <div className="wrap-content">
          <HeaderHome toggleSideBar={toggleSideBar} />
          <div className="content">
            <Outlet />
          </div>
          <Footer />
        </div>
      </div>
    </div>
  );
};

export default HomeLayout;
