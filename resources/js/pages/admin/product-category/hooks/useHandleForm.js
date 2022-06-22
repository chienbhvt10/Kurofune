import { Form } from "antd";
import React from "react";
import { TYPE_FORM_UPDATE } from "../../../../constants";
import { appendObjectToFormData } from "../../../../helper/handler";
import { getCategoryInitValues } from "../category-form/categoryInitValues";
import useHandleImage from "./useHandleImage";
import useHandleTranslateForm from "./useHandleTranslateForm";

const useHandleForm = (item, onSave, typeForm) => {
  const formData = new FormData();
  const {
    categoryProfileFormEN,
    categoryProfileFormJP,
    categoryProfileFormTL,
    categoryProfileFormVI,
    categoryProfileFormZH,
  } = useHandleTranslateForm(item);

  const { avatar, onChangeAvatar, errorMessImage, setErrorMessImage } =
    useHandleImage();

  const initialCommonValues = getCategoryInitValues(item);
  const [categoryForm] = Form.useForm();

  const onFinishAll = () => {
    let submitValues = {
      id: initialCommonValues.id,
      category_image: avatar,
    };
    appendObjectToFormData(formData, categoryForm.getFieldsValue());
    appendObjectToFormData(formData, categoryProfileFormEN.getFieldsValue());
    appendObjectToFormData(formData, categoryProfileFormJP.getFieldsValue());
    appendObjectToFormData(formData, categoryProfileFormTL.getFieldsValue());
    appendObjectToFormData(formData, categoryProfileFormVI.getFieldsValue());
    appendObjectToFormData(formData, categoryProfileFormZH.getFieldsValue());

    if (!avatar) {
      delete submitValues.category_image;
    }

    if (typeForm === TYPE_FORM_UPDATE) {
      setErrorMessImage("");
      formData.append("_method", "PUT");
    } else {
      setErrorMessImage(!avatar);
    }

    appendObjectToFormData(formData, submitValues);
    onSave(formData);
  };

  const onFinishError = () => {
    categoryProfileFormJP.validateFields();
    categoryProfileFormVI.validateFields();
    categoryProfileFormTL.validateFields();
    categoryProfileFormZH.validateFields();
    categoryProfileFormEN.validateFields();
    setErrorMessImage(!avatar);
  };

  React.useEffect(() => {
    categoryForm.setFieldsValue(initialCommonValues);
  }, [item]);

  return {
    categoryForm,
    categoryProfileFormEN,
    categoryProfileFormJP,
    categoryProfileFormTL,
    categoryProfileFormVI,
    categoryProfileFormZH,
    onChangeAvatar,
    onFinishAll,
    onFinishError,
    initialCommonValues,
    errorMessImage,
  };
};

export default useHandleForm;
