import { faDownload } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import BootstrapTable from "react-bootstrap-table-next/lib/src/bootstrap-table";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";

const QuestionnaireTable = ({ items }) => {
  const { t } = useTranslation();
  const columns = [
    {
      dataField: "orderId",
      text: t("admins.log_questionnaire.label_orderId"),
      headerStyle: {
        width: 200,
      },
    },
    {
      dataField: "username",
      text: t("admins.log_questionnaire.label_username"),
      headerStyle: {
        width: 200,
      },
    },
    {
      dataField: "userMail",
      text: t("admins.log_questionnaire.label_userMail"),
      headerStyle: {
        width: 200,
      },
    },
    {
      dataField: "productName",
      text: t("admins.log_questionnaire.label_productName"),
      headerStyle: {
        width: 200,
      },
    },
    {
      dataField: "orderDate",
      text: t("admins.log_questionnaire.label_orderDate"),
      headerStyle: {
        width: 200,
      },
    },
    {
      dataField: "quantity",
      text: t("admins.log_questionnaire.label_quantity"),
      headerStyle: {
        width: 150,
      },
    },
    {
      dataField: "price",
      text: t("admins.log_questionnaire.label_price"),
      headerStyle: {
        width: 150,
      },
    },
    {
      dataField: "answer1",
      text: t("admins.log_questionnaire.label_answer1"),
      headerStyle: {
        width: 200,
      },
    },
    {
      dataField: "answer2",
      text: t("admins.log_questionnaire.label_answer2"),
      headerStyle: {
        width: 200,
      },
    },
    {
      dataField: "answer3",
      text: t("admins.log_questionnaire.label_answer3"),
      headerStyle: {
        width: 200,
      },
    },
    {
      dataField: "answer4",
      text: t("admins.log_questionnaire.label_answer4"),
      headerStyle: {
        width: 200,
      },
    },
    {
      dataField: "answer5",
      text: t("admins.log_questionnaire.label_answer5"),
      headerStyle: {
        width: 200,
      },
    },
    {
      dataField: "answer6",
      text: t("admins.log_questionnaire.label_answer6"),
      headerStyle: {
        width: 200,
      },
    },
    {
      dataField: "answer7",
      text: t("admins.log_questionnaire.label_answer7"),
      headerStyle: {
        width: 200,
      },
    },
    {
      dataField: "billingName",
      text: t("admins.log_questionnaire.label_billingName"),
      headerStyle: {
        width: 200,
      },
    },
    {
      dataField: "billingZipCode",
      text: t("admins.log_questionnaire.label_billingZipCode"),
      headerStyle: {
        width: 200,
      },
    },
    {
      dataField: "billingPrefecture",
      text: t("admins.log_questionnaire.label_billingPrefecture"),
      headerStyle: {
        width: 200,
      },
    },
    {
      dataField: "billingCity",
      text: t("admins.log_questionnaire.label_billingCity"),
      headerStyle: {
        width: 200,
      },
    },
    {
      dataField: "billingStreetAddress",
      text: t("admins.log_questionnaire.label_billingStreetAddress"),
      headerStyle: {
        width: 200,
      },
    },
    {
      dataField: "billingBuilding",
      text: t("admins.log_questionnaire.label_billingBuilding"),
      headerStyle: {
        width: 200,
      },
    },
    {
      dataField: "billingPhone",
      text: t("admins.log_questionnaire.label_billingPhone"),
      headerStyle: {
        width: 200,
      },
    },
    {
      dataField: "billingEmail",
      text: t("admins.log_questionnaire.label_billingEmail"),
      headerStyle: {
        width: 200,
      },
    },
    {
      dataField: "shippingName",
      text: t("admins.log_questionnaire.label_shippingName"),
      headerStyle: {
        width: 200,
      },
    },
    {
      dataField: "shippingZipCode",
      text: t("admins.log_questionnaire.label_shippingZipCode"),
      headerStyle: {
        width: 200,
      },
    },
    {
      dataField: "shippingPrefecture",
      text: t("admins.log_questionnaire.label_shippingPrefecture"),
      headerStyle: {
        width: 200,
      },
    },
    {
      dataField: "shippingCity",
      text: t("admins.log_questionnaire.label_shippingCity"),
      headerStyle: {
        width: 200,
      },
    },
    {
      dataField: "shippingStreetAddress",
      text: t("admins.log_questionnaire.label_shippingStreetAddress"),
      headerStyle: {
        width: 200,
      },
    },
    {
      dataField: "shippingBuilding",
      text: t("admins.log_questionnaire.label_shippingBuilding"),
      headerStyle: {
        width: 200,
      },
    },
    {
      dataField: "shippingPhone",
      text: t("admins.log_questionnaire.label_shippingPhone"),
      headerStyle: {
        width: 200,
      },
    },
    {
      dataField: "shippingEmail",
      text: t("admins.log_questionnaire.label_shippingEmail"),
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
          <FontAwesomeIcon
            icon={faDownload}
            className=""
            style={{ color: "#62a19b" }}
          />
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
