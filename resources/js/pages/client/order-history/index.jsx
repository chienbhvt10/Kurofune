import React from "react";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import { getCurrentLanguage } from "../../../helper/localStorage";
import { Table } from "antd";
import moment from "moment";
import useOrderHistory from "../../../hooks/order-history/UseOrderHistory";
import "./order-history.scss";
const OrderHistoryPage = () => {
  const { t } = useTranslation();
  const lang = getCurrentLanguage();
  const { orderHistory, getOrderHistory } = useOrderHistory();
  React.useEffect(() => {
    getOrderHistory();
  }, []);

  const columns = [
    {
      title: t("client.order-history.th_order_date"),
      dataIndex: "date_order",
      key: "date_order",
      render: (date_order) => (moment(date_order).zone("+09:00").format("YYYY/MM/DD"))
    },
    {
      title: t("client.order-history.th_order_ID"),
      dataIndex: "id",
      key: "id",
    },
    {
      title: t("client.order-history.th_order_status"),
      dataIndex: "status",
      key: "status",
    },
    {
      title: t("client.order-history.th_order_price"),
      dataIndex: "total_tax",
      key: "total_tax",
    },
    {
      title: t("client.order-history.th_purchase_product"),
      dataIndex: "order_products",
      key: "id",
      render: (order_products) => (
        <div className="info-product">
          {order_products.map((product, index) => (
            <Link key={index} to={`${lang}/product-detail/${product.id}`}>
              <div className="p-item p-image mr-2">
                <img
                  width="50"
                  alt="アネトンせき止め顆粒 16包"
                  src={product?.imageUrl || '/images/image-default.png'}
                />
              </div>
              <div className="p-item p-name">{product.name}</div>
            </Link>
          ))}
        </div>
      ),
    },
    {
      title: null,
      dataIndex: "id",
      key: "id",
      render: (id) => (
        <Link to={`../order-detail/${id}`}>
          {t("client.order-history.btn_view")}
        </Link>
      ),
    },
  ];
  return (
    <div id="order-history" className="list_order">
      <div className="card table-responsive">
        <Table rowKey="id" dataSource={orderHistory} columns={columns} />
      </div>
    </div>
  );
};

export default OrderHistoryPage;
