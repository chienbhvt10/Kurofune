import React, { memo } from 'react';
import { Modal, Form, Col, Row, Input, DatePicker, Radio, Button } from 'antd';
import { t } from 'i18next';
import InputField from '../../commons/Form/InputField';
import DateField from '../../commons/Form/DateField';
import moment from 'moment';
import SelectField from '../../commons/Form/SelectField';
import { PREF } from '../../commons/data';
import { validateFormRegister } from './validateFormRegister';
import postal_code from "japan-postal-code";
import { ROLE_FULL_SUPPORT_PLAN, ROLE_FULL_SUPPORT_PLAN2 } from '../../constants';
import useUserRegistrationClient from '../../hooks/user/useUserRegistrationClient';
import { isNumber } from 'lodash';

const UserProfileClient = ({ modalVisible, setModalVisible,role,profile}) => {
  const [formInfo] = Form.useForm();
  // const [placement, SetPlacement] = useState('topLeft');
  
  const initialValues = {
    name_furigana: profile && profile.name_furigana || '',
    dob: profile && moment(profile.profile.dob) || '',
    gender: profile && isNumber(profile.profile.gender) ? profile.profile.gender : '',
    phone_number: profile && profile?.phone || '',
    facebook: profile && profile.profile.facebook ||'',
    line:profile?.profile?.line ||'',
    postcode: profile?.address?.postal_code ||'',
    prefecture: profile?.address?.prefecture ||'',
    city: profile?.address?.city ||'',
    building: profile?.address?.building ||'',
    nationality:profile && isNumber(profile.profile.nationality) ? profile.profile.nationality : '',
    visa_type: profile && isNumber(profile.profile.visa_type) ? profile.profile.visa_type : '',
    education_status:profile && isNumber(profile.profile.education_status) ? profile.profile.education_status : '',
    job_name:profile && isNumber(profile.profile.job_name) ? profile.profile.job_name : '',
  }
  // const initialValues = {
  //   name_furigana: '',
  //   dob:'',
  //   gender: '',
  //   phone_number: '',
  //   facebook:'',
  //   line:'',
  //   postcode: '',
  //   prefecture: '',
  //   city: '',
  //   building: '',
  //   nationality: '',
  //   type_visa: '',
  //   education_status: '',
  //   job_name: '',
  // }
  const onCodeJapan = () => {
    let code = formInfo.getFieldValue("postcode")
    if (code) {
      postal_code.get(code, (address) => {
        if (address.prefecture || address.city || address.area) {
          formInfo.setFieldsValue({
            ...formInfo.getFieldsValue(),
            prefecture: address.prefecture,
            city: address.city,
          });
        }
      });
    }
  };
  React.useEffect(() => {
    formInfo.setFieldsValue({
      name_furigana: initialValues.name_furigana,
      dob: initialValues.dob,
      gender: initialValues.gender,
      phone_number: initialValues.phone_number,
      facebook: initialValues.facebook,
      line: initialValues.line,
      postcode: initialValues.postcode,
      prefecture: initialValues.prefecture,
      city: initialValues.city,
      building: initialValues.building,
      nationality: initialValues.nationality,
      visa_type: initialValues.visa_type,
      education_status: initialValues.education_status,
      job_name: initialValues.job_name,
    })
    return () => {
      formInfo.setFieldsValue({
        name_furigana: initialValues.name_furigana,
        dob: initialValues.dob,
        gender: initialValues.gender,
        phone_number: initialValues.phone_number,
        facebook: initialValues.facebook,
        line: initialValues.line,
        postcode: initialValues.postcode,
        prefecture: initialValues.prefecture,
        city: initialValues.city,
        building: initialValues.building,
        nationality: initialValues.nationality,
        type_visa: initialValues.type_visa,
        education_status: initialValues.education_status,
        job_name: initialValues.job_name,
      })
    }
  }, [profile])

  const renderErrorTranslate = (field) => {
    if (!field) return
    return validateFormRegister?.[field].map((item) => {
      return {
        ...item,
        message: t(item.message),
      };
    });
  };
  const { UserRegistrationClient } = useUserRegistrationClient();
  const onFinish = (value) =>{
    UserRegistrationClient(value)
  }

  return <Modal
    visible={modalVisible}
    onCancel={() => {
      setModalVisible(false)
    }}
    onOk={() => {
      let value = formInfo.getFieldError()
      console.log('error',value);
      formInfo.submit();
    }}
    className="modal-access-right"
  >
    <div className="modal-custom">
      <div className="modal-custom-body">
        <div className="modal-custom-content">
          <Form
            id="form-register"
            form={formInfo}
            onFinish={onFinish}
            autoComplete="off"
          >
            <Col span={24}>
              <InputField
                field='name_furigana'
                error='name_furigana'
                label={t("member.change_profile.field_name_furigana")}
                labelCol={{ span: 24 }}
                wrapperCol={{ span: 23 }}
                type={<Input className="input-field" />}
              />
            </Col>
            <Row>
              <Col span={12}>
                <DateField
                  field='dob'
                  error='dob'
                  label='Dob'
                  labelCol={{ span: 24 }}
                  wrapperCol={{ span: 23 }}
                  rules={renderErrorTranslate(`${role === ROLE_FULL_SUPPORT_PLAN ? 'dob' :''}`)}
                  // response={response}
                  type={<DatePicker className="input-field" allowClear={false} />}
                />
              </Col>
              <Col span={12}>
                <SelectField
                  field='gender'
                  error='gender'
                  label="Gender"
                  labelCol={{ span: 24 }}
                  wrapperCol={{ span: 23 }}
                  rules={renderErrorTranslate(`${role === ROLE_FULL_SUPPORT_PLAN2 ? 'gender' :''}`)}
                  // response={response}
                  options={
                    [
                      { value: 0, label: 'male' },
                      { value: 1, label: 'female' },
                      { value: 2, label: 'other' },
                    ]
                  }
                  type={<Input className="input-field" />}
                />

              </Col>
            </Row>
            <Row span={24}>
              <Col span={24}>
                <InputField
                  field='phone_number'
                  error='phone_number'
                  label='Phone Number'
                  labelCol={{ span: 24 }}
                  wrapperCol={{ span: 23 }}
                  rules={renderErrorTranslate("phone_number")}
                  type={<Input className="input-field" />}
                />
              </Col>
            </Row>
            <Row>
              <Col span={12}>
                <InputField
                  field='facebook'
                  error='facebook'
                  label="Facebook"
                  labelCol={{ span: 24 }}
                  wrapperCol={{ span: 23 }}
                  type={<Input className="input-field" />}
                />
              </Col>
              <Col span={12}>
                <InputField
                  field='lINE'
                  error='lINE'
                  label="LINE"
                  labelCol={{ span: 24 }}
                  wrapperCol={{ span: 23 }}
                  type={<Input className="input-field" />}
                />
              </Col>
            </Row>
            <Row>
              <Col span={12}>
                <InputField
                  field='postcode'
                  error='postcode'
                  label='Postcode'
                  labelCol={{ span: 24 }}
                  wrapperCol={{ span: 23 }}
                  rules={renderErrorTranslate("postcode")}
                  // response={response}
                  type={<Input className="input-field" />}
                />
              </Col>
              <Col span={12}>
                <Button
                  type="button"
                  className="btn-search"
                  onClick={onCodeJapan}
                >
                  {t("member.change_profile.btn_search")}
                </Button>
              </Col>
            </Row>
            <Row>
              <Col span={12}>
                <SelectField
                  field='prefecture'
                  error='prefecture'
                  label="Prefecture"
                  labelCol={{ span: 24 }}
                  wrapperCol={{ span: 23 }}
                  options={PREF}
                  rules={renderErrorTranslate("prefecture")}
                  // response={response}
                  type={<Input className="input-field" width='100%' />}
                />

              </Col>
              <Col span={12}>
                <InputField
                  field='city'
                  error='city'
                  label="City"
                  labelCol={{ span: 24 }}
                  wrapperCol={{ span: 23 }}
                  rules={renderErrorTranslate("city")}
                  // response={response}
                  type={<Input className="input-field" />}
                />
              </Col>
            </Row>
            <Row>
              <Col span={12}>
                <InputField
                  field='building'
                  error='building'
                  label="Building"
                  labelCol={{ span: 24 }}
                  wrapperCol={{ span: 23 }}
                  type={<Input className="input-field" />}
                />
              </Col>
              <Col span={12}>
                <InputField
                  field='nationality'
                  error='nationality'
                  label="Nationality"
                  rules={renderErrorTranslate("nationality")}
                  labelCol={{ span: 24 }}
                  wrapperCol={{ span: 23 }}
                  type={<Input className="input-field" />}
                />
              </Col>
            </Row>
            <Col span={24}>
              <SelectField
                field='visa_type'
                error='visa_type'
                label="Visa"
                labelCol={{ span: 24 }}
                wrapperCol={{ span: 23 }}
                rules={renderErrorTranslate("visa_type")}
                // response={response}
                options={
                  [
                    { value: 1, label: 'Technical internship' },
                    { value: 2, label: 'Raw Specific Skills' },
                    { value: 3, label: 'Specific Skills' },
                    { value: 4, label: 'Specially Designated Activities Technical/Humanities/International Services' },
                    { value: 5, label: '	Permanent residence 1' },
                    { value: 6, label: 'Japanese spouse' },
                    { value: 7, label: 'Spouse of a permanent resident' },
                    { value: 8, label: 'Long-term resident' },
                    { value: 9, label: 'Studying abroad' },
                    { value: 10, label: 'Dependent' },
                    { value: 11, label: 'Building cleaning' },
                  ]
                }
                type={<Input className="input-field" />}
              />
            </Col>
            <Row>
              <Col span={12}>
                <SelectField
                  field='job_name'
                  error='job_name'
                  label="Job"
                  labelCol={{ span: 24 }}
                  wrapperCol={{ span: 23 }}
                  rules={renderErrorTranslate(`${role === ROLE_FULL_SUPPORT_PLAN2 ? 'job_name' :''}`)}
                  // response={response}
                  options={
                    [
                      { value: 0, label: 'Agriculture' },
                      { value: 1, label: 'Fishing (industry)' },
                      { value: 2, label: 'Manufacturing (factory)' },
                      { value: 3, label: 'Manufacturing (design)' },
                      { value: 4, label: 'Construction (on-site)' },
                      { value: 5, label: 'Construction (design)' },
                      { value: 6, label: 'Sales' },
                      { value: 7, label: 'Accounting' },
                      { value: 8, label: 'Business' },
                      { value: 9, label: 'Automobile maintenance' },
                      { value: 10, label: 'Care' },
                      { value: 11, label: 'Hospitality industry (food & beverage, lodging)' },
                      { value: 12, label: 'Interpretation (i.e. oral translation)' },
                      { value: 13, label: 'IT engineer' },
                      { value: 14, label: 'Building cleaning' },
                      { value: 15, label: 'Other' },
                    ]
                  }
                  type={<Input className="input-field" />}
                />
              </Col>
              <Col span={12}>
                <SelectField
                  field='education_status'
                  error='education_status'
                  label="The Course"
                  labelCol={{ span: 24 }}
                  wrapperCol={{ span: 23 }}
                  rules={renderErrorTranslate(`${role === ROLE_FULL_SUPPORT_PLAN2 ? 'education_status' :''}`)}
                  // response={response}
                  options={
                    [
                      { value: 1, label: 'N1' },
                      { value: 2, label: 'N2' },
                      { value: 3, label: 'N3' },
                      { value: 4, label: 'N4' },
                      { value: 5, label: 'N5' },
                      { value: 6, label: 'N0' },
                    ]
                  }
                  type={<Input className="input-field" />}
                />
              </Col>
            </Row>
          </Form>
        </div>
      </div>
    </div>
  </Modal>

}

export default memo(UserProfileClient)