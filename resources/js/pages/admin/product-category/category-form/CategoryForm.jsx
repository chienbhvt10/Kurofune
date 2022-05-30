import { Col, Form, Input, InputNumber, Row, Upload, Button } from "antd";
import React from "react";
import FormHeader from "../../../../commons/FormHeader";
import InputField from "./../../../../commons/Form/InputField";
import "./category-form.scss";
import TranslateCategoryForm from "./TranslateCategoryForm";
import UploadBase64Image from "../../../../commons/Form/UploadBase64Image.jsx";

const CategoryForm = ({
  item,
  typeForm,
  title,
  onCancel,
  onSave,
  response,
}) => {
  const [categoryImage, setCategoryImage] = React.useState("");
  const initialCommonValues = {
    user_id: item?.user_id || "",
    slug: item?.slug || "",
    category_image: item?.category_image || categoryImage,
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
      category_image: categoryImage,
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

  React.useEffect(() => {
    const productThumbnail = document.querySelector(
      ".ant-upload-list-item-thumbnail"
    );
    productThumbnail.addEventListener("click", (e) => {
      e.preventDefault();
    });

    return productThumbnail.addEventListener("click", (e) => {
      e.preventDefault();
    });
  }, []);

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
            <Col span={24} style={{ padding: "0 30px" }}>
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
            <Col span={24} style={{ padding: "0 30px" }}>
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

            <Col span={12} style={{ padding: "0 30px" }}>
              <UploadBase64Image
                setBase64Image={setCategoryImage}
                item={item}
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
