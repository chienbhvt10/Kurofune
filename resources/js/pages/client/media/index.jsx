import { faSignOutAlt, faUserGear } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Col, Row } from "antd";
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

  React.useEffect(() => {
    dispatch(resetAuthResponse());
  }, []);

  return (
    <>
      <PageHead content={t("login.title")} title={t("login.title")} />
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
            <Board boardItems={mediaBoardItemData} />
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
      </div>
    </>
  );
};

export default MediaPage;
