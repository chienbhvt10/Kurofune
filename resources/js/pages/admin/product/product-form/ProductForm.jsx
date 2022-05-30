import { Col, Form, Input, Row } from "antd";
import React from "react";
import { productFormOptions } from "../../../../commons/data.js";
import InputField from "../../../../commons/Form/InputField.jsx";
import UploadBase64Image from "../../../../commons/Form/UploadBase64Image.jsx";
import FormHeader from "../../../../commons/FormHeader";
import SelectField from "./../../../../commons/Form/SelectField";
import "./product-form.scss";
import TranslateProductForm from "./TranslateProductForm";
import UploadDragger from './../../../../commons/UploadDragger/UploadDragger';

const ProductForm = ({ item, typeForm, title, onCancel, onSave, response }) => {
  const lang = localStorage.getItem("lang");
  const [productImg, setProductImg] = React.useState([]);
  const [avatarState, setAvatarState] = React.useState({
    avatarUrl: undefined,
    base64Avatar: undefined,
    loading: false,
  });

  const initialCommonValues = {
    name: item?.name || "",
    slug: item?.slug || "",
    sku: item?.sku || "",
    stock_status: item?.stock_status || "",
    price: item?.price || 0,
    status: item?.status || "",
    product_image: item?.product_image || productImg,
    tax_id: item?.tax_id || 0,
    meta_title: item?.meta_title || "",
    meta_description: item?.meta_description || "",
    meta_keyword: item?.meta_keywords || "",
    user_id: item?.user_id || 4,
    cat_id: item?.cat_id || [],
  };

  const initialTranslateValues = {
    classification: "",
    features: "",
    precautions: "",
    efficacy_effect: "",
    usage_dose: "",
    activeIngredients: "",
    additives: "",
    precautionsStorageHandling: "",
    manufacturer: "",
    name: "",
  };

  const [productsForm] = Form.useForm();
  const [productProfileFormEN] = Form.useForm();
  const [productProfileFormJP] = Form.useForm();
  const [productProfileFormTL] = Form.useForm();
  const [productProfileFormVI] = Form.useForm();
  const [productProfileFormZH] = Form.useForm();

  const onFinishAll = (values) => {
    const submitInput = {
      avatar: avatarState.base64Avatar,
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
    };

    console.log(submitInput);
    // onSave(submitInput);
  };

  React.useEffect(() => {
    productsForm.setFieldsValue(initialCommonValues);
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
  }, [item]);

  const onChangeAvatar = (base64Image) => {
    setAvatarState({ base64Avatar: base64Image });
  };
  React.useEffect(() => {
    setAvatarState({ avatarUrl: item?.avatar || "" });
  }, [item]);

  return (
    <div id="product-form">
      <Form
        name="common-product-form"
        form={productsForm}
        onFinish={onFinishAll}
        autoComplete="off"
        initialValues={{
          ...initialCommonValues,
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
            <Col span={12} style={{ padding: "0 30px" }}>
              <InputField
                field="name"
                label="Name"
                labelCol={{ span: 24 }}
                wrapperCol={{ span: 24 }}
                type={<Input />}
                rules={[]}
                response={response}
              />
            </Col>
            <Col span={12} style={{ padding: "0 30px" }}>
              <InputField
                field="slug"
                label="Slug"
                labelCol={{ span: 24 }}
                wrapperCol={{ span: 24 }}
                type={<Input />}
                rules={[]}
                response={response}
              />
            </Col>
            <Col span={12} style={{ padding: "0 30px" }}>
              <InputField
                field="sku"
                label="Sku"
                labelCol={{ span: 24 }}
                wrapperCol={{ span: 24 }}
                rules={[]}
                response={response}
                type={<Input />}
              />
            </Col>
            <Col span={12} style={{ padding: "0 30px" }}>
              <SelectField
                field="status"
                label="Status"
                labelCol={{ span: 24 }}
                wrapperCol={{ span: 24 }}
                placeholder="Please select active status"
                options={productFormOptions.status}
                rules={[]}
                response={response}
              />
            </Col>
            <Col span={12} style={{ padding: "0 30px" }}>
              <SelectField
                field="stock_status"
                label="Stock Status"
                labelCol={{ span: 24 }}
                wrapperCol={{ span: 24 }}
                placeholder="Please select Category"
                options={productFormOptions.stock_status}
                rules={[]}
                response={response}
              />
            </Col>
            <Col span={12} style={{ padding: "0 30px" }}>
              <InputField
                field="price"
                label="Price"
                labelCol={{ span: 24 }}
                wrapperCol={{ span: 24 }}
                rules={[
                  {
                    required: true,
                    message: "Please input your Price",
                  },
                ]}
                response={response}
                type={<Input type="number" className="input-field" />}
              />
            </Col>
            <Col span={12} style={{ padding: "0 30px" }}>
              <SelectField
                field="cat_id"
                label="Category"
                labelCol={{ span: 24 }}
                wrapperCol={{ span: 24 }}
                placeholder="Please select active status"
                options={productFormOptions.cat_id}
                rules={[]}
                response={response}
                mode="multiple"
              />
            </Col>
            <Col span={12} style={{ padding: "0 30px" }}>
              <InputField
                field="tax_id"
                label="Tax"
                labelCol={{ span: 24 }}
                wrapperCol={{ span: 24 }}
                rules={[]}
                response={response}
                type={<Input type="number" className="input-field" />}
              />
            </Col>
            <Col span={12} style={{ padding: "0 30px" }}>
              <SelectField
                field="user_id"
                label="User "
                labelCol={{ span: 24 }}
                wrapperCol={{ span: 24 }}
                placeholder="Please select active status"
                options={productFormOptions.user_id}
                rules={[]}
                response={response}
              />
            </Col>
            <Col span={12} style={{ padding: "0 30px" }}>
              <InputField
                field="meta_title"
                label="meta_title"
                labelCol={{ span: 24 }}
                wrapperCol={{ span: 24 }}
                rules={[]}
                response={response}
                type={<Input />}
              />
            </Col>
            <Col span={12} style={{ padding: "0 30px" }}>
              <InputField
                field="meta_description"
                label="meta_description"
                labelCol={{ span: 24 }}
                wrapperCol={{ span: 24 }}
                rules={[]}
                response={response}
                type={<Input />}
              />
            </Col>
            <Col span={12} style={{ padding: "0 30px" }}>
              <InputField
                field="meta_keyword"
                label="meta_keyword"
                labelCol={{ span: 24 }}
                wrapperCol={{ span: 24 }}
                rules={[]}
                response={response}
                type={<Input />}
              />
            </Col>
            <Col span={12} style={{ padding: "0 30px" }}>
              <Form.Item field=" product_image" label="Product Image" labelCol={{ span: 24 }}>
                <UploadDragger onChangeImage={onChangeAvatar}
                  imageUrlProps={avatarState.avatarUrl}
                  loading={avatarState.loading} />
              </Form.Item>
            </Col>
            <Col span={12} style={{ padding: "0 30px" }}></Col>
          </Row>
        </div>
      </Form>

      <TranslateProductForm
        formEN={productProfileFormEN}
        formJP={productProfileFormJP}
        formTL={productProfileFormTL}
        formVI={productProfileFormVI}
        formZH={productProfileFormZH}
      />
    </div>
  );
};

export default ProductForm;
