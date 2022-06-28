import { Form } from "antd";
import React from "react";
import {
  LANG_CHINESE,
  LANG_CHINESE_INDEX,
  LANG_ENGLISH,
  LANG_ENGLISH_INDEX,
  LANG_JAPANESE,
  LANG_JAPANESE_INDEX,
  LANG_PHILIPPINES,
  LANG_PHILIPPINES_INDEX,
  LANG_VIETNAMESE,
  LANG_VIETNAMESE_INDEX,
} from "../../../../constants/languages";
import { getTranslateInitValues } from "../user-form/userFormInitValues";

const useHandleVendorForm = (item) => {
  const [vendorProfileFormEN] = Form.useForm();
  const [vendorProfileFormJP] = Form.useForm();
  const [vendorProfileFormTL] = Form.useForm();
  const [vendorProfileFormVI] = Form.useForm();
  const [vendorProfileFormZH] = Form.useForm();
  const enInitValues = getTranslateInitValues(
    item?.vendor_profile?.vendor_translations[LANG_ENGLISH_INDEX],
    LANG_ENGLISH
  );
  const jaInitValues = getTranslateInitValues(
    item?.vendor_profile?.vendor_translations[LANG_JAPANESE_INDEX],
    LANG_JAPANESE
  );
  const tlInitValues = getTranslateInitValues(
    item?.vendor_profile?.vendor_translations[LANG_PHILIPPINES_INDEX],
    LANG_PHILIPPINES
  );
  const viInitValues = getTranslateInitValues(
    item?.vendor_profile?.vendor_translations[LANG_VIETNAMESE_INDEX],
    LANG_VIETNAMESE
  );
  const zhInitValues = getTranslateInitValues(
    item?.vendor_profile?.vendor_translations[LANG_CHINESE_INDEX],
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
