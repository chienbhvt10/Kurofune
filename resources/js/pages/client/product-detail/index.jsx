import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import "./product-detail.scss";
import useProductClient from "../../../hooks/product/useProductClient";
import { useLocation, useParams } from "react-router-dom";
import { Form, Input, Select, Button, Modal } from "antd";
import { PRODUCT_OPTION } from "../../../commons/data";
import useCartProduct from "../../../hooks/product/userCartProduct";

const formItemLayout = {
  labelCol: {
    xs: { span: 24 },
    sm: { span: 12 },
  },
  wrapperCol: {
    xs: { span: 24 },
    sm: { span: 16 },
  },
};

const ProductDetailPage = () => {
  const { t } = useTranslation();
  const { id } = useParams();
  const location = useLocation();
  const { getProductClient, productClient } = useProductClient();
  const { addToCart, resAddToCart } = useCartProduct();
  React.useEffect(() => {
    if (id) {
      getProductClient({ id: id });
    }
  }, [id, location]);

  const [form] = Form.useForm();

  const onFinish = (values) => {
    addToCart({ ...values, product_id: id });
  };
  const CheckValidation = (val, errors) => {
    Modal.error({
      title: t("client.product_detail.error_title_requried"),
      content: t("client.product_detail.error_msg_requried"),
      centered: true,
    });
  };
  return (
    <>
      {productClient && (
        <div id="info-prod" className="card">
          <div className="container-detail-product">
            <Form
              {...formItemLayout}
              form={form}
              name="register"
              onFinish={onFinish}
              scrollToFirstError
              onFinishFailed={CheckValidation}
            >
              <div className="wrap-detail-product">
                <div className="item-prod image-prod">
                  <img
                    alt={productClient.name}
                    src={productClient.product_image}
                  />
                </div>
                <div className="item-prod summary-prod">
                  <div className="summary-detail">
                    <div className="product-name">{productClient.name}</div>
                    <div className="medicinal_efficacy_block">
                      <div className="medicinal_efficacy_item medicinal_efficacy_label">
                      {t("client.product_detail.medicinal_efficacy")}
                      </div>
                      <div className="medicinal_efficacy_item medicinal_efficacy_value">
                    {productClient.medicinal_efficacy_classification}
                      </div>
                    </div>
                    <div className="block-price flex">
                      <div className="item-info price-info flex flex-column">
                        <div className="no-sale">
                          <div className="Ybrg9j">
                            <span className="woocommerce-Price-amount amount">
                              <bdi>
                                {productClient.price}
                              </bdi>
                            </span>
                          </div>
                        </div>
                      </div>
                      <div className="item-info product-type">
                      {productClient.type}
                      </div>
                      <div className="btn-cart-pc item-info block-btn-checkout customs_btn_cart">
                        <div className="cart">
                          <Form.Item>
                            <Button
                              type="primary"
                              htmlType="submit"
                              className="single_add_to_cart_button button alt actived"
                            >
                              {t("client.product_detail.btn_buy")}
                            </Button>
                          </Form.Item>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="list-questions-wrap">
                <Form.Item
                  name="anket_1"
                  label={t("client.product_detail.label_gender")}
                  rules={[
                    {
                      required: true,
                      message: t("client.product_detail.error_required"),
                    },
                  ]}
                >
                  <Select
                    placeholder={t("client.product_detail.placeholder_option")}
                  >
                    {PRODUCT_OPTION.GENDER.map((option, index) => (
                      <Select.Option key={index} value={option.value}>
                        {t(
                          `client.product_detail.option_add_to_cart.gender.${option.label}`
                        )}
                      </Select.Option>
                    ))}
                  </Select>
                </Form.Item>

                <Form.Item
                  name="anket_2"
                  label={t("client.product_detail.label_age")}
                  rules={[
                    {
                      required: true,
                      message: t("client.product_detail.error_required"),
                    },
                  ]}
                >
                  <Select
                    placeholder={t("client.product_detail.placeholder_option")}
                  >
                    {PRODUCT_OPTION.YEAR_OLD.map((option, index) => (
                      <Select.Option key={index} value={option.value}>
                        {t(
                          `client.product_detail.option_add_to_cart.year_old.${option.label}`
                        )}
                      </Select.Option>
                    ))}
                  </Select>
                </Form.Item>

                <Form.Item
                  name="anket_3"
                  label={t("client.product_detail.label_ever_used")}
                  rules={[
                    {
                      required: true,
                      message: t("client.product_detail.error_required"),
                    },
                  ]}
                >
                  <Select
                    placeholder={t("client.product_detail.placeholder_option")}
                  >
                    {PRODUCT_OPTION.YES_OR_NO.map((option, index) => (
                      <Select.Option key={index} value={option.value}>
                        {t(
                          `client.product_detail.option_add_to_cart.yes_or_no.${option.label}`
                        )}
                      </Select.Option>
                    ))}
                  </Select>
                </Form.Item>

                <Form.Item
                  name="anket_4"
                  label={t("client.product_detail.label_ever_side_effect")}
                  rules={[
                    {
                      required: true,
                      message: t("client.product_detail.error_required"),
                    },
                  ]}
                >
                  <Select
                    placeholder={t("client.product_detail.placeholder_option")}
                  >
                    {PRODUCT_OPTION.YES_OR_NO.map((option, index) => (
                      <Select.Option key={index} value={option.value}>
                        {t(
                          `client.product_detail.option_add_to_cart.yes_or_no.${option.label}`
                        )}
                      </Select.Option>
                    ))}
                  </Select>
                </Form.Item>

                <Form.Item
                  name="anket_5"
                  label={t("client.product_detail.label_using_medicine")}
                  rules={[
                    {
                      required: true,
                      message: t("client.product_detail.error_required"),
                    },
                    {
                      message: t("client.product_detail.error_required"),
                      whitespace: true,
                    },
                  ]}
                >
                  <Input
                    placeholder={t("client.product_detail.placeholder_text")}
                  />
                </Form.Item>

                <Form.Item
                  name="anket_6"
                  label={t("client.product_detail.label_other_illnesses")}
                  rules={[
                    {
                      required: true,
                      message: t("client.product_detail.error_required"),
                    },
                  ]}
                >
                  <Select
                    placeholder={t("client.product_detail.placeholder_option")}
                  >
                    {PRODUCT_OPTION.CURRENTLY_TREATING.map((option, index) => (
                      <Select.Option key={index} value={option.value}>
                        {t(
                          `client.product_detail.option_add_to_cart.currently_treating.${option.label}`
                        )}
                      </Select.Option>
                    ))}
                  </Select>
                </Form.Item>

                <Form.Item
                  name="anket_7"
                  label={t("client.product_detail.label_other_question")}
                  rules={[
                    {
                      required: true,
                      message: t("client.product_detail.error_required"),
                      whitespace: true,
                    },
                  ]}
                >
                  <Input.TextArea
                    showCount
                    maxLength={256}
                    placeholder={t("client.product_detail.placeholder_text")}
                  />
                </Form.Item>
              </div>
            </Form>
            <div
              className="modal fade"
              id="noticeModal"
              tabIndex="-1"
              role="dialog"
              aria-labelledby="noticeModalTitle"
              aria-hidden="true"
            >
              <div
                className="modal-dialog modal-dialog-centered"
                role="document"
              >
                <div className="modal-content">
                  <div className="modal-body">
                    <p className="font-weight-bold">
                      Could not add to shopping cart
                    </p>
                    <p>Please check your input.</p>
                  </div>
                  <div className="modal-footer">
                    <button
                      type="button"
                      className="btn-close"
                      data-dismiss="modal"
                    >
                      OK
                    </button>
                  </div>
                </div>
              </div>
            </div>

            <div className="wrap-more-info-product">
              <div className="more-info-block flex flex-column">
                <div className="more-info-wrap">
                  <div className="item-info label-item">Features </div>
                  <div className="item-info value-item">
                    <span
                      dangerouslySetInnerHTML={{
                        __html: productClient.features,
                      }}
                    />
                  </div>
                  <div className="item-info label-item">Precautions </div>
                  <div className="item-info value-item">
                    <span
                      dangerouslySetInnerHTML={{
                        __html: productClient.precautions,
                      }}
                    />
                  </div>
                  <div className="item-info label-item">Efficacy / effect </div>
                  <div className="item-info value-item">
                    <span
                      dangerouslySetInnerHTML={{
                        __html: productClient.efficacy_effect,
                      }}
                    />
                  </div>
                  <div className="item-info label-item">Usage / dose </div>
                  <div className="item-info value-item">
                    <span
                      dangerouslySetInnerHTML={{
                        __html: productClient.usage_dose,
                      }}
                    />
                  </div>
                  <div className="item-info label-item">Active ingredients</div>
                  <div className="item-info value-item">
                    <span
                      dangerouslySetInnerHTML={{
                        __html: productClient.active_ingredients,
                      }}
                    />
                  </div>
                  <div className="item-info label-item">Additives </div>
                  <div className="item-info value-item">
                    <span
                      dangerouslySetInnerHTML={{
                        __html: productClient.additives,
                      }}
                    />
                  </div>
                  <div className="item-info label-item">
                    Precautions for storage and handling
                  </div>
                  <div className="item-info value-item">
                    <span
                      dangerouslySetInnerHTML={{
                        __html: productClient.precautions_storage_handling,
                      }}
                    />
                  </div>
                  <div className="item-info label-item last-item">
                    Manufacturer
                  </div>
                  <div className="item-info value-item last-item">
                    <span
                      dangerouslySetInnerHTML={{
                        __html: productClient.manufacturer,
                      }}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default ProductDetailPage;
