import React, { memo } from 'react';
import { Modal, Form, Col, Row, Input, DatePicker, Radio,Button } from 'antd';
import { t } from 'i18next';
import InputField from '../../commons/Form/InputField';
import DateField from '../../commons/Form/DateField';
import moment from 'moment';
import SelectField from '../../commons/Form/SelectField';
import { PREF } from '../../commons/data';
import { validateFormRegister } from './validateFormRegister';
import postal_code from "japan-postal-code";

const RegisterUser = ({ modalVisible, setModalVisible }) => {
  const [formInfo] = Form.useForm();
  // const [placement, SetPlacement] = useState('topLeft');
  const initialValues = {
    // fullName: 'Test Full Name init ',
    // birthday: moment(new Date()),
    // gender: 'male',
    // phone_number: '0123456789',
    // email: 'test@example.com',
    // postal_code: '',
    // prefecture: '',
    // city: '',
    // street_address: '',
    // building: '',
    // language: 'English',
    // nationality: '',
    // type_visa: '',
    // course: 'N1',
    // job: '',
    // company_name: 'Company name',
    // dependent_name: 'John',
    // company_email: 'example@gmail.com',
    // contact_information: '',
    // password: '12345678',
    // plan: 'ライトプラン'
    fullName: '',
    birthday: moment(new Date()),
    gender: '',
    phone_number: '',
    email: '',
    postal_code: '',
    prefecture: '',
    city: '',
    street_address: '',
    building: '',
    language: '',
    nationality: '',
    type_visa: '',
    course: '',
    job: '',
    company_name: '',
    dependent_name: '',
    company_email: '',
    contact_information: '',
    password: '',
    plan: ''
  }
  const onCodeJapan = () => {
    let code = formInfo.getFieldValue("postcode")
    if (code) {
      postal_code.get(code, (address) => {
        if (address.prefecture || address.city || address.area) {
          formInfo.setFieldsValue({
            ...formInfo.getFieldsValue(),
            prefecture: address.prefecture,
            town_city: address.city,
            street_address: address.area,
          });
        }
      });
    }
  };
  const reset = {
    fullName: '',
    birthday: moment(new Date()),
    gender: '',
    phone_number: '',
    email: '',
    postal_code: '',
    prefecture: '',
    city: '',
    street_address: '',
    building: '',
    language: '',
    nationality: '',
    type_visa: '',
    course: '',
    job: '',
    company_name: '',
    dependent_name: '',
    company_email: '',
    contact_information: '',
    password: '',
    plan: ''
  }
  React.useEffect(() => {
    formInfo.setFieldsValue({
      full_name: initialValues.fullName,
      birthday: initialValues.birthday,
      gender: initialValues.gender,
      phone_number: initialValues.phone_number,
      email: initialValues.email,
      postal_code: initialValues.postal_code,
      language: initialValues.language,
      course: initialValues.course,
      company_name: initialValues.company_name,
      company_email: initialValues.company_email,
      dependent_name: initialValues.dependent_name,
      password: initialValues.password,
      plan: initialValues.plan,
    })
    return () => {
      formInfo.setFieldsValue({
        full_name: reset.fullName,
        birthday: reset.birthday,
        gender: reset.gender,
        phone_number: reset.phone_number,
        email: reset.email,
        postal_code: reset.postal_code,
        language: reset.language,
        course: reset.course,
        company_name: reset.company_name,
        company_email: reset.company_email,
        dependent_name: reset.dependent_name,
        password: reset.password,
        plan: reset.plan,
      })
    }
  }, [])

  const renderErrorTranslate = (field) => {
    return validateFormRegister?.[field].map((item) => {
      return {
        ...item,
        message: t(item.message),
      };
    });
  };

  return <Modal
    visible={modalVisible}
    onCancel={() => {
      setModalVisible(false)
    }}
    onOk={() => {
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
            onFinish={(value) => { 
            }}
            autoComplete="off"
          >
            <Col span={24}>
              <InputField
                field='full_name'
                error='full_name'
                label={t("member.change_profile.field_full_name")}
                labelCol={{ span: 24 }}
                wrapperCol={{ span: 23 }}
                rules={renderErrorTranslate("full_name")}
                // response={response}
                type={<Input className="input-field" />}
              />
            </Col>
            <Col span={24}>
              <InputField
                field='full_name_spell'
                error='full_name_spell'
                label='Full Name Spelling'
                labelCol={{ span: 24 }}
                wrapperCol={{ span: 23 }}
                // rules={renderErrorTranslate("full_name")}
                // response={response}
                type={<Input className="input-field" />}
              />
            </Col>
            <Row >
              <Col span={12}>
                <DateField
                  field='birthday'
                  error='birthday'
                  label='Birthday'
                  labelCol={{ span: 24 }}
                  wrapperCol={{ span: 23 }}
                  rules={renderErrorTranslate("birthday")}
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
                  rules={renderErrorTranslate("gender")}
                  // response={response}
                  options={
                    [
                      { value: 'male', label: '男' },
                      { value: 'female', label: '女' },
                      { value: 'others', label: 'その他' },
                    ]
                  }
                  type={<Input className="input-field" />}
                />

              </Col>
            </Row>
            <Row span={24}>
              <Col span={12}>
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
              <Col span={12}>
                <InputField
                  field='email'
                  error='email'
                  label={t("member.change_profile.field_email")}
                  labelCol={{ span: 24 }}
                  wrapperCol={{ span: 23 }}
                  rules={renderErrorTranslate("email")}
                  // response={response}
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
                  field='town_city'
                  error='town_city'
                  label="Town / City"
                  labelCol={{ span: 24 }}
                  wrapperCol={{ span: 23 }}
                  rules={renderErrorTranslate("town_city")}
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
                  label="Street address"
                  labelCol={{ span: 24 }}
                  wrapperCol={{ span: 23 }}
                  rules={renderErrorTranslate("street_address")}
                  // response={response}
                  type={<Input className="input-field" />}
                />

              </Col>
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
            </Row>
            <Row>
              <Col span={12}>
                <SelectField
                  field='language'
                  error='language'
                  label="Language"
                  labelCol={{ span: 24 }}
                  wrapperCol={{ span: 23 }}
                  rules={renderErrorTranslate("language")}
                  // response={response}
                  options={
                    [
                      { value: 'English', label: 'English - 英語' },
                      { value: 'Japanese', label: 'Japanese - 日本語' },
                      { value: 'Vietnamese', label: 'Tiếng Việt  - ベトナム語' },
                      { value: 'Tagalog', label: 'Tagalog - タガログ語' },
                      { value: '中文', label: '中文 - 中国語' },
                    ]
                  }
                  type={<Input className="input-field" />}
                />

              </Col>
              <Col span={12}>
                <SelectField
                  field='nationality'
                  error='nationality'
                  label="Nationality"
                  labelCol={{ span: 24 }}
                  wrapperCol={{ span: 23 }}
                  rules={renderErrorTranslate("nationality")}
                  // response={response}
                  options={
                    [
                      { value: 'Afghan', label: 'Afghan' },
                      { value: 'Albanian', label: 'Albanian' },
                      { value: 'Algerian', label: 'Algerian' },
                      { value: 'Argentine', label: 'Argentine' },
                      { value: 'Australian', label: 'Australian' },
                      { value: 'Japanese', label: 'Japanese' },
                      { value: 'Vietnamese', label: 'Vietnamese' },
                      { value: 'Chinese', label: 'Chinese' },
                      { value: 'British', label: 'United Kingdom' },
                      { value: 'American', label: 'United States' },
                    ]
                  }
                  type={<Input className="input-field" />}
                />
              </Col>
            </Row>
            <Col span={12}>
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
                    { value: '技能実習生', label: '技能実習生' },
                    { value: '特定技能', label: '特定技能' },
                    { value: '特定活動', label: '特定活動' },
                    { value: '技術・人文知識・国際業務', label: '技術・人文知識・国際業務' },
                    { value: '永住', label: '永住' },
                    { value: '日本人配偶者', label: '日本人配偶者' },
                    { value: '永住者の配偶者', label: '永住者の配偶者' },
                    { value: '定住者', label: '定住者' },
                    { value: '留学', label: '留学' },
                    { value: '家族滞在', label: '家族滞在' },
                    { value: 'その他', label: 'その他' },
                  ]
                }
                type={<Input className="input-field" />}
              />
            </Col>
            <Row>
              <Col span={12}>
                <SelectField
                  field='course'
                  error='course'
                  label="The Course"
                  labelCol={{ span: 24 }}
                  wrapperCol={{ span: 23 }}
                  rules={renderErrorTranslate("course")}
                  // response={response}
                  options={
                    [
                      { value: 'N1', label: 'N1' },
                      { value: 'N2', label: 'N2' },
                      { value: 'N3', label: 'N3' },
                      { value: 'N4', label: 'N4' },
                      { value: 'N5', label: 'N5' },
                      { value: 'Nゼロ', label: 'Nゼロ' },
                    ]
                  }
                  type={<Input className="input-field" />}
                />
              </Col>
              <Col span={12}>
                <SelectField
                  field='job'
                  error='job'
                  label="Job"
                  labelCol={{ span: 24 }}
                  wrapperCol={{ span: 23 }}
                  rules={renderErrorTranslate("job")}
                  // response={response}
                  options={
                    [
                      { value: '農業', label: '農業' },
                      { value: '漁業', label: '漁業' },
                      { value: '製造業（工場）', label: '製造業（工場）' },
                      { value: '製造業（設計）', label: '製造業（設計）' },
                      { value: '建設（現場', label: '建設（現場）' },
                      { value: '営業', label: '営業' },
                      { value: '会計・経理', label: '会計・経理' },
                      { value: '事務', label: '事務' },
                      { value: '自動車整備', label: '自動車整備' },
                      { value: '介護', label: '介護' },
                      { value: '接客業（飲食・宿泊）', label: '接客業（飲食・宿泊' },
                      { value: '通訳', label: '通訳' },
                      { value: 'ITエンジニア', label: 'ITエンジニア' },
                      { value: 'ビルクリーニング', label: 'ビルクリーニング' },
                      { value: 'その他', label: 'その他' },
                    ]
                  }
                  type={<Input className="input-field" />}
                />
              </Col>
            </Row>

            <Row>
              <Col span={12}>
                <InputField
                  field='company_name'
                  error='company_name'
                  label="Company name"
                  labelCol={{ span: 24 }}
                  wrapperCol={{ span: 23 }}
                  // rules={renderErrorTranslate("postcode")}
                  // response={response}
                  type={<Input className="input-field" disabled={true} />}
                />
              </Col>
              <Col span={12}>
                <InputField
                  field='dependent_name'
                  error='dependent_name'
                  label="Dependent's name"
                  labelCol={{ span: 24 }}
                  wrapperCol={{ span: 23 }}
                  // rules={renderErrorTranslate("postcode")}
                  // response={response}
                  type={<Input className="input-field" disabled={true} />}
                />
              </Col>
            </Row>
            <Row>
              <Col span={12}>
                <InputField
                  field='company_email'
                  error='company_email'
                  label="Company Email"
                  labelCol={{ span: 24 }}
                  wrapperCol={{ span: 23 }}
                  // rules={renderErrorTranslate("postcode")}
                  // response={response}
                  type={<Input className="input-field" disabled={true} />}
                />
              </Col>
              <Col span={12}>
                <InputField
                  field='contact_info'
                  error='contact_info'
                  label="Contact information"
                  labelCol={{ span: 24 }}
                  wrapperCol={{ span: 23 }}
                  // rules={renderErrorTranslate("postcode")}
                  // response={response}
                  type={<Input className="input-field" />}
                />
              </Col>
            </Row>
            <Row>
              <Col span={12}>
                <InputField
                  field='password'
                  error='password'
                  label="Password"
                  labelCol={{ span: 24 }}
                  wrapperCol={{ span: 23 }}
                  // rules={renderErrorTranslate("postcode")}
                  // response={response}
                  type={<Input className="input-field" type='password' />}
                />
              </Col>
              <Col span={12}>
                <Form.Item
                  name='plan'
                  label='Plan Use'
                  labelCol={{ span: 24 }}
                  wrapperCol={{ span: 23 }}
                // rules={rules}
                >
                  <Radio.Group 
                    disabled={true}
                  >
                    <Radio value="ライトプラン">ライトプラン</Radio>
                    <Radio value="フルサポートプラン">フルサポートプラン</Radio>
                  </Radio.Group>

                </Form.Item>
              </Col>
            </Row>
          </Form>
        </div>
      </div>
    </div>
  </Modal>

}

export default memo(RegisterUser)