import { Col, Form, Input, Select, Row, InputNumber } from "antd";
import React from "react";
import FormHeader from "../../../../commons/FormHeader";
import InputField from "./../../../../commons/Form/InputField";
import "./tax-form.scss";
import { getTaxInitValues, getTaxFormLayout } from "./taxInitValues";
import { useTranslation } from "react-i18next";
import { getCurrentLanguage } from "../../../../helper/localStorage.js";
import { TYPE_FORM_UPDATE } from "../../../../constants";

const TaxForm = ({ item, typeForm, title, onCancel, onSave, response, loading }) => {
  const { t } = useTranslation();
  const lang = getCurrentLanguage();
  const formItemLayout = getTaxFormLayout();
  const initialCommonValues = getTaxInitValues(item);
  const [taxForm] = Form.useForm();

  const exceptThisSymbols = ["e", "E", "+", "-"];

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
        <FormHeader breadcrumb={[]} title={title} onCancel={onCancel} loading={loading} />
        <Row span={24} className="mb-30">
          <Col span={24}>
            <InputField
              className="input-field-space"
              field="name"
              label={t("admins.tax.title.name_title")}
              rules={[
                {
                  required: true,
                  message: t("admins.tax.error.name_required"),
                  whitespace: true,
                },
              ]}
              response={response}
              error="name"
              type={<Input />}
            />
          </Col>

          <Col span={24} className="mb-30">
            <InputField
              className="input-field-space"
              field="value"
              label={t("admins.tax.title.value_title")}
              rules={[
                {
                  required: true,
                  message: t("admins.tax.error.value_requied"),
                },
              ]}
              response={response}
              error="value"
              type={
                <InputNumber
                  style={{ width: "100%" }}
                  type="number"
                  min={0}
                  onKeyDown={(e) =>
                    exceptThisSymbols.includes(e.key) && e.preventDefault()
                  }
                />
              }
            />
          </Col>
        </Row>
      </Form>
    </div>
  );
};

export default TaxForm;
