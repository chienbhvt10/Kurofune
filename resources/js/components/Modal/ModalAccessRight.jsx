import { Button, Modal } from 'antd';
import React, { useState } from 'react';
import "./modal-custom.scss";
const ModalAccessRight = ({ modalVisible, setModalVisible }) => {
  // const [modalVisible, setModalVisible] = useState(true);

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
            <img className="modal-custom-image" src='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR6NqqRWa810JiTbmC1IZuD4URna60QMvnsNR_QpnSxKt0CRbjrBzcBZMVVxnnBg3poDls&usqp=CAU'/>
            <p className="modal-custom-description"> lorem ipsum dolor sit am</p>
            <p className="modal-custom-title"> lorem ipsum dolor sit am</p>
            <ul className="modal-custom-list">
              <li className="modal-custom-item">
                <span className="modal-custom-item-index">1</span>
                <span className="modal-custom-item-content">lorem ipsum dolor sit am</span>
              </li>
              <li className="modal-custom-item">
                <span className="modal-custom-item-index">2</span>
                <span className="modal-custom-item-content">lorem ipsum dolor sit am</span>
              </li>
              <li className="modal-custom-item">
                <span className="modal-custom-item-index">3</span>
                <span className="modal-custom-item-content">lorem ipsum dolor sit am</span>
              </li>
              <li className="modal-custom-item">
                <span className="modal-custom-item-index">4</span>
                <span className="modal-custom-item-content">lorem ipsum dolor sit am</span>
              </li>
              
            </ul>
          </div>
        </div>
      </div>
    </Modal>
  );
};

export default ModalAccessRight;