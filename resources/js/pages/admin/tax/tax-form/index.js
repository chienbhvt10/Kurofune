import { Col, Form, Input, Select, Row } from "antd";
import React from "react";
import FormHeader from "../../../../commons/FormHeader";
import InputField from "./../../../../commons/Form/InputField";
import "./tax-form.scss";
import { getTaxInitValues, getTaxFormLayout } from "./taxInitValues";
import { useTranslation } from "react-i18next";
import { getCurrentLanguage } from "../../../../helper/localStorage.js";
import { TYPE_FORM_UPDATE } from "../../../../constants";

const TaxForm = ({ item, typeForm, title, onCancel, onSave, response }) => {
  const { t } = useTranslation();
  const lang = getCurrentLanguage();
  const formItemLayout = getTaxFormLayout();
  const initialCommonValues = getTaxInitValues(item);
  const [taxForm] = Form.useForm();

  const onFinishAll = (values) => {
    const submitInput = {
      id: item?.id,
      ...taxForm.getFieldsValue(),
    };

    onSave(submitInput);
  };

  React.useEffect(() => {
    taxForm.setFieldsValue(initialCommonValues);
  }, [item]);

  return (
    <div id="tax-form">
      <Form
        name="common-tax-form"
        {...formItemLayout}
        form={taxForm}
        onFinish={onFinishAll}
        autoComplete="off"
        initialValues={{
          ...initialCommonValues,
        }}
        className="mb-30"
      >
        <FormHeader
          breadcrumb={[
            {
              name: t("admins.tax.title.tax_title"),
              routerLink: `${lang}/admin/tax-list`,
            },
            {
              name: t("admins.tax.title.add_tax"),
              routerLink: "/admin/tax/add",
            },
          ]}
          title={title}
          onCancel={onCancel}
        />

        <InputField
          className="input-field-space"
          field="name"
          label={t("admins.tax.title.name_title")}
          rules={[
            { required: true, message: t("admins.tax.error.name_required") },
          ]}
          response={response}
          error="name"
          placeholder={t("admins.tax.placeholder_search_name")}
          type={<Input />}
        />

        <InputField
          className="input-field-space"
          field="value"
          label={t("admins.tax.title.value_title")}
          rules={[
            {
              required: true,
              message: t("admins.tax.error.value.required"),
            },
          ]}
          response={response}
          error="value"
          placeholder={t("admins.tax.placeholder_search_value")}
          type={<Input type="number" />}
        />
      </Form>
    </div>
  );
};

export default TaxForm;
