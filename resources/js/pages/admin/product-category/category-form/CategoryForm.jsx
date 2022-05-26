import { Col, Form, Input, InputNumber, Row } from "antd";
import React from "react";
import FormHeader from "../../../../commons/FormHeader";
import InputField from "./../../../../commons/Form/InputField";
import UploadDragger from "./../../../../commons/UploadDragger/UploadDragger";
import "./category-form.scss";
import TranslateCategoryForm from "./TranslateCategoryForm";

const CategoryForm = ({ item, typeForm, title, onCancel, onSave }) => {
  const initialCommonValues = {
    user_id: item?.user_id || "",
    slug: item?.slug || "",
    category_image: item?.category_image || "",
    type: item?.type || "",
  };

  const initialTranslateValues = {
    cat: "",
    locale: "",
    name: "",
  };

  const [categoryForm] = Form.useForm();
  const [categoryProfileFormEN] = Form.useForm();
  const [categoryProfileFormJP] = Form.useForm();
  const [categoryProfileFormTL] = Form.useForm();
  const [categoryProfileFormVI] = Form.useForm();
  const [categoryProfileFormZH] = Form.useForm();

  const onFinishAll = (values) => {
    const submitInput = {
      id: item?.id,
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
      category_image: [avatarState.base64Avatar],
    };

    onSave(submitInput);
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

  const [avatarState, setAvatarState] = React.useState({
    avatarUrl: undefined,
    base64Avatar: undefined,
    loading: false,
  });
  const onChangeAvatar = (base64Image) => {
    setAvatarState({ base64Avatar: base64Image });
  };

  return (
    <div id="category-form">
      <Form
        name="common-category-form"
        form={categoryForm}
        onFinish={onFinishAll}
        autoComplete="off"
        initialValues={{
          ...initialCommonValues,
        }}
      >
        <FormHeader
          breadcrumb={[
            { name: "Home", routerLink: "../" },
            { name: "Category List", routerLink: "/admin/category-list" },
            { name: "Add", routerLink: "/admin/category/add" },
          ]}
          title={title}
          onCancel={onCancel}
        />

        <div>
          <Row>
            {/* <Col span={24} style={{ padding: "0 30px" }}>
              <InputField
                field="user_id"
                label="User"
                labelCol={{ span: 24 }}
                wrapperCol={{ span: 24 }}
                rules={[]}
                type={<InputNumber />}
              />
            </Col> */}
            <Col span={24} style={{ padding: "0 30px" }}>
              <InputField
                field="slug"
                label="Slug"
                labelCol={{ span: 24 }}
                wrapperCol={{ span: 24 }}
                rules={[]}
                type={<Input />}
              />
            </Col>
            <Col span={24} style={{ padding: "0 30px" }}>
              <InputField
                field="type"
                label="Type"
                labelCol={{ span: 24 }}
                wrapperCol={{ span: 24 }}
                rules={[]}
                type={<InputNumber />}
              />
            </Col>
            <Col span={24} style={{ padding: "0 30px" }}>
              <InputField
                field="category_image"
                label="Image"
                labelCol={{ span: 24 }}
                wrapperCol={{ span: 24 }}
                rules={[]}
                type={<Input />}
              />
            </Col>
            <Col span={8} style={{ padding: "0 30px" }}>
              <UploadDragger
                onChangeImage={onChangeAvatar}
                imageUrlProps={avatarState.avatarUrl}
                loading={avatarState.loading}
              />
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
      />
    </div>
  );
};

export default CategoryForm;
