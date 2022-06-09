import { Col, Form, Input, Select, Row } from "antd";
import React from "react";
import FormHeader from "../../../../commons/FormHeader";
import InputField from "./../../../../commons/Form/InputField";
import SelectField from "../../../../commons/Form/SelectField";
import "./category-form.scss";
import TranslateCategoryForm from "./TranslateCategoryForm";
import UploadDragger from "../../../../commons/UploadDragger/UploadDragger.jsx";
import { CATEGORY_OPTIONS } from "../../../../commons/data";
import {
  getCategoryInitValues,
  getTranslateCategoryInitValues,
  getCategoryFormLayout,
} from "./categoryInitValues.js";
import { useTranslation } from "react-i18next";
import { getCurrentLanguage } from "../../../../helper/localStorage.js";
import { useSelector } from "react-redux";
import useAdminCategories from "../../../../hooks/categoryAdmin/useAdminCategories";
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

  const { t } = useTranslation();
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

  const { getAdminCategories, adminCategories } = useAdminCategories();

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

  React.useEffect(() => {
    const image = document.querySelector(".image");
    image.addEventListener("click", (e) => {
      e.preventDefault();
    });

    return image.removeEventListener("click", () => {
      return false;
    });
  }, []);

  const onChangeAvatar = (base64Image) => {
    setAvatarState({ base64Avatar: base64Image });
    setErrorMessImage("");
  };

  React.useEffect(() => {
    setAvatarState({ avatarUrl: item?.category_image || "" });
  }, [item]);

  React.useEffect(() => {
    if (!adminCategories) {
      getAdminCategories();
    }
  }, [adminCategories]);

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
                label={t("admins.category.slug_field")}
                // rules={[]}
                response={response}
                error="slug"
                placeholder={t("admins.category.placeholder_text")}
                type={<Input />}
              />
            </Col>
            <Col span={24} className="input-field-space">
              <SelectField
                field="type"
                label={t("admins.category.type_field")}
                validateStatus={"Please enter your Type"}
                rules={[
                  {
                    required: true,
                    message: t("admins.category.placeholder_text"),
                  },
                ]}
                type={<Input type="number" className="input-field" />}
                response={response}
                errorField="type"
                options={CATEGORY_OPTIONS.CATEGORY_TYPES}
              />
            </Col>

            <Col span={24} className="input-field-space">
              <SelectField
                field="type"
                label="papa catagory"
                validateStatus={"Please enter your parent catogory"}
                type={<Input type="number" className="input-field" />}
                response={response}
                errorField="type"
              >
                {adminCategories?.map((option, index) => (
                  <Select.Option key={index} value={option.name}>
                    {option.name}
                  </Select.Option>
                ))}
              </SelectField>
            </Col>

            <Col span={24} className="input-field-space">
              <Form.Item
                field=" product_image"
                className="required"
                label={t("admins.category.product_image_field")}
                required={true}
              >
                <UploadDragger
                  onChangeImage={onChangeAvatar}
                  imageUrlProps={avatarState.avatarUrl}
                  loading={avatarState.loading}
                  mode="multiple"
                />
                {errorMessImage && (
                  <span style={{ color: "red" }}>
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
