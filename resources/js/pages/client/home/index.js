import React, { useState, useEffect, useRef } from "react";
import { useDispatch } from "react-redux";
import ModalPolicy from "../../../components/modal/ModalPolicy";
import ModalTerm from "../../../components/modal/ModalTerm";
const HomePage = () => {
  const dispatch = useDispatch();
  useEffect(() => {}, []);

  return (
    <>
      <div className="home-text">
        <ModalTerm />
        <ModalPolicy />
      </div>
    </>
  );
};

export default HomePage;
