import { faPenToSquare, faXmark } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import BootstrapTable from "react-bootstrap-table-next/lib/src/bootstrap-table";
import { Link } from "react-router-dom";

const CartInfoTable = ({ items }) => {
  const [activeRefund, setActiveRefund] = React.useState(false);
  const [activeToolSecond, setActiveToolSecond] = React.useState(false);

  const columns = [
    {
      dataField: "product",
      text: "Product",
    },
    {
      dataField: "cost",
      text: "Cost",
      formatter: (cell, row) => <span> {row.cost} (JPY)</span>,
    },
    {
      dataField: "quantity",
      text: "Quantity",
    },
    {
      dataField: "total",
      text: "Total",
      formatter: (cell, row) => <span> {row.cost} (JPY)</span>,
    },
    { dataField: "vat", text: "VAT" },
    {
      dataField: "action",
      text: "",
      style: {
        textAlign: "center",
      },

      formatter: (cell, row) => (
        <>
          <Link to="/">
            <FontAwesomeIcon
              icon={faPenToSquare}
              style={{
                width: 20,
                color: "#62a19b",
              }}
            />
          </Link>
          <Link to="/">
            <FontAwesomeIcon
              icon={faXmark}
              style={{
                width: 20,
                color: "#62a19b",
              }}
            />
          </Link>
        </>
      ),
    },
  ];
  const defaultSorted = [{ dataField: "name", order: "desc" }];

  const onToggleToolSecond = () => {
    setActiveToolSecond(!activeToolSecond);
  };
  const onToggleRefund = () => {
    setActiveRefund(!activeRefund);
  };
  return (
    <>
      <div className="cart-product">
        <BootstrapTable
          keyField="id"
          columns={columns}
          data={items}
          defaultSorted={defaultSorted}
          //   selectRow={{ mode: "checkbox" }}
          bootstrap4
          bordered
          hover
          striped
          tabIndexCell
        />
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
              <p>1,944 (JPY)</p>
              <p>12 (JPY)</p>
              <p>0 (JPY)</p>
              <p>194 (JPY)</p>
              <p>2,138 (JPY)</p>
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
              <div className="tool-right">
                <button className="recalculate-btn tool-btn" type="button">
                  Recalculate
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
                <button className="add-btn tool-btn" type="button">
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
        <div
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
        </div>
      </div>
    </>
  );
};

export default CartInfoTable;
