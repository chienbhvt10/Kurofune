import React from "react";
import { useTranslation } from "react-i18next";
import PageHead from "../../../commons/PageHead";
import { FormInfo } from "../../../components/form-infor";
import { TabLink } from "../../../components/tabs";
import { BILLING_INFO_FORM } from "../../../constants";
import useShowProfile from "../../../hooks/auth/useShowProfile";
import useUpdateBillingAddress from "../../../hooks/auth/useUpdateBillingAddress";
import "./style.scss";

const BillingAddress = () => {
  const { t } = useTranslation();
  const { profile } = useShowProfile();
  const {
    updateBillingAddress,
    resUpdateBillingAddress,
    loadingUpdateBilling,
  } = useUpdateBillingAddress();


  const onSave = (values) => {
    updateBillingAddress(values);
  };

  return (
    <div id="BillingAddress">
      <PageHead
        title={t("meta.title_billing_address")}
        content={t("meta.content_billing_address")}
      />
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
        <FormInfo
          loading={loadingUpdateBilling}
          item={profile}
          onSave={onSave}
          typeForm={BILLING_INFO_FORM}
          response={resUpdateBillingAddress}
        />
      </div>
    </div>
  );
};;

export default BillingAddress;
