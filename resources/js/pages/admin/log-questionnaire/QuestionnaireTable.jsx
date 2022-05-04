import React from "react";
import BootstrapTable from "react-bootstrap-table-next/lib/src/bootstrap-table";
import { Link } from "react-router-dom";

const QuestionnaireTable = ({ items }) => {
  const columns = [
    {
      dataField: "orderId",
      text: "注文番号",
      headerStyle: {
        width: 200,
      },
    },
    {
      dataField: "username",
      text: "ユーザ名",
      headerStyle: {
        width: 200,
      },
    },
    {
      dataField: "userMail",
      text: "ユーザメール",
      headerStyle: {
        width: 200,
      },
    },
    {
      dataField: "productName",
      text: "注文商品",
      headerStyle: {
        width: 200,
      },
    },
    {
      dataField: "orderDate",
      text: "注文日",
      headerStyle: {
        width: 200,
      },
    },
    {
      dataField: "quantity",
      text: "個数",
      headerStyle: {
        width: 150,
      },
    },
    {
      dataField: "price",
      text: "金額",
      headerStyle: {
        width: 150,
      },
    },
    {
      dataField: "answer1",
      text: "あなたの性別は何ですか？",
      headerStyle: {
        width: 200,
      },
    },
    {
      dataField: "answer2",
      text: "あなたの年齢を教えてください",
      headerStyle: {
        width: 200,
      },
    },
    {
      dataField: "answer3",
      text: "このお薬を使ったことはありますか？",
      headerStyle: {
        width: 200,
      },
    },
    {
      dataField: "answer4",
      text: "今までにお薬を飲んで副作用を起こしたことはありますか？",
      headerStyle: {
        width: 200,
      },
    },
    {
      dataField: "answer5",
      text: "その時に使っていたお薬の名前はなんですか？",
      headerStyle: {
        width: 200,
      },
    },
    {
      dataField: "answer6",
      text: "その時に使っていたお薬の名前はなんですか？",
      headerStyle: {
        width: 200,
      },
    },
    {
      dataField: "answer7",
      text: "何か相談したいことはありますか？",
      headerStyle: {
        width: 200,
      },
    },
    {
      dataField: "billingName",
      text: "請求先氏名",
      headerStyle: {
        width: 200,
      },
    },
    {
      dataField: "billingZipCode",
      text: "請求先郵便番号",
      headerStyle: {
        width: 200,
      },
    },
    {
      dataField: "billingPrefecture",
      text: "請求先都道府県",
      headerStyle: {
        width: 200,
      },
    },
    {
      dataField: "billingCity",
      text: "請求先市区町村",
      headerStyle: {
        width: 200,
      },
    },
    {
      dataField: "billingStreetAddress",
      text: "請求先丁目・番地・号",
      headerStyle: {
        width: 200,
      },
    },
    {
      dataField: "billingBuilding",
      text: "請求先建物名・部屋番号",
      headerStyle: {
        width: 200,
      },
    },
    {
      dataField: "billingPhone",
      text: "請求先電話番号",
      headerStyle: {
        width: 200,
      },
    },
    {
      dataField: "billingEmail",
      text: "請求先メールアドレス",
      headerStyle: {
        width: 200,
      },
    },
    {
      dataField: "shippingName",
      text: "お届け先氏名",
      headerStyle: {
        width: 200,
      },
    },
    {
      dataField: "shippingZipCode",
      text: "	お届け先郵便番号",
      headerStyle: {
        width: 200,
      },
    },
    {
      dataField: "shippingPrefecture",
      text: "お届け先都道府県",
      headerStyle: {
        width: 200,
      },
    },
    {
      dataField: "shippingCity",
      text: "お届け先市区町村",
      headerStyle: {
        width: 200,
      },
    },
    {
      dataField: "shippingStreetAddress",
      text: "お届け先丁目・番地・号",
      headerStyle: {
        width: 200,
      },
    },
    {
      dataField: "shippingBuilding",
      text: "お届け先建物名・部屋番号",
      headerStyle: {
        width: 200,
      },
    },
    {
      dataField: "shippingPhone",
      text: "お届け先電話番号",
      headerStyle: {
        width: 200,
      },
    },
    {
      dataField: "shippingEmail",
      text: "お届け先メールアドレス",
      headerStyle: {
        width: 200,
      },
    },
    {
      dataField: "downloadCsv",
      text: "",
      headerStyle: {
        width: 80,
      },
      formatter: (cell, row) => (
        <Link to="/" className="btn-download-csv">
          <img src="/images/download.png" alt="" />
        </Link>
      ),
    },
  ];
  const defaultSorted = [{ dataField: "orderId", order: "desc" }];

  return (
    <BootstrapTable
      keyField="orderId"
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
  );
};

export default QuestionnaireTable;
