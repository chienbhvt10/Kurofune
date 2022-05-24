import {
  faSignOutAlt,
  faTimes,
  faUserGear,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import { mediaBoardItemData } from "../../../commons/data";
import Board from "../../../commons/Board";
import Footer from "../../../components/Footer";
import PageHead from "../../../commons/PageHead";
import "./media.scss";
import { Languages } from "../../../commons/Languges";
import { useTranslation } from "react-i18next";
import { Link, useNavigate } from "react-router-dom";
import useLogout from "../../../hooks/auth/useLogout";
import { useSelector } from "react-redux";

const MediaPage = () => {
  const { i18n, t } = useTranslation();
  const navigate = useNavigate();
  const resLogout = useSelector((state) => state.authState.resLogout);
  function createMarkup() {
    return { __html: t("login.title") };
  }
  const lang = localStorage.getItem("lang");

  const { getLogout } = useLogout();

  const logout = async () => {
    await getLogout();
  };
  React.useEffect(() => {
    if (resLogout?.status_code === 200) {
      navigate(`${lang}/login`);
    }
  }, [resLogout]);
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
              <Languages />

              <div className="option">
                <div className="settings-wrap">
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
                  <a title="Thoát" onClick={logout}>
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
            {/* <div className="switch-lang sp">
              <div className="logout-wrap">
                <Link to={`${lang}/login`} title="Thoát">
                  {t("client.media.btn_logout")}
                  <FontAwesomeIcon
                    className="icon"
                    icon={faSignOutAlt}
                    size="sm"
                  />
                </Link>
              </div>
            </div> */}
          </div>
        </div>
        <Footer />
      </div>
    </>
  );
};

export default MediaPage;
