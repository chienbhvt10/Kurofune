import React from "react";
import { useTranslation } from "react-i18next";
import { FormInfor } from "../../../components/form-infor";
import { TabLink } from "../../../components/tabs";
import "./style.scss";
const BillingAddress = () => {
  const { i18n, t } = useTranslation();
  const [item, setItem] = React.useState({
    fullName: "",
    toPostalCode: "",
    fromPostalCode: "",
    prefecture: "",
    city: "",
    street: "",
    building: "",
    phone: "",
    email: "",
  });
  const submitBillingAddress = (value) => {};
  return (
    <div id="BillingAddress">
      <TabLink
        infoTabs={[
          {
            title: `${t("tab_address.tab_bill")}`,
            routerLink: "/member/billing-address",
          },
          {
            title: `${t("tab_address.tab_ship")}`,
            routerLink: "/member/shipping-address",
          },
        ]}
      />
      <div className="content-tab">
        <FormInfor item={item} onSubmit={submitBillingAddress} />
      </div>
    </div>
  );
};

export default BillingAddress;
