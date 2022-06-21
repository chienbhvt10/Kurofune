import { DatePicker, Form, Input, InputNumber, Select, Typography } from "antd";
import { t } from "i18next";
import moment from "moment";
import React from "react";
import * as Yup from "yup";
import { useParams } from "react-router-dom";
import DateField from "../../../../commons/Form/DateField";
import InputField from "../../../../commons/Form/InputField";
import SelectFieldSearch from "../../../../commons/Form/SelectFieldSearch";
import FormHeader from "../../../../commons/FormHeader";
import { getCurrentLanguage } from "../../../../helper/localStorage";
import useOrderDetailAdmin from "../../../../hooks/orderAdmin/useOrderDetailAdmin";
import useUpdateOrderAdmin from "../../../../hooks/orderAdmin/useUpdateOrderAdmin";
import BillingShipFormOrder from "./BillingShipFormOrder";
import CartInfoTable from "./CartInfoTable";
import "./order-form.scss";
const { Option } = Select;
const { Title } = Typography;
const credential = Yup.object().shape({});
const OrderForm = ({ item, typeForm, title, onCancel, onSave }) => {
  const { id } = useParams();
  const lang = getCurrentLanguage();
  const { getOrderDetailAdmin } = useOrderDetailAdmin();
  const { updateOrderAdmin } = useUpdateOrderAdmin();
  const initialGeneralValues = {
    date: moment(new Date(), "YYYY-MM-DD"),
    hours: 0,
    minute: 0,
    customer: 0,
    status: 0,
  };
  const initialBillingValue = {};
  const initialShippingValue = {};
  const dataOptionsStatus = [
    { value: "awaiting confirm", label: "Awaiting confirm" },
    { value: "packing", label: "Packing" },
    { value: "delivery", label: "Delivery" },
    { value: "shipping", label: "Shipping" },
    { value: "completed", label: "Completed" },
  ];
  const [dataOrder, setDataOrder] = React.useState();
  const [dataCartInforTable, setDataCartInforTable] = React.useState({
    products: [],
    total: 0,
    total_tax: 0,
  });
  const [formGeneral] = Form.useForm();
  const [formBilling] = Form.useForm();
  const [formShipping] = Form.useForm();

  const handleSubmit = async () => {
    try {
      formGeneral.submit();
      formBilling.submit();
      formShipping.submit();
      let valueFormGeneralError = await formGeneral.validateFields();
      let valueFormBillingError = await formBilling.validateFields();
      let valueFormShippingError = await formShipping.validateFields();

      if (
        valueFormGeneralError &&
        valueFormBillingError &&
        valueFormShippingError
      ) {
        let objectUpdate = {
          order_status: valueFormGeneralError.status,
          shipping_full_name: valueFormShippingError.full_name,
          shipping_postal_code: valueFormShippingError.postal_code,
          shipping_city: valueFormShippingError.city,
          shipping_prefecture: valueFormShippingError.prefecture,
          shipping_street_address: valueFormShippingError.street_address,
          shipping_building: valueFormShippingError.building,
          shipping_phone: valueFormShippingError.phone,
          shipping_email: valueFormShippingError.email,
          billing_full_name: valueFormBillingError.full_name,
          billing_postal_code: valueFormBillingError.postal_code,
          billing_city: valueFormBillingError.city,
          billing_prefecture: valueFormBillingError.prefecture,
          billing_street_address: valueFormBillingError.street_address,
          billing_building: valueFormBillingError.building,
          billing_phone: valueFormBillingError.phone,
          billing_email: valueFormBillingError.email,
        };
        const { id } = dataOrder;
        updateOrderAdmin({ id, data: objectUpdate }, (data) => {});
      }
    } catch (error) {
      console.log("Validate fail");
    }
  };

  React.useEffect(() => {
    if (dataOrder) {
      formBilling.setFieldsValue({
        city: dataOrder.billing_city,
        building: dataOrder.billing_building,
        email: dataOrder.billing_email,
        full_name: dataOrder.billing_full_name,
        postal_code: dataOrder.billing_postal_code,
        prefecture: dataOrder.billing_prefecture,
        street_address: dataOrder.billing_street_address,
        payment_method: dataOrder.transaction.payment_mode,
        phone: dataOrder.billing_phone,
      });
      formShipping.setFieldsValue({
        city: dataOrder.shipping_city,
        building: dataOrder.shipping_building,
        email: dataOrder.shipping_email,
        full_name: dataOrder.shipping_full_name,
        postal_code: dataOrder.shipping_postal_code,
        prefecture: dataOrder.shipping_prefecture,
        street_address: dataOrder.shipping_street_address,
        phone: dataOrder.shipping_phone,
      });

      formGeneral.setFieldsValue({
        date: moment(new Date(dataOrder.created_at)),
        customer: dataOrder.user?.username,
        status: dataOrder.transaction.status,
      });
      setDataCartInforTable({
        products: dataOrder.products,
        total: dataOrder.total,
        total_tax: dataOrder.total_tax,
      });
    }
  }, [dataOrder]);
  React.useEffect(() => {
    getOrderDetailAdmin(id, (data) => {
      setDataOrder(data[0]);
    });
  }, []);
  return (
    <div id="order-form">
      <FormHeader
        breadcrumb={[]}
        title={title}
        onCancel={onCancel}
        onSubmit={handleSubmit}
      />
      <p className="order-detail-title">Order #1723 details</p>
      <div className="order-info">
        <div className="general-info section-info">
          <p className="title-section">General</p>
          <Form form={formGeneral} name="formGeneral">
            <div className="form-group">
              <div>
                <label className="label-for">
                  {t("admins.order.form.field_date_create")}
                </label>
                <div
                  style={{
                    display: "flex",
                    flexDirection: "row",
                    alignItems: "center",
                  }}
                >
                  <DateField
                    field="date"
                    rules={[
                      {
                        required: true,
                        message: "Please input your date field !",
                      },
                    ]}
                    labelCol={{ span: 24 }}
                    wrapperCol={{ span: 24 }}
                    locale={{ lang: { locale: "vi_VN" } }}
                    className="marginUnset"
                    disable={true}
                    type={<DatePicker format="DD-MM-YYYY HH:mm:ss" />}
                  />
                  {/* @ 
                  <InputField
                    field="hours"
                    labelCol={{ span: 24 }}
                    wrapperCol={{ span: 22 }}
                    style={{ margin: 0 }}
                    className="marginUnset"
                    type={
                      <InputNumber
                        min={0}
                        max={23}
                        defaultValue={0}
                        style={{ margin: "0 8px" }}
                      />
                    }
                  />  
                  :
                  <InputField
                    field="minute"
                    // rules={[{ required: true, message: 'Please input your username!' }]}
                    labelCol={{ span: 24 }}
                    wrapperCol={{ span: 22 }}
                    style={{ margin: 0 }}
                    className="marginUnset"
                    type={
                      <InputNumber
                        min={0}
                        max={60}
                        defaultValue={0}
                        style={{ margin: "0 8px" }}
                      />
                    }
                  /> */}
                </div>
                <Form.Item name="status">
                  <SelectFieldSearch
                    field="status"
                    label={t("admins.order.form.field_status")}
                    labelCol={{ span: 24 }}
                    wrapperCol={{ span: 22 }}
                    type={<Input />}
                    options={dataOptionsStatus}
                    disabled={false}
                  />
                </Form.Item>
                <Form.Item name="customer">
                  <InputField
                    field="customer"
                    label={t("admins.order.form.field_customer")}
                    labelCol={{ span: 24 }}
                    wrapperCol={{ span: 22 }}
                    style={{ margin: 0 }}
                    rules={[
                      {
                        required: true,
                        message: "Please input your username!",
                      },
                    ]}
                    type={<Input disabled={true} />}
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
          <BillingShipFormOrder form={formShipping} typeForm="shipping" />
        </div>
      </div>
      <div className="cart-info">
        <CartInfoTable dataCartInforTable={dataCartInforTable} />
      </div>
    </div>
  );
};

export default OrderForm;
