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
import { userFormOptions } from '../../commons/data'

const UserProfileClient = ({ modalVisible, setModalVisible, role, profile, setAccessRightVisiable2 }) => {
  const [formInfo] = Form.useForm();

  const initialValues = {
    name_furigana: profile && profile.name_furigana || '',
    dob: profile?.profile?.dob && moment(profile.profile.dob, 'YYYY-MM-DD') || '',
    gender: profile && isNumber(profile.profile.gender) ? profile.profile.gender : '',
    phone: profile && profile?.phone || '',
    facebook: profile && profile.profile.facebook || '',
    line: profile?.profile?.line || '',
    postal_code: profile?.address?.postal_code || '',
    prefecture: profile?.address?.prefecture || '',
    city: profile?.address?.city || '',
    building: profile?.address?.building || '',
    street_address: profile?.address?.street_address || '',
    nationality: profile?.profile?.nationality || '',
    visa_type: profile && !isNumber(profile.profile.visa_type) === 0 ? profile.profile.visa_type : '',
    education_status: profile && !isNumber(profile.profile.education_status) === 0 ? profile.profile.education_status : '',
    job_name: profile && !isNumber(profile.profile.job_name) === 0 ? profile.profile.job_name : '',
  }

  const onCodeJapan = () => {
    let code = formInfo.getFieldValue("postal_code")
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
      phone: initialValues.phone,
      facebook: initialValues.facebook,
      line: initialValues.line,
      postal_code: initialValues.postal_code,
      prefecture: initialValues.prefecture,
      city: initialValues.city,
      street_address: initialValues.street_address,
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
        postal_code: initialValues.postal_code,
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
  function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }
  const { UserRegistrationClient } = useUserRegistrationClient();
  const onFinish = (value) => {
    if (!value) return
    let dob = formInfo.getFieldValue("dob")
    dob = dob.format('YYYY-MM-DD');
    let objectUpdate = {
      ...value, dob
    };
    UserRegistrationClient(objectUpdate, async () => {
      setModalVisible(false)
      await sleep(2000);
      setAccessRightVisiable2(true)
    })
  }
  const onOk = async () => {
    formInfo.submit();
  }

  return <Modal
    visible={modalVisible}
    // onCancel={() => {
    //   setModalVisible(false)
    // }}
    onOk={onOk}
    className="modal-access-right hidden-x"
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
                label={t("client.media.user_profile.field_name_furigana")}
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
                  rules={renderErrorTranslate(`${role === ROLE_FULL_SUPPORT_PLAN ? 'dob' : ''}`)}
                  type={<DatePicker className="input-field" allowClear={false} />}
                />
              </Col>
              <Col span={12}>
                <SelectField
                  field='gender'
                  error='gender'
                  label={t("client.media.user_profile.field_gender")}
                  labelCol={{ span: 24 }}
                  wrapperCol={{ span: 23 }}
                  rules={renderErrorTranslate(`${role === ROLE_FULL_SUPPORT_PLAN2 ? 'gender' : ''}`)}
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
                  field='phone'
                  error='phone'
                  label={t("client.media.user_profile.field_phone")}
                  labelCol={{ span: 24 }}
                  wrapperCol={{ span: 23 }}
                  rules={renderErrorTranslate("phone")}
                  type={<Input className="input-field" />}
                />
              </Col>
            </Row>
            <Row>
              <Col span={12}>
                <InputField
                  field='facebook'
                  error='facebook'
                  label={t("client.media.user_profile.field_facebook")}
                  labelCol={{ span: 24 }}
                  wrapperCol={{ span: 23 }}
                  type={<Input className="input-field" />}
                />
              </Col>
              <Col span={12}>
                <InputField
                  field='line'
                  error='line'
                  label={t("client.media.user_profile.field_line")}
                  labelCol={{ span: 24 }}
                  wrapperCol={{ span: 23 }}
                  type={<Input className="input-field" />}
                />
              </Col>
            </Row>
            <Row>
              <Col span={12}>
                <InputField
                  field='postal_code'
                  error='postal_code'
                  label={t("client.media.user_profile.field_postcode")}
                  labelCol={{ span: 24 }}
                  wrapperCol={{ span: 23 }}
                  rules={renderErrorTranslate("postal_code")}
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
                  label={t("client.media.user_profile.field_prefecture")}
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
                  labelCol={{ span: 24 }}
                  wrapperCol={{ span: 23 }}
                  label={t("client.media.user_profile.field_city")}
                  rules={renderErrorTranslate("city")}
                  // response={response}
                  type={<Input className="input-field" />}
                />
              </Col>
            </Row>

            <Row>
              <Col span={12}>
                <InputField
                  field='street_address'
                  error='street_address'
                  labelCol={{ span: 24 }}
                  wrapperCol={{ span: 23 }}
                  label={t("client.media.user_profile.field_street_address")}
                  rules={renderErrorTranslate("street_address")}
                  // response={response}
                  type={<Input className="input-field" />}
                />
              </Col>
              <Col span={12}>
                <InputField
                  field='building'
                  error='building'
                  label={t("client.media.user_profile.field_building")}
                  labelCol={{ span: 24 }}
                  wrapperCol={{ span: 23 }}
                  type={<Input className="input-field" />}
                />
              </Col>

            </Row>
            <Row>
              <Col span={12}>
                <InputField
                  field='nationality'
                  error='nationality'
                  label={t("client.media.user_profile.field_nationality")}
                  rules={renderErrorTranslate("nationality")}
                  labelCol={{ span: 24 }}
                  wrapperCol={{ span: 23 }}
                  type={<Input className="input-field" />}
                />
              </Col>
              <Col span={12}>
                <SelectField
                  field='visa_type'
                  error='visa_type'
                  label={t("client.media.user_profile.field_visa_type")}
                  labelCol={{ span: 24 }}
                  wrapperCol={{ span: 23 }}
                  rules={renderErrorTranslate("visa_type")}
                  // response={response}
                  options={userFormOptions.VISA_TYPE}
                  type={<Input className="input-field" />}
                />
              </Col>
            </Row>
            <Row>
              <Col span={12}>
                <SelectField
                  field='job_name'
                  error='job_name'
                  label={t("client.media.user_profile.field_job")}
                  labelCol={{ span: 24 }}
                  wrapperCol={{ span: 23 }}
                  rules={renderErrorTranslate(`${role === ROLE_FULL_SUPPORT_PLAN2 ? 'job_name' : ''}`)}
                  // response={response}
                  options={userFormOptions.JOB}
                  type={<Input className="input-field" />}
                />
              </Col>
              <Col span={12}>
                <SelectField
                  field='education_status'
                  error='education_status'
                  label={t("client.media.user_profile.field_education_status")}
                  labelCol={{ span: 24 }}
                  wrapperCol={{ span: 23 }}
                  rules={renderErrorTranslate(`${role === ROLE_FULL_SUPPORT_PLAN2 ? 'education_status' : ''}`)}
                  // response={response}
                  options={userFormOptions.education_status}
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