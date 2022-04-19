import React from "react";
import { useTranslation } from "react-i18next";
import { FormInfor } from "../../../components/form-infor";
import { TabLink } from "../../../components/tabs";
import "./style.scss";
const BillingAddress = () => {
  const {i18n,t}= useTranslation();
  return (
    <div id="BillingAddress">
      <TabLink
        infoTabs={[
          { title: `${t('tab_address.tab_bill')}`, routerLink: "/member/billing-address" },
          { title: `${t('tab_address.tab_ship')}`, routerLink: "/member/shipping-address" },
        ]}
      />
      <div className="content-tab">
      <FormInfor />
      </div>
    </div>
  );
};

export default BillingAddress;
