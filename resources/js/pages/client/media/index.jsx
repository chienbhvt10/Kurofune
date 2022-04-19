import {
  faSignOutAlt,
  faTimes,
  faUserGear,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import { mediaBoardItemData } from "../../../commons/data";
import Board from "../../../commons/Board";
import Footer from "../../../components/footer";
import PageHead from "../../../commons/PageHead";
import "./media.scss";
import { Languages } from "../../../commons/Languges";
import { useTranslation } from "react-i18next";

const MediaPage = () => {
  const { i18n, t } = useTranslation();
  function createMarkup() {
    return { __html: t("login.title") };
  }
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
                  <a
                    href="https://member.wabisabi.media/vi/member/change-profile"
                    title=""
                  >
                    <FontAwesomeIcon
                      className="icon"
                      icon={faUserGear}
                      size="md"
                    />
                    <span>{t("media.btn_user_info")} </span>
                  </a>
                </div>
                <div className="logout-wrap pc">
                  <a
                    href="https://member.wabisabi.media/wp-login.php?action=logout&amp;_wpnonce=bb23afb59e"
                    title="Thoát"
                  >
                    {t("media.btn_logout")}
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
                <a
                  href="https://member.wabisabi.media/wp-login.php?action=logout&amp;_wpnonce=bb23afb59e"
                  title="Thoát"
                >
                  {t("media.btn_logout")}
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
