import React from "react";
import { FormInfor } from "../../../components/form-infor";
import { TabLink } from "../../../components/tabs";
import "./style.scss";
const BillingAddress = () => {
  return (
    <div id="BillingAddress">
      <TabLink
        infoTabs={[
          { title: "請求先情報", routerLink: "/member/billing-address" },
          { title: "お届け先情報", routerLink: "/member/shipping-address" },
        ]}
      />
      <div className="content-tab">
      <FormInfor />
      </div>
    </div>
  );
};

export default BillingAddress;
