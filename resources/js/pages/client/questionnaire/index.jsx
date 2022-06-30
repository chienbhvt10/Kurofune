import React from "react";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import { getCurrentLanguage } from "../../../helper/localStorage";
import "./style.scss";
import { useDispatch, useSelector } from "react-redux";
import usePharmacies from "../../../hooks/pharmacy/usePharmacy";
import { SearchOutlined } from "@ant-design/icons";
import { Button, Form, Input } from "antd";
import { resetPharmacyAction } from "../../../redux/actions/pharmacyAction";

export const Questionnaire = () => {
  const { t } = useTranslation();
  const { searchPharmacy, emptyPharmacy, searchPharmacies } = usePharmacies();
  const lang = getCurrentLanguage();
  const { profile } = useSelector((state) => state.authState);
  const [form] = Form.useForm();
  const [, forceUpdate] = React.useState({});
  const dispatch = useDispatch();
  React.useEffect(() => {
    forceUpdate({});
    (function () {
      const sc = document.querySelectorAll("script");
      let activeChat = false;
      sc.forEach((el) => {
        if (
          el.attributes.src?.nodeValue ==
          "https://front.ebot.chat/embed/js/webInit.js"
        ) {
          activeChat = true;
        }
      });
      if (!activeChat) {
        const webJs = document.createElement("script");
        webJs.type = "text/javascript";
        webJs.async = true;
        webJs.src = "https://front.ebot.chat/embed/js/webInit.js";
        webJs.onload = function () {
          webInit("61792ae247e39e694a190fa6");
        };
        const chatbot = document.getElementsByTagName("script")[0];
        chatbot.parentNode.insertBefore(webJs, chatbot);
      } else {
        const webChat = document.getElementsByClassName("wc-webchat-ctn")[0];
        webChat.style.display = "block";
      }
    })();
    return () => {
      dispatch(resetPharmacyAction())
      const sc = document.getElementsByTagName("script")[0];
      const webChat = document.getElementsByClassName("wc-webchat-ctn")[0];
      webChat.style.display = "none";
    };
  }, []);

  const onFinish = (values) => {
    searchPharmacies(values.search);
  };

  const _lang = lang || "/ja";
  return (
    <div className="questionnaire-container">
      <input type="hidden" id="sys_userid" value={profile?.id} />
      <div className="card">
        <Form
          form={form}
          name="horizontal_login"
          layout="inline"
          onFinish={onFinish}
          size="large"
        >
          <Form.Item name="search" style={{ flex: 1 }}>
            <Input
              prefix={<SearchOutlined className="site-form-item-icon" />}
              type="text"
              placeholder={t("client.questionnaire.placeholder")}
            />
          </Form.Item>
          <Form.Item shouldUpdate>
            {() => (
              <Button type="primary" htmlType="submit">
                {t("client.questionnaire.btn_search")}
              </Button>
            )}
          </Form.Item>
        </Form>
        {searchPharmacy && (
          <div className="product-container">
            <p className="show-number-result">
              {emptyPharmacy && !!form.getFieldValue("search")
                ? t("client.questionnaire.result_not_found"):
                emptyPharmacy ? 
                t("client.questionnaire.no_result")
                : `${t("client.questionnaire.title_number_results")} ${
                    searchPharmacy.length
                  }
              ${t("client.questionnaire.description_number")}`}
            </p>
            <div className="product-list">
              {searchPharmacy?.map((item, index) => (
                <div className="product-item" key={index}>
                  <Link to={`${lang}/product-detail/${item.id}`} className="product-link">
                    <img
                      src={item.product_image}
                      onError={(e) =>
                        (e.target.src = "/images/image-default.png")
                      }
                    />
                  </Link>
                  <div className="product-info">
                    <Link
                      to={`${lang}/product-detail/${item.id}`}
                      className="product-title"
                    >
                      {item.translations.find((trans) => _lang.includes(trans.locale))?.name}
                    </Link>
                    <Link
                      to={`${lang}/product-detail/${item.id}`}
                      className="btn-detail"
                    >
                      {t("client.questionnaire.btn_detail")}
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
