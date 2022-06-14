import { Form, Input, InputNumber, Popconfirm, Table, Typography } from "antd";
import React from "react";
import { debounce, pick, groupBy, unionBy } from "lodash";

const EditableCell = ({
  editing,
  dataIndex,
  title,
  inputType,
  record,
  index,
  children,
  total,
  key,
  ...restProps
}) => {
  return (
    <td {...restProps}>
      {editing ? (
        <Form.Item
          shouldUpdate={(prevValues, currentValues) => {
            {
              return prevValues !== currentValues;
            }
          }}
        >
          {({ getFieldValue, setFieldsValue }) => {
            const handleChange = () => {
              if (dataIndex === "quantity" || dataIndex === "cost") {
                let quantity = Number(
                  getFieldValue(`quantity-${record["key"]}`)
                );
                let cost = Number(getFieldValue(`cost-${record["key"]}`));
                setFieldsValue({
                  [`total-${record["key"]}`]: quantity * cost,
                });
              }
            };
            return (
              <Form.Item
                name={record ? `${dataIndex}-${record["key"]}` : dataIndex}
                shouldUpdate={(prevValues, currentValues) => {
                  prevValues !== currentValues;
                }}
                style={{
                  margin: 0,
                }}
                // rules={[
                //   {
                //     required: true,
                //     message: `Please Input ${title}!`,
                //   },
                // ]}
                initialValue={
                  title === "Total" ? total : record && record[dataIndex]
                }
              >
                {inputType === "number" ? (
                  <InputNumber
                    min={0}
                    readOnly={title === "Total" ? true : false}
                    onChange={handleChange}
                  />
                ) : (
                  <Input onChange={handleChange} />
                )}
              </Form.Item>
            );
          }}
        </Form.Item>
      ) : (
        children
      )}
    </td>
  );
};

const CartInfoTable = ({ items }) => {
  const [activeRefund, setActiveRefund] = React.useState(false);
  const [activeToolSecond, setActiveToolSecond] = React.useState(false);
  const originData = [];
  for (let i = 0; i < 8; i++) {
    originData.push({
      key: i.toString(),
      image: "",
      nameProduct: `Product ${i.toString()} `,
      cost: 15580,
      quantity: 1,
      VAT: 1558,
    });
  }
  const [form] = Form.useForm();
  const [data, setData] = React.useState(originData);
  const [fee, setFee] = React.useState(0);
  const [shipping, setShipping] = React.useState(0);
  const [orderTotal, setOrderTotal] = React.useState(0);

  const [editingKey, setEditingKey] = React.useState("");
  const [editAll, setEditAll] = React.useState(false);

  const isEditing = (record) => record.key === editingKey;

  const edit = (record) => {
    form.setFieldsValue({
      cost: 0,
      quantity: 0,
      nameProduct: "",
      VAT: 0,
      total: 0,
      ...record,
    });
    setEditingKey(record.key);
  };

  const cancel = () => {
    setEditingKey("");
  };

  const handleDelete = (key) => {
    const newData = data.filter((item) => item.key !== key);
    setData(newData);
  };
  let reverseObectRecord = (object) => {
    const newObject = Object.fromEntries(
      Object.entries(object).map(([key, value]) => [
        `${key.split("-", 1)}`,
        value,
      ])
    );
    return newObject;
  };
  const save = async (key) => {
    try {
      const row = await form.validateFields();
      const newObject = reverseObectRecord(row);
      const newData = [...data];
      const index = newData.findIndex((item) => key === item.key);
      if (newObject.total) {
        if (index > -1) {
          const item = newData[index];
          newData.splice(index, 1, { ...item, ...newObject });
          setData(newData);
          setEditingKey("");
        } else {
          newData.push(row);
          setData(newData);
          setEditingKey("");
        }
      } else if (newObject.total <= 0) {
        const newData = data.filter((item) => item.key !== key);
        setData(newData);
      }
    } catch (errInfo) {
      console.log("Validate Failed:", errInfo);
    }
  };
  const saveAll = (valueSaveAll) => {
    try {
      const newData = [...data];
      let arrayResult = newData.map((item) => {
        let objectpick = pick(valueSaveAll, [
          `VAT-${item.key}`,
          `cost-${item.key}`,
          `quantity-${item.key}`,
        ]);
        let objectNewSave = reverseObectRecord(objectpick);

        if (objectNewSave) {
        }
        return { ...item, ...objectNewSave };
      });
      setData(arrayResult);
      setEditingKey("");
    } catch (errInfo) {
      console.log("Validate Failed:", errInfo);
    }
  };
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
                src="https://imge.com/wp-content/uploads/2019/02/imge-new.png"
                alt="Flowers in Chania"
                width="35"
                height="35"
              />
            </div>
            <div>{record.nameProduct}</div>
          </div>
        );
      },
    },
    {
      title: "Cost",
      dataIndex: "cost",
      editable: true,
    },
    {
      title: "Qty",
      dataIndex: "quantity",
      editable: true,
      render: (_, record) => {
        return <span id={`quantity-${record.key}`}>{record.quantity}</span>;
      },
    },
    {
      title: "Total",
      dataIndex: "total",
      editable: true,
      render: (_, record) => {
        return <span>{record.quantity * record.cost}</span>;
      },
    },
    {
      title: "VAT",
      dataIndex: "VAT",
      editable: true,
    },
    {
      render: (_, record, _action) => {
        const editable = isEditing(record);
        return editable ? (
          <span>
            <Typography.Link
              onClick={() => save(record.key)}
              style={{
                marginRight: 8,
              }}
            >
              Save
            </Typography.Link>
            <Popconfirm title="Sure to cancel?" onConfirm={cancel}>
              <a>Cancel</a>
            </Popconfirm>
          </span>
        ) : (
          <>
            <Popconfirm
              title="Sure to delete?"
              onConfirm={() => handleDelete(record.key)}
            >
              <a>Delete </a>
            </Popconfirm>
            <Typography.Link onClick={() => edit(record)}>Edit</Typography.Link>
          </>
        );
      },
    },
  ];
  const mergedColumns = columns.map((col) => {
    if (!col.editable) {
      return col;
    }
    let arrayTypeNumber = ["quantity", "VAT", "cost", "total"];
    if (editAll) {
      return {
        ...col,
        onCell: (record) => ({
          record,
          inputType: arrayTypeNumber.includes(col.dataIndex)
            ? "number"
            : "text",
          dataIndex: col.dataIndex,
          title: col.title,
          editing: true,
          key: record.key,
          total: record.quantity * record.cost,
        }),
      };
    }
    return {
      ...col,
      onCell: (record) => ({
        record,
        inputType: arrayTypeNumber.includes(col.dataIndex) ? "number" : "text",
        dataIndex: col.dataIndex,
        title: col.title,
        editing: isEditing(record),
        key: record.key,
        total: record.quantity * record.cost,
      }),
    };
  });
  const onToggleToolSecond = () => {
    setActiveToolSecond(!activeToolSecond);
  };
  const onToggleRefund = () => {
    setActiveRefund(!activeRefund);
    if (editAll) {
      form.submit();
    }
    setEditAll(!editAll);
  };
  const totalMemo = React.useMemo(() => {
    let total = data.reduce((total, item) => {
      return total + item.quantity * item.cost;
    }, 0);
    return total;
  }, [data]);

  const maxValueVAT = React.useMemo(() => {
    let array = data.map((item) => {
      return item.VAT;
    });
    return Math.max(...array);
  }, [data]);
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
            components={{
              body: {
                cell: EditableCell,
              },
            }}
            bordered
            dataSource={data}
            columns={mergedColumns}
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
              <p> Fees: </p>
              <p> Shipping:</p>
              <p>VAT:</p>
              <p>OrderTotal:</p>
            </div>
            <div className="cal-total">
              <p>{totalMemo} (JPY)</p>
              <p>{fee} (JPY)</p>
              <p>{shipping} (JPY)</p>
              <p>{maxValueVAT} (JPY)</p>
              <p>{totalMemo + fee + shipping + maxValueVAT} (JPY)</p>
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
              {/* <div className="tool-right">
                <button className="recalculate-btn tool-btn" type="button">
                  Recalculate
                </button>
              </div> */}
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
