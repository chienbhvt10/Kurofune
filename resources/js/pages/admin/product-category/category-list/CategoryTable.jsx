import { Image, Table } from "antd";
import React from "react";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import TableRowAction from "./../../../../commons/TableRowAction/index";
import { CATEGORY_OPTIONS } from "../../../../commons/data";

const CategoryTable = ({
  items,
  onDelete,
  onEdit,
  pagination,
  onTableChange,
}) => {
  const lang = localStorage.getItem("lang");
  const { t } = useTranslation();
  const columns = [
    {
      key: "image",
      dataIndex: "image",
      align: "center",
      headerAlign: "center",
      width: "10%",
      headerStyle: {
        width: 50,
      },
      title: (
        <Image
          className="img-head"
          src="/images/image.png"
          alt=""
          width={20}
          height={20}
        />
      ),
      render: (_, record) => (
        <div className="table-column-break">
          <Link to="#">
            <Image src={record.category_image} alt="" width={40} height={40} />
          </Link>
        </div>
      ),
    },
    {
      key: "name",
      dataIndex: "name",
      width: "35%",
      title: (
        <span className="title-header-category">
          {t("admins.category.name_field")}
        </span>
      ),
      render: (_, record) => {
        let _lang = lang || "/ja";
        return (
          <div className="table-column-break">
            <Link
              to={`${lang}/admin/category/update/${record.id}`}
              className="text-decoration-none d-flex"
            >
              {
                record.translations.find((item) => _lang.includes(item.locale))
                  ?.name
              }
            </Link>
          </div>
        );
      },
    },
    {
      key: "slug",
      dataIndex: "slug",
      width: "20%",
      title: (
        <div className="table-column-break">
          <span className="title-header-category">
            {t("admins.category.slug_field")}
          </span>
        </div>
      ),
      render: (_, record) => (
        <div className="table-column-break">
          <span>{record.slug}</span>
        </div>
      ),
    },
    {
      key: "type",
      dataIndex: "type",
      width: "25%",
      title: (
        <div className="title-header-category">
          {t("admins.category.type_field")}
        </div>
      ),
      render: (_, record) => (
        <div className="table-column-break">
          <span>
            {t(
              CATEGORY_OPTIONS.CATEGORY_TYPES.find((type) => {
                if (type.value === record.type) {
                  return t(type.label_translate);
                }
              })?.label_translate
            )}
          </span>
        </div>
      ),
    },
    {
      key: "tool",
      dataIndex: "tool",
      align: "center",
      headerAlign: "center",
      width: "10%",
      headerStyle: {
        width: 100,
      },
      render: (_, record) => (
        <div className="table-column-break">
          <TableRowAction record={record} onDelete={onDelete} onEdit={onEdit} />
        </div>
      ),
    },
  ];

  return (
    <Table
      rowKey="id"
      columns={columns}
      dataSource={items}
      bordered
      onChange={onTableChange}
      pagination={{
        showSizeChanger: true,
        showPrevNextJumpers: false,
        pageSizeOptions: ["5", "10", "20", "50", "100"],
        pageSize: pagination.per_page,
        total: pagination.total,
        showTotal: () => `Total ${pagination.total} items`,
      }}
    />
  );
};

export default CategoryTable;
