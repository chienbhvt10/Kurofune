import { Card, Col, Row } from "antd";
import React from "react";
import { Link } from "react-router-dom";
import { DEFAULT_IMAGE } from "../../constants";
import { getCurrentLanguage } from "../../helper/localStorage";
import "./card-category.scss";
import { Tooltip } from "antd";
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
                      style={{ objectFit: "contain", height: "180px" }}
                      src={item.category_image}
                      alt={item.name}
                      onError={(e) => {
                        e.target.onerror = null;
                        e.target.src = "/images/image-default.png";
                      }}
                    />
                  }
                >
                  <Tooltip
                    arrowPointAtCenter
                    title={item.name || "Not set name now"}
                  >
                    <Card.Meta
                      title={<span>{item.name || "Not set name now"}</span>}
                    />
                  </Tooltip>
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
