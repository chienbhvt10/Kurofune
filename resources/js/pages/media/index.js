import {
  faSignOutAlt,
  faTimes,
  faUserGear,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import { mediaBoardItemData } from "../../commons/data";
import LanguageSwitcher from "../../commons/LanguageSwitcher";
import Board from "../../commons/Board";
import Footer from "../../components/footer";
import PageHead from "../../commons/PageHead";
import "./media.scss";
import { Languages } from "../../commons/Languges";

const MediaPage = () => {
  return (
    <>
      <PageHead
        content="HIỆP HỘI HỖ TRỢ NGƯỜI LAO ĐỘNG NƯỚC NGOÀI TẠI NHẬT BẢN CỔNG HỖ TRỢ"
        title="HIỆP HỘI HỖ TRỢ NGƯỜI LAO ĐỘNG NƯỚC NGOÀI TẠI NHẬT BẢN CỔNG HỖ TRỢ"
      />
      <div id="media-page">
        <div className="content">
          <div className="page-header-content">
            <div className="box-text">
              <h4 className="heading">
                HIỆP HỘI HỖ TRỢ NGƯỜI LAO ĐỘNG NƯỚC NGOÀI TẠI NHẬT BẢN
                <br />
                CỔNG HỖ TRỢ{" "}
              </h4>
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
                    <span>Thông tin người dùng </span>
                  </a>
                </div>
                <div className="logout-wrap pc">
                  <a
                    href="https://member.wabisabi.media/wp-login.php?action=logout&amp;_wpnonce=bb23afb59e"
                    title="Thoát"
                  >
                    Thoát{" "}
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
                  Thoát{" "}
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
      </div>
      <Footer />
    </>
  );
};

export default MediaPage;
