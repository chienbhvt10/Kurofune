import { Form } from "antd";
import React from "react";
import {
  FIFTH_TAB,
  FOURTH_TAB,
  SECOND_TAB,
  THIRD_TAB,
  FIRST_TAB,
  TYPE_FORM_UPDATE,
} from "../../../../constants";
import {
  appendObjectToFormData,
  getResultValidate,
} from "../../../../helper/handler";
import { getCurrentLanguage } from "../../../../helper/localStorage";
import { getCategoryInitValues } from "../category-form/categoryInitValues";
import useHandleImage from "./useHandleImage";
import useHandleTranslateForm from "./useHandleTranslateForm";

const useHandleForm = (item, onSave, typeForm) => {
  const [isSubmitted, setSubmitted] = React.useState(false);
  const [categoryForm] = Form.useForm();
  const lang = getCurrentLanguage();
  const initialCommonValues = getCategoryInitValues(item);
  const [tabRequired, setTabRequired] = React.useState("");
  const {
    avatar,
    avatarUrl,
    isRemoveImage,
    onChangeAvatar,
    setAvatarUrl,
    setIsRemoveImage,
  } = useHandleImage(item);

  const {
    categoryProfileFormEN,
    categoryProfileFormJP,
    categoryProfileFormTL,
    categoryProfileFormVI,
    categoryProfileFormZH,
    validateTranslateForm,
  } = useHandleTranslateForm(item);

  const onFinishAll = async () => {
    const formData = new FormData();
    const enFormValues = await getResultValidate(categoryProfileFormEN);
    const jaFormValues = await getResultValidate(categoryProfileFormJP);
    const tlFormValues = await getResultValidate(categoryProfileFormTL);
    const viFormValues = await getResultValidate(categoryProfileFormVI);
    const zhFormValues = await getResultValidate(categoryProfileFormZH);

    if (enFormValues.errorFields) {
      setTabRequired(FIRST_TAB);
    } else if (jaFormValues.errorFields) {
      setTabRequired(SECOND_TAB);
    } else if (tlFormValues.errorFields) {
      setTabRequired(THIRD_TAB);
    } else if (viFormValues.errorFields) {
      setTabRequired(FOURTH_TAB);
    } else if (zhFormValues.errorFields) {
      setTabRequired(FIFTH_TAB);
    }

    if (typeForm === TYPE_FORM_UPDATE) {
      formData.append("_method", "PUT");
    }

    const isErrorValidate =
      enFormValues.errorFields ||
      jaFormValues.errorFields ||
      tlFormValues.errorFields ||
      viFormValues.errorFields ||
      zhFormValues.errorFields;

    if (isErrorValidate) {
      return;
    } else {
      let submitValues = {
        id: initialCommonValues.id,
        category_image: avatar,
        delete_image: isRemoveImage,
        ...categoryForm.getFieldsValue(),
      };

      appendObjectToFormData(formData, submitValues);
      appendObjectToFormData(formData, enFormValues);
      appendObjectToFormData(formData, jaFormValues);
      appendObjectToFormData(formData, tlFormValues);
      appendObjectToFormData(formData, viFormValues);
      appendObjectToFormData(formData, zhFormValues);
      onSave(formData);
    }
    setSubmitted(true);
  };

  const onFinishError = () => {
    validateTranslateForm();
    setSubmitted(true);
  };

  React.useEffect(() => {
    categoryForm.setFieldsValue(initialCommonValues);
  }, [item]);

  React.useEffect(() => {
    if (isSubmitted) {
      categoryForm.validateFields();
      validateTranslateForm();
    }
  }, [lang]);

  return {
    avatarUrl,
    categoryForm,
    initialCommonValues,
    categoryProfileFormEN,
    categoryProfileFormJP,
    categoryProfileFormTL,
    categoryProfileFormVI,
    categoryProfileFormZH,
    tabRequired,
    onChangeAvatar,
    onFinishAll,
    onFinishError,
    setAvatarUrl,
    setIsRemoveImage,
  };
};

export default useHandleForm;
