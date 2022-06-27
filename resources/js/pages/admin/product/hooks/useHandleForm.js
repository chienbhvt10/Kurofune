import React from "react";
import useHandleTranslateForm from "./useHandleTranslateForm";
import useHandleImage from "./useHandleImage";
import { Form } from "antd";
import { TYPE_FORM_UPDATE } from "../../../../constants";
import { getCurrentLanguage } from "../../../../helper/localStorage";
import { getProductInfoInitValues } from "../product-form/productInitValues";
import {
  appendArrayToFormData,
  appendObjectToFormData,
  getResultValidate,
} from "../../../../helper/handler";
const useHandleForm = (item, onSave, typeForm) => {
  const {
    productProfileFormEN,
    productProfileFormJP,
    productProfileFormTL,
    productProfileFormVI,
    productProfileFormZH,
    validateTranslateForm,
  } = useHandleTranslateForm(item);

  const { avatar, onChangeAvatar } = useHandleImage();
  const lang = getCurrentLanguage();
  const [isFormSubmitted, setIsFormSubmitted] = React.useState(false);
  const initialFormCommonValues = getProductInfoInitValues(item);
  const [productsForm] = Form.useForm();

  const onFinishAll = async () => {
    const formData = new FormData();
    const enFormValues = await getResultValidate(productProfileFormEN);
    const jaFormValues = await getResultValidate(productProfileFormJP);
    const tlFormValues = await getResultValidate(productProfileFormTL);
    const viFormValues = await getResultValidate(productProfileFormVI);
    const zhFormValues = await getResultValidate(productProfileFormZH);

    if (typeForm === TYPE_FORM_UPDATE) {
      formData.append("_method", "PUT");
    }

    if (
      enFormValues.errorFields ||
      jaFormValues.errorFields ||
      tlFormValues.errorFields ||
      viFormValues.errorFields ||
      zhFormValues.errorFields
    ) {
      return;
    } else {
      const submitInput = {
        id: initialFormCommonValues.id,
        product_image: avatar,
        tax_id: Number(initialFormCommonValues.tax_id),
        price: Number(initialFormCommonValues.price),
        ...productsForm.getFieldsValue(),
      };
      delete submitInput.cat_id;

      appendArrayToFormData(
        formData,
        "cat_id",
        productsForm.getFieldValue("cat_id")
      );

      appendObjectToFormData(formData, submitInput);
      appendObjectToFormData(formData, enFormValues);
      appendObjectToFormData(formData, jaFormValues);
      appendObjectToFormData(formData, tlFormValues);
      appendObjectToFormData(formData, viFormValues);
      appendObjectToFormData(formData, zhFormValues);

      validateTranslateForm();
      onSave(formData);
    }
  };

  const onFinishFailed = () => {
    validateTranslateForm();
    productsForm.validateFields();
    setIsFormSubmitted(true);
  };

  React.useEffect(() => {
    productsForm.setFieldsValue(initialFormCommonValues);
  }, [item]);

  React.useEffect(() => {
    if (isFormSubmitted) {
      validateTranslateForm();
      productsForm.validateFields();
    }
  }, [lang]);

  return {
    productProfileFormEN,
    productProfileFormJP,
    productProfileFormTL,
    productProfileFormVI,
    productsForm,
    productProfileFormZH,
    onFinishAll,
    onFinishFailed,
    onChangeAvatar,
    initialFormCommonValues,
  };
};

export default useHandleForm;
