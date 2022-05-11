import React, { useState } from "react";
import BillingShipForm from "../../../../commons/BillingShipForm";
import CommonInfoForm from "../user-form/common-form/CommonInfoForm";
import SwitchTabUserForm from "./switch-tab/SwitchTabUserForm";
import VendorProfileForm from "./vendor-translate-form/VendorProfileForm";
import PlanProfileForm from "../user-form/plan-profile-form/PlanProfileForm";
const Phase2UserForm = ({
  role,
  vendorProfileFormikVI,
  vendorProfileFormikJP,
  vendorProfileFormikZH,
  vendorProfileFormikTL,
  vendorProfileFormikEN,
  planProfileFormik,
  commonAddressFormik,
  billingAddressFormik,
  shippingAddressFormik,
}) => {
  const [activeTab, setActiveTab] = useState(1);
  const onChangeForm = (number) => {
    setActiveTab(number);
  };
  return (
    <SwitchTabUserForm
      role={role}
      onChangeForm={onChangeForm}
      activeTab={activeTab}
    >
      <div style={{ width: "50%", margin: "auto" }}>
        <CommonInfoForm
          formik={commonAddressFormik}
          className={`tab ${activeTab === 1 ? "active" : ""}`}
        />
      </div>

      {role === "vendor" ? (
        <VendorProfileForm
          className={`tab ${activeTab === 2 ? "active" : ""}`}
          formikJP={vendorProfileFormikJP}
          formikEN={vendorProfileFormikEN}
          formikTL={vendorProfileFormikTL}
          formikVI={vendorProfileFormikVI}
          formikZH={vendorProfileFormikZH}
        />
      ) : (
        <></>
      )}
      {role === "light plan" || role === "full support plan" ? (
        <PlanProfileForm
          className={`tab ${activeTab === 2 ? "active" : ""}`}
          formik={planProfileFormik}
        />
      ) : (
        <></>
      )}
      <div style={{ width: "50%", margin: "auto" }}>
        <BillingShipForm
          className={`tab ${activeTab === 3 ? "active" : ""}`}
          typeForm="billing"
          formik={billingAddressFormik}
        />
      </div>
      <div style={{ width: "50%", margin: "auto" }}>
        <BillingShipForm
          className={`tab ${activeTab === 4 ? "active" : ""}`}
          typeForm="shipping"
          formik={shippingAddressFormik}
        />
      </div>
    </SwitchTabUserForm>
  );
};

export default Phase2UserForm;
