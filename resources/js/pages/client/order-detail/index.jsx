import React from "react";
import { Link } from "react-router-dom";
import { orderDetailData } from "../../../commons/data";
import "./order-detail.scss";
const OrderDetailPage = () => {
  return (
    <div id="order-detail" className="order_detail">
      <div className="card">
        <div className="woocommerce">
          <div className="order-header-title">
            <h1>Chi tiết đơn đặt hàng</h1>
          </div>
          <div className="order-info">
            <div className="order-info-wrap">
              <div className="item-of">
                <span className="io-label">【Ngày đặt hàng】</span>
                <span className="io-value">
                  <time dateTime="2022-02-25T15:01:03+00:00">2022/02/25</time>
                </span>
              </div>
              <div className="item-of">
                <span className="io-label">【Mã đơn đặt hàng】</span>
                <span className="io-value">OP-00000064</span>
              </div>
              <div className="item-of">
                <span className="io-label">【Tình trạng đơn đặt hàng】</span>
                <span className="io-value"> STEP①: Đang chờ mail xác nhận</span>
              </div>
            </div>
          </div>
          <div className="product-purchased">
            <table>
              <thead>
                <tr>
                  <td>Sản phẩm</td>
                  <td>Đơn giá</td>
                  <td>Số lượng </td>
                  <td>Thuế</td>
                  <td>Tổng phụ (Gồm thuế)</td>
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
                    <td className="cart-totals-title">Tổng đơn hàng</td>
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
            <table>
              <tbody>
                <tr>
                  <td colSpan="6" className="header-title">
                    Thông tin đơn hàng
                  </td>
                </tr>
                <tr>
                  <td className="td-label">Họ và Tên</td>
                  <td colSpan="3">wabisabi</td>
                  <td>Số điện thoại </td>
                  <td>123456789</td>
                </tr>
                <tr>
                  <td className="td-label">Mã bưu điện/ ZIP code</td>
                  <td>602-8368</td>
                  <td>Tỉnh/ Thành phố </td>
                  <td>京都府 </td>
                  <td>Địa chỉ email</td>
                  <td>support@wabisabi.media</td>
                </tr>
                <tr>
                  <td className="td-label">Thị trấn / Thành phố</td>
                  <td>京都市上京区</td>
                  <td>Địa chỉ khu phố</td>
                  <td colSpan="3">
                    北町上の下立売通天神道西入上る3丁目１６番地１２号
                  </td>
                </tr>
                <tr>
                  <td className="td-label">Tên toà nhà</td>
                  <td colSpan="5"></td>
                </tr>
              </tbody>
            </table>
          </div>
          <div className="order-shipping">
            <table>
              <tbody>
                <tr>
                  <td colSpan="6" className="header-title">
                    Thông tin chuyển hàng
                  </td>
                </tr>
                <tr>
                  <td className="td-label">Họ và Tên</td>
                  <td colSpan="3">wabisabi</td>
                  <td>Số điện thoại </td>
                  <td>123456789</td>
                </tr>
                <tr>
                  <td className="td-label">Mã bưu điện/ ZIP code</td>
                  <td>100-0002</td>
                  <td>Tỉnh/ Thành phố </td>
                  <td>東京都 </td>
                  <td>Địa chỉ email</td>
                  <td>thanhvv@its-global.vn</td>
                </tr>
                <tr>
                  <td className="td-label">Thị trấn / Thành phố</td>
                  <td>千代田区</td>
                  <td>Địa chỉ khu phố</td>
                  <td colSpan="3">皇居外苑</td>
                </tr>
                <tr>
                  <td className="td-label">Tên toà nhà</td>
                  <td colSpan="5"></td>
                </tr>
              </tbody>
            </table>
          </div>
          <div className="order-payment">
            <div className="order-payment-wrap">
              <div className="td-label opw-label opw-item">
                Phương thức thanh toán
              </div>
              <div className="opw-value opw-item">
                Thanh toán khi giao hàng{" "}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderDetailPage;
