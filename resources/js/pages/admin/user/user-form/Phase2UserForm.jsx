import { Tabs } from "antd";
import React from "react";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";
import BillingShipForm from "../../../../commons/BillingShipForm";
import {
  BILLING_ADDRESS_FORM,
  ROLE_FULL_SUPPORT_PLAN,
  ROLE_LIGHT_PLAN,
  ROLE_VENDOR,
  SHIPPING_ADDRESS_FORM,
  TYPE_FORM_CREATE,
} from "../../../../constants";
import CommonInfoForm from "../user-form/common-form/CommonInfoForm";
import PlanProfileForm from "../user-form/plan-profile-form/PlanProfileForm";
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
  formVendorUpload,
  onChangeImageOutside,
  outSideImageUrl,
  onChangeImageInside,
  insideImageUrl,
}) => {
  const { t } = useTranslation();
  const resCreateUser = useSelector((state) => state.userState.resCreateUser);
  const resUpdateUser = useSelector((state) => state.userState.resCreateUser);

  return (
    <Tabs defaultActiveKey="1" className="switch-tab-form">
      <Tabs.TabPane tab={t("admins.user.switch_tab.address")} key="1">
        <CommonInfoForm className="common-info-form" form={commonAddressForm} />
      </Tabs.TabPane>
      {role === ROLE_VENDOR ||
      role === ROLE_LIGHT_PLAN ||
      role === ROLE_FULL_SUPPORT_PLAN ? (
        <Tabs.TabPane tab={t("admins.user.switch_tab.role_info")} key="2">
          {role === ROLE_VENDOR ? (
            <VendorProfileForm
              className="vendor-profile-form"
              formJP={vendorProfileFormJP}
              formEN={vendorProfileFormEN}
              formTL={vendorProfileFormTL}
              formVI={vendorProfileFormVI}
              formZH={vendorProfileFormZH}
              formUpload={formVendorUpload}
              onChangeImageOutside={onChangeImageOutside}
              outSideImageUrl={outSideImageUrl}
              onChangeImageInside={onChangeImageInside}
              insideImageUrl={insideImageUrl}
            />
          ) : (
            <></>
          )}
          {role === ROLE_LIGHT_PLAN || role === ROLE_FULL_SUPPORT_PLAN ? (
            <PlanProfileForm
              role={role}
              form={planProfileForm}
              className="plan-profile-form"
            />
          ) : (
            <></>
          )}
        </Tabs.TabPane>
      ) : (
        <></>
      )}
      <Tabs.TabPane tab={t("admins.user.switch_tab.billing_address")} key="3">
        <BillingShipForm
          className="billing-ship-form"
          typeForm={BILLING_ADDRESS_FORM}
          form={billingAddressForm}
          response={
            typeForm === TYPE_FORM_CREATE ? resCreateUser : resUpdateUser
          }
        />
      </Tabs.TabPane>
      <Tabs.TabPane tab={t("admins.user.switch_tab.shipping_address")} key="4">
        <BillingShipForm
          className="billing-ship-form"
          typeForm={SHIPPING_ADDRESS_FORM}
          form={shippingAddressForm}
          response={
            typeForm === TYPE_FORM_CREATE ? resCreateUser : resUpdateUser
          }
        />
      </Tabs.TabPane>
    </Tabs>
  );
};

export default Phase2UserForm;
