import React from "react";
import { Link } from "react-router-dom";
import { cartData } from "../../../commons/data";
import "./cart.scss";
const Cart = () => {
  return (
    <div id="cart">
      <div className="card-container d-none">
        <div className="woocommerce">
          <p className="cart-empty woocommerce-info">
            <i className="fas fa-check-circle"></i>Giỏ hàng của bạn hiện đang
            trống.
          </p>

          <p className="return-to-shop">
            <Link className="button wc-backward" to="/medicine-list">
              Quay lại cửa hàng{" "}
            </Link>
          </p>
        </div>
      </div>
      <div className="cart-custom">
        <form action="" id="cart-form" noValidate="">
          <div className="cart-header custom-title-cart">
            <h1>Giỏ hàng</h1>
            <div className="description">
              Vui lòng kiểm tra thông tin đơn hàng. <br />
              Sau khi kiểm tra hãy nhấp vào nút " TIẾP TỤC MUA HÀNG "{" "}
            </div>
            <button type="submit" className="btn btn-primary btn-update">
              Cập nhật giỏ hàng của bạn{" "}
            </button>
          </div>

          <div className="notice d-none">
            <div className="woocommerce-notices-wrapper"></div>{" "}
          </div>
          <div className="cart-body ">
            <div
              className="modal fade"
              id="noticeModal"
              tabIndex="-1"
              role="dialog"
              aria-labelledby="noticeModalTitle"
              aria-hidden="true"
            >
              <div
                className="modal-dialog modal-dialog-centered"
                role="document"
              >
                <div className="modal-content">
                  <div className="modal-body">
                    <p className="font-weight-bold">Bạn không thể mua </p>
                    <p>Vui lòng kiểm tra thông tin đơn hàng.</p>
                  </div>
                  <div className="modal-footer">
                    <button
                      type="button"
                      className="btn-close"
                      data-dismiss="modal"
                    >
                      OK
                    </button>
                  </div>
                </div>
              </div>
            </div>
            <div className="table-wrapper">
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
                    <th className="product-remove" scope="col"></th>
                  </tr>
                </thead>
                <tbody>
                  {cartData.map((item, index) => (
                    <tr key={index}>
                      <td data-lable="Sản phẩm" className="product-name">
                        <Link to={item.link}>
                          <div className="image-wrap">
                            <img alt="image-prod-Cart" src={item.imageUrl} />
                          </div>
                          <div className="name">{item.name}</div>
                        </Link>
                      </td>
                      <td data-lable="Số tiền" className="product-price">
                        <span className="woocommerce-Price-amount amount">
                          <bdi>
                            {item.price}&nbsp;
                            <span className="woocommerce-Price-currencySymbol">
                              (JPY)
                            </span>
                          </bdi>
                        </span>
                      </td>
                      <td data-lable="Số lượng " className="product-quantity">
                        <input
                          title=""
                          type="number"
                          className="input-quantity"
                          data-item-key="df263d996281d984952c07998dc54358"
                          value={item.quantity}
                          min="1"
                          max="3"
                        />
                      </td>

                      <td data-lable="" className="product-remove">
                        <button
                          type="button"
                          className="btn btn-primary btn-remove-product"
                          data-item-key="df263d996281d984952c07998dc54358"
                        >
                          Xóa bỏ
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </form>
        <div className="cart-footer">
          <div className="button-group">
            <button className="btn btn-primary btn-remove-all">
              Giỏ hàng trống{" "}
            </button>
            <Link to="/checkout" className="btn btn-primary btn-checkout">
              TIẾP TỤC MUA HÀNG{" "}
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
