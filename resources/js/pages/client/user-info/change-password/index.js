import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useState } from "react";
import Helmet from "react-helmet";

export const ChangePassword = () => {
  const [showOldPass, setOldPass] = useState(true);
  const [showNewPass, setNewPass] = useState(true);
  const [showConfirmPass, setConfirmPass] = useState(true);
  return (
    <>
    <Helmet>
        <meta charSet="utf-8" />
        <title>Change Password</title>
        <meta name="description" content="Change Password Page" />
        <meta name="og:title" content="Change Password" />
      </Helmet>
    <form>
      <div className="row">
        <div className="form-group">
          <label htmlFor="oldPass">旧パスワード *</label>
          <input type={showOldPass? "password" : "text"} className="form-control-auth" id="oldPass" />
        <div className="show-pass" onClick={() => setOldPass(!showOldPass)}>
              <FontAwesomeIcon
                icon={showOldPass? faEyeSlash : faEye}
                color="#515151"
                size="sm"
              />
            </div>
        </div>
        <div className="form-group">
          <label htmlFor="newPass">新しいパスワード *</label>
          <input type={showNewPass? "password" : "text"} className="form-control-auth" id="newPass" />
        <div className="show-pass" onClick={() => setNewPass(!showNewPass)}>
              <FontAwesomeIcon
                icon={showNewPass? faEyeSlash : faEye}
                color="#515151"
                size="sm"
              />
            </div>
        </div>
        <div className="form-group">
          <label htmlFor="confirmPass">パスワード確認 *</label>
          <input type={showConfirmPass? "password" : "text"} className="form-control-auth" id="confirmPass" />
        <div className="show-pass" onClick={() => setConfirmPass(!showConfirmPass)}>
              <FontAwesomeIcon
                icon={showConfirmPass? faEyeSlash : faEye}
                color="#515151"
                size="sm"
              />
            </div>
        </div>
      </div>
      <button className="btn btn-primary d-block ml-auto" onClick={() =>{Alert("asda")}}>変更を保存する</button>
    </form>
    </>

  );
};
