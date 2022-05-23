import moment from "moment";
export const getUserInfoInitValues = (item) => {
  return {
    id: item?.id || "",
    role: item?.role[0].name || "",
    name: item?.name || "",
    username: item?.username || "",
    password: item?.password || "",
    phone: item?.phone || "",
    email: item?.email || "",
    active: item?.active || 0,
    avatar: item?.avatar || "",
  };
};
export const getTranslateInitValues = () => {
  return {
    locale: "",
    name: "",
    permit_classification: "",
    founder: "",
    items_stated_permit: "",
    management_pharmacist: "",
    registered_seller_working: "",
    drugs_handled: "",
    distinguishing_by_name: "",
    business_hours: "",
    consultation_hours: "",
    contact_information: "",
    currently_working: "",
    open_sale_time: "",
    time_order_outside: "",
    expiration_date_of_drugs: "",
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
    insurance_support: item?.profile?.insurance_support || "",
    insurance_start_date: item?.profile?.insurance_start_date || "",
    overseas_remittance_status: item?.profile?.overseas_remittance_status || 0,
    orientation: item?.profile?.orientation || "",
    start_date_education:
      (item?.profile?.start_date_education &&
        moment(item?.profile?.start_date_education)) ||
      "",
    end_date_education:
      (item?.profile?.end_date_education &&
        moment(item?.profile?.end_date_education)) ||
      "",
    education_status: item?.profile?.education_status || 1,
    wabisabi_my_page_registration:
      item?.profile?.wabisabi_my_page_registration || 0,
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
    full_name: item?.billing_address?.full_name || "",
    postal_code: item?.billing_address?.postal_code || "",
    city: item?.billing_address?.city || "",
    prefecture: item?.billing_address?.prefecture || "",
    street_address: item?.billing_address?.street_address || "",
    building: item?.billing_address?.building || "",
    phone: item?.billing_address?.phone || "",
    email: item?.billing_address?.email || "",
  };
};
export const getShippingAddressInitValues = (item) => {
  return {
    full_name: item?.shipping_address?.full_name || "",
    postal_code: item?.shipping_address?.postal_code || "",
    city: item?.shipping_address?.city || "",
    prefecture: item?.shipping_address?.prefecture || "",
    street_address: item?.shipping_address?.street_address || "",
    building: item?.shipping_address?.building || "",
    phone: item?.shipping_address?.phone || "",
    email: item?.shipping_address?.email || "",
  };
};
