import React, { useState } from "react";
import BillingShipForm from "../../../../commons/BillingShipForm";
import CommonInfoForm from "../user-form/common-form/CommonInfoForm";
import SwitchTabUserForm from "./switch-tab/SwitchTabUserForm";
import VendorProfileForm from "./vendor-translate-form/VendorProfileForm";
import PlanProfileForm from "../user-form/plan-profile-form/PlanProfileForm";
const Phase2UserForm = ({
  role,
  vendorProfileFormVI,
  vendorProfileFormJP,
  vendorProfileFormZH,
  vendorProfileFormTL,
  vendorProfileFormEN,
  planProfileForm,
  commonAddressForm,
  billingAddressForm,
  shippingAddressForm,
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
          form={commonAddressForm}
          className={`tab ${activeTab === 1 ? "active" : ""}`}
        />
      </div>

      {role === "vendor" ? (
        <div style={{ width: "80%", margin: "auto" }}>
          <VendorProfileForm
            className={`tab ${activeTab === 2 ? "active" : ""}`}
            formJP={vendorProfileFormJP}
            formEN={vendorProfileFormEN}
            formTL={vendorProfileFormTL}
            formVI={vendorProfileFormVI}
            formZH={vendorProfileFormZH}
          />
        </div>
      ) : (
        <></>
      )}
      {role === "light plan" || role === "full support plan" ? (
        <div style={{ width: "80%", margin: "auto" }}>
          <PlanProfileForm
            className={`tab ${activeTab === 2 ? "active" : ""}`}
            form={planProfileForm}
          />
        </div>
      ) : (
        <></>
      )}
      <div style={{ width: "50%", margin: "auto" }}>
        <BillingShipForm
          className={`tab ${activeTab === 3 ? "active" : ""}`}
          typeForm="billing_address"
          form={billingAddressForm}
        />
      </div>
      <div style={{ width: "50%", margin: "auto" }}>
        <BillingShipForm
          className={`tab ${activeTab === 4 ? "active" : ""}`}
          typeForm="shipping_address"
          form={shippingAddressForm}
        />
      </div>
    </SwitchTabUserForm>
  );
};

export default Phase2UserForm;
