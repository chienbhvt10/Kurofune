import React from "react";
import { useTranslation } from "react-i18next";
import { FormInfor } from "../../../components/form-infor";
import { TabLink } from "../../../components/tabs";
import "./style.scss";
const ShippingAddress = () => {
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
  const submitShippingAddress = (value) => {};
  return (
    <div id="ShippingAddress">
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
        <FormInfor item={item} onSubmit={submitShippingAddress} />
      </div>
    </div>
  );
};

export default ShippingAddress;
