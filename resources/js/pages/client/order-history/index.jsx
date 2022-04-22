import React from "react";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import { historyData } from "../../../commons/data";
import "./order-history.scss";
const OrderHistoryPage = () => {
  const { i18n, t } = useTranslation();
  let lang = localStorage.getItem("lang");

  return (
    <div id="order-history" className="list_order">
      <div className="card table-responsive">
        <table className="table-order">
          <thead>
            <tr>
              <td>{t("client.order-history.th_order_date")}</td>
              <td>{t("client.order-history.th_order_ID")}</td>
              <td>
                {t("client.order-history.th_order_status")}
                <i className="fas fa-info-circle collape-info-status"></i>
              </td>
              <td>{t("client.order-history.th_order_price")}</td>
              <td>{t("client.order-history.th_purchase_product")}</td>
              <td></td>
            </tr>
          </thead>
          <tbody>
            {historyData.map((item, index) => (
              <tr key={index}>
                <td>
                  <time dateTime={item.fulltime}>{item.time}</time>
                </td>
                <td>{item.op}</td>
                <td>
                  <p className="order-status status-processing">
                    {item.status}
                  </p>
                </td>
                <td>
                  <p>
                    <span>
                      <bdi>
                        {item.totalPrice}&nbsp;
                        <span>円</span>
                      </bdi>
                    </span>
                  </p>
                </td>
                <td>
                  <div className="info-product">
                    {item.infoProduct.map((product, index) => (
                      <a key={index} href={product.link}>
                        <div className="p-item p-image mr-2">
                          <img
                            width="50"
                            alt="アネトンせき止め顆粒 16包"
                            src={product.imageUrl}
                          />
                        </div>
                        <div className="p-item p-name">{product.name}</div>
                      </a>
                    ))}
                  </div>
                </td>
                <td className="action-order">
                  <Link
                    to={`${lang}${item.orderDetailUrl}`}
                    className="woocommerce-button button view"
                  >
                    {t("client.order-history.btn_view")}
                  </Link>{" "}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <div className="tracker-order-list" style={{ display: "none" }}>
          <h6 className="title-list">
            {t("client.order-history.about_status")}
          </h6>
          <ul>
            <li className="step step1">
              STEP①: {t("client.order-history.status_step_1")}
            </li>
            <li className="step step2">
              STEP②: {t("client.order-history.status_step_2")}
            </li>
            <li className="step step3">
              STEP③: {t("client.order-history.status_step_3")}
            </li>
            <li className="step step4">
              STEP④: {t("client.order-history.status_step_4")}
            </li>
            <li className="step step5">
              STEP⑤: {t("client.order-history.status_step_5")}
            </li>
          </ul>
        </div>
        <div className="woocommerce-pagination woocommerce-pagination--without-numbers woocommerce-Pagination">
          <Link
            className="woocommerce-button woocommerce-button--next woocommerce-Button woocommerce-Button--next button"
            to="/order-history"
          >
            {t("client.order-history.btn_next")}
            {/* {t("client.order-history.btn_prev")} */}
          </Link>
        </div>
      </div>
    </div>
  );
};

export default OrderHistoryPage;
