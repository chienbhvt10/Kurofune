import React from "react";
import { useTranslation } from "react-i18next";
import BillingShipAddress from "../../../commons/BillingShipAddress";
import { billingInfo } from "../../../commons/data";
import ModalTerm from "../../../components/Modal/ModalTerm";
import "./checkout.scss";
const CheckoutPage = () => {
  const { i18n, t } = useTranslation();
  return (
    <div id="checkout-page">
      <div className="cart-custom">
        <div className="cart-header">
          <h1>{t("checkout.title_confirm")}</h1>
          <div className="description">
            {t("checkout.confirm_description1")}
            <br />
            {t("checkout.confirm_description2")}
          </div>
        </div>

        <div className="cart-body">
          <form action="" id="cart-form">
            <table className="table table-bordered table-item-line">
              <thead>
                <tr>
                  <th className="product-name" scope="col">
                    {t("checkout.th_product_name")}
                  </th>
                  <th className="product-price" scope="col">
                    {t("checkout.th_product_price")}
                  </th>
                  <th className="product-quantity" scope="col">
                    {t("checkout.th_product_quantity")}
                  </th>
                  <th className="product-subtotal" scope="col">
                    {t("checkout.th_product_total")}
                  </th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td
                    data-label={t("checkout.th_product_name")}
                    className="product-name"
                  >
                    <a>
                      <div className="image-wrap">
                        <img
                          alt="image-prod-Checkout"
                          src="https://member.wabisabi.media/wp-content/uploads/2022/02/15_lh-stick.jpeg"
                        />
                      </div>
                      <div className="name">
                        Dootest LHⅡ (Que thử dự đoán ngày rụng trứng) 12 cái{" "}
                      </div>
                    </a>
                  </td>
                  <td
                    data-label={t("checkout.th_product_price")}
                    className="product-price"
                  >
                    <span className="woocommerce-Price-amount amount">
                      <bdi>
                        3,278&nbsp;
                        <span className="woocommerce-Price-currencySymbol">
                          (JPY)
                        </span>
                      </bdi>
                    </span>
                  </td>
                  <td
                    data-label={t("checkout.th_product_quantity")}
                    className="product-quantity"
                  >
                    1{" "}
                  </td>
                  <td className="product-subtotal">
                    <span className="woocommerce-Price-amount amount">
                      <bdi>
                        3,278&nbsp;
                        <span className="woocommerce-Price-currencySymbol">
                          (JPY)
                        </span>
                      </bdi>
                    </span>
                  </td>
                </tr>
              </tbody>
            </table>
          </form>

          <div className="cart-totals">
            <table className="table table-bordered table-cart-totals">
              <tbody>
                <tr className="total-amount">
                  <td className="cart-totals-title">
                    {t("checkout.td_total")}
                  </td>
                  <td className="cart-totals-value">
                    <span className="woocommerce-Price-amount amount">
                      <bdi>
                        3,278&nbsp;
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
      </div>
      <div className="info-block billing-address">
        <BillingShipAddress
          info={billingInfo}
          title={t("checkout.title_billing")}
        />
      </div>
      <div className="info-block shipping-address">
        <BillingShipAddress
          info={billingInfo}
          title={t("checkout.title_ship")}
        />
      </div>
      <div className="error-block mt-4"></div>
      <div className="submit-block">
        <form action="" id="submit-checkout">
          <div className="confirm">
            <input type="checkbox" id="policy-confirm" />
            <label htmlFor="policy-confirm" className="policy-confirm">
              <ModalTerm text={t("checkout.accept_term")} />
            </label>
          </div>
          <button className="btn btn-primary btn-submit-checkout btn-free-out disabled">
            {t("checkout.btn_text_buy")}
          </button>
        </form>
      </div>
    </div>
  );
};

export default CheckoutPage;
