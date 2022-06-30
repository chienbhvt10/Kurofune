import { Modal } from "antd";
import { t } from "i18next";
import React from "react";
import useUserRegistrationClient from "../../hooks/user/useUserRegistrationClient";
import { TheServices } from "./data";
import "./modal-custom.scss";
const ModalAccessRight = ({ modalVisible, setModalVisible, role, profile }) => {
  const { availableCounterClient } = useUserRegistrationClient();
  React.useEffect(() => {
    availableCounterClient();
  }, []);

  return (
    <Modal
      visible={modalVisible}
      footer={null}
      onCancel={() => {
        setModalVisible(false);
      }}
      className="modal-access-right"
    >
      <div className="modal-custom">
        <div className="modal-custom-body">
          <div className="modal-custom-content">
            <img className="modal-custom-image" src="/images/people.png" />
            <p className="modal-custom-description">
              {t(`client.media.light_plan.modal_access_right.description`, {
                payload: profile.profile.company_name,
              })}
            </p>
            <p className="modal-custom-title">
              {t(`client.media.light_plan.modal_access_right.title`, {
                payload: profile.name,
              })}
            </p>
            <ul className="modal-custom-list">
              {TheServices[role] &&
                TheServices[role].map((content, index) => {
                  return (
                    <li className="modal-custom-item" key={index}>
                      <span className="modal-custom-item-index">
                        {index + 1}
                      </span>
                      <span className="modal-custom-item-content">
                        {t(content)}
                      </span>
                    </li>
                  );
                })}
            </ul>
          </div>
        </div>
      </div>
    </Modal>
  );
};

export default ModalAccessRight;
