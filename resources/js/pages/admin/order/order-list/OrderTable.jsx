import { Table, Tag } from "antd";
import { t } from "i18next";
import { useNavigate } from "react-router-dom";
import { getCurrentLanguage } from "../../../../helper/localStorage";

import moment from "moment";
import { EMPTY_TABLE_LIST } from "../../../../constants/emptyTable";
import TableRowAction from "./../../../../commons/TableRowAction/index";

const OrderTable = ({ items, onChange, handleDeleteOrder,pagination }) => {
  const lang = getCurrentLanguage();
  let navigate = useNavigate();
  const confirmDelete =
    ({ id }) =>
    () => {
      handleDeleteOrder(id);
    };
  const onEdit =
    ({ id }) =>
    () => {
      navigate(`${lang}/admin/order-update/${id}`);
    };

  const column = [
    {
      title: t("admins.order.table.field_order_number"),
      dataIndex: "order_number",
      width: "15%",
      sorter: (a, b) => a.id - b.id,
    },
    {
      title: t("admins.order.table.field_full_name"),
      width: "30%",
      dataIndex: "shipping_full_name",
    },
    {
      title: t("admins.order.table.field_date"),
      dataIndex: "date_order",
      width: "20%",
      render: (_, record) => {
        return (
          <>{moment(record.date_order).zone("+09:00").format("DD MMM YYYY")}</>
        );
      },
    },
    {
      title: t("admins.order.table.field_status"),
      dataIndex: "status",
      width: "10%",
      render: (_, record) => {
        return (
          <Tag color="success">{String(record.status).toLocaleUpperCase()}</Tag>
        );
      },
    },
    {
      title: t("admins.order.table.field_total"),
      dataIndex: "total_tax",
    },

    {
      title: t("admins.order.table.field_action"),
      headerStyle: {
        width: 100,
      },
      align: "center",
      headerAlign: "center",
      render: (_, record) => (
        <TableRowAction
          record={record}
          onDelete={confirmDelete}
          onEdit={onEdit}
        />
      ),
    },
  ];

  return (
    <Table
      rowKey={"id"}
      columns={column}
      dataSource={items}
      pagination={{
        showSizeChanger: true,
        showPrevNextJumpers: false,
        pageSizeOptions: ["5", "10", "20", "50", "100"],
        current: pagination.current_page,
        total: pagination.total,
        pageSize: pagination.per_page,
        showTotal: () => `Total ${pagination.total} items`,
      }}
      bordered
      onChange={onChange}
      locale={EMPTY_TABLE_LIST()}
    />
  );
};

export default OrderTable;
