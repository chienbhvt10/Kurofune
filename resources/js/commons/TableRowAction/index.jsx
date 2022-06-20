import { faPenToSquare, faTrashCan } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Popconfirm } from "antd";
import React from "react";
import { useTranslation } from "react-i18next";
import "./table-row-action.scss";
const TableRowAction = ({ onDelete, onEdit, record, confirmLoading, style }) => {
  const { t } = useTranslation(0);

  const getDepend = () => {
    return document.querySelector(`#pop-confirm-${record.id}`);
  };

  return (
    <div
      className="table-row-action"
      id={`pop-confirm-${record.id}`}
      style={{ position: "relative", ...style }}
    >
      <FontAwesomeIcon
        icon={faPenToSquare}
        onClick={onEdit(record)}
        className="img-row"
      />
      <Popconfirm
        title={t("admins.delete_item_message")}
        onConfirm={onDelete(record)}
        okText={t("admins.user.form.option.yes")}
        cancelText={t("admins.user.form.option.no")}
        okButtonProps={{ loading: confirmLoading }}
        getPopupContainer={getDepend}
      >
        <FontAwesomeIcon icon={faTrashCan} className="img-row" />
      </Popconfirm>
    </div>
  );
};

export default TableRowAction;
