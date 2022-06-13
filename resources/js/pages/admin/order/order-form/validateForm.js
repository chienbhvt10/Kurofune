export const validateForm = {
    role: [{ required: true, message: "admins.user.error.role_required" }],
    name: [{ required: true, message: "admins.user.error.name_required" }],
    email: [
      { required: true, message: "admins.user.error.email.required" },
      { type: "email", message: "admins.user.error.email.type" },
    ],
    phone: [
      {
        required: true,
        message: "admins.user.error.phone.required",
      },
      {
        pattern: new RegExp(/^[0-9]+$/),
        message: "admins.user.error.phone.pattern",
      },
    ],
    user_name: [
      { required: true, message: "admins.user.error.user_name_required" },
    ],
    password: [
      {
        required: true,
        message: "admins.user.error.password.required",
      },
      {
        min: 8,
        message: "admins.user.error.password.min",
      },
    ],
    active: [{ required: true, message: "admins.user.error.active_required" }],
    postal_code: [
      {
        pattern: new RegExp(/^[0-9]+$/),
        message: "admins.user.error.postal_code.pattern",
      },
      {
        max: 7,
        message: "admins.user.error.postal_code.max_7_number",
      },
    ],
    billing_shipping: {
      postal_code: [
        {
          pattern: new RegExp(/^[0-9]+$/),
          message: "admins.user.error.postal_code.pattern",
        },
        {
          max: 7,
          message: "admins.user.error.postal_code.max_7_number",
        },
      ],
      phone: [
        {
          pattern: new RegExp(/^[0-9]+$/),
          message: "admins.user.error.phone.pattern",
          
  
        },
      ],
      email: [{ type: "email", message: "admins.user.error.email.type",required: true, message: "admins.user.error.email.required"  }],
      first_name: [
        { required: true, message: "admins.user.error.first_name_required" },
      ],
      last_name: [
        { required: true, message: "admins.user.error.last_name_required" },
      ],
      company: [
        { required: true, message: "admins.user.error.company_required" },
      ],
      country_region: [
        { required: true, message: "admins.user.error.country_region_required" },
      ],
      state_county: [
        { required: true, message: "admins.user.error.state_county_required" },
      ],
      address_line_1:[
        { required: true, message: "admins.user.error.address_line_1" },
      ],
      address_line_2:[
        { required: true, message: "admins.user.error.address_line_2" },
      ],
    },
    form_info: {
      full_name: [{ required: true, message: "admins.user.error.name_required" }],
      from_postcode: [
        { required: true, message: "admins.user.error.postal_code.required" },
        { max: 3, message: "admins.user.error.postal_code.max_3_number" },
        {
          pattern: new RegExp(/^[0-9]+$/),
          message: "admins.user.error.postal_code.pattern",
        },
      ],
      to_postcode: [
        { max: 4, message: "admins.user.error.postal_code.max_4_number" },
        {
          pattern: new RegExp(/^[0-9]+$/),
          message: "admins.user.error.postal_code.pattern",
        },
      ],
      prefecture: [
        { required: true, message: "admins.user.error.prefecture_required" },
      ],
      city: [{ required: true, message: "admins.user.error.city_required" }],
      street_address: [
        { required: true, message: "admins.user.error.street_address_required" },
      ],
      phone: [
        {
          pattern: new RegExp(/^[0-9]+$/),
          message: "admins.user.error.phone.pattern",
        },
        { required: true, message: "admins.user.error.phone.required" },
      ],
      email: [
        { required: true, message: "admins.user.error.email.required" },
        { type: "email", message: "admins.user.error.email.type" },
      ],
    },
    change_password: {
      current_password: [
        {
          min: 8,
          message: "admins.user.error.password.min",
        },
        {
          required: true,
          message: "admins.user.error.current_password_required",
        },
      ],
      password: [
        {
          min: 8,
          message: "admins.user.error.password.min",
        },
        { required: true, message: "admins.user.error.new_password_required" },
      ],
      password_confirmation: [
        {
          min: 8,
          message: "admins.user.error.password.min",
        },
        {
          required: true,
          message: "admins.user.error.confirm_password_required",
        },
        ({ getFieldValue }) => ({
          validator(_, value) {
            if (!value || getFieldValue("password") === value) {
              return Promise.resolve();
            }
            return Promise.reject(
              new Error("admins.user.error.not_same_password")
            );
          },
        }),
      ],
    },
  };
  
  export const validateAuth = {
    login: {
      email: [
        { required: true, message: "admins.user.error.email.required" },
        { type: "email", message: "admins.user.error.email.type" },
      ],
      password: [
        {
          required: true,
          message: "admins.user.error.password.required",
        },
        {
          min: 8,
          message: "admins.user.error.password.min",
        },
      ],
    },
    forgot_password: {
      email: [
        { required: true, message: "admins.user.error.email.required" },
        { type: "email", message: "admins.user.error.email.type" },
      ],
    },
    reset_password: {
      email: [
        { required: true, message: "admins.user.error.email.required" },
        { type: "email", message: "admins.user.error.email.type" },
      ],
      password: [
        {
          min: 8,
          message: "admins.user.error.password.min",
        },
        { required: true, message: "admins.user.error.new_password_required" },
      ],
      password_confirmation: [
        {
          min: 8,
          message: "admins.user.error.password.min",
        },
        {
          required: true,
          message: "admins.user.error.confirm_password_required",
        },
        ({ getFieldValue }) => ({
          validator(_, value) {
            if (!value || getFieldValue("password") === value) {
              return Promise.resolve();
            }
            return Promise.reject(
              new Error("admins.user.error.not_same_password")
            );
          },
        }),
      ],
    },
  };
  
  export const validateProductForm = {
    status: [{ required: true, message: "Please select a status" }],
    stock_status: [{ required: true, message: "Please select a stock status" }],
    category: [{ required: true, message: "Please select category" }],
    tax_id: [
      {
        pattern: new RegExp(/^[0-9]+$/),
        message: "Please enter number",
      },
      {
        require: true,
        message: "Please input your tax number",
      },
    ],
    en_name: [{ required: true, message: "Please input your product name" }],
  };
  