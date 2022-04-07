import React from "react";
import { InputIcon } from "../../../commons/InputIcon";
import './style.scss'
export const Login = () => {
  return (
    <>
      <h4 className="title">
        一般社団法人在日外国人就業者支援協会
        <br />
        生活支援ポータルサイト
      </h4>
      <InputIcon label="UserName" name="UserName" />
      <InputIcon
        label="Password"
        name="Password"
        icon="https://pharma.its-globaltek.com/wp-content/themes/pharmacy/assets/imgs/icon/ic-user.png"
      />
    </>
  );
};
