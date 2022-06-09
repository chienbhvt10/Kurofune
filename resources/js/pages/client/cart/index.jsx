import { Button, Col, Form, Input, Row, Table, Typography } from "antd";
import React, { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { Link, useNavigate } from "react-router-dom";
import InputField from "../../../commons/Form/InputField";
import { getCurrentLanguage } from "../../../helper/localStorage";
import { useSelector } from "react-redux";
import "./cart.scss";
import useCart from "../../../hooks/cart/useCart";
const Cart = () => {
  const { i18n, t } = useTranslation();
  const lang = getCurrentLanguage();
  const navigate = useNavigate();
  const [cartItemState, setCartItemState] = useState([]);
  const { cartInfo, updateCart, deleteCart } = useCart();
  useEffect(() => {
    setCartItemState(cartInfo?.cart_item.length > 0 ? cartInfo.cart_item : []);
  }, [cartInfo]);
  const handleUpdateCart = () => {
    const cart_items = cartItemState.map(({ id, quantity }) => ({
      id,
      quantity,
    }));
    updateCart({ cart_items });
  };
  const handleDeleteAllCart = () => {
    deleteCart();
  };
  const columns = [
    {
      key: "name",
      dataIndex: "name",
      title: t("client.cart.th_product_name"),
      align: "center",
      render: (_, record) => (
        <Link to={`${lang}/member/product-detail/${record.id}`}>
          <Row>
            <Col span={4}>
              <Row justify="center">
                <img
                  alt="image-prod-Cart"
                  width={40}
                  src={record?.product_image}
                />
              </Row>
            </Col>
            <Col span={20}>
              <Row justify="start">
                <div className="name">{record?.name}</div>
              </Row>
            </Col>
          </Row>
        </Link>
      ),
    },
    {
      key: "price",
      dataIndex: "price",
      title: t("client.cart.th_product_price"),
      render: (_, record) => <span>{record.price_tax}</span>,
      align: "center",
      width: 230,
    },
    {
      key: "quantity",
      dataIndex: "quantity",
      title: t("client.cart.th_product_quantity"),
      width: 120,
      align: "center",
      render: (_, record) => (
        <Input
          type="number"
          className="input-field"
          defaultValue={record.quantity}
          onChange={(e) =>
            setCartItemState((prev) =>
              prev.map((item) =>
                item.id === record.id
                  ? { ...item, quantity: Number(e.target.value) }
                  : item
              )
            )
          }
        />
      ),
    },
    {
      key: "tool",
      dataIndex: "tool",
      title: "",
      align: "center",
      width: 100,
      render: (cell, row) => (
        <Button type="primary">{t("client.cart.btn_delete")}</Button>
      ),
    },
  ];

  return (
    <div id="cart">
      <Row justify="center" style={{ padding: "40px 0" }} className="d-none">
        <Col
          span={23}
          style={{
            borderTop: "3px solid #62a19b",
            padding: "10px",
            backgroundColor: "#f7f6f7",
          }}
        >
          <Col span={23}>
            <Typography.Text>
              <i className="fas fa-check-circle"></i>
              {t("client.cart.title_cart_empty")}
            </Typography.Text>
          </Col>
        </Col>
        <Col span={23} style={{ marginTop: 10 }}>
          <Button
            type="primary"
            onClick={() => {
              navigate(`${lang}/medicine-list`);
            }}
          >
            {t("client.cart.btn_return")}
          </Button>
        </Col>
      </Row>
      <Row justify="center">
        <Col span={23}>
          <Form id="cart-form">
            <Row style={{ padding: "20px 0" }}>
              <Col span={24} sm={{ span: 20 }}>
                <Col span={24}>
                  <Row justify="center">
                    <Typography.Title level={3}>
                      {t("client.cart.title_cart")}
                    </Typography.Title>
                  </Row>
                </Col>
                <Col span={24}>
                  <Row justify="center">
                    <Typography.Text>
                      {t("client.cart.cart_description1")}
                    </Typography.Text>
                  </Row>
                </Col>
                <Col span={24}>
                  <Row justify="center">
                    <Typography.Text>
                      {t("client.cart.cart_description2")}
                    </Typography.Text>
                  </Row>
                </Col>
              </Col>
              <Col xs={24} sm={{ span: 4 }}>
                <Row justify="end">
                  <Button
                    type="primary"
                    className="btn btn-primary btn-update"
                    onClick={handleUpdateCart}
                  >
                    {t("client.cart.btn_update")}
                  </Button>
                </Row>
              </Col>
            </Row>

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
                <Table
                  rowKey="id"
                  columns={columns}
                  dataSource={cartItemState}
                  bordered
                />
              </div>
            </div>
          </Form>
        </Col>
      </Row>
      <Row justify="center" style={{ padding: "20px 0" }}>
        <Col span={23}>
          <Row justify="space-between">
            <Button
              type="primary"
              className="btn btn-primary btn-remove-all"
              onClick={handleDeleteAllCart}
            >
              {t("client.cart.btn_empty")}
            </Button>
            <Button
              type="primary"
              onClick={() => {
                navigate(`${lang}/checkout`);
              }}
            >
              {t("client.cart.btn_checkout")}
            </Button>
          </Row>
        </Col>
      </Row>
    </div>
  );
};

export default Cart;
