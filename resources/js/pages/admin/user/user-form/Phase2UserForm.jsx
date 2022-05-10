import React, { useState } from "react";
import SwitchTabUserForm from "./switch-tab/SwitchTabUserForm";
import CommonInfoForm from "../user-form/common-form/CommonInfoForm";
import BillingShipAddress from "../../../../commons/BillingShipAddress";
import BillingShipForm from "../../../../commons/BillingShipForm";
import VendorProfileForm from "./vendor-translate-form/VendorProfileForm";
import PlanProfileForm from "./plan-profile-form/PlanProfileForm";
const Phase2UserForm = ({
  role,
  vendorProfileFormikVI,
  vendorProfileFormikJP,
  vendorProfileFormikZH,
  vendorProfileFormikTL,
  vendorProfileFormikEN,
  commonProfileFormik,
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
        <CommonInfoForm className={`tab ${activeTab === 1 ? "active" : ""}`} />
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
          formik={commonProfileFormik}
        />
      ) : (
        <></>
      )}
      <div style={{ width: "50%", margin: "auto" }}>
        <BillingShipForm
          className={`tab ${activeTab === 3 ? "active" : ""}`}
          typeForm="BILLING"
        />
      </div>
      <div style={{ width: "50%", margin: "auto" }}>
        <BillingShipForm
          className={`tab ${activeTab === 4 ? "active" : ""}`}
          typeForm="SHIPPING"
        />
      </div>
    </SwitchTabUserForm>
  );
};

export default Phase2UserForm;
