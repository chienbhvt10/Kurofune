import { Button, Modal } from 'antd';
import React, { useState } from 'react';
import "./modal-custom.scss";
import { useTranslation } from "react-i18next";
const ModalAccessRight2 = ({ modalVisible, setModalVisible }) => {

    const theServices ={
        light_plan:[
            'client.media.light_plan.modal_access_right2.the_services.1',
            'client.media.light_plan.modal_access_right2.the_services.2',
        ],
        full_plan:[
            'client.media.full_plan.modal_access_right2.the_services.1',
            'client.media.full_plan.modal_access_right2.the_services.2',
            'client.media.full_plan.modal_access_right2.the_services.3',
            'client.media.full_plan.modal_access_right2.the_services.4',
            'client.media.full_plan.modal_access_right2.the_services.5',
        ]
    }
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
                        <p className="modal-custom-description">{t("client.media.full_plan.modal_access_right2.description")}</p>
                        <p className="modal-custom-title">{t("client.media.full_plan.modal_access_right2.title",{payload:'Name User'})}</p>
                        <ul className="modal-custom-list">
                            {theServices.full_plan.map((content, index) => {
                                return (
                                    <li className="modal-custom-item">
                                        <span className="modal-custom-item-index">{index +1}</span>
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
                                src={t("client.media.full_plan.modal_access_right2.the_services.linkVideo")}
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