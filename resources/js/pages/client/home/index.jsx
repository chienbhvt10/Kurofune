import React from "react";
import { useDispatch } from "react-redux";
import HomeLayout from "../../../commons/layout/HomeLayout";
const HomePage = () => {
  const dispatch = useDispatch();
  React.useEffect(() => {}, []);

  return <HomeLayout></HomeLayout>;
};

export default HomePage;
