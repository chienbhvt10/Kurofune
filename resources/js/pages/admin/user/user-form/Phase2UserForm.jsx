import React from "react";
import { useSelector } from "react-redux";
import BillingShipForm from "../../../../commons/BillingShipForm";
import {
  BILLING_ADDRESS_FORM,
  FIRST_TAB,
  FOURTH_TAB,
  ROLE_FULL_SUPPORT_PLAN,
  ROLE_LIGHT_PLAN,
  ROLE_VENDOR,
  SECOND_TAB,
  SHIPPING_ADDRESS_FORM,
  THIRD_TAB,
  TYPE_FORM_CREATE,
} from "../../../../constants";
import CommonInfoForm from "../user-form/common-form/CommonInfoForm";
import PlanProfileForm from "../user-form/plan-profile-form/PlanProfileForm";
import SwitchTabUserForm from "./switch-tab/SwitchTabUserForm";
import VendorProfileForm from "./vendor-translate-form/VendorProfileForm";
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
  const [activeTab, setActiveTab] = React.useState(FIRST_TAB);
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
          className={`tab ${activeTab === FIRST_TAB ? "active" : ""}`}
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
            className={`tab ${activeTab === SECOND_TAB ? "active" : ""}`}
            form={planProfileForm}
          />
        </div>
      ) : (
        <></>
      )}
      <div style={{ width: "50%", margin: "auto" }}>
        <BillingShipForm
          className={`tab ${activeTab === THIRD_TAB ? "active" : ""}`}
          typeForm={BILLING_ADDRESS_FORM}
          form={billingAddressForm}
          response={
            typeForm === TYPE_FORM_CREATE ? resCreateUser : resUpdateUser
          }
        />
      </div>
      <div style={{ width: "50%", margin: "auto" }}>
        <BillingShipForm
          className={`tab ${activeTab === FOURTH_TAB ? "active" : ""}`}
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
