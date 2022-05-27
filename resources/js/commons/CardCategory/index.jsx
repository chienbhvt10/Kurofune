import { Card, Col, Row } from "antd";
import React from "react";
import { Link } from "react-router-dom";
import "./card-category.scss";

const CardCategory = ({ cardItems, type }) => {
  const lang = localStorage.getItem("lang");

  return (
    <Row gutter={[16, 16]}>
      {cardItems?.map((item, index) => (
        <React.Fragment key={index}>
          {item.type === type && (
            <Col
              xl={{ span: 4 }}
              lg={{ span: 6 }}
              md={{ span: 8 }}
              sm={{ span: 12 }}
              xs={{ span: 24 }}
            >
              <Link to={`${lang}/category-list-detail/${item.id}`}>
                <Card
                  hoverable
                  cover={
                    <img
                      style={{ objectFit: "cover" }}
                      src={item.product_image || "images/image-default.png"}
                      alt={item.name}
                    />
                  }
                >
                  <Card.Meta title={item.name || "Not set name now"} />
                </Card>
              </Link>
            </Col>
          )}
        </React.Fragment>
      ))}
    </Row>
  );
};

export default CardCategory;
