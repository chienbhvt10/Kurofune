import { Form, Table } from "antd";
import React from "react";

const CartInfoTable = ({ dataCartInforTable }) => {
  const [activeRefund, setActiveRefund] = React.useState(false);
  const [activeToolSecond, setActiveToolSecond] = React.useState(false);
  const [form] = Form.useForm();
  const removeFirstWord = (str) => {
    if (!str) return "";
    const indexOfSpace = str.indexOf(" ");
    if (indexOfSpace === -1) {
      return "";
    }
    return str.substring(indexOfSpace + 1);
  };
  const unitMoney = React.useMemo(() => {
    let unit = removeFirstWord(String(dataCartInforTable.total_tax));
    return unit;
  }, [dataCartInforTable]);

  // const itemsSubtotal = React.useMemo(() => {
  //   let total = dataCartInforTable.order_products.reduce((total, item) => {
  //     return Number(total) + Number(item.pivot.quantity) * Number(item.price);
  //   }, 0);
  //   return total;
  // }, [dataCartInforTable]);

  const columns = [
    {
      title: "Product",
      width: "60%",
      editable: false,
      render: (_, record) => {
        return (
          <div style={{ display: "flex" }}>
            <div style={{ marginRight: 15 }}>
              <img
                src={`${record.image}`}
                alt="Flowers in Chania"
                width="35"
                height="35"
              />
            </div>
            <div>{record.name}</div>
          </div>
        );
      },
    },
    {
      title: "Price",
      dataIndex: "price",
      editable: true,
    },
    {
      title: "Qty",
      editable: true,
      render: (_, record) => {
        return (
          <span id={`quantity-${record?.key}`}>{record?.pivot?.quantity}</span>
        );
      },
    },

    {
      title: "VAT",
      editable: true,
      render: (_, record) => {
        return (
          <span id={`quantity-${record?.key}`}>
            {Number(record?.pivot?.total_tax) -
              Number(record?.pivot?.quantity) * Number(record?.price)}
          </span>
        );
      },
    },
    {
      title: "Total",
      editable: true,
      render: (_, record) => {
        return <span>{Number(record?.pivot?.total_tax)}</span>;
      },
    },
  ];

  const onToggleToolSecond = () => {
    setActiveToolSecond(!activeToolSecond);
  };
  const onToggleRefund = () => {
    setActiveRefund(!activeRefund);
  };
  return (
    <>
      <div className="cart-product">
        <Form
          form={form}
          component={false}
          onFinish={(value) => {
            saveAll(value);
          }}
        >
          <Table
            dataSource={dataCartInforTable.products}
            columns={columns}
            rowClassName="editable-row"
            pagination={false}
          />
        </Form>
      </div>
      <div className="cart-container">
        <div className={activeRefund ? "cart-total" : "cart-total active"}>
          <div className="calculate">
            <div className="cal-title">
              <p>Items Subtotal:</p>
              <p>Fees: </p>
              <p>Shipping:</p>
              <p>VAT:</p>
              <p>Order Total:</p>
            </div>
            <div className="cal-total">
              <p>{dataCartInforTable.total}</p>
              <p> 0 ({unitMoney})</p>
              <p> 0 ({unitMoney})</p>
              <p>{dataCartInforTable.total_tax}</p>
            </div>
          </div>
          <div className="tool-container">
            <div
              className={
                activeToolSecond ? "tool-first tool " : "tool-first tool active"
              }
            >
              <div className="tool-left">
                <button
                  className="add-btn tool-btn"
                  type="button"
                  onClick={onToggleToolSecond}
                >
                  Add item(s)
                </button>
                <button
                  className="add-btn tool-btn"
                  type="button"
                  onClick={onToggleRefund}
                >
                  Refund
                </button>
              </div>
            </div>
            <div
              className={
                activeToolSecond
                  ? "tool-second tool active"
                  : "tool-second tool"
              }
            >
              <div className="tool-left"></div>
              <div className="tool-right">
                <button
                  className="add-btn tool-btn"
                  type="button"
                  onClick={() => {}}
                >
                  Add product(s)
                </button>
                <button className="add-btn tool-btn" type="button">
                  Add fee
                </button>
                <button className="add-btn tool-btn" type="button">
                  Add shipping
                </button>
                <button className="add-btn tool-btn" type="button">
                  Add tax
                </button>
                <button
                  className="add-btn tool-btn"
                  type="button"
                  onClick={onToggleToolSecond}
                >
                  Cancel
                </button>
                <button className="save-btn tool-btn" type="button">
                  Save
                </button>
              </div>
            </div>
          </div>
        </div>
        {/* <div
          className={
            activeRefund
              ? "cart-total-refund cart-total active"
              : "cart-total-refund cart-total"
          }
        >
          <div className="calculate">
            <div className="cal-title">
              <p>Restock refunded items:</p>
              <p>Amount already refunded: </p>
              <p>Total available to refund: </p>
              <p>Refund amount: </p>
              <p>Reason for refund (optional): </p>
            </div>
            <div className="cal-total">
              <input type="checkbox" name="restockItem" />
              <p>12 (JPY)</p>
              <p>0 (JPY)</p>
              <input type="text" name="refundAmount" />
              <br />
              <input type="text" name="reason" />
            </div>
          </div>
          <div className="tool-container">
            <div className="tool-first-refund tool">
              <div className="tool-left">
                <button
                  className="add-btn tool-btn"
                  type="button"
                  onClick={onToggleRefund}
                >
                  Cancel
                </button>
              </div>
              <div className="tool-right-refund">
                <button className="refund-btn tool-btn" type="button">
                  Refund 0 (JPY) manually
                </button>
              </div>
            </div>
          </div>
        </div> */}
      </div>
    </>
  );
};

export default CartInfoTable;
