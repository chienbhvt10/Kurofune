import { Col, Form, Input, InputNumber, Row, Upload, Button } from "antd";
import React from "react";
import FormHeader from "../../../../commons/FormHeader";
import InputField from "./../../../../commons/Form/InputField";
import "./category-form.scss";
import TranslateCategoryForm from "./TranslateCategoryForm";
import UploadDragger from "../../../../commons/UploadDragger/UploadDragger.jsx";
import {
  getCategoryInitValues,
  getTranslateCategoryInitValues,
  getCategoryFormLayout,
} from "./categoryInitValues.js";
import { getCurrentLanguage } from "../../../../helper/localStorage.js";
const CategoryForm = ({
  item,
  typeForm,
  title,
  onCancel,
  onSave,
  response,
}) => {
  const [avatarState, setAvatarState] = React.useState({
    avatarUrl: undefined,
    base64Avatar: undefined,
    loading: false,
  });
  const lang = getCurrentLanguage();
  const [errorMessImage, setErrorMessImage] = React.useState("");
  const formItemLayout = getCategoryFormLayout();
  const initialCommonValues = getCategoryInitValues(item);
  const initialTranslateValues = getTranslateCategoryInitValues();
  const [categoryForm] = Form.useForm();
  const [categoryProfileFormEN] = Form.useForm();
  const [categoryProfileFormJP] = Form.useForm();
  const [categoryProfileFormTL] = Form.useForm();
  const [categoryProfileFormVI] = Form.useForm();
  const [categoryProfileFormZH] = Form.useForm();

  const onFinishAll = (values) => {
    const submitInput = {
      ...categoryForm.getFieldsValue(),
      ja: {
        ...categoryProfileFormJP.getFieldsValue(),
      },
      vi: {
        ...categoryProfileFormVI.getFieldsValue(),
      },
      tl: {
        ...categoryProfileFormTL.getFieldsValue(),
      },
      zh: {
        ...categoryProfileFormZH.getFieldsValue(),
      },
      en: {
        ...categoryProfileFormEN.getFieldsValue(),
      },
      category_image: avatarState.base64Avatar,
    };

    onSave(submitInput);
  };

  const onFinishError = () => {
    categoryProfileFormEN.validateFields();
    setErrorMessImage(!avatarState.base64Avatar);
  };

  React.useEffect(() => {
    categoryForm.setFieldsValue(initialCommonValues);
    if (item) {
      categoryProfileFormEN.setFieldsValue(
        item?.translations[0] || initialTranslateValues
      );
      categoryProfileFormJP.setFieldsValue(
        item?.translations[1] || initialTranslateValues
      );
      categoryProfileFormVI.setFieldsValue(
        item?.translations[2] || initialTranslateValues
      );
      categoryProfileFormTL.setFieldsValue(
        item?.translations[3] || initialTranslateValues
      );

      categoryProfileFormZH.setFieldsValue(
        item?.translations[4] || initialTranslateValues
      );
    }
  }, [item]);

  const onChangeAvatar = (base64Image) => {
    setAvatarState({ base64Avatar: base64Image });
    setErrorMessImage("");
  };
  React.useEffect(() => {
    setAvatarState({ avatarUrl: item?.category_image || "" });
  }, [item]);
  return (
    <div id="category-form">
      <Form
        name="common-category-form"
        {...formItemLayout}
        form={categoryForm}
        onFinish={onFinishAll}
        onFinishFailed={onFinishError}
        autoComplete="off"
        initialValues={{
          ...initialCommonValues,
        }}
      >
        <FormHeader
          breadcrumb={[
            { name: "Home", routerLink: "../" },
            {
              name: "Category List",
              routerLink: `${lang}/admin/category-list`,
            },
            { name: "Add", routerLink: "/admin/category/add" },
          ]}
          title={title}
          onCancel={onCancel}
        />

        <div>
          <Row>
            <Col span={24} className="input-field-space">
              <InputField
                field="slug"
                label="Slug"
                rules={[]}
                response={response}
                error="slug"
                type={<Input />}
              />
            </Col>
            <Col span={24} className="input-field-space">
              <InputField
                field="type"
                label="Type"
                validateStatus={"Please enter your Type"}
                rules={[
                  {
                    required: true,
                    message: "Type ",
                  },
                ]}
                type={<Input type="number" className="input-field" />}
                response={response}
                errorField="type"
              />
            </Col>

            <Col span={12} className="input-field-space">
              <Form.Item field=" product_image" label="Product Image">
                <UploadDragger
                  onChangeImage={onChangeAvatar}
                  imageUrlProps={avatarState.avatarUrl}
                  loading={avatarState.loading}
                  mode="multiple"
                />
                {errorMessImage && (
                  <span style={{ color: "red", marginLeft: "80px" }}>
                    {/* {t("admins.category.error_message.error_category_image")} */}
                    "This field is required"
                  </span>
                )}
              </Form.Item>
            </Col>
          </Row>
        </div>
      </Form>
      <TranslateCategoryForm
        formEN={categoryProfileFormEN}
        formJP={categoryProfileFormJP}
        formTL={categoryProfileFormTL}
        formVI={categoryProfileFormVI}
        formZH={categoryProfileFormZH}
        response={response}
      />
    </div>
  );
};

export default CategoryForm;
