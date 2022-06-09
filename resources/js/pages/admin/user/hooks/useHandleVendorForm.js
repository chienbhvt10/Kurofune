import { Form } from "antd";
import React from "react";
import { getTranslateInitValues } from "../user-form/userFormInitValues";

const useHandleVendorForm = (item) => {
  const [vendorProfileFormEN] = Form.useForm();
  const [vendorProfileFormJP] = Form.useForm();
  const [vendorProfileFormTL] = Form.useForm();
  const [vendorProfileFormVI] = Form.useForm();
  const [vendorProfileFormZH] = Form.useForm();
  const translateInitValues = getTranslateInitValues();

  React.useEffect(() => {
    vendorProfileFormEN.setFieldsValue(
      item?.vendor_profile?.vendor_translations[0] || translateInitValues
    );
    vendorProfileFormJP.setFieldsValue(
      item?.vendor_profile?.vendor_translations[1] || translateInitValues
    );
    vendorProfileFormTL.setFieldsValue(
      item?.vendor_profile?.vendor_translations[2] || translateInitValues
    );
    vendorProfileFormVI.setFieldsValue(
      item?.vendor_profile?.vendor_translations[3] || translateInitValues
    );
    vendorProfileFormZH.setFieldsValue(
      item?.vendor_profile?.vendor_translations[4] || translateInitValues
    );
  }, [item]);

  return {
    vendorProfileFormEN,
    vendorProfileFormJP,
    vendorProfileFormTL,
    vendorProfileFormVI,
    vendorProfileFormZH,
  };
};

export default useHandleVendorForm;
