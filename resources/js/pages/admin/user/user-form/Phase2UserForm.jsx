import React, { useState } from "react";
import BillingShipForm from "../../../../commons/BillingShipForm";
import CommonInfoForm from "../user-form/common-form/CommonInfoForm";
import SwitchTabUserForm from "./switch-tab/SwitchTabUserForm";
import VendorProfileForm from "./vendor-translate-form/VendorProfileForm";
import PlanProfileForm from "../user-form/plan-profile-form/PlanProfileForm";
import { useSelector } from "react-redux";
import {
  BILLING_ADDRESS_FORM,
  ROLE_FULL_SUPPORT_PLAN,
  ROLE_LIGHT_PLAN,
  ROLE_VENDOR,
  SHIPPING_ADDRESS_FORM,
  TYPE_FORM_CREATE,
} from "../../../../constants";
const Phase2UserForm = ({
  role,
  typeForm,
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
  const resCreateUser = useSelector((state) => state.userState.resCreateUser);
  const resUpdateUser = useSelector((state) => state.userState.resCreateUser);

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

      {role === ROLE_VENDOR ? (
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
      {role === ROLE_LIGHT_PLAN || role === ROLE_FULL_SUPPORT_PLAN ? (
        <div style={{ width: "80%", margin: "auto" }}>
          <PlanProfileForm
            role={role}
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
          typeForm={BILLING_ADDRESS_FORM}
          form={billingAddressForm}
          response={
            typeForm === TYPE_FORM_CREATE ? resCreateUser : resUpdateUser
          }
        />
      </div>
      <div style={{ width: "50%", margin: "auto" }}>
        <BillingShipForm
          className={`tab ${activeTab === 4 ? "active" : ""}`}
          typeForm={SHIPPING_ADDRESS_FORM}
          form={shippingAddressForm}
          response={
            typeForm === TYPE_FORM_CREATE ? resCreateUser : resUpdateUser
          }
        />
      </div>
    </SwitchTabUserForm>
  );
};

export default Phase2UserForm;
