import React, { useState, useEffect, useRef } from "react";
import { useDispatch } from "react-redux";
import Footer from "../../../components/footer";
const HomePage = () => {
  const dispatch = useDispatch();
  useEffect(() => {}, []);

  return (
    <>
      <div className="home-text">hello</div>
      <Footer />
    </>
  );
};

export default HomePage;
