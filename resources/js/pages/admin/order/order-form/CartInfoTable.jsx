import { Form, Table } from "antd";
import { t } from "i18next";
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

  const calculateVAT =(total_tax,total)=>{
    const taxMoney = (total_tax-total)/total_tax*100;
    return taxMoney.toFixed(1)
  }
  const columns = [
    {
      title: t("admins.order.table.field_product"),
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
      title: t("admins.order.table.field_price"),
      dataIndex: "price",
      editable: true,
    },
    {
      title: t("admins.order.table.field_quantity"),
      editable: true,
      render: (_, record) => {
        return (
          <span id={`quantity-${record?.key}`}>{record?.quantity}</span>
        );
      },
    },

    {
      title: t("admins.order.table.field_vat"),
      editable: true,
      render: (_, record) => {
        return (
          <span id={`quantity-${record?.key}`}>
            {`${firstString(record.tax)} %`}
          </span>
        );
      },
    },
    {
      title: t("admins.order.table.field_order_total"),
      editable: true,
      render: (_, record) => {
        return <span>{Number(record.total_tax)}</span>;
      },
    },
  ];

  const onToggleToolSecond = () => {
    setActiveToolSecond(!activeToolSecond);
  };
  const onToggleRefund = () => {
    setActiveRefund(!activeRefund);
  };

  const firstString =(string)=>{
    let removed;
    const index = string.indexOf('.');
    if (index !== -1) {
      removed = string.slice(0 , index);
    }
    return removed;
  }
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
              {/* <p>Fees: </p>
              <p>Shipping:</p> */}
              <p>VAT:</p>
              <p>Order Total:</p>
            </div>
            <div className="cal-total">
              <p>{dataCartInforTable.total}</p>
              <p>{`${calculateVAT(dataCartInforTable.total_tax,dataCartInforTable.total)} %`}</p>
              <p>{dataCartInforTable.total_tax}</p>
            </div>
          </div>
          {/* <div className="tool-container">
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
                  onClick={() => { }}
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
          </div> */}
        </div>
       
      </div>
    </>
  );
};

export default CartInfoTable;
