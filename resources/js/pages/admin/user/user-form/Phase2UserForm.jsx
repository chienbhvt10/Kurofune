import { Tabs } from "antd";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";
import BillingShipForm from "../../../../commons/BillingShipForm";
import {
  BILLING_ADDRESS_FORM,
  ROLE_VENDOR,
  SHIPPING_ADDRESS_FORM,
  TYPE_FORM_CREATE,
} from "../../../../constants";
import {
  isRoleMember,
  isRolePlan,
  isRoleVendor,
} from "../../../../helper/checker";
import CommonInfoForm from "../user-form/common-form/CommonInfoForm";
import PlanProfileForm from "../user-form/plan-profile-form/PlanProfileForm";
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
  const { t } = useTranslation();
  const { resCreateUser, resUpdateUser } = useSelector(
    (state) => state.userState
  );

  return (
    <Tabs defaultActiveKey="1" className="switch-tab-form">
      <Tabs.TabPane tab={t("admins.user.switch_tab.address")} key="1">
        <CommonInfoForm
          className="common-info-form"
          form={commonAddressForm}
          typeForm={typeForm}
        />
      </Tabs.TabPane>
      {isRoleMember(role) ? (
        <Tabs.TabPane tab={t("admins.user.switch_tab.role_info")} key="2">
          {role === ROLE_VENDOR ? (
            <VendorProfileForm
              className="vendor-profile-form"
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
          ) : (
            <></>
          )}
          {isRolePlan(role) ? (
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
      {!isRoleVendor(role) && (
        <>
          <Tabs.TabPane
            tab={t("admins.user.switch_tab.billing_address")}
            key="3"
          >
            <BillingShipForm
              className="billing-ship-form"
              typeForm={BILLING_ADDRESS_FORM}
              form={billingAddressForm}
              response={
                typeForm === TYPE_FORM_CREATE ? resCreateUser : resUpdateUser
              }
            />
          </Tabs.TabPane>
          <Tabs.TabPane
            tab={t("admins.user.switch_tab.shipping_address")}
            key="4"
          >
            <BillingShipForm
              className="billing-ship-form"
              typeForm={SHIPPING_ADDRESS_FORM}
              form={shippingAddressForm}
              response={
                typeForm === TYPE_FORM_CREATE ? resCreateUser : resUpdateUser
              }
            />
          </Tabs.TabPane>
        </>
      )}
    </Tabs>
  );
};

export default Phase2UserForm;
