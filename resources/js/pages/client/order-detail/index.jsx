import React from "react";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import BillingShipInfo from "../../../commons/BillingShipInfo";
import { billingInfo, orderDetailData } from "../../../commons/data";
import "./order-detail.scss";
const OrderDetailPage = () => {
  const { i18n, t } = useTranslation();
  return (
    <div id="order-detail" className="order_detail">
      <div className="card">
        <div className="woocommerce">
          <div className="order-header-title">
            <h1>{t("client.order-detail.title")}</h1>
          </div>
          <div className="order-info">
            <div className="order-info-wrap">
              <div className="item-of">
                <span className="io-label">
                  {t("client.order-detail.th_order_date")}
                </span>
                <span className="io-value">
                  <time dateTime="2022-02-25T15:01:03+00:00">2022/02/25</time>
                </span>
              </div>
              <div className="item-of">
                <span className="io-label">
                  {t("client.order-detail.th_order_ID")}
                </span>
                <span className="io-value">OP-00000064</span>
              </div>
              <div className="item-of">
                <span className="io-label">
                  {t("client.order-detail.th_order_status")}
                </span>
                <span className="io-value"> STEP①: Đang chờ mail xác nhận</span>
              </div>
            </div>
          </div>
          <div className="product-purchased">
            <table>
              <thead>
                <tr>
                  <td>{t("client.order-detail.th_product_name")}</td>
                  <td>{t("client.order-detail.th_unit_price")}</td>
                  <td>{t("client.order-detail.th_product_quantity")}</td>
                  <td>{t("client.order-detail.th_tax")}</td>
                  <td>{t("client.order-detail.th_product_total")}</td>
                </tr>
              </thead>
              <tbody>
                {orderDetailData.map((item, index) => (
                  <tr key={index}>
                    <td>
                      <Link className="d-flex align-items-center" to={item.url}>
                        <div className="p-item p-image mr-2">
                          <img
                            width="50"
                            alt="Thuốc trị ho dạng bột Aneton (16 gói)"
                            src={item.imageUrl}
                          />
                        </div>
                        <div className="p-item p-name">{item.name}</div>
                      </Link>
                    </td>
                    <td>
                      <span className="woocommerce-Price-amount amount">
                        <bdi>
                          {item.price}&nbsp;
                          <span className="woocommerce-Price-currencySymbol">
                            (JPY)
                          </span>
                        </bdi>
                      </span>
                    </td>
                    <td>{item.quantity}</td>
                    <td>{item.tax}</td>
                    <td>
                      <span className="woocommerce-Price-amount amount">
                        <bdi>
                          {item.net}&nbsp;
                          <span className="woocommerce-Price-currencySymbol">
                            (JPY)
                          </span>
                        </bdi>
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>

            <div className="cart-totals">
              <table className="table table-bordered table-cart-totals">
                <tbody>
                  <tr className="total-amount">
                    <td className="cart-totals-title">
                      {t("client.order-detail.td_total")}
                    </td>
                    <td className="cart-totals-value">
                      <span className="woocommerce-Price-amount amount">
                        <bdi>
                          3,164&nbsp;
                          <span className="woocommerce-Price-currencySymbol">
                            (JPY)
                          </span>
                        </bdi>
                      </span>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
          <div className="order-billing">
            <BillingShipInfo
              info={billingInfo}
              title={t("client.order-detail.title_billing")}
            />
          </div>
          <div className="order-shipping">
            <BillingShipInfo
              info={billingInfo}
              title={t("client.order-detail.title_ship")}
            />
          </div>
          <div className="order-payment">
            <div className="order-payment-wrap">
              <div className="td-label opw-label opw-item">
                {t("client.order-detail.payment")}
              </div>
              <div className="opw-value opw-item">
                {t("client.order-detail.payment_method")}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderDetailPage;
