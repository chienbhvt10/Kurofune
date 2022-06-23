import React from "react";
import "./home-layout.scss";
import SideBar from "../../../components/SideBar";
import HeaderHome from "../../../components/HeaderHome";
import Footer from "../../../components/Footer";
import { Outlet } from "react-router-dom";
import { useSelector } from "react-redux";
import { isAdmin, isVendor } from "../../../helper/checker";

const HomeLayout = ({ styleColor, navigateLinkData }) => {
  const [show, setShow] = React.useState(false);
  const userInfo = useSelector((state) => state.authState.userInfo);
  let isShowCart = ()=>{
    
    if(isAdmin(userInfo?.roles?.name) ){
      return false;
    }
    if(isVendor(userInfo?.roles?.name) ){
      return false;
    }
    return true
  }

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
          <HeaderHome toggleSideBar={toggleSideBar} isShowCart={isShowCart} />
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
