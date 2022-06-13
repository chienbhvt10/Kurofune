export const getBillingInitValues = (item) => {
  return {
    name: "",
    full_name: item?.billing_address?.full_name || "",
    from_code: item?.billing_address?.postal_code?.slice(0, 3) || "",
    to_code: item?.billing_address?.postal_code?.slice(3, 7) || "",
    prefecture: item?.billing_address?.prefecture || "",
    city: item?.billing_address?.city || "",
    street_address: item?.billing_address?.street_address || "",
    building: item?.billing_address?.building || "",
    phone: item?.billing_address?.phone || "",
    email: item?.billing_address?.email || "",
  };
};
export const getShippingInitValues = (item) => {
  return {
    name: "",
    full_name: item?.shipping_address?.full_name || "",
    from_code: item?.shipping_address?.postal_code?.slice(0, 3) || "",
    to_code: item?.shipping_address?.postal_code?.slice(3, 7) || "",
    prefecture: item?.shipping_address?.prefecture || "",
    city: item?.shipping_address?.city || "",
    street_address: item?.shipping_address?.street_address || "",
    building: item?.shipping_address?.building || "",
    phone: item?.shipping_address?.phone || "",
    email: item?.shipping_address?.email || "",
  };
};
export const getProfileInitValues = (item) => {
  return {
    name: item?.name || "",
    full_name: "",
    from_code: item?.address?.postal_code?.slice(0, 3) || "",
    to_code: item?.address?.postal_code?.slice(3, 7) || "",
    prefecture: item?.address?.prefecture || "",
    city: item?.address?.city || "",
    street_address: item?.address?.street_address || "",
    building: item?.address?.building || "",
    phone: item?.phone || "",
    email: item?.email || "",
  };
};
