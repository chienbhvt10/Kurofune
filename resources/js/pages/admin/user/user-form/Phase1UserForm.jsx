import { useFormik } from "formik";
import React from "react";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";
import FormHeader from "../../../../commons/FormHeader";
import { generatePassword } from "../../../../commons/string.js";
import UploadDragger from "../../../../commons/UploadDragger";
import useRoles from "../../../../hooks/role/useRoles";
import Phase2UserForm from "./Phase2UserForm";
import PlanProfileForm from "./plan-profile-form/PlanProfileForm";
import SwitchTabUserForm from "./switch-tab/SwitchTabUserForm";
import "./user-form.scss";
import VendorProfileForm from "./vendor-translate-form/VendorProfileForm";
export const UserForm = ({ item, typeForm, onCancel, onSave }) => {
  const { i18n, t } = useTranslation();
  const roles = useSelector((state) => state.roleState.roles);
  const { getRoles } = useRoles();
  const lang = localStorage.getItem("lang");
  const initialValues = {
    role: "",
    name: "",
    username: "",
    password: "",
    phone: "",
    email: "",
  };
  const formik = useFormik({
    initialValues: initialValues,
    onSubmit: () => {
      const submitValues = {
        ...formik.values,
      };
    },
  });
  const commonInitValue = {
    dob: "",
    gender: "",
    facebook: "",
    line: "",
    address: "",
    nationality: "",
    visaType: "",
    jobName: "",
    companyRepresentative: "",
    inflowSource: "",
    payment: "",
    insuranceStatus: "",
    insuranceSupport: "",
    insuranceStartDate: "",
    overseasRemittanceStatus: "",
    orientation: "",
    startDateEducation: "",
    endDateEducation: "",
    educationStatus: "",
    wabisabiMyPageRegistration: "",
  };
  const commonProfileFormik = useFormik({ initialValues: commonInitValue });

  const translateInitValue = {
    locate: "",
    name: "",
    permitClassification: "",
    founder: "",
    itemsStatedPermit: "",
    managementPharmacist: "",
    registeredSellerWorking: "",
    drugHandled: "",
    distinguishingByName: "",
    businessHours: "",
    consultationHours: "",
    contactInformation: "",
    currentlyWorking: "",
    openSaleTime: "",
    timeOrderOutside: "",
    expirationDateOfDrug: "",
  };

  const vendorProfileFormikJP = useFormik({
    // initialValues: item?.ja || translateInitValue,
    initialValues: translateInitValue,
  });
  const vendorProfileFormikVI = useFormik({
    // initialValues: item?.vi || translateInitValue,
    initialValues: translateInitValue,
  });
  const vendorProfileFormikTL = useFormik({
    // initialValues: item?.tl || translateInitValue,
    initialValues: translateInitValue,
  });
  const vendorProfileFormikEN = useFormik({
    // initialValues: item?.en || translateInitValue,
    initialValues: translateInitValue,
  });
  const vendorProfileFormikZH = useFormik({
    // initialValues: item?.zh || translateInitValue,
    initialValues: translateInitValue,
  });

  React.useEffect(() => {
    if (roles.length === 0) {
      getRoles();
    }
  }, [roles]);

  const onGeneratePassword = () => {
    const password = generatePassword(12);
    formik.setFieldValue("password", password);
  };
  return (
    <div className="user-form">
      <FormHeader
        breadcrumb={[
          { name: "Home", routerLink: "../" },
          { name: "User List", routerLink: `${lang}/admin/user-list` },
          {
            name: "Update",
            routerLink: `${lang}/admin/user/update`,
          },
        ]}
        title="Update User"
        onCancel={onCancel}
      />

      <div className="form-content">
        <div className="common-info">
          <form encType="multipart/form-data" onSubmit={formik.handleSubmit}>
            <div className="control-avatar">
              <UploadDragger title="Avatar" name="avatar" />
            </div>
            <div className="control-field">
              <div className="form-group">
                <label>Role</label>
                <select
                  name="role"
                  aria-label="Default select example"
                  value={formik.values.role}
                  onChange={formik.handleChange}
                >
                  <option value="">Open this select menu</option>
                  {roles.map((item, index) => (
                    <option key={index} value={item.name}>
                      {item.name}
                    </option>
                  ))}
                </select>
              </div>
              <div className="form-group">
                <label>Name</label>
                <input
                  type="text"
                  name="name"
                  value={formik.values.name}
                  onChange={formik.handleChange}
                />
              </div>
              <div className="form-group">
                <label>Email</label>
                <input
                  type="email"
                  name="email"
                  value={formik.values.email}
                  onChange={formik.handleChange}
                />
              </div>
              <div className="form-group">
                <label>Phone</label>
                <input
                  type="text"
                  name="phone"
                  value={formik.values.phone}
                  onChange={formik.handleChange}
                />
              </div>
              <div className="form-group">
                <label>Username</label>
                <input
                  type="text"
                  name="username"
                  value={formik.values.username}
                  onChange={formik.handleChange}
                />
              </div>
              <div className="form-group">
                <label>Password</label>
                <div className="password-generate">
                  <input
                    type="text"
                    name="password"
                    value={formik.values.password}
                    onChange={formik.handleChange}
                    disabled
                  />
                  <button type="button" onClick={onGeneratePassword}>
                    Generate
                  </button>
                </div>
              </div>
            </div>
          </form>
        </div>
        <div className="translate-role">
          <Phase2UserForm
            role={formik.values.role}
            vendorProfileFormikJP={vendorProfileFormikJP}
            vendorProfileFormikEN={vendorProfileFormikEN}
            vendorProfileFormikTL={vendorProfileFormikTL}
            vendorProfileFormikVI={vendorProfileFormikVI}
            vendorProfileFormikZH={vendorProfileFormikZH}
            commonProfileFormik={commonProfileFormik}
          />
        </div>
      </div>
    </div>
  );
};
