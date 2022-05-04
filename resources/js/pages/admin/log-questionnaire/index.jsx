import React from "react";
import QuestionnaireTable from "./QuestionnaireTable";
import "./questionnaire.scss";
import { Link } from "react-router-dom";
import { TableHeader } from "../../../commons/TableHeader";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faDownload } from "@fortawesome/free-solid-svg-icons";
const LogQuestionnaire = () => {
  const items = [
    {
      orderId: "1",
      username: "1",
      userMail: "1",
      productName: "1",
      orderDate: "1",
      quantity: "1",
      price: "1",
      answer1: "1",
      answer2: "1",
      answer3: "1",
      answer4: "1",
      answer5: "1",
      answer6: "1",
      answer7: "1",
      billingName: "1",
      billingZipCode: "1",
      billingPrefecture: "1",
      billingCity: "1",
      billingStreetAddress: "1",
      billingBuilding: "1",
      billingPhone: "1",
      billingEmail: "1",
      shippingName: "1",
      shippingZipCode: "1",
      shippingPrefecture: "1",
      shippingCity: "1",
      shippingStreetAddress: "1",
      shippingBuilding: "1",
      shippingPhone: "1",
      shippingEmail: "1",
    },
    {
      orderId: "2",
      username: "2",
      userMail: "2",
      productName: "2",
      orderDate: "2",
      quantity: "2",
      price: "2",
      answer1: "2",
      answer2: "2",
      answer3: "2",
      answer4: "2",
      answer5: "2",
      answer6: "2",
      answer7: "2",
      billingName: "2",
      billingZipCode: "2",
      billingPrefecture: "2",
      billingCity: "2",
      billingStreetAddress: "2",
      billingBuilding: "2",
      billingPhone: "2",
      billingEmail: "2",
      shippingName: "2",
      shippingZipCode: "2",
      shippingPrefecture: "2",
      shippingCity: "2",
      shippingStreetAddress: "2",
      shippingBuilding: "2",
      shippingPhone: "2",
      shippingEmail: "2",
    },
  ];
  return (
    <div className="questionnaire-container">
      <TableHeader
        breadcrumb={[
          { name: "Home", routerLink: "../" },
          { name: "Questionnaire List", routerLink: "/log-questionnaire" },
        ]}
        title="Questionnaire List"
      >
        <div className="btn-group">
          <Link to="/" className="btn-show">
            <FontAwesomeIcon
              icon={faDownload}
              className=""
              style={{ color: "white" }}
            />
            <span> CSVダウンロード</span>
          </Link>
        </div>
      </TableHeader>
      <div className="questionnaire-table">
        <QuestionnaireTable items={items} />
      </div>
    </div>
  );
};

export default LogQuestionnaire;
