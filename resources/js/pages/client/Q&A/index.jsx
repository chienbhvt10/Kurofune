import { Col, Row } from "antd";
import React from "react";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import { getCurrentLanguage } from "../../../helper/localStorage";
import Footer from "../../../components/Footer";
import "./qa.scss";

const QAPage = () => {
  const { t } = useTranslation();
  const lang = getCurrentLanguage();

  return (
    <>
      <Row justify="center" id="QA-page">
        <Col>
          <Row justify="center" className="qa-container">
            <Col span={24}>
              <Row justify="start">
                <Col className="btn-back">
                  <Link to={`${lang}/media`} className="d-flex">
                    <img
                      className="icon-back"
                      src="/images/icon-back.png"
                      alt=""
                    />
                    <span className="ml-2">
                      {t("member.user_profile.text_back")}
                    </span>
                  </Link>
                </Col>
              </Row>
            </Col>
            <Col span={24} className="qa qa1 video-tutorial">
              <Row>
                <Col span={24} className="q">
                  <Row>
                    <Col span={1} className="qa-title">
                      Q.
                    </Col>
                    <Col span={23} className="qa-content">
                      {t("client.qa.q.q1")}
                    </Col>
                  </Row>
                </Col>
                <Col span={24} className="a">
                  <Row>
                    <Col span={1} className="qa-title">
                      A.
                    </Col>
                    <Col span={23} className="qa-content">
                      <Row>
                        <Col span={24} className="sub-a">
                          {t("client.qa.a.a1.a11")}
                        </Col>
                        <Col span={24} className="sub-a">
                          {t("client.qa.a.a1.a12")}
                        </Col>
                        <Col className="sub-a frame">
                          <iframe
                            loading="lazy"
                            src="//www.youtube.com/embed/Rda05UqBtR8"
                            allowfullscreen="allowfullscreen"
                          />
                        </Col>
                        <Col span={24} className="sub-a">
                          {t("client.qa.a.a1.a13")}
                        </Col>
                        <Col span={24} className="sub-a">
                          {t("client.qa.a.a1.a14")}
                        </Col>
                        <Col className="sub-a frame">
                          <iframe
                            loading="lazy"
                            src="//www.youtube.com/embed/vjyWFKmuij0"
                            allowfullscreen="allowfullscreen"
                          />
                        </Col>
                      </Row>
                    </Col>
                  </Row>
                </Col>
              </Row>
            </Col>
            <Col span={24} className="qa qa2">
              <Row>
                <Col span={24} className="q">
                  <Row>
                    <Col span={1} className="qa-title">
                      Q.
                    </Col>
                    <Col span={23} className="qa-content">
                      {t("client.qa.q.q2")}
                    </Col>
                  </Row>
                </Col>
                <Col span={24} className="a">
                  <Row>
                    <Col span={1} className="qa-title">
                      A.
                    </Col>
                    <Col span={23} className="qa-content">
                      {t("client.qa.a.a2")}
                    </Col>
                  </Row>
                </Col>
              </Row>
            </Col>
            <Col span={24} className="qa qa3">
              <Row>
                <Col span={24} className="q">
                  <Row>
                    <Col span={1} className="qa-title">
                      Q.
                    </Col>
                    <Col span={23} className="qa-content">
                      {t("client.qa.q.q3")}
                    </Col>
                  </Row>
                </Col>
                <Col span={24} className="a">
                  <Row>
                    <Col span={1} className="qa-title">
                      A.
                    </Col>
                    <Col span={23} className="qa-content">
                      {t("client.qa.a.a3")}
                    </Col>
                  </Row>
                </Col>
              </Row>
            </Col>
            <Col span={24} className="qa qa4">
              <Row>
                <Col span={24} className="q">
                  <Row>
                    <Col span={1} className="qa-title">
                      Q.
                    </Col>
                    <Col span={23} className="qa-content">
                      {t("client.qa.q.q4")}
                    </Col>
                  </Row>
                </Col>
                <Col span={24} className="a">
                  <Row>
                    <Col span={1} className="qa-title">
                      A.
                    </Col>
                    <Col span={23} className="qa-content">
                      {t("client.qa.a.a4")}
                    </Col>
                  </Row>
                </Col>
              </Row>
            </Col>
            <Col span={24} className="qa qa5">
              <Row>
                <Col span={24} className="q">
                  <Row>
                    <Col span={1} className="qa-title">
                      Q.
                    </Col>
                    <Col span={23} className="qa-content">
                      {t("client.qa.q.q5")}
                    </Col>
                  </Row>
                </Col>
                <Col span={24} className="a">
                  <Row>
                    <Col span={1} className="qa-title">
                      A.
                    </Col>
                    <Col span={23} className="qa-content">
                      {t("client.qa.a.a5")}
                    </Col>
                  </Row>
                </Col>
              </Row>
            </Col>
            <Col span={24} className="qa qa6">
              <Row>
                <Col span={24} className="q">
                  <Row>
                    <Col span={1} className="qa-title">
                      Q.
                    </Col>
                    <Col span={23} className="qa-content">
                      {t("client.qa.q.q6")}
                    </Col>
                  </Row>
                </Col>
                <Col span={24} className="a">
                  <Row>
                    <Col span={1} className="qa-title">
                      A.
                    </Col>
                    <Col span={23} className="qa-content">
                      <Row>
                        <Col span={24} className="sub-a">
                          {t("client.qa.a.a6.a61")}
                        </Col>
                        <Col span={24} className="sub-a">
                          {t("client.qa.a.a6.a62")}
                        </Col>
                      </Row>
                    </Col>
                  </Row>
                </Col>
              </Row>
            </Col>
            <Col span={24} className="qa qa7">
              <Row>
                <Col span={24} className="q">
                  <Row>
                    <Col span={1} className="qa-title">
                      Q.
                    </Col>
                    <Col span={23} className="qa-content">
                      {t("client.qa.q.q7")}
                    </Col>
                  </Row>
                </Col>
                <Col span={24} className="a">
                  <Row>
                    <Col span={1} className="qa-title">
                      A.
                    </Col>
                    <Col span={23} className="qa-content">
                      {t("client.qa.a.a7")}
                    </Col>
                  </Row>
                </Col>
              </Row>
            </Col>
            <Col span={24} className="qa qa8">
              <Row>
                <Col span={24} className="q">
                  <Row>
                    <Col span={1} className="qa-title">
                      Q.
                    </Col>
                    <Col span={23} className="qa-content">
                      {t("client.qa.q.q8")}
                    </Col>
                  </Row>
                </Col>
                <Col span={24} className="a">
                  <Row>
                    <Col span={1} className="qa-title">
                      A.
                    </Col>
                    <Col span={23} className="qa-content">
                      <Row>
                        <Col span={24} className="sub-a">
                          {t("client.qa.a.a8")}
                        </Col>
                        <Col span={24} className="sub-a sub-a-link">
                          <a href="mailto:info@kurofune-inc.com">
                            info@kurofune-inc.com
                          </a>
                        </Col>
                      </Row>
                    </Col>
                  </Row>
                </Col>
              </Row>
            </Col>
            <Col span={24} className="qa qa9">
              <Row>
                <Col span={24} className="q">
                  <Row>
                    <Col span={1} className="qa-title">
                      Q.
                    </Col>
                    <Col span={23} className="qa-content">
                      {t("client.qa.q.q9")}
                    </Col>
                  </Row>
                </Col>
                <Col span={24} className="a">
                  <Row>
                    <Col span={1} className="qa-title">
                      A.
                    </Col>
                    <Col span={23} className="qa-content">
                      {t("client.qa.a.a9")}
                    </Col>
                  </Row>
                </Col>
              </Row>
            </Col>
            <Col span={24} className="qa qa10">
              <Row>
                <Col span={24} className="q">
                  <Row>
                    <Col span={1} className="qa-title">
                      Q.
                    </Col>
                    <Col span={23} className="qa-content">
                      {t("client.qa.q.q10")}
                    </Col>
                  </Row>
                </Col>
                <Col span={24} className="a">
                  <Row>
                    <Col span={1} className="qa-title">
                      A.
                    </Col>
                    <Col span={23} className="qa-content">
                      {t("client.qa.a.a10")}
                    </Col>
                  </Row>
                </Col>
              </Row>
            </Col>
            <Col span={24} className="qa qa11">
              <Row>
                <Col span={24} className="q">
                  <Row>
                    <Col span={1} className="qa-title">
                      Q.
                    </Col>
                    <Col span={23} className="qa-content">
                      {t("client.qa.q.q11")}
                    </Col>
                  </Row>
                </Col>
                <Col span={24} className="a">
                  <Row>
                    <Col span={1} className="qa-title">
                      A.
                    </Col>
                    <Col span={23} className="qa-content">
                      {t("client.qa.a.a11")}
                    </Col>
                  </Row>
                </Col>
              </Row>
            </Col>
            <Col span={24} className="qa qa12">
              <Row>
                <Col span={24} className="q">
                  <Row>
                    <Col span={1} className="qa-title">
                      Q.
                    </Col>
                    <Col span={23} className="qa-content">
                      {t("client.qa.q.q12")}
                    </Col>
                  </Row>
                </Col>
                <Col span={24} className="a">
                  <Row>
                    <Col span={1} className="qa-title">
                      A.
                    </Col>
                    <Col span={23} className="qa-content">
                      <Row>
                        <Col span={24} className="sub-a">
                          {t("client.qa.a.a12")}
                        </Col>
                        <Col span={24} className="sub-a sub-a-link">
                          <a href="mailto:info@kurofune-inc.com">
                            info@kurofune-inc.com
                          </a>
                        </Col>
                      </Row>
                    </Col>
                  </Row>
                </Col>
              </Row>
            </Col>
            <Col span={24} className="qa qa13">
              <Row>
                <Col span={24} className="q">
                  <Row>
                    <Col span={1} className="qa-title">
                      Q.
                    </Col>
                    <Col span={23} className="qa-content">
                      {t("client.qa.q.q13")}
                    </Col>
                  </Row>
                </Col>
                <Col span={24} className="a">
                  <Row>
                    <Col span={1} className="qa-title">
                      A.
                    </Col>
                    <Col span={23} className="qa-content">
                      {t("client.qa.a.a13")}
                    </Col>
                  </Row>
                </Col>
              </Row>
            </Col>
            <Col span={24} className="qa qa14">
              <Row>
                <Col span={24} className="q">
                  <Row>
                    <Col span={1} className="qa-title">
                      Q.
                    </Col>
                    <Col span={23} className="qa-content">
                      {t("client.qa.q.q14")}
                    </Col>
                  </Row>
                </Col>
                <Col span={24} className="a">
                  <Row>
                    <Col span={1} className="qa-title">
                      A.
                    </Col>
                    <Col span={23} className="qa-content">
                      {t("client.qa.a.a14")}
                    </Col>
                  </Row>
                </Col>
              </Row>
            </Col>
            <Col span={24} className="qa qa15">
              <Row>
                <Col span={24} className="q">
                  <Row>
                    <Col span={1} className="qa-title">
                      Q.
                    </Col>
                    <Col span={23} className="qa-content">
                      {t("client.qa.q.q15")}
                    </Col>
                  </Row>
                </Col>
                <Col span={24} className="a">
                  <Row>
                    <Col span={1} className="qa-title">
                      A.
                    </Col>
                    <Col span={23} className="qa-content">
                      <Row>
                        <Col span={24} className="sub-a">
                          {t("client.qa.a.a15")}
                        </Col>
                        <Col span={24} className="sub-a sub-a-link">
                          <a href="mailto:info@kurofune-inc.com">
                            info@kurofune-inc.com
                          </a>
                        </Col>
                      </Row>
                    </Col>
                  </Row>
                </Col>
              </Row>
            </Col>
            <Col span={24} className="qa qa16">
              <Row>
                <Col span={24} className="q">
                  <Row>
                    <Col span={1} className="qa-title">
                      Q.
                    </Col>
                    <Col span={23} className="qa-content">
                      {t("client.qa.q.q16")}
                    </Col>
                  </Row>
                </Col>
                <Col span={24} className="a">
                  <Row>
                    <Col span={1} className="qa-title">
                      A.
                    </Col>
                    <Col span={23} className="qa-content">
                      <Row>
                        <Col span={24} className="sub-a">
                          {t("client.qa.a.a16.a161")}
                        </Col>
                        <Col span={24} className="sub-a sub-a-link">
                          <a href="https://wabisabi.media/vietnam/income-insurance/">
                            https://wabisabi.media/vietnam/income-insurance/
                          </a>
                        </Col>
                        <Col span={24} className="sub-a sub-a-danger">
                          {t("client.qa.a.a16.a162")}
                        </Col>
                      </Row>
                    </Col>
                  </Row>
                </Col>
              </Row>
            </Col>
            <Col span={24} className="qa qa17">
              <Row>
                <Col span={24} className="q">
                  <Row>
                    <Col span={1} className="qa-title">
                      Q.
                    </Col>
                    <Col span={23} className="qa-content">
                      {t("client.qa.q.q17")}
                    </Col>
                  </Row>
                </Col>
                <Col span={24} className="a">
                  <Row>
                    <Col span={1} className="qa-title">
                      A.
                    </Col>
                    <Col span={23} className="qa-content">
                      {t("client.qa.a.a17")}
                    </Col>
                  </Row>
                </Col>
              </Row>
            </Col>
            <Col span={24} className="qa qa18">
              <Row>
                <Col span={24} className="q">
                  <Row>
                    <Col span={1} className="qa-title">
                      Q.
                    </Col>
                    <Col span={23} className="qa-content">
                      {t("client.qa.q.q18")}
                    </Col>
                  </Row>
                </Col>
                <Col span={24} className="a">
                  <Row>
                    <Col span={1} className="qa-title">
                      A.
                    </Col>
                    <Col span={23} className="qa-content">
                      {t("client.qa.a.a18")}
                    </Col>
                  </Row>
                </Col>
              </Row>
            </Col>
            <Col span={24} className="qa qa19">
              <Row>
                <Col span={24} className="q">
                  <Row>
                    <Col span={1} className="qa-title">
                      Q.
                    </Col>
                    <Col span={23} className="qa-content">
                      {t("client.qa.q.q19")}
                    </Col>
                  </Row>
                </Col>
                <Col span={24} className="a">
                  <Row>
                    <Col span={1} className="qa-title">
                      A.
                    </Col>
                    <Col span={23} className="qa-content">
                      <Row>
                        <Col span={24} className="sub-a">
                          {t("client.qa.a.a19.a191")}
                        </Col>
                        <Col span={24} className="sub-a sub-a-link">
                          <a href="mailto:insurance@kurofune-inc.com">
                            insurance@kurofune-inc.com
                          </a>
                        </Col>
                        <Col span={24} className="sub-a sub-a-danger">
                          {t("client.qa.a.a19.a192")}
                        </Col>
                      </Row>
                    </Col>
                  </Row>
                </Col>
              </Row>
            </Col>
            <Col span={24} className="qa qa20">
              <Row>
                <Col span={24} className="q">
                  <Row>
                    <Col span={1} className="qa-title">
                      Q.
                    </Col>
                    <Col span={23} className="qa-content">
                      {t("client.qa.q.q20")}
                    </Col>
                  </Row>
                </Col>
                <Col span={24} className="a">
                  <Row>
                    <Col span={1} className="qa-title">
                      A.
                    </Col>
                    <Col span={23} className="qa-content">
                      {t("client.qa.a.a20")}
                    </Col>
                  </Row>
                </Col>
              </Row>
            </Col>
            <Col span={24} className="qa qa21">
              <Row>
                <Col span={24} className="q">
                  <Row>
                    <Col span={1} className="qa-title">
                      Q.
                    </Col>
                    <Col span={23} className="qa-content">
                      {t("client.qa.q.q21")}
                    </Col>
                  </Row>
                </Col>
                <Col span={24} className="a">
                  <Row>
                    <Col span={1} className="qa-title">
                      A.
                    </Col>
                    <Col span={23} className="qa-content">
                      {t("client.qa.a.a21")}
                    </Col>
                  </Row>
                </Col>
              </Row>
            </Col>
            <Col span={24} className="qa qa22">
              <Row>
                <Col span={24} className="q">
                  <Row>
                    <Col span={1} className="qa-title">
                      Q.
                    </Col>
                    <Col span={23} className="qa-content">
                      {t("client.qa.q.q22")}
                    </Col>
                  </Row>
                </Col>
                <Col span={24} className="a">
                  <Row>
                    <Col span={1} className="qa-title">
                      A.
                    </Col>
                    <Col span={23} className="qa-content">
                      {t("client.qa.a.a22")}
                    </Col>
                  </Row>
                </Col>
              </Row>
            </Col>
          </Row>
        </Col>
      </Row>
      <Footer />
    </>
  );
};

export default QAPage;
