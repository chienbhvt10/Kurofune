import { Col, Form, Input, Row } from "antd";
import React from "react";
import { useSelector } from "react-redux";
import InputField from "../../../../commons/Form/InputField.jsx";

const SubFormTranslate = ({ lang, className, form, response }) => {

  // const [resMessage, setResMessage] = React.useState()
  // React.useEffect(() => {
  //   if (response && response.status_code === 500) {
  //     setResMessage({
  //       ...response,
  //       message: {
  //         'name': "dcmdcm"
  //       }
  //     })
  //   }
  // }, [response])
  // console.log(resMessage);

  return (
    <Row justify="center">
      <Form className={className} name="common-translate-form" form={form}>
        <Row justify="center">
          <Col span={12} className="form-group-col">
            <InputField
              className="custom-required"
              field="name"
              label={`(${lang}) Name`}
              labelCol={{ span: 24 }}
              wrapperCol={{ span: 24 }}
              rules={[
                {
                  required: true,
                  message: "This field is required"
                }
              ]}
              type={<Input.TextArea />}
            />
          </Col>

          <Col span={12} className="form-group-col">
            <InputField
              field="medicinal_efficacy_classification"
              label={`(${lang}) Medicinal efficacy classification`}
              labelCol={{ span: 24 }}
              wrapperCol={{ span: 24 }}
              rules={[]}
              response={response}
              rows={4}
              type={<Input.TextArea />}
            />
          </Col>
          <Col span={12} className="form-group-col">
            <InputField
              field="features"
              label={`(${lang}) Features`}
              labelCol={{ span: 24 }}
              wrapperCol={{ span: 24 }}
              rules={[]}
              response={response}
              type={<Input.TextArea />}
            />
          </Col>
          <Col span={12} className="form-group-col">
            <InputField
              field="precautions"
              label={`(${lang}) Precautions`}
              labelCol={{ span: 24 }}
              wrapperCol={{ span: 24 }}
              rules={[]}
              response={response}
              type={<Input.TextArea />}
            />
          </Col>
          <Col span={12} className="form-group-col">
            <InputField
              field="efficacy_effect"
              label={`(${lang}) Efficacy Effect`}
              labelCol={{ span: 24 }}
              wrapperCol={{ span: 24 }}
              rules={[]}
              response={response}
              type={<Input.TextArea />}
            />
          </Col>
          <Col span={12} className="form-group-col">
            <InputField
              field="usage_dose"
              label={`(${lang}) Usage Does`}
              labelCol={{ span: 24 }}
              wrapperCol={{ span: 24 }}
              rules={[]}
              response={response}
              type={<Input.TextArea />}
            />
          </Col>
          <Col span={12} className="form-group-col">
            <InputField
              field="active_ingredients"
              label={`(${lang}) Active Ingredients`}
              labelCol={{ span: 24 }}
              wrapperCol={{ span: 24 }}
              rules={[]}
              response={response}
              type={<Input.TextArea />}
            />
          </Col>
          <Col span={12} className="form-group-col">
            <InputField
              field="additives"
              label={`(${lang}) Additives`}
              labelCol={{ span: 24 }}
              wrapperCol={{ span: 24 }}
              rules={[]}
              response={response}
              type={<Input.TextArea />}
            />
          </Col>
          <Col span={12} className="form-group-col">
            <InputField
              field="precautions_storage_handling"
              label={`(${lang}) Precautions Storage Handling`}
              labelCol={{ span: 24 }}
              wrapperCol={{ span: 24 }}
              rules={[]}
              response={response}
              type={<Input.TextArea />}
            />
          </Col>
          <Col span={12} className="form-group-col">
            <InputField
              field="manufacturer"
              label={`(${lang}) Manufacturer`}
              labelCol={{ span: 24 }}
              wrapperCol={{ span: 24 }}
              rules={[]}
              response={response}
              type={<Input.TextArea />}
            />
          </Col>
        </Row>
      </Form>
    </Row>
  );
};

export default SubFormTranslate;
