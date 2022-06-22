import moment from "moment";
export const getUserInfoInitValues = (item) => {
  return {
    id: item?.id || "",
    role: item?.role[0]?.name || undefined,
    name: item?.name || "",
    username: item?.username || "",
    password: item?.password || "",
    phone: item?.phone || "",
    email: item?.email || "",
    active: item?.active || 0,
    avatar: item?.avatar || "",
  };
};
export const getTranslateInitValues = (translateValues, lang) => {
  return {
    [`${lang}_locale`]: translateValues?._locale || "",
    [`${lang}_name`]: translateValues?.name || "",
    [`${lang}_permit_classification`]:
      translateValues?.permit_classification || "",
    [`${lang}_founder`]: translateValues?.founder || "",
    [`${lang}_items_stated_permit`]: translateValues?.items_stated_permit || "",
    [`${lang}_management_pharmacist`]:
      translateValues?.management_pharmacist || "",
    [`${lang}_registered_seller_working`]:
      translateValues?.registered_seller_working || "",
    [`${lang}_drugs_handled`]: translateValues?.drugs_handled || "",
    [`${lang}_distinguishing_by_name`]:
      translateValues?.distinguishing_by_name || "",
    [`${lang}_business_hours`]: translateValues?.business_hours || "",
    [`${lang}_consultation_hours`]: translateValues?.consultation_hours || "",
    [`${lang}_contact_information`]: translateValues?.contact_information || "",
    [`${lang}_currently_working`]: translateValues?.currently_working || "",
    [`${lang}_open_sale_time`]: translateValues?.open_sale_time || "",
    [`${lang}_time_order_outside`]: translateValues?.time_order_outside || "",
    [`${lang}_pharmacist_working`]: translateValues?.pharmacist_working || "",
    [`${lang}_expiration_date_of_drugs`]:
      translateValues?.expiration_date_of_drugs || "",
  };
};
export const getPlanInitValues = (item) => {
  return {
    dob: (item?.profile?.dob && moment(item?.profile?.dob)) || "",
    gender: item?.profile?.gender || 0,
    facebook: item?.profile?.facebook || "",
    line: item?.profile?.line || "",
    address: item?.profile?.address || "",
    nationality: item?.profile?.nationality || "",
    visa_type: item?.profile?.visa_type || "",
    job_name: item?.profile?.job_name || "",
    company_representative: item?.profile?.company_representative || "",
    inflow_source: item?.profile?.inflow_source || "",
    payment: item?.profile?.payment || 0,
    insurance_status: item?.profile?.insurance_status || 1,
    insurance_support: item?.profile?.insurance_support || undefined,
    insurance_start_date: item?.profile?.insurance_start_date || "",
    overseas_remittance_status:
      item?.profile?.overseas_remittance_status || undefined,
    orientation: item?.profile?.orientation || "",
    start_date_education:
      (item?.profile?.start_date_education &&
        moment(item?.profile?.start_date_education)) ||
      "",
    end_date_education:
      (item?.profile?.end_date_education &&
        moment(item?.profile?.end_date_education)) ||
      "",
    education_status: item?.profile?.education_status || undefined,
    wabisabi_my_page_registration:
      item?.profile?.wabisabi_my_page_registration || undefined,
  };
};
export const getCommonAddressInitValues = (item) => {
  return {
    postal_code: item?.address?.postal_code || "",
    city: item?.address?.city || "",
    prefecture: item?.address?.prefecture || "",
    street_address: item?.address?.street_address || "",
    building: item?.address?.building || "",
  };
};
export const getBillingAddressInitValues = (item) => {
  return {
    billing_full_name: item?.billing_address?.full_name || "",
    billing_postal_code: item?.billing_address?.postal_code || "",
    billing_city: item?.billing_address?.city || "",
    billing_prefecture: item?.billing_address?.prefecture || "",
    billing_street_address: item?.billing_address?.street_address || "",
    billing_building: item?.billing_address?.building || "",
    billing_phone: item?.billing_address?.phone || "",
    billing_email: item?.billing_address?.email || "",
  };
};
export const getShippingAddressInitValues = (item) => {
  return {
    shipping_full_name: item?.shipping_address?.full_name || "",
    shipping_postal_code: item?.shipping_address?.postal_code || "",
    shipping_city: item?.shipping_address?.city || "",
    shipping_prefecture: item?.shipping_address?.prefecture || "",
    shipping_street_address: item?.shipping_address?.street_address || "",
    shipping_building: item?.shipping_address?.building || "",
    shipping_phone: item?.shipping_address?.phone || "",
    shipping_email: item?.shipping_address?.email || "",
  };
};
export const getVendorUploadInitValues = (item) => {
  return {
    images_inside: item?.images_inside || "",
    images_outside: item?.images_outside || "",
  };
};
