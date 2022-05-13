import { faPenToSquare, faTrashCan } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
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

      <FontAwesomeIcon
        icon={faTrashCan}
        onClick={onDelete(record)}
        className="img-row"
      />
    </div>
  );
};

export default TableRowAction;
