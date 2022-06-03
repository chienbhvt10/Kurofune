import { Card, Col, Row } from "antd";
import React from "react";
import { Link } from "react-router-dom";
import { DEFAULT_IMAGE } from "../../constants";
import { getCurrentLanguage } from "../../helper/localStorage";
import "./card-category.scss";

const CardCategory = ({ cardItems, type }) => {
  const lang = getCurrentLanguage();

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
                      style={{ objectFit: "cover" , height:"180px"}}
                      src={item.product_image || DEFAULT_IMAGE}
                      alt={item.name}
                      onError={(e) => {
                        e.target.onerror = null
                        e.target.src = '/images/image-default.png'
                      }}
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
