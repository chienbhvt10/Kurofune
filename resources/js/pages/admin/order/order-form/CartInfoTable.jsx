import { Form, Table } from "antd";
import React from "react";
import { getCurrentLanguage } from "../../../../helper/localStorage";

const CartInfoTable = ({ dataCartInforTable }) => {
  const [activeRefund, setActiveRefund] = React.useState(false);
  const [activeToolSecond, setActiveToolSecond] = React.useState(false);
  const [form] = Form.useForm();
  const lang = getCurrentLanguage();
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
      render: (_, record) => {
        return(
          <span id={`quantity-${record?.key}`}>{new Intl.NumberFormat('en-US').format(record?.price)} {!lang ? "円" : "(JPY)"}</span>
        )
      }
    },
    {
      title: "Qty",
      editable: true,
      render: (_, record) => {
        return (
          <span id={`quantity-${record?.key}`}>{record?.quantity}</span>
        );
      },
    },

    {
      title: "VAT",
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
      title: "Total",
      editable: true,
      render: (_, record) => {
        return <span id={`quantity-${record?.key}`}>{new Intl.NumberFormat('en-US').format(record?.total_tax)} {!lang ? "円" : "(JPY)"}</span>;
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
              <p>VAT:</p>
              <p>Order Total:</p>
            </div>
            <div className="cal-total">
              <p>{new Intl.NumberFormat("en-US").format(dataCartInforTable.total)} {!lang ? "円" : "(JPY)"}</p>
              <p>{`${calculateVAT(dataCartInforTable.total_tax,dataCartInforTable.total)} %`}</p>
              <p>{new Intl.NumberFormat("en-US").format(dataCartInforTable.total_tax)} {!lang ? "円" : "(JPY)"}</p>
            </div>
          </div>
        </div>
       
      </div>
    </>
  );
};

export default CartInfoTable;
