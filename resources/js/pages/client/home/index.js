import React, { useState, useEffect, useRef } from "react";
import { useDispatch } from "react-redux";
const HomePage = () => {
  const dispatch = useDispatch();
  useEffect(() => {
  },[]);

  return (
      <div className="container-fluid" style={{background:"red"}}>
        Ối rồi ôi ui
      </div>
  );
};

export default HomePage;
