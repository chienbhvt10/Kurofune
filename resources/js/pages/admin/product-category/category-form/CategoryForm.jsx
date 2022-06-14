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
import useAdminCategories from "../../../../hooks/categoryAdmin/useAdminCategories";
import { TYPE_FORM_UPDATE } from "../../../../constants";
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
    if (typeForm === TYPE_FORM_UPDATE) {
      setErrorMessImage("");
    } else {
      setErrorMessImage(!avatarState.base64Avatar);
    }
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
          <TranslateCategoryForm
            formEN={categoryProfileFormEN}
            formJP={categoryProfileFormJP}
            formTL={categoryProfileFormTL}
            formVI={categoryProfileFormVI}
            formZH={categoryProfileFormZH}
            response={response}
          />

          <Row className="mb-30">
            <Col span={12} className="input-field-space">
              <Form.Item
                field="product_image"
                label={t("admins.category.product_image_field")}
                required={true}
              >
                <UploadDragger
                  onChangeImage={onChangeAvatar}
                  imageUrlProps={avatarState.avatarUrl}
                  loading={avatarState.loading}
                  mode="multiple"
                  className="form-image-custom"
                />
                {errorMessImage && (
                  <span style={{ color: "red" }}>
                    {t("admins.category.error_message.error_category_image")}
                  </span>
                )}
              </Form.Item>
            </Col>

            <Col span={12} className="mb-30">
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
                  field="parent_id"
                  label={t("admins.category.parent_category_field")}
                  // validateStatus={"Please enter your parent catogory"}
                  response={response}
                  errorField="parent_id"
                >
                  {adminCategories?.map((option, index) => (
                    <Select.Option key={index} value={option.id}>
                      {option.name || option.translations[0].name}
                    </Select.Option>
                  ))}
                </SelectField>
              </Col>
            </Col>
          </Row>
        </div>
      </Form>
    </div>
  );
};

export default CategoryForm;
