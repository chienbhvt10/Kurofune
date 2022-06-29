import React from "react";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import { getCurrentLanguage } from "../../../helper/localStorage";
import { Table } from "antd";
import moment from "moment";
import useOrderHistory from "../../../hooks/order-history/useOrderHistory";
import "./order-history.scss";
import PageHead from "../../../commons/PageHead";
import { Button, Popconfirm } from "antd";
import { InfoCircleFilled } from "@ant-design/icons";

const OrderHistoryPage = () => {
  const { t } = useTranslation();
  const lang = getCurrentLanguage();
  const { orderHistory, getOrderHistory } = useOrderHistory();
  React.useEffect(() => {
    getOrderHistory();
  }, [lang]);

  const columns = [
    {
      title: t("client.order-history.th_order_date"),
      dataIndex: "date_order",
      align: "center",
      key: "date_order",
      render: (date_order) =>
        moment(date_order).zone("+09:00").format("YYYY/MM/DD"),
    },
    {
      title: t("client.order-history.th_order_ID"),
      dataIndex: "id",
      key: "id",
      align: "center",
    },
    {
      title: (
        <span className="custom-tooltip">
          {t("client.order-history.th_order_status")}
          <Popconfirm
            placement="bottom"
            icon={false}
            title={
              <div className="custom-tooltip-content">
                <h6>{t("client.order-history.about_status")}</h6>
                <p>STEP①: {t("client.order-history.status_step_1")}</p>
                <p>STEP②: {t("client.order-history.status_step_2")}</p>
                <p>STEP③: {t("client.order-history.status_step_3")}</p>
                <p>STEP④: {t("client.order-history.status_step_4")}</p>
                <p>STEP⑤: {t("client.order-history.status_step_5")}</p>
              </div>
            }
          >
            <Button
              type="text"
              size="small"
              icon={<InfoCircleFilled />}
            ></Button>
          </Popconfirm>
        </span>
      ),
      dataIndex: "status",
      key: "status",
      align: "center",
    },
    {
      title: t("client.order-history.th_order_price"),
      dataIndex: "total_tax",
      key: "total_tax",
      align: "center",
      render: (total_tax) => (`${total_tax}${!lang?' 円':' (JPY)'}`)
    },
    {
      title: t("client.order-history.th_purchase_product"),
      dataIndex: "order_products",
      key: "id",
      align: "center",
      render: (order_products) => (
        <div className="info-product">
          {order_products.map((product, index) => (
            <Link key={index} to={`${lang}/product-detail/${product.id}`}>
              <div className="p-item p-image mr-2">
                <img
                  width="50"
                  alt="アネトンせき止め顆粒 16包"
                  src={product?.image || "/images/image-default.png"}
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
      align: "center",
      render: (id) => (
        <Link to={`../order-detail/${id}`}>
          {t("client.order-history.btn_view")}
        </Link>
      ),
    },
  ];
  return (
    <div id="order-history" className="list_order">
      <PageHead
        title={t("meta.title_order_history")}
        content={t("meta.content_order_history")}
      />
      <div className="card table-responsive">
        <Table
          rowKey="id"
          dataSource={orderHistory}
          columns={columns}
          pagination={{
            showTotal() {
              return `Total ${orderHistory.length} items`;
            },
          }}
        />
      </div>
    </div>
  );
};

export default OrderHistoryPage;
