import React from "react";
import { useTranslation } from "react-i18next";
import { FormInfor } from "../../../components/form-infor";
import { TabLink } from "../../../components/tabs";
import useShowProfile from "../../../hooks/auth/useShowProfile";
import useUpdateShippingAddress from "../../../hooks/auth/useUpdateShippingAddress";
import "./style.scss";
const ShippingAddress = () => {
  const { i18n, t } = useTranslation();
  const { showProfile, profile } = useShowProfile();
  const { updateShippingAddress, resUpdateShippingAddress } =
    useUpdateShippingAddress();
  React.useEffect(() => {
    if (!profile) {
      showProfile();
    }
  }, [profile]);
  const onSave = (values) => {
    updateShippingAddress(values);
  };
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
        <FormInfor
          item={profile}
          onSave={onSave}
          typeForm="shipping"
          response={resUpdateShippingAddress}
        />
      </div>
    </div>
  );
};

export default ShippingAddress;
