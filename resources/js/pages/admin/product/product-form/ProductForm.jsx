import { Col, Form, Input, Row, Select } from "antd";
import React from "react";
import { useSelector } from "react-redux";
import { useTranslation } from "react-i18next";
import { productFormOptions } from "../../../../commons/data.js";
import InputField from "../../../../commons/Form/InputField.jsx";
import FormHeader from "../../../../commons/FormHeader";
import SwitchTabsLangForm from "../../../../commons/SwitchTabLangForm/index.jsx";
import { getCurrentLanguage } from "../../../../helper/localStorage";
import SelectField from "./../../../../commons/Form/SelectField";
import UploadDragger from "./../../../../commons/UploadDragger/UploadDragger";
import "./product-form.scss";
import {
  getProductFormLayout,
  getProductInfoInitValues,
  getTranslateInitValues,
} from "./productInitValues.js";
import useCategories from "../../../../hooks/category/useCategories.js";
import usePharmacies from "../../../../hooks/pharmacy/usePharmacies.js";

const ProductForm = ({ item, typeForm, title, onCancel, onSave, response }) => {
  const lang = getCurrentLanguage();
  const { t } = useTranslation();

  const { pharmaciesAdmin, getAllPharmaciesAdmin } = usePharmacies();
  const { userInfo, profile } = useSelector((state) => state.authState);
  const { categoriesClient, getCategoriesClient } = useCategories();

  const [avatarState, setAvatarState] = React.useState({
    avatarUrl: undefined,
    base64Avatar: undefined,
    loading: false,
  });
  const formItemLayout = getProductFormLayout();
  const initialFormCommonValues = getProductInfoInitValues(item);
  const initialTranslateValues = getTranslateInitValues();
  const [productsForm] = Form.useForm();
  const [productProfileFormEN] = Form.useForm();
  const [productProfileFormJP] = Form.useForm();
  const [productProfileFormTL] = Form.useForm();
  const [productProfileFormVI] = Form.useForm();
  const [productProfileFormZH] = Form.useForm();
  const onFinishAll = (values) => {
    const submitInput = {
      ...productsForm.getFieldsValue(),
      ja: {
        ...productProfileFormJP.getFieldsValue(),
      },
      vi: {
        ...productProfileFormVI.getFieldsValue(),
      },
      tl: {
        ...productProfileFormTL.getFieldsValue(),
      },
      zh: {
        ...productProfileFormZH.getFieldsValue(),
      },
      en: {
        ...productProfileFormEN.getFieldsValue(),
      },
      product_image: avatarState.base64Avatar,
    };
    productProfileFormEN.validateFields();
    onSave(submitInput);
  };
  const onFinishFailed = () => {
    productProfileFormEN.validateFields();
  };
  React.useEffect(() => {
    productsForm.setFieldsValue(initialFormCommonValues);
    if (item) {
      productProfileFormEN.setFieldsValue(
        item?.translations[0] || initialTranslateValues
      );
      productProfileFormJP.setFieldsValue(
        item?.translations[1] || initialTranslateValues
      );
      productProfileFormTL.setFieldsValue(
        item?.translations[2] || initialTranslateValues
      );
      productProfileFormVI.setFieldsValue(
        item?.translations[3] || initialTranslateValues
      );
      productProfileFormZH.setFieldsValue(
        item?.translations[4] || initialTranslateValues
      );
    }
    setAvatarState({ avatarUrl: item?.product_image || "" });
  }, [item]);

  React.useEffect(() => {
    getCategoriesClient();
    getAllPharmaciesAdmin();
  }, []);

  const onChangeAvatar = (base64Image) => {
    setAvatarState({ base64Avatar: base64Image });
  };

  React.useEffect(() => {
    const imgPreview = document.querySelector(".image");
    imgPreview.addEventListener("click", (e) => {
      e.preventDefault();
    });
    return imgPreview.removeEventListener("click", () => {
      return false;
    });
  }, []);

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
        <FormHeader
          breadcrumb={[
            { name: "Home", routerLink: "../" },
            { name: "Product List", routerLink: `${lang}/admin/product-list` },
            {
              name: "Add",
              routerLink: "",
            },
          ]}
          title={title}
          onCancel={onCancel}
        />
        <div>
          <Row justify="center">
            {profile?.roles[0]?.id === 1 && (
              <Col
                lg={12}
                md={12}
                sm={24}
                xs={24}
                className="input-field-space"
              >
                <SelectField
                  field="user_id"
                  label={t("admins.product.vendor_field")}
                  placeholder="Please select vendor"
                  rules={[
                    {
                      required: true,
                      message: t(
                        "admins.product.error_message.required_message"
                      ),
                    },
                  ]}
                  response={response}
                  error="user_id"
                >
                  {pharmaciesAdmin?.map((pharamacy, index) => (
                    <Select.Option key={index} value={pharamacy.id}>
                      {pharamacy.name}
                    </Select.Option>
                  ))}
                </SelectField>
              </Col>
            )}
            <Col lg={12} md={12} sm={24} xs={24} className="input-field-space">
              <InputField
                field="slug"
                label={t("admins.product.slug_field")}
                type={<Input />}
                response={response}
              />
            </Col>
            <Col lg={12} md={12} sm={24} xs={24} className="input-field-space">
              <InputField
                field="sku"
                label={t("admins.product.sku_field")}
                rules={[]}
                response={response}
                type={<Input />}
              />
            </Col>
            <Col lg={12} md={12} sm={24} xs={24} className="input-field-space">
              <SelectField
                field="status"
                label={t("admins.product.status_field")}
                placeholder="Please select active status"
                options={productFormOptions.status}
                rules={[
                  {
                    required: true,
                    message: t("admins.product.error_message.required_message"),
                    whiteSpace: true,
                  },
                ]}
                response={response}
                errorField="status"
              />
            </Col>
            <Col lg={12} md={12} sm={24} xs={24} className="input-field-space">
              <SelectField
                field="stock_status"
                label={t("admins.product.stock_status_field")}
                placeholder="Please select Category"
                options={productFormOptions.stock_status}
                rules={[
                  {
                    required: true,
                    message: t("admins.product.error_message.required_message"),
                    whiteSpace: true,
                  },
                ]}
                response={response}
                errorField="stock_status"
              />
            </Col>
            <Col lg={12} md={12} sm={24} xs={24} className="input-field-space">
              <InputField
                field="price"
                label={t("admins.product.price_field")}
                rules={[]}
                response={response}
                error="price"
                type={<Input className="input-field" />}
              />
            </Col>
            <Col lg={12} md={12} sm={24} xs={24} className="input-field-space">
              <SelectField
                field="cat_id"
                label={t("admins.product.category_field")}
                placeholder="Please select active status"
                rules={[
                  {
                    required: true,
                    message: t("admins.product.error_message.required_message"),
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
            <Col lg={12} md={12} sm={24} xs={24} className="input-field-space">
              <SelectField
                field="tax_id"
                label={t("admins.product.tax_field")}
                rules={[
                  {
                    required: true,
                    message: t("admins.product.error_message.required_message"),
                  },
                  {
                    pattern: new RegExp(/^[1-9][0-9]*$/),
                    message: "Please input number greater than 0",
                  },
                ]}
                response={response}
                errorField="tax_id"
                options={[{ label: "VAT", value: "1" }]}
              />
            </Col>
            <Col lg={12} md={12} sm={24} xs={24} className="input-field-space">
              <InputField
                field="meta_title"
                label={t("admins.product.meta_title_field")}
                rules={[]}
                response={response}
                type={<Input />}
              />
            </Col>
            <Col lg={12} md={12} sm={24} xs={24} className="input-field-space">
              <InputField
                field="meta_description"
                label={t("admins.product.meta_description_field")}
                rules={[]}
                response={response}
                type={<Input />}
              />
            </Col>
            <Col lg={12} md={12} sm={24} xs={24} className="input-field-space">
              <InputField
                field="meta_keywords"
                label={t("admins.product.meta_keyword_field")}
                rules={[]}
                response={response}
                type={<Input />}
              />
            </Col>
            <Col lg={12} md={12} sm={24} xs={24} className="input-field-space">
              <Form.Item
                field="product_image"
                label={t("admins.product.product_image_field")}
                labelCol={{ span: 24 }}
              >
                <UploadDragger
                  onChangeImage={onChangeAvatar}
                  imageUrlProps={avatarState.avatarUrl}
                  loading={avatarState.loading}
                />
              </Form.Item>
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

      <SwitchTabsLangForm
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
