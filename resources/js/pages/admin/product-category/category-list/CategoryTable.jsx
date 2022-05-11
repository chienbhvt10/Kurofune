import React from "react";
import BootstrapTable from "react-bootstrap-table-next";
import { Link } from "react-router-dom";

const CategoryTable = ({ items }) => {
  const columns = [
    {
      dataField: "categoryImage",
      text: (
        <img className="img-head" src="/images/image.png" alt="" width={20} />
      ),
      align: "center",
      headerAlign: "center",
      headerStyle: {
        width: 50,
      },
      formatter: (cell, row) => <Link to="/">{row.image}</Link>,
    },
    {
      dataField: "name",
      text: "Name",
    },
    {
      dataField: "slug",
      text: "Slug",
    },
    {
      dataField: "type",
      text: "Type",
    },
    {
      dataField: "jp",
      text: "",
      align: "center",
      headerAlign: "center",
      headerStyle: {
        width: 50,
      },
      formatter: (cell, row) => (
        <Link to="/">
          <img
            className="img-row"
            src="/images/editing.png"
            alt=""
            width={20}
          />
        </Link>
      ),
    },
  ];
  const defaultSorted = [{ dataField: "name", order: "desc" }];
  return (
    <BootstrapTable
      keyField="id"
      columns={columns}
      data={items}
      defaultSorted={defaultSorted}
      selectRow={{ mode: "checkbox" }}
      bootstrap4
      bordered
      hover
      striped
      tabIndexCell
    />
  );
};

export default CategoryTable;
