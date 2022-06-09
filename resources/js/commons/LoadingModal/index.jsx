import React from "react";
import "./loading-modal.scss";
import { LoadingOutlined } from "@ant-design/icons";
import { Spin } from "antd";
const LoadingModal = () => {
  return (
    <div className="wrapper">
      <Spin
        indicator={
          <LoadingOutlined
            style={{
              fontSize: 60,
              color: "#62a19b",
            }}
            spin
          />
        }
      />
    </div>
  );
};

export default LoadingModal;
