import React from "react";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import { getCurrentLanguage } from "../../../helper/localStorage";
import "./style.scss";
import { useSelector } from "react-redux";
import usePharmacies from "../../../hooks/pharmacy/usePharmacy";
import { SearchOutlined } from "@ant-design/icons";
import { Button, Form, Input } from "antd";

export const Questionnaire = () => {
  const { t } = useTranslation();
  const { searchPharmacy, emptyPharmacy, searchPharmacies } = usePharmacies();
  const lang = getCurrentLanguage();
  const { profile } = useSelector((state) => state.authState);
  const [form] = Form.useForm();
  const [, forceUpdate] = React.useState({});

  React.useEffect(() => {
    forceUpdate({});
  }, []);

  const onFinish = (values) => {
    searchPharmacies(values.search);
  };
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
              {emptyPharmacy
                ? t("client.questionnaire.no_result")
                : `${t("client.questionnaire.title_number_results")} ${
                    searchPharmacy.length
                  }
              ${t("client.questionnaire.description_number")}`}
            </p>
            <div className="product-list">
              {searchPharmacy?.map((item, index) => (
                <div className="product-item" key={index}>
                  <Link to={`${lang}/product-detail`} className="product-link">
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
                      {item.name}
                    </Link>
                    <Link
                      to={`${lang}/product-detail/${item.id}`}
                      className="btn-detail"
                    >
                      詳細
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
