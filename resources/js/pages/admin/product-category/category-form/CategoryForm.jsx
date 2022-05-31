import { Col, Form, Input, InputNumber, Row, Upload, Button } from "antd";
import React from "react";
import FormHeader from "../../../../commons/FormHeader";
import InputField from "./../../../../commons/Form/InputField";
import "./category-form.scss";
import TranslateCategoryForm from "./TranslateCategoryForm";
import UploadDragger from "../../../../commons/UploadDragger/UploadDragger.jsx";

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
  const initialCommonValues = {
    user_id: item?.user_id || "",
    slug: item?.slug || "",
    category_image: item?.category_image || avatarState.base64Avatar,
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
  };
  React.useEffect(() => {
    setAvatarState({ avatarUrl: item?.category_image || "" });
  }, [item]);

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
            <Col span={24} className="input-field-space">
              <InputField
                field="slug"
                label="Slug"
                labelCol={{ span: 24 }}
                wrapperCol={{ span: 24 }}
                rules={[
                  {
                    required: true,
                    message: "Please input your Slug",
                  },
                ]}
                type={<Input />}
              />
            </Col>
            <Col span={24} className="input-field-space">
              <InputField
                field="type"
                label="Type"
                labelCol={{ span: 24 }}
                wrapperCol={{ span: 24 }}
                validateStatus={"Please enter your Type"}
                rules={[
                  {
                    required: true,
                    message: "Please input your Type!",
                  },
                ]}
                type={<Input type="number" className="input-field" />}
                response={response}
              />
            </Col>

            <Col span={12} className="input-field-space">
              <Form.Item field=" product_image" label="Product Image" labelCol={{ span: 24 }}>
                <UploadDragger onChangeImage={onChangeAvatar}
                  imageUrlProps={avatarState.avatarUrl}
                  loading={avatarState.loading}
                  mode='multiple' />
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
      />
    </div>
  );
};

export default CategoryForm;
