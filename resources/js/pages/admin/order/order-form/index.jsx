import { DatePicker, Form, Input, InputNumber, Select, Typography } from "antd";
import { t } from "i18next";
import moment from "moment";
import React from "react";
import * as Yup from "yup";
import DateField from "../../../../commons/Form/DateField";
import InputField from "../../../../commons/Form/InputField";
import FormHeader from "../../../../commons/FormHeader";
import { getCurrentLanguage } from "../../../../helper/localStorage";
import BillingShipFormOrder from "./BillingShipFormOrder";
import CartInfoTable from "./CartInfoTable";
import "./order-form.scss";
const { Option } = Select;
const { Title } = Typography;
const credential = Yup.object().shape({});
const OrderForm = ({ item, typeForm, title, onCancel, onSave }) => {
  const lang = getCurrentLanguage();
  const initialGeneralValues = {
    date: moment(new Date(), 'YYYY-MM-DD') ,
    hours:0,
    minute:0,
    customer: 0,
    status: 0,
   
  };
  const initialBillingValue = {};
  const initialShippingValue = {};
  const cartInfo = [
    {
      product: "1",
      cost: "1",
      quantity: "1",
      total: "1",
      vat: "1",
    },
  ];
  const [formGeneral]= Form.useForm();
  const [formBilling] = Form.useForm();
  const [formShipping] = Form.useForm();
  const renderErrorMessage = (field) => {
    return (
      formik.touched[field] && (
        <div className="form-error">{formik.errors[field]}</div>
      )
    );
  };
  const  handleSubmit =()=>{
    formGeneral.submit()
    formBilling.submit()
    formShipping.submit()
  }
  React.useEffect(() => {
    formGeneral.setFieldsValue({
      ...initialGeneralValues
    });
  }, []);

  return (
    <div id="order-form">
      <FormHeader
        breadcrumb={[
          { name: "Home", routerLink: "../" },
          { name: "Order List", routerLink: `${lang}/admin/order-list` },
          {
            name: "Add",
            routerLink: "",
          },
        ]}
        title={title}
        onCancel={onCancel}
        onSubmit={handleSubmit}
      />
      <p className="order-detail-title">Order #1723 details</p>
      <div className="order-info">
        <div className="general-info section-info">
          <p className="title-section">General</p>
          <Form form={formGeneral} name="formGeneral" onFinish={(value)=>{console.log('value',value)}}>
            <div className="form-group">
              <div>
                <label className="label-for">{t("admins.user.form.order.field_date_create")}</label>
                <div style={{display: 'flex', flexDirection: 'row',alignItems: 'center'}}>
                  <DateField
                    field="date"
                    rules={[{ required: true, message: 'Please input your username!'}]}
                    labelCol={{ span: 24 }}
                    wrapperCol={{ span: 24 }}
                    locale={{ lang: { locale: "vi_VN" }}}
                    className='marginUnset'
                    type={<DatePicker />}
                  /> 
                  @ 
                  <InputField
                    field="hours"
                    labelCol={{ span: 24 }}
                    wrapperCol={{ span: 22 }}
                    style={{margin: 0}}
                    className='marginUnset'
                    type={
                      <InputNumber
                        min={0}
                        max={23} 
                        defaultValue={0}
                        style={{margin:'0 8px'}}
                      />
                    }
                  /> 
                  :
                  <InputField
                    field="minute"
                    // rules={[{ required: true, message: 'Please input your username!' }]}
                    labelCol={{ span: 24 }}
                    wrapperCol={{ span: 22 }}
                    style={{margin: 0}}
                    className='marginUnset'
                    type={
                      <InputNumber
                        min={0}
                        max={60}
                        defaultValue={0}
                        style={{margin:'0 8px'}}
                      />
                    }
                  />
                </div>
                <Form.Item name="Status">
                  <SelectFieldSearch
                    field="status"
                    label={t("admins.user.form.order.field_status")}
                    labelCol={{ span: 24 }}
                    wrapperCol={{ span: 22 }}
                    rules={[{ required: true, message: 'Please input your username!' }]}
                    type={<Input />}
                    options={[{ value: 1, label: 1 }, { value: 2, label: 2 }, { value: 3, label: 3 }]}
                    disabled={false}
                  />
                </Form.Item>
                <Form.Item name="Customer">
                  <SelectFieldSearch
                    field="customer"
                    label={t("admins.user.form.order.field_customer")}
                    labelCol={{ span: 24 }}
                    wrapperCol={{ span: 22 }}
                    rules={[{ required: true, message: 'Please input your username!' }]}
                    type={<Input />}
                    options={[{ value: 1, label: 1 }, { value: 2, label: 2 }, { value: 3, label: 3 }]}
                    disabled={false}
                  />
                </Form.Item>
              </div>
            </div>
          </Form>
        </div>
        <div className="billing-info section-info">
          <p className="title-section">Billing</p>
          <BillingShipFormOrder form={formBilling} typeForm="billing" />
        </div>
        <div className="shipping-info section-info">
          <p className="title-section">Shipping</p>
          <BillingShipFormOrder form={formShipping} typeForm="shipping"/>
        </div>
      </div>
      <div className="cart-info">
        <CartInfoTable items={cartInfo} />
      </div>
    </div>
  );
};

export default OrderForm;
