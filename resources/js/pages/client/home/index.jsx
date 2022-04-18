import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import HomeLayout from "../../../commons/layout/HomeLayout";
const HomePage = () => {
  const dispatch = useDispatch();
  useEffect(() => {}, []);

  return <HomeLayout></HomeLayout>;
};

export default HomePage;
