import React from "react";
import { Link } from "react-router-dom";
import { Spin, Table } from "antd";
import TableRowAction from "./../../../../commons/TableRowAction/index";
import { useTranslation } from "react-i18next";

const CategoryTable = ({ items, onDelete, onEdit, pagination,isLoading }) => {
  const lang = localStorage.getItem("lang");
  const { t } = useTranslation();

  const columns = [
    {
      key: "image",
      dataIndex: "image",
      align: "center",
      headerAlign: "center",
      headerStyle: {
        width: 50,
      },
      title: <img className="img-head" src="/images/image.png" alt=""  width={20} height={20}/>,
      render: (_, record) => (
        <Link to="#">
          <img src={record.category_image} alt="" width={40} height={40}/>
        </Link>
      ),
    },
    {
      key: "name",
      dataIndex: "name",
      title: <span className='title-header-category'>{t("admins.category.name_field")}</span>,
      render: (_, record) => (
        <Link
          to={`${lang}/admin/category/update/${record.id}`}
          className="text-decoration-none d-flex"
        >
          {record.name}
        </Link>
      ),
    },
    {
      key: "slug",
      dataIndex: "slug",
      title:  <span className='title-header-category'>{t("admins.category.slug_field")}</span>,
      render: (_, record) => <span>{record.slug}</span>,
    },
    {
      key: "type",
      dataIndex: "type",
      title:  <div className='title-header-category'>Type</div>,
      render: (_, record) => <span>{record.type}</span>,
    },
    {
      key: "tool",
      dataIndex: "tool",
      align: "center",
      headerAlign: "center",
      headerStyle: {
        width: 100,
      },
      render: (_, record) => (
        <TableRowAction record={record} onDelete={onDelete} onEdit={onEdit} />
      ),
    },
  ];
  
  return (
    <Table
      rowKey="id"
      columns={columns}
      dataSource={items}
      bordered
      pagination={{
        showSizeChanger: true,
        showPrevNextJumpers: false,
        pageSizeOptions: ["5", "10"],
        current: pagination.current_page,
        pageSize: pagination.per_page,
      }}
      // loading={{ indicator: <div><Spin /></div>, spinning:isLoading}}
    />
  );
};

export default CategoryTable;
