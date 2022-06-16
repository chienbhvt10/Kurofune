export const validateForm = {
  form_order: {
    postal_code: [
      { required: true, message: "admins.order.error.postal_code.required" },
      {
        pattern: new RegExp(/^[0-9]+$/),
        message: "admins.order.error.postal_code.pattern",
      },
      {
        max: 7,
        message: "admins.order.error.postal_code.max_7_number",
      },
    ],
    phone: [
      { required: true, message: "admins.order.error.phone.required" },
      {
        pattern: new RegExp(/^[0-9]+$/),
        message: "admins.order.error.phone.pattern",
      },
    ],
    email: [{ type: "email", message: "admins.order.error.email.type", required: true, message: "admins.order.error.email.required" }],
    full_name: [
      { required: true, message: "admins.order.error.full_name_required" },
    ],
    last_name: [
      { required: true, message: "admins.order.error.last_name_required" },
    ],
    city: [
      { required: true, message: "admins.order.error.city_required" },
    ],
    prefecture: [
      { required: true, message: "admins.order.error.prefecture_required" },
    ],
    building: [
      { required: true, message: "admins.order.error.building_required" },
    ],
    street_address: [
      { required: true, message: "admins.order.error.street_address_required" },
    ],
  },
};