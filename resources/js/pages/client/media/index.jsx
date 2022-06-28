import { faSignOutAlt, faUserGear } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import { mediaBoardItemData } from "../../../commons/data";
import { Languages } from "../../../commons/Languges";
import PageHead from "../../../commons/PageHead";
import Footer from "../../../components/Footer";
import { getCurrentLanguage } from "../../../helper/localStorage";
import useLogout from "../../../hooks/auth/useLogout";
import "./media.scss";
import { useDispatch } from "react-redux";
import { resetAuthResponse } from "../../../redux/actions/authAction";
import ModalAccessRight from "../../../components/Modal/ModalAccessRight";
import { useSelector } from "react-redux";
import { ACTIVE, IN_ACTIVE, ROLE_FULL_SUPPORT_PLAN, ROLE_LIGHT_PLAN } from "../../../constants";
import UserProfileClient from "../../../components/Modal/UserProfileClient";
import Board from "./Board"

const MediaPage = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  function createMarkup() {
    return { __html: t("login.title") };
  }
  const lang = getCurrentLanguage();

  const { getLogout } = useLogout();

  const logout = () => {
    getLogout();
  };
  const profile = useSelector((state) => state.authState.profile);
  const state = useSelector((state) => state);
  const [role,setRole] = React.useState('default')
  const [active,setActive] = React.useState(false)
  const [modalVisible, setModalVisible] = React.useState(true);
  React.useEffect(() => {
    if(profile?.roles[0].name===ROLE_LIGHT_PLAN){
      setRole('light_plan')
    }else if(profile?.roles[0].name === ROLE_FULL_SUPPORT_PLAN){
      setRole('full_support_plan')
    }else{
      setRole('default')
    }
    if(profile?.active===ACTIVE){
      setActive(true)
    }else{
      setActive(false)
    }
  }, [profile]);

  React.useEffect(() => {
    dispatch(resetAuthResponse());
  }, []);
  return (
    <>
      <PageHead
        title={t("meta.title_media")}
        content={t("meta.content_media")}
      />
      <div id="media-page">
        <div className="content">
          <div className="page-header-content">
            <div className="box-text">
              <h4
                className="heading"
                dangerouslySetInnerHTML={createMarkup()}
              />
            </div>
          </div>
          <div className="service_dashboard">
            <Board boardItems={mediaBoardItemData} setModalVisible={setModalVisible} role={role}/>
            <div className="switch">
              <div>
                <Languages />
                <div className="option-btn QA">
                  <Link to={`${lang}/qa`} title="">
                    <span>Q&A</span>
                  </Link>
                </div>
              </div>

              <div className="option">
                <div className="option-btn settings-wrap">
                  <Link to={`${lang}/member/change-profile`} title="">
                    <FontAwesomeIcon
                      className="icon"
                      icon={faUserGear}
                      size="sm"
                    />
                    <span>{t("client.media.btn_user_info")} </span>
                  </Link>
                </div>
                <div className="logout-wrap pc">
                  <a onClick={logout}>
                    {t("client.media.btn_logout")}
                    <FontAwesomeIcon
                      className="icon"
                      icon={faSignOutAlt}
                      size="sm"
                    />
                  </a>
                </div>
              </div>
            </div>
            <div className="switch-lang sp">
              <div className="logout-wrap">
                <a onClick={logout}>
                  {t("client.media.btn_logout")}
                  <FontAwesomeIcon
                    className="icon"
                    icon={faSignOutAlt}
                    size="sm"
                  />
                </a>
              </div>
            </div>
          </div>
        </div>
        <Footer />
        {/* <ModalAccessRight modalVisible={modalVisible} setModalVisible={setModalVisible} role={role}/> */}
        {/* <ModalAccessRight2 modalVisible={modalVisible} setModalVisible={setModalVisible} role={role}/> */}
         { modalVisible&& <UserProfileClient modalVisible={modalVisible} setModalVisible={setModalVisible} role={role} profile={profile} /> }
      </div>
    </>
  );
};

export default MediaPage;
