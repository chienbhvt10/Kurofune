import { Button, Modal } from 'antd';
import React, { useState } from 'react';
import "./modal-custom.scss";
import { useTranslation } from "react-i18next";
import { TheServices } from './data';
const ModalAccessRight2 = ({ modalVisible, setModalVisible, role,profile }) => {

    const { t } = useTranslation();

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
                    <p className="modal-custom-description">{t(`client.media.${role}.modal_access_right2.description`)}</p>
                    <p className="modal-custom-title">{t(`client.media.${role}.modal_access_right2.title`, { payload: profile.name })}</p>
                        <ul className="modal-custom-list">
                            {TheServices[role] && TheServices[role].map((content, index) => {
                                return (
                                    <li className="modal-custom-item" key={index}>
                                        <span className="modal-custom-item-index">{index + 1}</span>
                                        <span className="modal-custom-item-content">{t(content)}</span>
                                    </li>
                                )
                            })}
                        </ul>
                        <div className="modal-custom-video">
                            <iframe
                                width="100%"
                                height="240"
                                controls
                                src={t("client.media.light_plan.modal_access_right2.linkVideo")}
                            >
                            </iframe>
                        </div>
                    </div>
                </div>
            </div>
        </Modal>
    );
};

export default ModalAccessRight2;