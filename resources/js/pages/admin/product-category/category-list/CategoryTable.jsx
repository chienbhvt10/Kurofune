import React from "react";
import BootstrapTable from "react-bootstrap-table-next";
import { Link } from "react-router-dom";

const CategoryTable = ({ items }) => {
  const columns = [
    {
      dataField: "categoryImage",
      text: <img className="img-head" src="/images/image.png" alt="" />,
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
      text: <img className="img-head" src="/images/japan.png" alt="" />,
      align: "center",
      headerAlign: "center",
      headerStyle: {
        width: 50,
      },
      formatter: (cell, row) => (
        <Link to="/">
          <img className="img-row" src="/images/editing.png" alt="" />
        </Link>
      ),
    },
    {
      dataField: "vi",
      text: <img className="img-head" src="/images/vietnam.png" alt="" />,
      align: "center",
      headerAlign: "center",
      headerStyle: {
        width: 50,
      },
      formatter: (cell, row) => (
        <Link to="/">
          <img className="img-row" src="/images/editing.png" alt="" />
        </Link>
      ),
    },
    {
      dataField: "zh",
      text: <img className="img-head" src="/images/china.png" alt="" />,
      align: "center",
      headerAlign: "center",
      headerStyle: {
        width: 50,
      },
      formatter: (cell, row) => (
        <Link to="/">
          <img className="img-row" src="/images/editing.png" alt="" />
        </Link>
      ),
    },
    {
      dataField: "tl",
      text: <img className="img-head" src="/images/philippines.png" alt="" />,
      align: "center",
      headerAlign: "center",
      headerStyle: {
        width: 50,
      },
      formatter: (cell, row) => (
        <Link to="/">
          <img className="img-row" src="/images/editing.png" alt="" />
        </Link>
      ),
    },
    {
      dataField: "en",
      text: <img className="img-head" src="/images/en.png" alt="" />,
      align: "center",
      headerAlign: "center",
      headerStyle: {
        width: 50,
      },
      formatter: (cell, row) => (
        <Link to="/">
          <img className="img-row" src="/images/editing.png" alt="" />
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
