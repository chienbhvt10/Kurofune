import { Button, Modal } from 'antd';
import { t } from 'i18next';
import React, { useState } from 'react';
import "./modal-custom.scss";
const ModalAccessRight = ({ modalVisible, setModalVisible,role }) => {
  // const [modalVisible, setModalVisible] = useState(true);
  const theServices = {
    light_plan: [
      'client.media.light_plan.modal_access_right2.the_services.1',
      'client.media.light_plan.modal_access_right2.the_services.2',
    ],
    full_plan: [
      'client.media.full_plan.modal_access_right2.the_services.1',
      'client.media.full_plan.modal_access_right2.the_services.2',
      'client.media.full_plan.modal_access_right2.the_services.3',
      'client.media.full_plan.modal_access_right2.the_services.4',
      'client.media.full_plan.modal_access_right2.the_services.5',
    ],
    default:[]
  }
  return (
    <Modal
      visible={modalVisible}
      footer={null}
      onCancel={() => {
        setModalVisible(false)
      }}
      className="modal-access-right"
    >
      <div className="modal-custom">
        <div className="modal-custom-body">
          <div className="modal-custom-content">
            <img className="modal-custom-image" src='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR6NqqRWa810JiTbmC1IZuD4URna60QMvnsNR_QpnSxKt0CRbjrBzcBZMVVxnnBg3poDls&usqp=CAU' />
            <p className="modal-custom-description"> lorem ipsum dolor sit am</p>
            <p className="modal-custom-title"> lorem ipsum dolor sit am</p>
            <ul className="modal-custom-list">
              {theServices[role].map((content, index) => {
                return (
                  <li className="modal-custom-item">
                    <span className="modal-custom-item-index">{index + 1}</span>
                    <span className="modal-custom-item-content">{t(content)}</span>
                  </li>
                )
              })}
            </ul>
          </div>
        </div>
      </div>
    </Modal>
  );
};

export default ModalAccessRight;