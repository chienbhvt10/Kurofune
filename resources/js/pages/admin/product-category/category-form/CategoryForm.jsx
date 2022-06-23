import { Col, Form, Input, Row, Select } from "antd";
import React from "react";
import { useTranslation } from "react-i18next";
import { CATEGORY_OPTIONS } from "../../../../commons/data";
import SelectField from "../../../../commons/Form/SelectField";
import FormHeader from "../../../../commons/FormHeader";
import UploadDragger from "../../../../commons/UploadDragger/UploadDragger.jsx";
import useCategories from "../../../../hooks/category/useCategories";
import useHandleForm from "../hooks/useHandleForm";
import InputField from "./../../../../commons/Form/InputField";
import "./category-form.scss";
import { getCategoryFormLayout } from "./categoryInitValues.js";
import TranslateCategoryForm from "./TranslateCategoryForm";

const CategoryForm = ({
  item,
  typeForm,
  title,
  onCancel,
  onSave,
  response,
}) => {
  const {
    categoryForm,
    categoryProfileFormEN,
    categoryProfileFormJP,
    categoryProfileFormTL,
    categoryProfileFormVI,
    categoryProfileFormZH,
    initialCommonValues,
    errorMessImage,
    onChangeAvatar,
    onFinishAll,
    onFinishError,
  } = useHandleForm(item, onSave, typeForm);

  const [avatarUrl, setAvatarUrl] = React.useState();
  const { t } = useTranslation();
  const formItemLayout = getCategoryFormLayout();
  const { getAllCategories, categories } = useCategories();

  React.useEffect(() => {
    getAllCategories();
  }, []);

  React.useEffect(() => {
    setAvatarUrl(item?.category_image || "");
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
        <FormHeader breadcrumb={[]} title={title} onCancel={onCancel} />
        <Row className="pb-60" justify="center">
          <Col span={12} className="input-field-space">
            <Form.Item
              field="product_image"
              label={t("admins.category.product_image_field")}
              required={true}
            >
              <UploadDragger
                onChangeImage={onChangeAvatar}
                imageUrlProps={avatarUrl}
              />
            </Form.Item>
            {errorMessImage && (
              <Row justify="center">
                <Col>
                  <span style={{ color: "red" }}>
                    {t("admins.category.error_message.error_category_image")}
                  </span>
                </Col>
              </Row>
            )}
          </Col>

          <Col span={12}>
            <Col span={24}>
              <TranslateCategoryForm
                formEN={categoryProfileFormEN}
                formJP={categoryProfileFormJP}
                formTL={categoryProfileFormTL}
                formVI={categoryProfileFormVI}
                formZH={categoryProfileFormZH}
                response={response}
              />
            </Col>
            <Col span={24} className="input-field-space">
              <SelectField
                field="type"
                label={t("admins.category.type_field")}
                validateStatus={true}
                rules={[
                  {
                    required: true,
                    message: t("admins.category.error_message.error_type"),
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
                response={response}
                errorField="parent_id"
              >
                {categories?.map((option, index) => (
                  <Select.Option key={index} value={option.id}>
                    {option.name}
                  </Select.Option>
                ))}
              </SelectField>
            </Col>
          </Col>
        </Row>
      </Form>
    </div>
  );
};

export default CategoryForm;
