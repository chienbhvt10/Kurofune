import { faDownload } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Button, Table } from "antd";
import { useTranslation } from "react-i18next";

const QuestionnaireTable = ({ items, handleExportDetailCSV }) => {
  const { t } = useTranslation();

  const columns = [
    {
      key: "order_number",
      dataIndex: "order_number",
      title: t("admins.log_questionnaire.label_orderId"),
      render: (_, record) => (
        <div className="question-cell">{record?.order_number}</div>
      ),
    },
    {
      key: "name",
      dataIndex: "name",
      title: t("admins.log_questionnaire.label_username"),
      render: (_, record) => (
        <div className="question-cell">{record?.name}</div>
      ),
    },
    {
      key: "user_email",
      dataIndex: "user_email",
      title: t("admins.log_questionnaire.label_userMail"),
      render: (_, record) => (
        <div className="question-cell">{record?.user_email}</div>
      ),
    },
    {
      key: "product_name",
      dataIndex: "product_name",
      title: t("admins.log_questionnaire.label_productName"),
      render: (_, record) => (
        <div rowSpan={2} className="question-cell">
          {record?.order_products?.map((product, i) => (
            <span key={i}>{product.name}</span>
          ))}
        </div>
      ),
    },
    {
      key: "date_order",
      dataIndex: "date_order",
      title: t("admins.log_questionnaire.label_orderDate"),
      render: (_, record) => (
        <div className="question-cell">{record?.date_order}</div>
      ),
    },
    {
      key: "quantity",
      dataIndex: "quantity",
      title: t("admins.log_questionnaire.label_quantity"),
      render: (_, record) => (
        <ul className="question-cell">
          {record?.order_products?.map((product, i) => (
            <li key={i}>{product.quantity}</li>
          ))}
        </ul>
      ),
    },
    {
      key: "price",
      dataIndex: "price",
      title: t("admins.log_questionnaire.label_price"),
      render: (_, record) => (
        <ul className="question-cell">
          {record?.order_products?.map((product, i) => (
            <li key={i}>{product.total}</li>
          ))}
        </ul>
      ),
    },
    {
      key: "answer1",
      dataIndex: "answer1",
      title: t("admins.log_questionnaire.label_answer1"),
      render: (_, record) => (
        <ul className="question-cell">
          {record?.order_products?.map((product, i) => (
            <li key={i}>{product.anket_1}</li>
          ))}
        </ul>
      ),
    },
    {
      key: "answer2",
      dataIndex: "answer2",
      title: t("admins.log_questionnaire.label_answer2"),
      render: (_, record) => (
        <div className="question-cell">
          <ul className="question-cell">
            {record?.order_products?.map((product, i) => (
              <li key={i}>{product.anket_2}</li>
            ))}
          </ul>
        </div>
      ),
    },
    {
      key: "answer3",
      dataIndex: "answer3",
      title: t("admins.log_questionnaire.label_answer3"),
      render: (_, record) => (
        <div className="question-cell">
          <ul className="question-cell">
            {record?.order_products?.map((product, i) => (
              <li key={i}>{product.anket_3}</li>
            ))}
          </ul>
        </div>
      ),
    },
    {
      key: "answer4",
      dataIndex: "answer4",
      title: t("admins.log_questionnaire.label_answer4"),
      render: (_, record) => (
        <ul className="question-cell">
          {record?.order_products?.map((product, i) => (
            <li key={i}>{product.anket_4}</li>
          ))}
        </ul>
      ),
    },
    {
      key: "answer5",
      dataIndex: "answer5",
      title: t("admins.log_questionnaire.label_answer5"),
      render: (_, record) => (
        <ul className="question-cell">
          {record?.order_products?.map((product, i) => (
            <li key={i}>{product.anket_5}</li>
          ))}
        </ul>
      ),
    },
    {
      key: "answer6",
      dataIndex: "answer6",
      title: t("admins.log_questionnaire.label_answer6"),
      render: (_, record) => (
        <ul className="question-cell">
          {record?.order_products?.map((product, i) => (
            <li key={i}>{product.anket_6}</li>
          ))}
        </ul>
      ),
    },
    {
      key: "answer7",
      dataIndex: "answer7",
      title: t("admins.log_questionnaire.label_answer7"),
      render: (_, record) => (
        <ul className="question-cell">
          {record?.order_products?.map((product, i) => (
            <li key={i}>{product.anket_8}</li>
          ))}
        </ul>
      ),
    },
    {
      key: "billing_full_name",
      dataIndex: "billing_full_name",
      title: t("admins.log_questionnaire.label_billingName"),
      render: (_, record) => (
        <div className="question-cell">{record?.billing_full_name}</div>
      ),
    },
    {
      key: "billing_postal_code",
      dataIndex: "billing_postal_code",
      title: t("admins.log_questionnaire.label_billingZipCode"),
      render: (_, record) => (
        <div className="question-cell">{record?.billing_postal_code}</div>
      ),
    },
    {
      key: "billing_prefecture",
      dataIndex: "billing_prefecture",
      title: t("admins.log_questionnaire.label_billingPrefecture"),
      render: (_, record) => (
        <div className="question-cell">{record?.billing_prefecture}</div>
      ),
    },
    {
      key: "billing_city",
      dataIndex: "billing_city",
      title: t("admins.log_questionnaire.label_billingCity"),
      render: (_, record) => (
        <div className="question-cell">{record?.billing_city}</div>
      ),
    },
    {
      key: "billing_street_address",
      dataIndex: "billing_street_address",
      title: t("admins.log_questionnaire.label_billingStreetAddress"),
      render: (_, record) => (
        <div className="question-cell">{record?.billing_street_address}</div>
      ),
    },
    {
      key: "billing_building",
      dataIndex: "billing_building",
      title: t("admins.log_questionnaire.label_billingBuilding"),
      render: (_, record) => (
        <div className="question-cell">{record?.billing_building}</div>
      ),
    },
    {
      key: "billing_phone",
      dataIndex: "billing_phone",
      title: t("admins.log_questionnaire.label_billingPhone"),
      render: (_, record) => (
        <div className="question-cell">{record?.billing_phone}</div>
      ),
    },
    {
      key: "billing_email",
      dataIndex: "billing_email",
      title: t("admins.log_questionnaire.label_billingEmail"),
      render: (_, record) => (
        <div className="question-cell">{record?.billing_email}</div>
      ),
    },
    {
      key: "shipping_full_name",
      dataIndex: "shipping_full_name",
      title: t("admins.log_questionnaire.label_shippingName"),
      render: (_, record) => (
        <div className="question-cell">{record?.shipping_full_name}</div>
      ),
    },
    {
      key: "shipping_postal_code",
      dataIndex: "shipping_postal_code",
      title: t("admins.log_questionnaire.label_shippingZipCode"),
      render: (_, record) => (
        <div className="question-cell">{record?.shipping_postal_code}</div>
      ),
    },
    {
      key: "shipping_prefecture",
      dataIndex: "shipping_prefecture",
      title: t("admins.log_questionnaire.label_shippingPrefecture"),
      render: (_, record) => (
        <div className="question-cell">{record?.shipping_prefecture}</div>
      ),
    },
    {
      key: "shipping_city",
      dataIndex: "shipping_city",
      title: t("admins.log_questionnaire.label_shippingCity"),
      render: (_, record) => (
        <div className="question-cell">{record?.shipping_city}</div>
      ),
    },
    {
      key: "shipping_street_address",
      dataIndex: "shipping_street_address",
      title: t("admins.log_questionnaire.label_shippingStreetAddress"),
      render: (_, record) => (
        <div className="question-cell">{record?.shipping_street_address}</div>
      ),
    },
    {
      key: "shipping_building",
      dataIndex: "shipping_building",
      title: t("admins.log_questionnaire.label_shippingBuilding"),
      render: (_, record) => (
        <div className="question-cell">{record?.shipping_building}</div>
      ),
    },
    {
      key: "shipping_phone",
      dataIndex: "shipping_phone",
      title: t("admins.log_questionnaire.label_shippingPhone"),
      render: (_, record) => (
        <div className="question-cell">{record?.shipping_phone}</div>
      ),
    },
    {
      key: "shipping_email",
      dataIndex: "shipping_email",
      title: t("admins.log_questionnaire.label_shippingEmail"),
      render: (_, record) => (
        <div className="question-cell">{record?.shipping_email}</div>
      ),
    },
    {
      key: "downloadCsv",
      dataIndex: "downloadCsv",
      title: "",
      render: (_, record) => (
        <Button onClick={(e) => handleExportDetailCSV(e, record?.id)}>
          <FontAwesomeIcon icon={faDownload} style={{ color: "#62a19b" }} />
        </Button>
      ),
    },
  ];

  return (
    <Table
      bordered
      columns={columns}
      dataSource={items}
      rowKey="question-id"
      scroll={{ x: 1000 }}
      pagination={{
        showSizeChanger: true,
        showPrevNextJumpers: false,
        pageSizeOptions: ["5", "10", "20", "50", "100"],
        showTotal: () => `Total ${items.length} items`,
      }}
    />
  );
};

export default QuestionnaireTable;
