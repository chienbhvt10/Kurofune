import { faPenToSquare, faTrashCan } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Popconfirm } from "antd";
import React from "react";
import "./table-row-action.scss";
const TableRowAction = ({ onDelete, onEdit, record }) => {
  return (
    <div className="table-row-action">
      <FontAwesomeIcon
        icon={faPenToSquare}
        onClick={onEdit(record)}
        className="img-row"
      />
      <Popconfirm
        title="You want to delete?"
        onConfirm={onDelete(record)}
        okText="Yes"
        cancelText="No"
      >
        <FontAwesomeIcon icon={faTrashCan} className="img-row" />
      </Popconfirm>
    </div>
  );
};

export default TableRowAction;
