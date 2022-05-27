import { Card, Col, Row } from "antd";
import React from "react";
import { Link } from "react-router-dom";
import "./card-pharmacy.scss";

const CardCategory = ({ cardItems }) => {
  const lang = localStorage.getItem("lang");

  return (
    <Row gutter={[16, 16]}>
      {cardItems?.map((item, index) => (
        <Col
          xl={{ span: 4 }}
          lg={{ span: 6 }}
          md={{ span: 8 }}
          sm={{ span: 12 }}
          xs={{ span: 24 }}
          span={24}
          key={index}
        >
          <Link to={`${lang}/pharmacy-detail/${item.id}`}>
            <Card
              hoverable
              cover={
                <img
                  style={{ objectFit: "cover" }}
                  src={item.images_outside[0] || "images/image-default.png"}
                  alt={item.name}
                />
              }
            >
              <Card.Meta title={item.name || "Not set name now"} />
            </Card>
          </Link>
        </Col>
      ))}
    </Row>
  );
};

export default CardCategory;
