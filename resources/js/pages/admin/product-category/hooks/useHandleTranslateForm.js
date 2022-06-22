import React from "react";
import { Form } from "antd";
import { getTranslateCategoryInitValues } from "../category-form/categoryInitValues";
import {
  LANG_CHINESE,
  LANG_ENGLISH,
  LANG_JAPANESE,
  LANG_PHILIPPINES,
  LANG_VIETNAMESE,
} from "../../../../constants";

const useHandleTranslateForm = (item) => {
  const [categoryProfileFormEN] = Form.useForm();
  const [categoryProfileFormJP] = Form.useForm();
  const [categoryProfileFormTL] = Form.useForm();
  const [categoryProfileFormVI] = Form.useForm();
  const [categoryProfileFormZH] = Form.useForm();

  const enInitValues = getTranslateCategoryInitValues(
    item?.translations[0],
    LANG_ENGLISH
  );
  const jaInitValues = getTranslateCategoryInitValues(
    item?.translations[1],
    LANG_JAPANESE
  );
  const tlInitValues = getTranslateCategoryInitValues(
    item?.translations[2],
    LANG_PHILIPPINES
  );
  const viInitValues = getTranslateCategoryInitValues(
    item?.translations[3],
    LANG_VIETNAMESE
  );
  const zhInitValues = getTranslateCategoryInitValues(
    item?.translations[4],
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
  };
};

export default useHandleTranslateForm;
