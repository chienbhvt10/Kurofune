import { Col, Form, Input, InputNumber, Row, Select } from "antd";
import React from "react";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";
import { productFormOptions } from "../../../../commons/data.js";
import InputField from "../../../../commons/Form/InputField.jsx";
import FormHeader from "../../../../commons/FormHeader";
import { isAdmin } from "../../../../helper/checker";
import { getCurrentLanguage } from "../../../../helper/localStorage";
import useCategories from "../../../../hooks/category/useCategories";
import usePharmacies from "../../../../hooks/pharmacy/usePharmacies";
import useTaxes from "../../../../hooks/tax/useTaxes";
import useHandleForm from "../hooks/useHandleForm.js";
import SelectField from "./../../../../commons/Form/SelectField";
import UploadDragger from "./../../../../commons/UploadDragger/UploadDragger";
import "./product-form.scss";
import { getProductFormLayout } from "./productInitValues.js";
import "./TranslateProductForm";
import TranslateProductForm from "./TranslateProductForm";

const ProductForm = ({ item, typeForm, title, onCancel, onSave, response }) => {
  const {
    productProfileFormEN,
    productProfileFormJP,
    productProfileFormTL,
    productProfileFormVI,
    productProfileFormZH,
    initialFormCommonValues,
    productsForm,
    onFinishAll,
    onChangeAvatar,
    onFinishFailed,
    setIsRemoveImage,
  } = useHandleForm(item, onSave, typeForm);
  const lang = getCurrentLanguage();
  const { t } = useTranslation();
  const { profile, userInfo } = useSelector((state) => state.authState);
  const { pharmacies, getAllPharmacies } = usePharmacies();
  const { getTaxes, taxes } = useTaxes();
  const { categoriesClient, getCategoriesClient } = useCategories();

  const [avatarUrl, setAvatarUrl] = React.useState();
  const formItemLayout = getProductFormLayout();

  React.useEffect(() => {
    setAvatarUrl(item?.product_image || "");
  }, [item]);

  React.useEffect(() => {
    getCategoriesClient();
    getAllPharmacies();
    getTaxes();
  }, [lang]);

  return (
    <div id="product-form">
      <Form
        {...formItemLayout}
        name="common-product-form"
        form={productsForm}
        onFinish={onFinishAll}
        onFinishFailed={onFinishFailed}
        autoComplete="off"
        initialValues={{
          ...initialFormCommonValues,
        }}
      >
        <FormHeader breadcrumb={[]} title={title} onCancel={onCancel} />
        <div>
          <Row justify="center">
            <Col span={12} className="input-field-space">
              <Form.Item
                field="product_image"
                label={t("admins.product.product_image_field")}
                labelCol={{ span: 24 }}
              >
                <UploadDragger
                  setIsRemoveImage={setIsRemoveImage}
                  onChangeImage={onChangeAvatar}
                  imageUrlProps={avatarUrl}
                />
              </Form.Item>
            </Col>

            <Col span={12}>
              {(isAdmin(profile?.roles) || isAdmin(userInfo?.roles?.name)) && (
                <Col className="input-field-space">
                  <SelectField
                    field="user_id"
                    label={t("admins.product.vendor_field")}
                    placeholder={t("admins.product.placeholder_select_vendor")}
                    rules={[
                      {
                        required: true,
                        message: t("admins.product.error_message.error_vendor"),
                      },
                    ]}
                    response={response}
                    error="user_id"
                  >
                    {pharmacies?.map((pharmacy, index) => (
                      <Select.Option key={index} value={pharmacy.user_id}>
                        {pharmacy.name}
                      </Select.Option>
                    ))}
                  </SelectField>
                </Col>
              )}

              <Col className="input-field-space">
                <InputField
                  field="sku"
                  label={t("admins.product.sku_field")}
                  response={response}
                  type={<Input />}
                  error="sku"
                />
              </Col>
              <Col className="input-field-space">
                <SelectField
                  field="status"
                  label={t("admins.product.status_field")}
                  placeholder={t("admins.product.placeholder_select_status")}
                  options={productFormOptions.status}
                  rules={[
                    {
                      required: true,
                      message: t("admins.product.error_message.error_status"),
                      whiteSpace: true,
                    },
                  ]}
                  response={response}
                  errorField="status"
                />
              </Col>
              <Col className="input-field-space">
                <SelectField
                  field="stock_status"
                  label={t("admins.product.stock_status_field")}
                  placeholder={t(
                    "admins.product.placeholder_select_stock_status"
                  )}
                  options={productFormOptions.stock_status}
                  rules={[
                    {
                      required: true,
                      message: t(
                        "admins.product.error_message.error_stockstatus"
                      ),
                      whiteSpace: true,
                    },
                  ]}
                  response={response}
                  errorField="stock_status"
                />

                <Col>
                  <InputField
                    field="price"
                    label={t("admins.product.price_field")}
                    response={response}
                    error="price"
                    type={
                      <InputNumber
                        type="number"
                        className="input-field"
                        style={{ width: "100%" }}
                      />
                    }
                    rules={[
                      ({ getFieldValue }) => ({
                        validator(_, value) {
                          if (getFieldValue("price") < 0 || value < 0) {
                            return Promise.reject(
                              t("admins.product.error_message.error_price")
                            );
                          }
                          return Promise.resolve();
                        },
                      }),
                    ]}
                  />
                </Col>
              </Col>
              <Col className="input-field-space">
                <SelectField
                  field="cat_id"
                  label={t("admins.product.category_field")}
                  placeholder={t("admins.product.placeholder_select_category")}
                  rules={[
                    {
                      required: true,
                      message: t("admins.product.error_message.error_category"),
                    },
                  ]}
                  response={response}
                  mode="multiple"
                  errorField="cat_id"
                >
                  {categoriesClient?.map((category, index) => (
                    <Select.Option key={index} value={category.id}>
                      {category.name}
                    </Select.Option>
                  ))}
                </SelectField>
              </Col>
            </Col>

            <Col span={12} className="input-field-space">
              <SelectField
                field="tax_id"
                label={t("admins.product.tax_field")}
                placeholder={t("admins.product.placeholder_select_tax")}
                rules={[
                  {
                    required: true,
                    message: t("admins.product.error_message.error_tax"),
                  },
                ]}
                response={response}
                errorField="tax_id"
              >
                {taxes?.map((tax, index) => (
                  <Select.Option key={index} value={tax.id}>
                    {tax.name}
                  </Select.Option>
                ))}
              </SelectField>
            </Col>
            <Col span={12} className="input-field-space">
              <InputField
                field="meta_title"
                label={t("admins.product.meta_title_field")}
                response={response}
                type={<Input />}
              />
            </Col>
            <Col span={12} className="input-field-space">
              <InputField
                field="meta_description"
                label={t("admins.product.meta_description_field")}
                response={response}
                type={<Input />}
              />
            </Col>
            <Col span={12} className="input-field-space">
              <InputField
                field="meta_keywords"
                label={t("admins.product.meta_keyword_field")}
                response={response}
                type={<Input />}
              />
            </Col>

            <Col
              lg={12}
              md={12}
              sm={24}
              xs={24}
              className="input-field-space"
            ></Col>
          </Row>
        </div>
      </Form>

      <TranslateProductForm
        formEN={productProfileFormEN}
        formJP={productProfileFormJP}
        formTL={productProfileFormTL}
        formVI={productProfileFormVI}
        formZH={productProfileFormZH}
        response={response}
      />
    </div>
  );
};

export default ProductForm;
