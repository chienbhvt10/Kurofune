import { Form } from "antd";
import React from "react";
import {
  LANG_CHINESE,
  LANG_ENGLISH,
  LANG_JAPANESE,
  LANG_PHILIPPINES,
  LANG_VIETNAMESE,
} from "../../../../constants";
import { getTranslateInitValues } from "../user-form/userFormInitValues";

const useHandleVendorForm = (item) => {
  const [vendorProfileFormEN] = Form.useForm();
  const [vendorProfileFormJP] = Form.useForm();
  const [vendorProfileFormTL] = Form.useForm();
  const [vendorProfileFormVI] = Form.useForm();
  const [vendorProfileFormZH] = Form.useForm();
  const enInitValues = getTranslateInitValues(
    item?.vendor_profile?.vendor_translations[0],
    LANG_ENGLISH
  );
  const jaInitValues = getTranslateInitValues(
    item?.vendor_profile?.vendor_translations[1],
    LANG_JAPANESE
  );
  const tlInitValues = getTranslateInitValues(
    item?.vendor_profile?.vendor_translations[2],
    LANG_PHILIPPINES
  );
  const viInitValues = getTranslateInitValues(
    item?.vendor_profile?.vendor_translations[3],
    LANG_VIETNAMESE
  );
  const zhInitValues = getTranslateInitValues(
    item?.vendor_profile?.vendor_translations[4],
    LANG_CHINESE
  );

  React.useEffect(() => {
    vendorProfileFormEN.setFieldsValue(enInitValues);
    vendorProfileFormJP.setFieldsValue(jaInitValues);
    vendorProfileFormTL.setFieldsValue(tlInitValues);
    vendorProfileFormVI.setFieldsValue(viInitValues);
    vendorProfileFormZH.setFieldsValue(zhInitValues);
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
