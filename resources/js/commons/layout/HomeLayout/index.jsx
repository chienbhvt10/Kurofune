import React, { useState } from "react";
import "./home-layout.scss";
import SideBar from "../../../components/SideBar";
import HeaderHome from "../../../components/HeaderHome";
import Footer from "../../../components/footer";
import { Outlet } from "react-router-dom";

const HomeLayout = () => {
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
          show={show}
          toggleSideBar={toggleSideBar}
          closeSideBar={closeSideBar}
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
