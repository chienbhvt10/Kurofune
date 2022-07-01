import { Form } from "antd";
import React from "react";
import { formatDate } from "../../../../commons/string";
import {
  FIFTH_TAB,
  FOURTH_TAB,
  SECOND_TAB,
  THIRD_TAB,
  FIRST_TAB,
  ROLE_VENDOR,
  TYPE_FORM_UPDATE,
} from "../../../../constants";
import {
  appendArrayToFormData,
  appendObjectToFormData,
  getResultValidate,
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
  const [tabRequiredLang, setTabRequiredLang] = React.useState();
  const [tabRequired, setTabRequired] = React.useState();

  const {
    avatar,
    images_inside,
    images_outside,
    images_delete,
    onChangeAvatar,
    onChangeImageInside,
    onChangeImageOutside,
    onSaveImgInsideDelete,
    onSaveImgOutsideDelete,
    isRemoveAvatar,
    setIsRemoveAvatar,
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

  const onFinishAll = async () => {
    const formData = new FormData();
    const role = userInfoForm.getFieldValue("role");
    const dob = planProfileForm.getFieldValue("dob");

    const enFormValues = await getResultValidate(vendorProfileFormEN);
    const jaFormValues = await getResultValidate(vendorProfileFormJP);
    const tlFormValues = await getResultValidate(vendorProfileFormTL);
    const viFormValues = await getResultValidate(vendorProfileFormVI);
    const zhFormValues = await getResultValidate(vendorProfileFormZH);
    const planProfileFormValues = await getResultValidate(planProfileForm);

    if (enFormValues.errorFields) {
      setTabRequiredLang(FIRST_TAB);
    } else if (jaFormValues.errorFields) {
      setTabRequiredLang(SECOND_TAB);
    } else if (tlFormValues.errorFields) {
      setTabRequiredLang(THIRD_TAB);
    } else if (viFormValues.errorFields) {
      setTabRequiredLang(FOURTH_TAB);
    } else if (zhFormValues.errorFields) {
      setTabRequiredLang(FIFTH_TAB);
    }

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
      let submitValues = {
        id: userInfoInitValues.id,
        avatar,
        delete_avatar: isRemoveAvatar,
        ...userInfoForm.getFieldsValue(),
      };

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
        appendArrayToFormData(formData, "images_delete", images_delete);
        appendObjectToFormData(formData, vendorProfileFormEN.getFieldsValue());
        appendObjectToFormData(formData, vendorProfileFormJP.getFieldsValue());
        appendObjectToFormData(formData, vendorProfileFormTL.getFieldsValue());
        appendObjectToFormData(formData, vendorProfileFormVI.getFieldsValue());
        appendObjectToFormData(formData, vendorProfileFormZH.getFieldsValue());
      }
      if (isRolePlan(role)) {
        appendObjectToFormData(formData, planProfileForm.getFieldsValue());
        if (dob) {
          submitValues["dob"] = formatDate(dob);
        } else if (!dob) {
          formData.delete("dob");
        }
      }

      const commonAddressValue = await getResultValidate(commonAddressForm);
      const billingAddressValue = await getResultValidate(billingAddressForm);
      const shippingAddressValue = await getResultValidate(shippingAddressForm);
      if (planProfileFormValues.errorFields) {
        setTabRequired(SECOND_TAB);
      } else if (commonAddressValue.errorFields) {
        setTabRequired(FIRST_TAB);
      } else if (billingAddressValue.errorFields) {
        setTabRequired(THIRD_TAB);
      } else if (shippingAddressValue.errorFields) {
        setTabRequired(FOURTH_TAB);
      }

      if (planProfileFormValues.errorFields) return;

      appendObjectToFormData(formData, submitValues);
      setSubmitted(true);
      onSave(formData);
    }
  };

  const onFinishAllFailed = () => {
    setSubmitted(true);
    planProfileForm.validateFields();
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
    tabRequiredLang,
    isSubmitted,
    tabRequired,
    onFinishAll,
    onFinishAllFailed,
    onChangeAvatar,
    onChangeImageInside,
    onChangeImageOutside,
    onSaveImgInsideDelete,
    onSaveImgOutsideDelete,
    planProfileForm,
    setIsRemoveAvatar,
  };
};

export default useHandleForm;
