import { faSignOutAlt, faUserGear } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import Board from "../../../commons/Board";
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
import { ROLE_FULL_SUPPORT_PLAN, ROLE_LIGHT_PLAN } from "../../../constants";

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
  const userInfo = useSelector((state) => state.authState.userInfo);
  const [role,setRole] = React.useState('default')
  console.log(userInfo?.roles);
  React.useEffect(() => {
    if(userInfo?.roles?.name===ROLE_LIGHT_PLAN){
      setRole('light_plan')
    }else if(userInfo?.roles?.name === ROLE_FULL_SUPPORT_PLAN){
      setRole('full_plan')
    }else{
      setRole('default')
    }
    
  }, [userInfo]);

  React.useEffect(() => {
    dispatch(resetAuthResponse());
  }, []);
  const [modalVisible, setModalVisible] = React.useState(false);
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
        <ModalAccessRight modalVisible={modalVisible} setModalVisible={setModalVisible} role={role}/>
        {/* <ModalAccessRight2 modalVisible={modalVisible} setModalVisible={setModalVisible} role={role}/> */}
         {/* {modalVisible && <RegisterUser modalVisible={modalVisible} setModalVisible={setModalVisible} role={role} /> } */}
      </div>
    </>
  );
};

export default MediaPage;
