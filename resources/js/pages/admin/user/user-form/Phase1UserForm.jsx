import { useFormik } from "formik";
import React from "react";
import { useTranslation } from "react-i18next";
import * as Yup from "yup";
import FormHeader from "../../../../commons/FormHeader";
import { generatePassword } from "../../../../commons/string.js";
import UploadDragger from "../../../../commons/UploadDragger";
import useRoles from "../../../../hooks/role/useRoles";
import Phase2UserForm from "./Phase2UserForm";
import moment from "moment";
import "./user-form.scss";
export const UserForm = ({ item, typeForm, onCancel, onSave, title }) => {
  const { i18n, t } = useTranslation();
  const { roles, getAllRoles } = useRoles();
  const lang = localStorage.getItem("lang");
  React.useEffect(() => {
    console.log(item);
  }, [item]);
  const validateUserInfo = Yup.object().shape({
    id: Yup.string(),
    role: Yup.string().required("Role required!"),
    name: Yup.string().required("Name required!"),
    active: Yup.string().required("Active required!"),
    username: Yup.string().required("Username required!"),
    password:
      typeForm === "create"
        ? Yup.string()
            .min(8, "Password must be length > 8 character!")
            .required("Password required")
        : Yup.string(),
    phone: Yup.number().required("Phone number required!"),
    email: Yup.string().email("Invalid email").required("Email required!"),
  });
  const userInfoInitValues = {
    id: item?.id || "",
    role: item?.role[0].name || "",
    name: item?.name || "",
    username: item?.username || "",
    password: item?.password || "",
    phone: item?.phone || "",
    email: item?.email || "",
    active: item?.active || 0,
  };
  const planInitValues = {
    dob: item?.dob || "",
    gender: item?.gender || "",
    facebook: item?.facebook || "",
    line: item?.line || "",
    address: item?.address || "",
    nationality: item?.nationality || "",
    visa_type: item?.visa_type || "",
    job_name: item?.job_name || "",
    company_representative: item?.company_representative || "",
    inflow_source: item?.inflow_source || "",
    payment: item?.payment || "",
    insurance_status: item?.insurance_status || "",
    insurance_support: item?.insurance_support || "",
    insurance_start_date: item?.insurance_start_date || "",
    overseas_remittance_status: item?.overseas_remittance_status || "",
    orientation: item?.orientation || "",
    start_date_education: item?.start_date_education || "",
    end_date_education: item?.end_date_education || "",
    education_status: item?.education_status || "",
    wabisabi_my_page_registration: item?.wabisabi_my_page_registration || "",
  };
  const translateInitValues = {
    locate: "",
    name: "",
    permit_classification: "",
    founder: "",
    items_stated_permit: "",
    management_pharmacist: "",
    registered_seller_working: "",
    drug_handled: "",
    distinguishing_by_name: "",
    business_hours: "",
    consultation_hours: "",
    contact_information: "",
    currently_working: "",
    open_sale_time: "",
    time_order_outside: "",
    expiration_date_of_drugs: "",
  };

  const commonAddressInitValues = {
    postal_code: item?.address?.postal_code || "",
    city: item?.address?.city || "",
    prefecture: item?.address?.prefecture || "",
    street_address: item?.address?.street_address || "",
    building: item?.address?.building || "",
  };
  const billingAddressInitValues = {
    full_name: item?.billing_address?.full_name || "",
    postal_code: item?.billing_address?.postal_code || "",
    city: item?.billing_address?.city || "",
    prefecture: item?.billing_address?.prefecture || "",
    street_address: item?.billing_address?.street_address || "",
    building: item?.billing_address?.building || "",
    phone: item?.billing_address?.phone || "",
    email: item?.billing_address?.email || "",
  };
  const shippingAddressInitValues = {
    full_name: item?.shipping_address?.full_name || "",
    postal_code: item?.shipping_address?.postal_code || "",
    city: item?.shipping_address?.city || "",
    prefecture: item?.shipping_address?.prefecture || "",
    street_address: item?.shipping_address?.street_address || "",
    building: item?.shipping_address?.building || "",
    phone: item?.shipping_address?.phone || "",
    email: item?.shipping_address?.email || "",
  };

  const planProfileFormik = useFormik({ initialValues: planInitValues });

  const vendorProfileFormikEN = useFormik({
    initialValues:
      item?.vendor_profile?.vendor_translations[1] || translateInitValues,
  });
  const vendorProfileFormikJP = useFormik({
    initialValues:
      item?.vendor_profile?.vendor_translations[2] || translateInitValues,
  });
  const vendorProfileFormikTL = useFormik({
    initialValues:
      item?.vendor_profile?.vendor_translations[3] || translateInitValues,
  });
  const vendorProfileFormikVI = useFormik({
    initialValues:
      item?.vendor_profile?.vendor_translations[4] || translateInitValues,
  });
  const vendorProfileFormikZH = useFormik({
    initialValues:
      item?.vendor_profile?.vendor_translations[5] || translateInitValues,
  });
  const commonAddressFormik = useFormik({
    initialValues: commonAddressInitValues,
  });

  const billingAddressFormik = useFormik({
    initialValues: billingAddressInitValues,
  });

  const shippingAddressFormik = useFormik({
    initialValues: shippingAddressInitValues,
  });
  const userInfoFormik = useFormik({
    initialValues: userInfoInitValues,
    validationSchema: validateUserInfo,
    onSubmit: () => {
      let submitValues = {
        ...userInfoFormik.values,
        ...commonAddressFormik.values,
        billing_address: {
          ...billingAddressFormik.values,
        },
        shipping_address: {
          ...shippingAddressFormik.values,
        },
      };
      if (userInfoFormik.values.role === "vendor") {
        submitValues = {
          ...submitValues,
          ja: {
            ...vendorProfileFormikJP.values,
            dob: moment(vendorProfileFormikJP.values.dob).format("yyyy-MM-dd"),
          },
          en: {
            ...vendorProfileFormikEN.values,
          },
          zh: {
            ...vendorProfileFormikZH.values,
          },
          tl: {
            ...vendorProfileFormikTL.values,
          },
          vi: {
            ...vendorProfileFormikVI.values,
          },
        };
      }
      if (
        userInfoFormik.values.role === "light plan" ||
        userInfoFormik.values.role === "full support plan"
      ) {
        submitValues = {
          ...submitValues,
          ...planProfileFormik.values,
        };
      }
      console.log(submitValues);
      onSave({ ...submitValues });
    },
  });

  React.useEffect(() => {
    userInfoFormik.setValues(userInfoInitValues);
    planProfileFormik.setValues(planInitValues);
    billingAddressFormik.setValues(billingAddressInitValues);
    shippingAddressFormik.setValues(shippingAddressInitValues);
    commonAddressFormik.setValues(commonAddressInitValues);
    vendorProfileFormikEN.setValues(item?.en || translateInitValues);
    vendorProfileFormikJP.setValues(item?.ja || translateInitValues);
    vendorProfileFormikTL.setValues(item?.tl || translateInitValues);
    vendorProfileFormikZH.setValues(item?.zh || translateInitValues);
    vendorProfileFormikVI.setValues(item?.vi || translateInitValues);
  }, [item]);

  React.useEffect(() => {
    if (roles.length === 0) {
      getAllRoles();
    }
  }, [roles]);

  const renderErrorMessage = (formikInstance, field) => {
    return (
      formikInstance.touched[field] && (
        <div className="form-error">{formikInstance.errors[field]}</div>
      )
    );
  };
  const onGeneratePassword = () => {
    const password = generatePassword(12);
    userInfoFormik.setFieldValue("password", password);
  };
  return (
    <div className="user-form">
      <div className="form-content">
        <div className="common-info">
          <form
            encType="multipart/form-data"
            onSubmit={userInfoFormik.handleSubmit}
          >
            <FormHeader
              breadcrumb={[
                { name: "Home", routerLink: "../" },
                { name: "User List", routerLink: `${lang}/admin/user-list` },
                {
                  name: title,
                  routerLink: "",
                },
              ]}
              title={title}
              onCancel={onCancel}
            />
            <div className="wrap-user-info">
              <div className="control-avatar">
                <UploadDragger title="Avatar" name="avatar" />
              </div>
              <div className="control-field">
                <div className="form-group">
                  <label>Role</label>
                  <select
                    name="role"
                    aria-label="Default select example"
                    value={userInfoFormik.values.role}
                    onChange={userInfoFormik.handleChange}
                  >
                    <option value="">Open this select menu</option>
                    {roles.map((item, index) => (
                      <option key={index} value={item.name}>
                        {item.name}
                      </option>
                    ))}
                  </select>
                  {renderErrorMessage(userInfoFormik, "role")}
                </div>
                <div className="form-group">
                  <label>Name</label>
                  <input
                    type="text"
                    name="name"
                    value={userInfoFormik.values.name}
                    onChange={userInfoFormik.handleChange}
                  />
                  {renderErrorMessage(userInfoFormik, "name")}
                </div>

                <div className="form-group">
                  <label>Email</label>
                  <input
                    type="email"
                    name="email"
                    value={userInfoFormik.values.email}
                    onChange={userInfoFormik.handleChange}
                  />
                  {renderErrorMessage(userInfoFormik, "email")}
                </div>

                <div className="form-group">
                  <label>Phone</label>
                  <input
                    type="text"
                    name="phone"
                    value={userInfoFormik.values.phone}
                    onChange={userInfoFormik.handleChange}
                  />
                  {renderErrorMessage(userInfoFormik, "phone")}
                </div>

                <div className="form-group">
                  <label>Username</label>
                  <input
                    type="text"
                    name="username"
                    value={userInfoFormik.values.username}
                    onChange={userInfoFormik.handleChange}
                  />
                  {renderErrorMessage(userInfoFormik, "username")}
                </div>

                <div className="form-group">
                  <label>Password</label>
                  <div className="password-generate">
                    <input
                      type="text"
                      name="password"
                      value={userInfoFormik.values.password}
                      onChange={userInfoFormik.handleChange}
                    />
                    <button type="button" onClick={onGeneratePassword}>
                      Generate
                    </button>
                  </div>
                  {renderErrorMessage(userInfoFormik, "password")}
                </div>

                <div className="form-group">
                  <label>Active</label>
                  <select
                    name="active"
                    value={userInfoFormik.values.active}
                    onChange={userInfoFormik.handleChange}
                    multiple={false}
                  >
                    <option value={0}>USER_ACTIVE</option>
                    <option value={1}>USER_INACTIVE</option>
                  </select>
                  {renderErrorMessage(userInfoFormik, "active")}
                </div>
              </div>
            </div>
          </form>
        </div>
        <pre>
          {planProfileFormik.values && JSON.stringify(planProfileFormik.values)}
        </pre>
        <div className="translate-role">
          <Phase2UserForm
            role={userInfoFormik.values.role}
            vendorProfileFormikJP={vendorProfileFormikJP}
            vendorProfileFormikEN={vendorProfileFormikEN}
            vendorProfileFormikTL={vendorProfileFormikTL}
            vendorProfileFormikVI={vendorProfileFormikVI}
            vendorProfileFormikZH={vendorProfileFormikZH}
            planProfileFormik={planProfileFormik}
            commonAddressFormik={commonAddressFormik}
            billingAddressFormik={billingAddressFormik}
            shippingAddressFormik={shippingAddressFormik}
          />
        </div>
      </div>
    </div>
  );
};
