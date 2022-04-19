import React from "react";
import ModalTerm from "../../../components/Modal/ModalTerm";
import "./checkout.scss";
const CheckoutPage = () => {
  return (
    <div id="checkout-page">
      <div className="cart-custom">
        <div className="cart-header">
          <h1>Xác nhận mua hàng</h1>
          <div className="description">
            Vui lòng kiểm tra thông tin đơn hàng. <br />
            Vui lòng đọc kĩ các điều khoản sử dụng và nhấp vào nút “ MUA ”{" "}
          </div>
        </div>

        <div className="cart-body">
          <form action="" id="cart-form">
            <table className="table table-bordered table-item-line">
              <thead>
                <tr>
                  <th className="product-name" scope="col">
                    Sản phẩm
                  </th>
                  <th className="product-price" scope="col">
                    Số tiền
                  </th>
                  <th className="product-quantity" scope="col">
                    Số lượng{" "}
                  </th>
                  <th className="product-subtotal" scope="col">
                    Tổng phụ (Gồm thuế)
                  </th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td data-label="Sản phẩm" className="product-name">
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
                  <td data-label="Số tiền" className="product-price">
                    <span className="woocommerce-Price-amount amount">
                      <bdi>
                        3,278&nbsp;
                        <span className="woocommerce-Price-currencySymbol">
                          (JPY)
                        </span>
                      </bdi>
                    </span>
                  </td>
                  <td data-label="Số lượng" className="product-quantity">
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
                  <td className="cart-totals-title">Tổng đơn hàng</td>
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
        <h2>Thông tin thanh toán</h2>
        <div className="info-wrap">
          <div className="info-row full-name">
            <p className="label">Họ và Tên</p>
            <p>wabisabi</p>
          </div>
          <div className="info-row post-code">
            <p>Mã bưu điện/ ZIP code</p>
            <p className="label">602-8368</p>
          </div>
          <div className="info-row prefecture">
            <p className="label">Tỉnh/ Thành phố </p>
            <p>京都府</p>
          </div>
          <div className="info-row city">
            <p className="label">Thị trấn / Thành phố</p>
            <p>京都市上京区</p>
          </div>
          <div className="info-row address1">
            <p className="label">Địa chỉ khu phố</p>
            <p>北町上の下立売通天神道西入上る3丁目１６番地１２号</p>
          </div>
          <div className="info-row address2">
            <p className="label">Tên toà nhà</p>
            <p>Azuma</p>
          </div>
          <div className="info-row phone">
            <p className="label">Số điện thoại </p>
            <p>123456789</p>
          </div>
          <div className="info-row email">
            <p className="label">Địa chỉ email</p>
            <p>support@wabisabi.media</p>
          </div>
        </div>
      </div>
      <div className="info-block shipping-address">
        <h2>Thông tin giao hàng </h2>
        <div className="info-wrap">
          <div className="info-row full-name">
            <p className="label">Họ và Tên</p>
            <p>wabisabi</p>
          </div>
          <div className="info-row post-code">
            <p>Mã bưu điện/ ZIP code</p>
            <p className="label">100-0002</p>
          </div>
          <div className="info-row prefecture">
            <p className="label">Tỉnh/ Thành phố </p>
            <p>東京都</p>
          </div>
          <div className="info-row city">
            <p className="label">Thị trấn / Thành phố</p>
            <p>千代田区</p>
          </div>
          <div className="info-row address1">
            <p className="label">Địa chỉ khu phố</p>
            <p>皇居外苑</p>
          </div>
          <div className="info-row address2">
            <p className="label">Tên toà nhà</p>
            <p>Azuma</p>
          </div>
          <div className="info-row phone">
            <p className="label">Số điện thoại </p>
            <p>123456789</p>
          </div>
          <div className="info-row email">
            <p className="label">Địa chỉ email</p>
            <p>thanhvv@its-global.vn</p>
          </div>
        </div>
      </div>
      <div class="error-block mt-4"></div>
      <div class="submit-block">
        <form action="" id="submit-checkout">
          <div class="confirm">
            <input type="checkbox" id="policy-confirm" />
            <label for="policy-confirm" className="policy-confirm">
              <ModalTerm text="Tôi đồng ý với điều khoản sử dụng và mua hàng." />
            </label>
          </div>
          <button class="btn btn-primary btn-submit-checkout btn-free-out disabled">
            Mua{" "}
          </button>
        </form>
      </div>
    </div>
  );
};

export default CheckoutPage;
