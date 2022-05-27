import { Col, Form, Input, InputNumber, Row, Upload, Button } from "antd";
import { UploadOutlined } from "@ant-design/icons";
import React from "react";
import FormHeader from "../../../../commons/FormHeader";
import InputField from "./../../../../commons/Form/InputField";
import "./category-form.scss";
import TranslateCategoryForm from "./TranslateCategoryForm";
import UploadDragger from "./../../../../commons/UploadDragger/UploadDragger";

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

  const fileList = [
    {
      status: "done",
      name: `${item?.name}` || "",
      // thumbUrl: `${item?.category_image}` || "avatars/default.png",
      // url: `${item?.category_image}` || "avatars/default.png",

      thumbUrl:
        "data:image/jpeg;base64,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",
    },
  ];

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

  const getBase64 = (file) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = (error) => reject(error);
    });
  };
  const setImagebase64 = async (data) => {
    setCategoryImage(await getBase64(data));
  };
  const onChangeAvatar = (base64Image) => {
    setAvatarState({ base64Avatar: base64Image });
  };
  const [avatarState, setAvatarState] = React.useState({
    avatarUrl: undefined,
    base64Avatar: undefined,
    loading: false,
  });
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
                // type={<InputNumber />}
                type={<Input type="number" className="input-field" />}
                response={response}
              />
            </Col>

            <Col span={12} style={{ padding: "0 30px" }}>
              <Upload
                listType="picture"
                maxCount={1}
                defaultFileList={[...fileList]}
                beforeUpload={() => {
                  return false;
                }}
                onChange={(file) => {
                  if (file) {
                    setImagebase64(file.file);
                  }
                }}
              >
                <Button icon={<UploadOutlined />}>Upload</Button>
              </Upload>
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
