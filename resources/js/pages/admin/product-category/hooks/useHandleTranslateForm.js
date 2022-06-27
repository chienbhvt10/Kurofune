import React from "react";
import { Form } from "antd";
import { getTranslateCategoryInitValues } from "../category-form/categoryInitValues";
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

const useHandleTranslateForm = (item) => {
  const [categoryProfileFormEN] = Form.useForm();
  const [categoryProfileFormJP] = Form.useForm();
  const [categoryProfileFormTL] = Form.useForm();
  const [categoryProfileFormVI] = Form.useForm();
  const [categoryProfileFormZH] = Form.useForm();
  const validateTranslateForm = () => {
    categoryProfileFormJP.validateFields();
    categoryProfileFormVI.validateFields();
    categoryProfileFormTL.validateFields();
    categoryProfileFormZH.validateFields();
    categoryProfileFormEN.validateFields();
  };

  const enInitValues = getTranslateCategoryInitValues(
    item?.translations[LANG_ENGLISH_INDEX],
    LANG_ENGLISH
  );
  const jaInitValues = getTranslateCategoryInitValues(
    item?.translations[LANG_JAPANESE_INDEX],
    LANG_JAPANESE
  );
  const tlInitValues = getTranslateCategoryInitValues(
    item?.translations[LANG_PHILIPPINES_INDEX],
    LANG_PHILIPPINES
  );
  const viInitValues = getTranslateCategoryInitValues(
    item?.translations[LANG_VIETNAMESE_INDEX],
    LANG_VIETNAMESE
  );
  const zhInitValues = getTranslateCategoryInitValues(
    item?.translations[LANG_CHINESE_INDEX],
    LANG_CHINESE
  );

  React.useEffect(() => {
    if (item) {
      categoryProfileFormEN.setFieldsValue(enInitValues);
      categoryProfileFormJP.setFieldsValue(jaInitValues);
      categoryProfileFormTL.setFieldsValue(tlInitValues);
      categoryProfileFormVI.setFieldsValue(viInitValues);
      categoryProfileFormZH.setFieldsValue(zhInitValues);
    }
  }, [item]);

  return {
    categoryProfileFormEN,
    categoryProfileFormJP,
    categoryProfileFormTL,
    categoryProfileFormVI,
    categoryProfileFormZH,
    validateTranslateForm,
  };
};

export default useHandleTranslateForm;
