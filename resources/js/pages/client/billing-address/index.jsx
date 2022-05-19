import React from "react";
import { useTranslation } from "react-i18next";
import { FormInfor } from "../../../components/form-infor";
import { TabLink } from "../../../components/tabs";
import useShowProfile from "../../../hooks/auth/useShowProfile";
import useUpdateBillingAddress from "../../../hooks/auth/useUpdateBillingAddress";
import "./style.scss";

const BillingAddress = () => {
  const { i18n, t } = useTranslation();
  const { showProfile, profile } = useShowProfile();
  const { updateBillingAddress, resUpdateBillingAddress } =
    useUpdateBillingAddress();
  React.useEffect(() => {
    if (!profile) {
      showProfile();
    }
  }, [profile]);

  const onSave = async (values) => {
    await updateBillingAddress(values);
  };

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
        <FormInfor
          item={profile}
          onSave={onSave}
          typeForm="billing"
          response={resUpdateBillingAddress}
        />
      </div>
    </div>
  );
};

export default BillingAddress;
