import React, { useState } from "react";
import "./home-layout.scss";
import SideBar from "../../../components/SideBar";
import HeaderHome from "../../../components/HeaderHome";
import Footer from "../../../components/footer";

const HomeLayout = ({ children }) => {
  const [show, setShow] = useState(false);
  const toggleSideBar = () => {
    setShow(!show);
  };
  return (
    <div id="home-layout">
      <div className="block-main">
        {show ? <div id="overlay" onClick={toggleSideBar}></div> : <></>}
        <SideBar show={show} toggleSideBar={toggleSideBar} />
        <div className="wrap-content">
          <HeaderHome toggleSideBar={toggleSideBar} />
          <div className="content">{children}</div>
          <Footer />
        </div>
      </div>
    </div>
  );
};

export default HomeLayout;
