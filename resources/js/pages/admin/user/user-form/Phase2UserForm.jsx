import React from "react";
import { useSelector } from "react-redux";
import BillingShipForm from "../../../../commons/BillingShipForm";
import {
  BILLING_ADDRESS_FORM,
  FIRST_TAB,
  FOURTH_TAB,
  ROLE_VENDOR,
  SECOND_TAB,
  SHIPPING_ADDRESS_FORM,
  THIRD_TAB,
  TYPE_FORM_CREATE,
} from "../../../../constants";
import {
  isRoleMember,
  isRolePlan,
  isRoleVendor,
} from "../../../../helper/checker";
import CommonInfoForm from "../user-form/common-form/CommonInfoForm";
import PlanProfileForm from "../user-form/plan-profile-form/PlanProfileForm";
import SwitchTabUserForm from "./switch-tab";
import VendorProfileForm from "./vendor-translate-form/VendorProfileForm";
const Phase2UserForm = (props) => {
  const {
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
    onChangeImageOutside,
    outSideImageUrl,
    onChangeImageInside,
    insideImageUrl,
    onSaveImgInsideDelete,
    onSaveImgOutsideDelete,
  } = props;
  const [activeTab, setActiveTab] = React.useState(FIRST_TAB);
  const { resCreateUser, resUpdateUser } = useSelector(
    (state) => state.userState
  );

  const onChangeForm = (number) => {
    setActiveTab(number);
  };

  return (
    <SwitchTabUserForm
      role={role}
      onChangeForm={onChangeForm}
      activeTab={activeTab}
    >
      <CommonInfoForm
        className={`common-info-form tab ${
          activeTab === FIRST_TAB ? "active" : ""
        }`}
        form={commonAddressForm}
        typeForm={typeForm}
      />

      {isRoleMember(role) && (
        <>
          {isRoleVendor(role) && (
            <VendorProfileForm
              className={`vendor-profile-form tab ${
                activeTab === SECOND_TAB ? "active" : ""
              }`}
              formJP={vendorProfileFormJP}
              formEN={vendorProfileFormEN}
              formTL={vendorProfileFormTL}
              formVI={vendorProfileFormVI}
              formZH={vendorProfileFormZH}
              onChangeImageOutside={onChangeImageOutside}
              outSideImageUrl={outSideImageUrl}
              onChangeImageInside={onChangeImageInside}
              insideImageUrl={insideImageUrl}
              onSaveImgInsideDelete={onSaveImgInsideDelete}
              onSaveImgOutsideDelete={onSaveImgOutsideDelete}
            />
          )}
          {isRolePlan(role) && (
            <PlanProfileForm
              role={role}
              form={planProfileForm}
              className={`plan-profile-form tab ${
                activeTab === SECOND_TAB ? "active" : ""
              }`}
            />
          )}
        </>
      )}

      {!isRoleVendor(role) && (
        <>
          <BillingShipForm
            className={`billing-ship-form tab ${
              activeTab === THIRD_TAB ? "active" : ""
            }`}
            typeForm={BILLING_ADDRESS_FORM}
            form={billingAddressForm}
            response={
              typeForm === TYPE_FORM_CREATE ? resCreateUser : resUpdateUser
            }
          />

          <BillingShipForm
            className={`billing-ship-form tab ${
              activeTab === FOURTH_TAB ? "active" : ""
            }`}
            typeForm={SHIPPING_ADDRESS_FORM}
            form={shippingAddressForm}
            response={
              typeForm === TYPE_FORM_CREATE ? resCreateUser : resUpdateUser
            }
          />
        </>
      )}
    </SwitchTabUserForm>
  );
};

export default Phase2UserForm;
