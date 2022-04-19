import React from "react";
import { Link } from "react-router-dom";
import { historyData } from "../../../commons/data";
import "./order-history.scss";
const OrderHistoryPage = () => {
  return (
    <div id="order-history" className="list_order">
      <div className="card table-responsive">
        <table className="table-order">
          <thead>
            <tr>
              <td>注文日</td>
              <td>注文番号</td>
              <td>
                ステータス{" "}
                <i className="fas fa-info-circle collape-info-status"></i>
              </td>
              <td>金額</td>
              <td>注文商品</td>
              <td></td>
            </tr>
          </thead>
          <tbody>
            {historyData.map((item) => (
              <tr>
                <td>
                  <time datetime={item.fulltime}>{item.time}</time>
                </td>
                <td>{item.op}</td>
                <td>
                  <p className="order-status status-processing">{item.status}</p>
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
                    {item.infoProduct.map((product) => (
                      <a href={product.link}>
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
                    to={item.orderDetailUrl}
                    className="woocommerce-button button view"
                  >
                    詳細
                  </Link>{" "}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <div className="tracker-order-list" style={{ display: "none" }}>
          <h6 className="title-list">【ステータスについて】</h6>
          <ul>
            <li className="step step1">STEP①: 薬剤師からのメール確認</li>
            <li className="step step2">STEP②: 商品発送準備</li>
            <li className="step step3">STEP③: 商品発送済み</li>
            <li className="step step4">STEP④: 商品受け取り＆支払い</li>
            <li className="step step5">STEP⑤: 商品受け取り完了</li>
          </ul>
        </div>
        <div className="woocommerce-pagination woocommerce-pagination--without-numbers woocommerce-Pagination">
          <Link
            className="woocommerce-button woocommerce-button--next woocommerce-Button woocommerce-Button--next button"
            to="/order-history"
          >
            次
          </Link>
        </div>
      </div>
    </div>
  );
};

export default OrderHistoryPage;
