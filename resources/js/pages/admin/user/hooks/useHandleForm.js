import { Form } from "antd";
import React from "react";
import { formatDate } from "../../../../commons/string";
import { ROLE_VENDOR, TYPE_FORM_UPDATE } from "../../../../constants";
import {
  appendArrayToFormData,
  appendObjectToFormData,
} from "../../../../helper/handler";
import { getCurrentLanguage } from "../../../../helper/localStorage";
import {
  getBillingAddressInitValues,
  getCommonAddressInitValues,
  getPlanInitValues,
  getShippingAddressInitValues,
  getUserInfoInitValues,
} from "../user-form/userFormInitValues";
import useHandleImage from "./useHandleImage";
import useHandleVendorForm from "./useHandleVendorForm";

import { isRolePlan } from "../../../../helper/checker";
const useHandleForm = (item, onSave, typeForm) => {
  const lang = getCurrentLanguage();
  const [isSubmitted, setSubmitted] = React.useState(false);
  const {
    avatar,
    images_inside,
    images_outside,
    onChangeAvatar,
    onChangeImageInside,
    onChangeImageOutside,
    images_inside_delete,
    images_outside_delete,
    onSaveImgInsideDelete,
    onSaveImgOutsideDelete,
  } = useHandleImage();
  const {
    vendorProfileFormEN,
    vendorProfileFormJP,
    vendorProfileFormTL,
    vendorProfileFormVI,
    vendorProfileFormZH,
  } = useHandleVendorForm(item);

  const [userInfoForm] = Form.useForm();
  const [planProfileForm] = Form.useForm();
  const [commonAddressForm] = Form.useForm();
  const [billingAddressForm] = Form.useForm();
  const [shippingAddressForm] = Form.useForm();

  const userInfoInitValues = getUserInfoInitValues(item);
  const planInitValues = getPlanInitValues(item);
  const commonAddressInitValues = getCommonAddressInitValues(item);
  const billingAddressInitValues = getBillingAddressInitValues(item);
  const shippingAddressInitValues = getShippingAddressInitValues(item);

  const onFinishAll = () => {
    const formData = new FormData();
    const role = userInfoForm.getFieldValue("role");
    const dob = planProfileForm.getFieldValue("dob");
    const start_date_education = planProfileForm.getFieldValue(
      "start_date_education"
    );
    const end_date_education =
      planProfileForm.getFieldValue("end_date_education");

    let submitValues = {
      id: userInfoInitValues.id,
      avatar,
      ...userInfoForm.getFieldsValue(),
    };
    if (typeForm === TYPE_FORM_UPDATE) {
      formData.append("_method", "PUT");
    }
    appendObjectToFormData(formData, commonAddressForm.getFieldsValue());
    appendObjectToFormData(formData, billingAddressForm.getFieldsValue());
    appendObjectToFormData(formData, shippingAddressForm.getFieldsValue());

    if (!avatar) {
      delete submitValues.avatar;
    }
    if (!userInfoForm.getFieldValue("password")) {
      delete submitValues.password;
    }
    if (role === ROLE_VENDOR) {
      appendArrayToFormData(formData, "images_inside", images_inside);
      appendArrayToFormData(formData, "images_outside", images_outside);
      appendArrayToFormData(
        formData,
        "images_inside_delete",
        images_inside_delete
      );
      appendArrayToFormData(
        formData,
        "images_outside_delete",
        images_outside_delete
      );
      appendObjectToFormData(formData, vendorProfileFormEN.getFieldsValue());
      appendObjectToFormData(formData, vendorProfileFormJP.getFieldsValue());
      appendObjectToFormData(formData, vendorProfileFormTL.getFieldsValue());
      appendObjectToFormData(formData, vendorProfileFormVI.getFieldsValue());
      appendObjectToFormData(formData, vendorProfileFormZH.getFieldsValue());
    }
    if (isRolePlan(role)) {
      appendObjectToFormData(formData, planProfileForm.getFieldsValue());
      submitValues["dob"] = dob ? formatDate(dob) : "";
      submitValues["start_date_education"] = dob
        ? formatDate(start_date_education)
        : "";
      submitValues["end_date_education"] = dob
        ? formatDate(end_date_education)
        : "";
    }

    appendObjectToFormData(formData, submitValues);
    setSubmitted(true);
    onSave(formData);
  };

  const onFinishAllFailed = () => {
    setSubmitted(true);
  };

  React.useEffect(() => {
    userInfoForm.setFieldsValue(userInfoInitValues);
    planProfileForm.setFieldsValue(planInitValues);
    billingAddressForm.setFieldsValue(billingAddressInitValues);
    shippingAddressForm.setFieldsValue(shippingAddressInitValues);
    commonAddressForm.setFieldsValue(commonAddressInitValues);
  }, [item]);

  React.useEffect(() => {
    if (isSubmitted) {
      userInfoForm.validateFields();
      planProfileForm.validateFields();
      billingAddressForm.validateFields();
      shippingAddressForm.validateFields();
      commonAddressForm.validateFields();
    }
  }, [lang]);

  return {
    userInfoInitValues,
    billingAddressForm,
    shippingAddressForm,
    commonAddressForm,
    userInfoForm,
    vendorProfileFormEN,
    vendorProfileFormEN,
    vendorProfileFormJP,
    vendorProfileFormTL,
    vendorProfileFormVI,
    vendorProfileFormZH,
    onFinishAll,
    onFinishAllFailed,
    onChangeAvatar,
    onChangeImageInside,
    onChangeImageOutside,
    onSaveImgInsideDelete,
    onSaveImgOutsideDelete,
    planProfileForm,
  };
};

export default useHandleForm;
