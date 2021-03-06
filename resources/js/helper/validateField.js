export const validateUser = {
  role: [{ required: true, message: "admins.user.error.role_required" }],
  name: [{ required: true, message: "admins.user.error.name_required" }],
  language: [
    { required: true, message: "admins.user.error.language_required" },
  ],
  company_name: [
    { required: true, message: "admins.user.error.company_name_required" },
  ],
  company_email: [
    { required: true, message: "admins.user.error.company_email.required" },
    {
      type: "email",
      message: "admins.user.error.company_email.type",
    },
  ],
  person_in_charge: [
    { required: true, message: "admins.user.error.person_in_charge_required" },
  ],
  person_in_charge_contact_information: [
    {
      required: true,
      message: "admins.user.error.person_contact_information_required",
    },
  ],
  email: [
    { required: true, message: "admins.user.error.email.required" },
    {
      type: "email",
      message: "admins.user.error.email.type",
    },
  ],
  phone: [
    {
      message: "admins.user.error.phone.required",
    },
    {
      pattern: new RegExp(/^[0-9]+$/),
      message: "admins.user.error.phone.pattern",
    },
    {
      min: 9,
      max: 13,
      message: "admins.user.error.phone.limit",
    },
  ],
  user_name: [
    { required: true, message: "admins.user.error.user_name.required" },
    {
      pattern: new RegExp(/^[a-zA-Z0-9_-]*$/),
      message: "admins.user.error.user_name.pattern",
    },
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
    {
      pattern: new RegExp(/\d/),
      message: "admins.user.error.password.pattern_number",
    },
    {
      pattern: new RegExp(/[-!$%^&*()_+|~=`{}\[\]:\/;<>?,.@#]/),
      message: "admins.user.error.password.pattern_special_characters",
    },
    {
      pattern: new RegExp(/^(?:(?=.*[a-z])(?=.*[A-Z]).*)$/),
      message: "admins.user.error.password.pattern_alpha",
    },
    {
      pattern: new RegExp(/^\S*$/u),
      message: "admins.user.error.password.pattern_space",
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
    email: [
      {
        type: "email",
        message: "admins.user.error.email.type",
      },
    ],
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
      {
        pattern: new RegExp(/\d/),
        message: "admins.user.error.password.pattern_number",
      },
      {
        pattern: new RegExp(/[-!$%^&*()_+|~=`{}\[\]:\/;<>?,.@#]/),
        message: "admins.user.error.password.pattern_special_characters",
      },
      {
        pattern: new RegExp(/^(?:(?=.*[a-z])(?=.*[A-Z]).*)$/),
        message: "admins.user.error.password.pattern_alpha",
      },
    ],
    password: [
      {
        min: 8,
        message: "admins.user.error.password.min",
      },
      { required: true, message: "admins.user.error.new_password_required" },
      {
        pattern: new RegExp(/\d/),
        message: "admins.user.error.password.pattern_number",
      },
      {
        pattern: new RegExp(/[-!$%^&*()_+|~=`{}\[\]:\/;<>?,.@#]/),
        message: "admins.user.error.password.pattern_special_characters",
      },
      {
        pattern: new RegExp(/^(?:(?=.*[a-z])(?=.*[A-Z]).*)$/),
        message: "admins.user.error.password.pattern_alpha",
      },
    ],
    password_confirmation: [
      {
        required: true,
        message: "admins.user.error.confirm_password_required",
      },
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
      {
        pattern: new RegExp(/\d/),
        message: "admins.user.error.password.pattern_number",
      },
      {
        pattern: new RegExp(/[-!$%^&*()_+|~=`{}\[\]:\/;<>?,.@#]/),
        message: "admins.user.error.password.pattern_special_characters",
      },
      {
        pattern: new RegExp(/^(?:(?=.*[a-z])(?=.*[A-Z]).*)$/),
        message: "admins.user.error.password.pattern_alpha",
      },
    ],
    password_confirmation: [
      {
        required: true,
        message: "admins.user.error.confirm_password_required",
      },
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
