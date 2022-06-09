import { Form } from "antd";
import React from "react";
import { formatDate } from "../../../../commons/string";
import {
  ROLE_FULL_SUPPORT_PLAN,
  ROLE_LIGHT_PLAN,
  ROLE_VENDOR,
} from "../../../../constants";
import {
  getBillingAddressInitValues,
  getCommonAddressInitValues,
  getPlanInitValues,
  getShippingAddressInitValues,
  getUserInfoInitValues,
} from "../user-form/userFormInitValues";
import useHandleImage from "./useHandleImage";
import useHandleVendorForm from "./useHandleVendorForm";

const useHandleForm = (item, onSave) => {
  const {
    base64Avatar,
    listBase64ImageInSide,
    listBase64ImageOutSide,
    onChangeAvatar,
    onChangeImageInside,
    onChangeImageOutside,
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
    let submitValues = {
      id: userInfoInitValues.id,
      avatar: base64Avatar,
      images_inside: listBase64ImageInSide,
      images_outside: listBase64ImageOutSide,
      ...userInfoForm.getFieldsValue(),
      ...commonAddressForm.getFieldsValue(),
      billing_address: {
        ...billingAddressForm.getFieldsValue(),
      },
      shipping_address: {
        ...shippingAddressForm.getFieldsValue(),
      },
    };
    if (!userInfoForm.getFieldValue("password")) {
      delete submitValues.password;
    }
    if (userInfoForm.getFieldValue("role") === ROLE_VENDOR) {
      submitValues = {
        ...submitValues,
        ja: {
          ...vendorProfileFormJP.getFieldsValue(),
        },
        en: {
          ...vendorProfileFormEN.getFieldsValue(),
        },
        zh: {
          ...vendorProfileFormZH.getFieldsValue(),
        },
        tl: {
          ...vendorProfileFormTL.getFieldsValue(),
        },
        vi: {
          ...vendorProfileFormVI.getFieldsValue(),
        },
      };
    }
    if (
      userInfoForm.getFieldValue("role") === ROLE_LIGHT_PLAN ||
      userInfoForm.getFieldValue("role") === ROLE_FULL_SUPPORT_PLAN
    ) {
      submitValues = {
        ...submitValues,
        ...planProfileForm.getFieldsValue(),
        dob: planProfileForm.getFieldValue("dob")
          ? formatDate(planProfileForm.getFieldValue("dob"))
          : "",
        start_date_education: planProfileForm.getFieldValue(
          "start_date_education"
        )
          ? formatDate(planProfileForm.getFieldValue("start_date_education"))
          : "",
        end_date_education: planProfileForm.getFieldValue("end_date_education")
          ? formatDate(planProfileForm.getFieldValue("end_date_education"))
          : "",
      };
    }
    onSave(submitValues);
  };

  React.useEffect(() => {
    userInfoForm.setFieldsValue(userInfoInitValues);
    planProfileForm.setFieldsValue(planInitValues);
    billingAddressForm.setFieldsValue(billingAddressInitValues);
    shippingAddressForm.setFieldsValue(shippingAddressInitValues);
    commonAddressForm.setFieldsValue(commonAddressInitValues);
  }, [item]);

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
    onChangeAvatar,
    onChangeImageInside,
    onChangeImageOutside,
    planProfileForm,
  };
};

export default useHandleForm;
