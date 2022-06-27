import { Form } from "antd";
import React from "react";
import { TYPE_FORM_UPDATE } from "../../../../constants";
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
  const {
    avatar,
    onChangeAvatar,
    errorMessImage,
    setErrorMessImage,
    avatarUrl,
    setAvatarUrl,
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

    if (typeForm === TYPE_FORM_UPDATE) {
      formData.append("_method", "PUT");
    }

    setErrorMessImage(!avatar && !avatarUrl);

    if (
      enFormValues.errorFields ||
      jaFormValues.errorFields ||
      tlFormValues.errorFields ||
      viFormValues.errorFields ||
      zhFormValues.errorFields ||
      (!avatar && !avatarUrl)
    ) {
      return;
    } else {
      let submitValues = {
        id: initialCommonValues.id,
        category_image: avatar,
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
    setErrorMessImage(!avatar);
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
    categoryProfileFormEN,
    categoryProfileFormJP,
    categoryProfileFormTL,
    categoryProfileFormVI,
    categoryProfileFormZH,
    onChangeAvatar,
    onFinishAll,
    onFinishError,
    setAvatarUrl,
    initialCommonValues,
    errorMessImage,
  };
};

export default useHandleForm;
