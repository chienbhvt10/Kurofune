export const validateUser = {
  role: [{ required: true, message: "Please select a role" }],
  name: [{ required: true, message: "Please input your name!" }],
  email: [
    { required: true, message: "Please input your email!" },
    { type: "email", message: "Please input valid email!" },
  ],
  phone: [
    {
      required: true,
      message: "Please input your phone number!",
    },
    {
      pattern: new RegExp(/^[0-9]+$/),
      message: "Please input valid phone number!",
    },
  ],
  user_name: [{ required: true, message: "Please input your username!" }],
  password: [
    {
      required: true,
      message: "Please input your password!",
    },
    {
      min: 8,
      message: "Please input atLeast 8 characters for password!",
    },
  ],
  active: [{ required: true, message: "Please select active status!" }],
  postal_code: [
    {
      pattern: new RegExp(/^[0-9]+$/),
      message: "Please enter number",
    },
    {
      max: 7,
      message: "Please enter only 7 numbers",
    },
  ],
  billing_shipping: {
    postal_code: [
      {
        pattern: new RegExp(/^[0-9]+$/),
        message: "Please enter number",
      },
      {
        max: 7,
        message: "Please enter only 7 numbers",
      },
    ],
    phone: [
      {
        pattern: new RegExp(/^[0-9]+$/),
        message: "Please input valid phone number!",
      },
    ],
    email: [{ type: "email", message: "Please input valid email!" }],
  },
  form_info: {
    full_name: [{ required: true, message: "Please input full name" }],
    from_postcode: [
      { required: true, message: "Please input postal code" },
      { max: 3, message: "Input only 3 number" },
      {
        pattern: new RegExp(/^[0-9]+$/),
        message: "Please enter number",
      },
    ],
    to_postcode: [
      { max: 4, message: "Input only 4 number" },
      {
        pattern: new RegExp(/^[0-9]+$/),
        message: "Please enter number",
      },
    ],
    prefecture: [{ required: true, message: "Please select prefecture" }],
    city: [{ required: true, message: "Please input city" }],
    street_address: [
      { required: true, message: "Please input street address" },
    ],
    phone: [
      {
        pattern: new RegExp(/^[0-9]+$/),
        message: "Please enter number",
      },
      { required: true, message: "Please input phone" },
    ],
    email: [
      { required: true, message: "Please input email" },
      { type: "email", message: "Please input valid email" },
    ],
  },
  change_password: {
    current_password: [
      { required: true, message: "Please input current password" },
    ],
    password: [{ required: true, message: "Please input new password" }],
    password_confirmation: [
      {
        required: true,
        message: "Please input password confirmation",
      },
      ({ getFieldValue }) => ({
        validator(_, value) {
          if (!value || getFieldValue("password") === value) {
            return Promise.resolve();
          }
          return Promise.reject(
            new Error("The two passwords that you entered do not match!")
          );
        },
      }),
    ],
  },
};
export const validateAuth = {
  login: {
    email: [
      { required: true, message: "Please input your email!" },
      { type: "email", message: "Please input valid email!" },
    ],
    password: [
      {
        required: true,
        message: "Please input your password!",
      },
      {
        min: 8,
        message: "Please input atLeast 8 characters for password!",
      },
    ],
  },
  reset_password: {
    email: [
      { required: true, message: "Please input your email!" },
      { type: "email", message: "Please input valid email!" },
    ],
    password: [{ required: true, message: "Please input new password" }],
    password_confirmation: [
      {
        required: true,
        message: "Please input password confirmation",
      },
      ({ getFieldValue }) => ({
        validator(_, value) {
          if (!value || getFieldValue("password") === value) {
            return Promise.resolve();
          }
          return Promise.reject(
            new Error("The two passwords that you entered do not match!")
          );
        },
      }),
    ],
  },
};
