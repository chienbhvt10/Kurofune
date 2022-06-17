import React, { useEffect } from "react";
import "./order-detail.scss";
import { useTranslation } from "react-i18next";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import useOrderHistory from "../../../hooks/order-history/UseOrderHistory";
import BillingShipInfo from "../../../commons/BillingShipInfo";
import { getCurrentLanguage } from "../../../helper/localStorage";
import moment from "moment";
const OrderDetailPage = () => {
  const { t } = useTranslation();
  const { id } = useParams();
  const lang = getCurrentLanguage();
  const { orderHistoryDetail, getOrderDetail } = useOrderHistory();

useEffect(() => {
    if (id) getOrderDetail(id);
  }, [id,lang]);

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
                  <time dateTime="2022-02-25T15:01:03+00:00">{moment(orderHistoryDetail?.date_order).zone("+09:00").format("YYYY/MM/DD")}</time>
                </span>
              </div>
              <div className="item-of">
                <span className="io-label">
                  {t("client.order-detail.th_order_ID")}
                </span>
                <span className="io-value">{orderHistoryDetail?.order_number}</span>
              </div>
              <div className="item-of">
                <span className="io-label">
                  {t("client.order-detail.th_order_status")}
                </span>
                <span className="io-value"> {orderHistoryDetail?.status}</span>
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
                {orderHistoryDetail?.order_products.map((item, index) => (
                  <tr key={index}>
                    <td>
                      <Link className="d-flex align-items-center" to={`${lang}/product-detail/${item.id}`}>
                        <div className="p-item p-image mr-2">
                          <img
                            width="50"
                            alt="Thuốc trị ho dạng bột Aneton (16 gói)"
                            src={item?.imageUrl || '/images/image-default.png'}
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
                          {item.total_tax}&nbsp;
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
                        {orderHistoryDetail?.total_tax}
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
              info={{
                fullName: orderHistoryDetail?.billing_full_name,
                postalCode: orderHistoryDetail?.shipping_postal_code,
                city: orderHistoryDetail?.shipping_city,
                prefecture: orderHistoryDetail?.shipping_prefecture,
                streetAddress: orderHistoryDetail?.shipping_street_address,
                building: orderHistoryDetail?.shipping_building,
                phone: orderHistoryDetail?.shipping_phone,
                email: orderHistoryDetail?.shipping_email,

              }}
              title={t("client.order-detail.title_billing")}
            />
          </div>
          <div className="order-shipping">
            <BillingShipInfo
              info={{
                fullName: orderHistoryDetail?.shipping_full_name,
                postalCode: orderHistoryDetail?.billing_postal_code,
                city: orderHistoryDetail?.billing_city,
                prefecture: orderHistoryDetail?.billing_prefecture,
                streetAddress: orderHistoryDetail?.billing_street_address,
                building: orderHistoryDetail?.billing_building,
                phone: orderHistoryDetail?.billing_phone,
                email: orderHistoryDetail?.billing_email,

              }}
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
