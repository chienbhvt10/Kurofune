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
import RenderApiErrorMessage from "../../../../commons/RenderErrorMessage/RenderApiErrorMessage";
import RenderFormikErrorMessage from "../../../../commons/RenderErrorMessage/RenderFormikErrorMessage";
export const UserForm = ({
  item,
  typeForm,
  onCancel,
  onSave,
  title,
  errorMessage,
}) => {
  const { i18n, t } = useTranslation();
  const { roles, getAllRoles } = useRoles();
  const lang = localStorage.getItem("lang");
  React.useEffect(() => {}, [item]);
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
    dob: item?.profile?.dob || "",
    gender: item?.profile?.gender || 0,
    facebook: item?.profile?.facebook || "",
    line: item?.profile?.line || "",
    address: item?.profile?.address || "",
    nationality: item?.profile?.nationality || "",
    visa_type: item?.profile?.visa_type || "",
    job_name: item?.profile?.job_name || "",
    company_representative: item?.profile?.company_representative || "",
    inflow_source: item?.profile?.inflow_source || "",
    payment: item?.profile?.payment || 0,
    insurance_status: item?.profile?.insurance_status || 1,
    insurance_support: item?.profile?.insurance_support || "",
    insurance_start_date: item?.profile?.insurance_start_date || "",
    overseas_remittance_status: item?.profile?.overseas_remittance_status || 0,
    orientation: item?.profile?.orientation || "",
    start_date_education: item?.profile?.start_date_education || "",
    end_date_education: item?.profile?.end_date_education || "",
    education_status: item?.profile?.education_status || 1,
    wabisabi_my_page_registration:
      item?.profile?.wabisabi_my_page_registration || 0,
  };
  const translateInitValues = {
    locale: "",
    name: "",
    permit_classification: "",
    founder: "",
    items_stated_permit: "",
    management_pharmacist: "",
    registered_seller_working: "",
    drugs_handled: "",
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
      item?.vendor_profile?.vendor_translations[0] || translateInitValues,
  });
  const vendorProfileFormikJP = useFormik({
    initialValues:
      item?.vendor_profile?.vendor_translations[1] || translateInitValues,
  });
  const vendorProfileFormikTL = useFormik({
    initialValues:
      item?.vendor_profile?.vendor_translations[2] || translateInitValues,
  });
  const vendorProfileFormikVI = useFormik({
    initialValues:
      item?.vendor_profile?.vendor_translations[3] || translateInitValues,
  });
  const vendorProfileFormikZH = useFormik({
    initialValues:
      item?.vendor_profile?.vendor_translations[4] || translateInitValues,
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
            dob: moment(vendorProfileFormikEN.values.dob).format("yyyy-MM-dd"),
          },
          zh: {
            ...vendorProfileFormikZH.values,
            dob: moment(vendorProfileFormikZH.values.dob).format("yyyy-MM-dd"),
          },
          tl: {
            ...vendorProfileFormikTL.values,
            dob: moment(vendorProfileFormikTL.values.dob).format("yyyy-MM-dd"),
          },
          vi: {
            ...vendorProfileFormikVI.values,
            dob: moment(vendorProfileFormikVI.values.dob).format("yyyy-MM-dd"),
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
      onSave({ ...submitValues });
    },
  });

  React.useEffect(() => {
    userInfoFormik.setValues(userInfoInitValues);
    planProfileFormik.setValues(planInitValues);
    billingAddressFormik.setValues(billingAddressInitValues);
    shippingAddressFormik.setValues(shippingAddressInitValues);
    commonAddressFormik.setValues(commonAddressInitValues);
    vendorProfileFormikEN.setValues(
      item?.vendor_profile?.vendor_translations[0] || translateInitValues
    );
    vendorProfileFormikJP.setValues(
      item?.vendor_profile?.vendor_translations[1] || translateInitValues
    );
    vendorProfileFormikTL.setValues(
      item?.vendor_profile?.vendor_translations[2] || translateInitValues
    );
    vendorProfileFormikVI.setValues(
      item?.vendor_profile?.vendor_translations[3] || translateInitValues
    );
    vendorProfileFormikZH.setValues(
      item?.vendor_profile?.vendor_translations[4] || translateInitValues
    );
  }, [item]);

  React.useEffect(() => {
    if (roles.length === 0) {
      getAllRoles();
    }
  }, [roles]);

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
                    {roles.map((item, index) => (
                      <option key={index} value={item.name}>
                        {item.name}
                      </option>
                    ))}
                  </select>
                  <RenderFormikErrorMessage
                    formikInstance={userInfoFormik}
                    field="role"
                  />
                  <RenderApiErrorMessage
                    errorMessage={errorMessage}
                    field="role"
                  />
                </div>
                <div className="form-group">
                  <label>Name</label>
                  <input
                    type="text"
                    name="name"
                    value={userInfoFormik.values.name}
                    onChange={userInfoFormik.handleChange}
                  />
                  <RenderFormikErrorMessage
                    formikInstance={userInfoFormik}
                    field="name"
                  />
                  <RenderApiErrorMessage
                    errorMessage={errorMessage}
                    field="name"
                  />
                </div>

                <div className="form-group">
                  <label>Email</label>
                  <input
                    type="email"
                    name="email"
                    value={userInfoFormik.values.email}
                    onChange={userInfoFormik.handleChange}
                  />
                  <RenderFormikErrorMessage
                    formikInstance={userInfoFormik}
                    field="email"
                  />
                  <RenderApiErrorMessage
                    errorMessage={errorMessage}
                    field="email"
                  />
                </div>

                <div className="form-group">
                  <label>Phone</label>
                  <input
                    type="text"
                    name="phone"
                    value={userInfoFormik.values.phone}
                    onChange={userInfoFormik.handleChange}
                  />
                  <RenderFormikErrorMessage
                    formikInstance={userInfoFormik}
                    field="phone"
                  />
                  <RenderApiErrorMessage
                    errorMessage={errorMessage}
                    field="phone"
                  />
                </div>

                <div className="form-group">
                  <label>Username</label>
                  <input
                    type="text"
                    name="username"
                    value={userInfoFormik.values.username}
                    onChange={userInfoFormik.handleChange}
                  />
                  <RenderFormikErrorMessage
                    formikInstance={userInfoFormik}
                    field="username"
                  />
                  <RenderApiErrorMessage
                    errorMessage={errorMessage}
                    field="username"
                  />
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
                  <RenderFormikErrorMessage
                    formikInstance={userInfoFormik}
                    field="password"
                  />
                  <RenderApiErrorMessage
                    errorMessage={errorMessage}
                    field="password"
                  />
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
                  <RenderFormikErrorMessage
                    formikInstance={userInfoFormik}
                    field="active"
                  />
                  <RenderApiErrorMessage
                    errorMessage={errorMessage}
                    field="active"
                  />
                </div>
              </div>
            </div>
          </form>
        </div>

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
