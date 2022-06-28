import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import useProductClient from "../../../hooks/product/useProductClient";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { Form, Input, Select, Button, Modal, Image, Tooltip } from "antd";
import { CATEGORY_OPTIONS, PRODUCT_OPTION } from "../../../commons/data";
import useCart from "../../../hooks/cart/useCart";
import PageHead from "../../../commons/PageHead";
import { getCurrentLanguage } from "../../../helper/localStorage";
import "./product-detail.scss";
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
const { Option } = Select;

const ProductDetailPage = () => {
  const { t } = useTranslation();
  const { id } = useParams();
  const lang = getCurrentLanguage();
  const location = useLocation();
  const navigate = useNavigate();
  const { getProductClient, productClient } = useProductClient();
  const [productSideEfectSelect, setProductSideEffectSelect] = useState(null);
  const [currentTreating, setCurrentTreating] = useState(null);
  const { addToCart, resAddToCart, getCartInfo } = useCart();
  React.useEffect(() => {
    if (id) {
      getProductClient({ id: id });
    }
  }, [id, location]);
  const [form] = Form.useForm();

  const onFinish = (values) => {
    const requestObj = values;
    Object.keys(requestObj).forEach(
      (key) =>
        requestObj[key] === undefined ||
        requestObj[key] === null ||
        (productSideEfectSelect === 0 && key === "anket_5") ||
        (currentTreating === 12 && key === "anket_7" && delete requestObj[key])
    );

    addToCart({ ...requestObj, product_id: id });
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
      <PageHead
        title={t("meta.title_product_details")}
        content={t("meta.content_product_details")}
      />
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
                  <Image
                    alt={productClient.name}
                    src={productClient.product_image}
                    onError={(e) => (e.target.src = "/images/image-default.png")}
                  />
                </div>
                <div className="item-prod summary-prod">
                  <div className="summary-detail">
                    <div className="product-name">{productClient.name}</div>
                    <div className="medicinal_efficacy_block">
                      <div className="medicinal_efficacy_item medicinal_efficacy_label">
                        {t("client.product_detail.medicinal_efficacy")}
                      </div>
                      <Tooltip title={productClient.medicinal_efficacy_classification}>
                      <span className="medicinal_efficacy_item medicinal_efficacy_value">
                        {productClient.medicinal_efficacy_classification}
                      </span>
                      </Tooltip>
                    </div>
                    <div className="block-price flex">
                      <div className="item-info price-info flex flex-column">
                        <div className="no-sale">
                          <div className="Ybrg9j">
                            <span className="woocommerce-Price-amount amount">
                              <bdi>
                                {productClient.price} {!lang ? "円" : "(JPY)"}
                              </bdi>
                            </span>
                          </div>
                        </div>
                      </div>
                      <div className="item-info product-type">
                        {t(
                          CATEGORY_OPTIONS.CATEGORY_TYPES.find((type) => {
                            if (
                              type.value === productClient.categories[0]?.type
                            ) {
                              return t(type.label_translate);
                            }
                          })?.label_translate
                        )}
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
                      <Option key={index} value={option.value}>
                        {t(
                          `client.product_detail.option_add_to_cart.gender.${option.label}`
                        )}
                      </Option>
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
                      <Option key={index} value={option.value}>
                        {t(
                          `client.product_detail.option_add_to_cart.year_old.${option.label}`
                        )}
                      </Option>
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
                      <Option key={index} value={option.value}>
                        {t(
                          `client.product_detail.option_add_to_cart.yes_or_no.${option.label}`
                        )}
                      </Option>
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
                    onChange={(value) => {
                      if (value === 0) form.resetFields(["anket_5"]);
                      setProductSideEffectSelect(value);
                    }}
                  >
                    {PRODUCT_OPTION.YES_OR_NO.map((option, index) => (
                      <Option key={index} value={option.value}>
                        {t(
                          `client.product_detail.option_add_to_cart.yes_or_no.${option.label}`
                        )}
                      </Option>
                    ))}
                  </Select>
                </Form.Item>

                <Form.Item
                  name="anket_5"
                  label={t("client.product_detail.label_using_medicine")}
                  dependencies={["anket_4"]}
                  rules={[
                    {
                      required: productSideEfectSelect === 1,
                      message: t("client.product_detail.error_required"),
                    },
                    {
                      message: t("client.product_detail.error_required"),
                      whitespace: true,
                    },
                  ]}
                >
                  <Input
                    disabled={productSideEfectSelect !== 1}
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
                    onChange={(value) => setCurrentTreating(value)}
                  >
                    {PRODUCT_OPTION.CURRENTLY_TREATING.map((option, index) => (
                      <Option key={index} value={option.value}>
                        {t(
                          `client.product_detail.option_add_to_cart.currently_treating.${option.label}`
                        )}
                      </Option>
                    ))}
                  </Select>
                </Form.Item>
                {currentTreating === 12 && (
                  <Form.Item
                    name="anket_7"
                    label=" "
                    rules={[
                      {
                        required: true,
                        message: t("client.product_detail.error_required"),
                      },
                    ]}
                  >
                    <Input.TextArea
                      maxLength={256}
                      placeholder={t("client.product_detail.placeholder_text")}
                    />
                  </Form.Item>
                )}
                <Form.Item
                  name="anket_8"
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
                  <div className="item-info label-item">
                    {t("client.product_detail.label_features")}
                  </div>
                  <div className="item-info value-item">
                    <span
                      dangerouslySetInnerHTML={{
                        __html: productClient.features,
                      }}
                    />
                  </div>
                  <div className="item-info label-item">
                    {t("client.product_detail.label_precautions")}
                  </div>
                  <div className="item-info value-item">
                    <span
                      dangerouslySetInnerHTML={{
                        __html: productClient.precautions,
                      }}
                    />
                  </div>
                  <div className="item-info label-item">
                    {t("client.product_detail.label_efficacy_effect")}
                  </div>
                  <div className="item-info value-item">
                    <span
                      dangerouslySetInnerHTML={{
                        __html: productClient.efficacy_effect,
                      }}
                    />
                  </div>
                  <div className="item-info label-item">
                    {t("client.product_detail.label_usage_dose")}
                  </div>
                  <div className="item-info value-item">
                    <span
                      dangerouslySetInnerHTML={{
                        __html: productClient.usage_dose,
                      }}
                    />
                  </div>
                  <div className="item-info label-item">
                    {t("client.product_detail.label_active_ingredients")}
                  </div>
                  <div className="item-info value-item">
                    <span
                      dangerouslySetInnerHTML={{
                        __html: productClient.active_ingredients,
                      }}
                    />
                  </div>
                  <div className="item-info label-item">
                    {t("client.product_detail.label_additives")}
                  </div>
                  <div className="item-info value-item">
                    <span
                      dangerouslySetInnerHTML={{
                        __html: productClient.additives,
                      }}
                    />
                  </div>
                  <div className="item-info label-item">
                    {t("client.product_detail.label_precautions_handling")}
                  </div>
                  <div className="item-info value-item">
                    <span
                      dangerouslySetInnerHTML={{
                        __html: productClient.precautions_storage_handling,
                      }}
                    />
                  </div>
                  <div className="item-info label-item last-item">
                    {t("client.product_detail.label_manufacturer")}
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
