import { Col, Form, Input, Row } from "antd";
import React from "react";
import { useTranslation } from "react-i18next";
import { productFormOptions } from "../../../../commons/data.js";
import InputField from "../../../../commons/Form/InputField.jsx";
import FormHeader from "../../../../commons/FormHeader";
import { getCurrentLanguage } from "../../../../helper/localStorage";
import useAdminCategories from "../../../../hooks/categoryAdmin/useAdminCategories.js";
import SelectField from "./../../../../commons/Form/SelectField";
import UploadDragger from './../../../../commons/UploadDragger/UploadDragger';
import "./product-form.scss";
import { getProductInfoInitValues, getTranslateInitValues } from './productInitValues.js';
import TranslateProductForm from "./TranslateProductForm";

const ProductForm = ({ item, typeForm, title, onCancel, onSave, response }) => {
  const lang = getCurrentLanguage();
  const { t } = useTranslation();
  const { getAdminCategories, adminCategories } = useAdminCategories();
  const [avatarState, setAvatarState] = React.useState({
    avatarUrl: undefined,
    base64Avatar: undefined,
    loading: false,
  });
  const initialFormCommonValues = getProductInfoInitValues(item)
  const initialTranslateValues = getTranslateInitValues()
  const [productsForm] = Form.useForm();
  const [productProfileFormEN] = Form.useForm();
  const [productProfileFormJP] = Form.useForm();
  const [productProfileFormTL] = Form.useForm();
  const [productProfileFormVI] = Form.useForm();
  const [productProfileFormZH] = Form.useForm();
  const onFinishAll = (values) => {
    const submitInput = {
      ...productsForm.getFieldsValue(),
      user_id: 4,
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
    productProfileFormEN.validateFields()
    onSave(submitInput);
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
    getAdminCategories()
  }, [item]);

  const onChangeAvatar = (base64Image) => {
    setAvatarState({ base64Avatar: base64Image });
  };

  const listCategories = adminCategories && adminCategories.map((category) => {
    return {
      value: category.id,
      label: category.name
    }
  })
  const onFinishFailed = () => {
    productProfileFormEN.validateFields()
  }

  React.useEffect(() => {
    const imgPreview = document.querySelector(".image");
    imgPreview.addEventListener("click", (e) => {
      e.preventDefault()
    })
    return imgPreview.removeEventListener("click", () => {
      return false
    })
  }, [])
  const formItemLayout = {
    labelCol: {
      lg: { span: 24 },
      xs: { span: 24 },
      sm: { span: 24 },
    },
    wrapperCol: {
      lg: { span: 24 },
      xs: { span: 24 },
      sm: { span: 24 },
    },
    labelAlign: 'left',
  };
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
          <Row justify="center" >
            <Col lg={12} md={12} sm={24} xs={24} className="input-field-space">
              <InputField
                field="slug"
                label={t("admins.product.slug_field")}
                type={<Input />}
                response={response}
              // validateStatus={HasError ? "error" : ""}
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
                rules={[{
                  required: true,
                  message: t("admins.product.error_message.required_message"),
                  whiteSpace: true,
                }]}
                response={response}
                errorField='status'
              />
            </Col>
            <Col lg={12} md={12} sm={24} xs={24} className="input-field-space">
              <SelectField
                field="stock_status"
                label={t("admins.product.stock_status_field")}
                placeholder="Please select Category"
                options={productFormOptions.stock_status}
                rules={[{
                  required: true,
                  message: t("admins.product.error_message.required_message"),
                  whiteSpace: true,
                }]}
                response={response}
                errorField='stock_status'
              />
            </Col>
            <Col lg={12} md={12} sm={24} xs={24} className="input-field-space">
              <InputField
                field="price"
                label={t("admins.product.price_field")}
                rules={[]}
                response={response}
                type={<Input type="number" className="input-field" />}
              />
            </Col>
            <Col lg={12} md={12} sm={24} xs={24} className="input-field-space">
              <SelectField
                field="cat_id"
                label={t("admins.product.category_field")}
                placeholder="Please select active status"
                options={listCategories}
                rules={[{
                  required: true,
                  message: t("admins.product.error_message.required_message"),
                }]}
                response={response}
                mode="multiple"
                errorField='cat_id'
              />
            </Col>
            <Col lg={12} md={12} sm={24} xs={24} className="input-field-space">
              <InputField
                field="tax_id"
                label={t("admins.product.tax_field")}
                rules={[{
                  required: true,
                  message: t("admins.product.error_message.required_message"),
                },
                {
                  pattern: new RegExp(/^[1-9][0-9]*$/),
                  message: "Please input number greater than 0"
                }
                ]}
                response={response}
                errorField='tax_id'
                type={<Input type="number" className="input-field" />}
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
                field="meta_keyword"
                label={t("admins.product.meta_keyword_field")}
                rules={[]}
                response={response}
                type={<Input />}
              />
            </Col>
            <Col lg={12} md={12} sm={24} xs={24} className="input-field-space">
              <Form.Item field="product_image" label={t("admins.product.product_image_field")} labelCol={{ span: 24 }}>
                <UploadDragger onChangeImage={onChangeAvatar}
                  imageUrlProps={avatarState.avatarUrl}
                  loading={avatarState.loading} />

              </Form.Item>
            </Col>
            <Col lg={12} md={12} sm={24} xs={24} className="input-field-space"></Col>
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
