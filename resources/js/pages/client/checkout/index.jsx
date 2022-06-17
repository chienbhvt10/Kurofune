import React, { useEffect } from "react";
import { useTranslation } from "react-i18next";
import BillingShipAddress from "../../../commons/BillingShipAddress";
import ModalTerm from "../../../components/Modal/ModalTerm";
import useCart from "../../../hooks/cart/useCart";
import "./checkout.scss";
import { useDispatch, useSelector } from "react-redux";
import { showProfileAction } from "../../../redux/actions/authAction";
import PageHead from "../../../commons/PageHead";
const CheckoutPage = () => {
  const dispatch = useDispatch();
  const profile = useSelector((state) => state.authState.profile);
  const { t } = useTranslation();
  const { cartInfo, checkout } = useCart();
  const [isPolicyConfirm, setIsPolicyConfirm] = React.useState(false);
  useEffect(() => {
    if (!profile) dispatch(showProfileAction());
  }, []);
  const totalValue =
    cartInfo?.cart_item.length > 0
      ? cartInfo.cart_item.reduce(
          (prev, currentItem) =>
            prev + currentItem.quantity * currentItem.price_tax,
          0
        )
      : 0;
  const handleCheckout = (e) => {
    e.preventDefault();
    const { shipping_address, billing_address } = profile;
    const shippingRequestData = {};
    Object.entries(shipping_address).forEach(
      (item) => (shippingRequestData["shipping_" + item[0]] = item[1])
    );
    const billingRequestData = {};
    Object.entries(billing_address).forEach(
      (item) => (billingRequestData["billing_" + item[0]] = item[1])
    );
    const requestData = {
      ...shippingRequestData,
      ...billingRequestData,
      payment_mode: "cod",
    };
    const filterKeys = [
      "id",
      "user_id",
      "created_at",
      "updated_at",
      "deleted_at",
    ];
    Object.keys(requestData).forEach(
      (key) =>
        filterKeys.some((item) => key.includes(item)) && delete requestData[key]
    );
    checkout(requestData);
  };
  return (
    <div id="checkout-page">
      <PageHead
        title={t("meta.title_checkout")}
        content={t("meta.content_checkout")}
      />
      <div className="cart-custom">
        <div className="cart-header">
          <h1>{t("client.checkout.title_confirm")}</h1>
          <div className="description">
            {t("client.checkout.confirm_description1")}
            <br />
            {t("client.checkout.confirm_description2")}
          </div>
        </div>

        <div className="cart-body">
          <table className="table table-bordered table-item-line">
            <thead>
              <tr>
                <th className="product-name" scope="col">
                  {t("client.checkout.th_product_name")}
                </th>
                <th className="product-price" scope="col">
                  {t("client.checkout.th_product_price")}
                </th>
                <th className="product-quantity" scope="col">
                  {t("client.checkout.th_product_quantity")}
                </th>
                <th className="product-subtotal" scope="col">
                  {t("client.checkout.th_product_total")}
                </th>
              </tr>
            </thead>
            <tbody>
              {cartInfo?.cart_item.map((item) => (
                <tr key={item.id}>
                  <td
                    data-label={t("client.checkout.th_product_name")}
                    className="product-name"
                  >
                    <a>
                      <div className="image-wrap">
                        <img
                          alt="image-prod-Checkout"
                          src={item?.product_image}
                        />
                      </div>
                      <div className="name">{item?.name}</div>
                    </a>
                  </td>
                  <td
                    data-label={t("client.checkout.th_product_price")}
                    className="product-price"
                  >
                    <span className="woocommerce-Price-amount amount">
                      <bdi>
                        {item?.price_tax.toFixed(3)}&nbsp;
                        <span className="woocommerce-Price-currencySymbol">
                          (JPY)
                        </span>
                      </bdi>
                    </span>
                  </td>
                  <td
                    data-label={t("client.checkout.th_product_quantity")}
                    className="product-quantity"
                  >
                    {item?.quantity}{" "}
                  </td>
                  <td className="product-subtotal">
                    <span className="woocommerce-Price-amount amount">
                      <bdi>
                        {(item?.price_tax * item?.quantity).toFixed(3)}&nbsp;
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
                    {t("client.checkout.td_total")}
                  </td>
                  <td className="cart-totals-value">
                    <span className="woocommerce-Price-amount amount">
                      <bdi>
                        {totalValue.toFixed(3)}&nbsp;
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
          info={profile?.billing_address}
          title={t("client.checkout.title_billing")}
        />
      </div>
      <div className="info-block shipping-address">
        <BillingShipAddress
          info={profile?.shipping_address}
          title={t("client.checkout.title_ship")}
        />
      </div>
      <div className="error-block mt-4"></div>
      <div className="submit-block">
        <form action="" id="submit-checkout">
          <div className="confirm">
            <input
              type="checkbox"
              id="policy-confirm"
              defaultChecked={isPolicyConfirm}
              onChange={() => setIsPolicyConfirm((prev) => !prev)}
            />
            <label htmlFor="policy-confirm" className="policy-confirm">
              <ModalTerm text={t("client.checkout.accept_term")} />
            </label>
          </div>
          <button
            className={`btn btn-primary btn-submit-checkout btn-free-out ${
              isPolicyConfirm ? "" : "disabled"
            }`}
            onClick={handleCheckout}
          >
            {t("client.checkout.btn_text_buy")}
          </button>
        </form>
      </div>
    </div>
  );
};

export default CheckoutPage;
