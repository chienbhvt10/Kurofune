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
import { getTranslateInitValues } from "../product-form/productInitValues";

const useHandleTranslateForm = (item) => {
  const [productProfileFormEN] = Form.useForm();
  const [productProfileFormJP] = Form.useForm();
  const [productProfileFormTL] = Form.useForm();
  const [productProfileFormVI] = Form.useForm();
  const [productProfileFormZH] = Form.useForm();

  const enInitValues = getTranslateInitValues(
    item?.translations[LANG_ENGLISH_INDEX],
    LANG_ENGLISH
  );

  const jaInitValues = getTranslateInitValues(
    item?.translations[LANG_JAPANESE_INDEX],
    LANG_JAPANESE
  );

  const tlInitValues = getTranslateInitValues(
    item?.translations[LANG_PHILIPPINES_INDEX],
    LANG_PHILIPPINES
  );

  const viInitValues = getTranslateInitValues(
    item?.translations[LANG_VIETNAMESE_INDEX],
    LANG_VIETNAMESE
  );

  const zhInitValues = getTranslateInitValues(
    item?.translations[LANG_CHINESE_INDEX],
    LANG_CHINESE
  );

  const validateTranslateForm = () => {
    productProfileFormEN.validateFields();
    productProfileFormJP.validateFields();
    productProfileFormTL.validateFields();
    productProfileFormVI.validateFields();
    productProfileFormZH.validateFields();
  };

  React.useEffect(() => {
    if (item) {
      productProfileFormEN.setFieldsValue(enInitValues);
      productProfileFormJP.setFieldsValue(jaInitValues);
      productProfileFormTL.setFieldsValue(tlInitValues);
      productProfileFormVI.setFieldsValue(viInitValues);
      productProfileFormZH.setFieldsValue(zhInitValues);
    }
  }, [item]);

  return {
    productProfileFormEN,
    productProfileFormJP,
    productProfileFormTL,
    productProfileFormZH,
    productProfileFormVI,
    validateTranslateForm,
  };
};

export default useHandleTranslateForm;
