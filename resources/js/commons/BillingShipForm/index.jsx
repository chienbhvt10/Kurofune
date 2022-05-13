import React from "react";
import * as Yup from "yup";

const credential = Yup.object().shape({});

const BillingShipForm = ({ lang, className, formik, typeForm }) => {
  const renderErrorMessage = (field) => {
    return (
      formik.touched[field] && (
        <div className="form-error">{formik.errors[field]}</div>
      )
    );
  };
  return (
    <form className={className}>
      <div className="form-group">
        <label>[{typeForm}] Full Name</label>
        <input
          id=""
          type="text"
          name={`${typeForm}_full_name`}
          className=""
          onChange={formik.handleChange}
          value={
            typeForm === "billing"
              ? formik.values.billing_full_name
              : formik.values.shipping_full_name
          }
        />
        {/* {renderErrorMessage("fullname")} */}
      </div>
      <div className="separate">
        <div className="form-group">
          <label>[{typeForm}] Postal code</label>
          <input
            id=""
            type="text"
            name="postal_code"
            className=""
            onChange={formik.handleChange}
            value={
              typeForm === "billing"
                ? formik.values.billing_postal_code
                : formik.values.shipping_postal_code
            }
          />
          {/* {renderErrorMessage("postalCode")} */}
        </div>
        <div className="form-group">
          <label>[{typeForm}] City</label>
          <input
            id=""
            type="text"
            name="city"
            className=""
            onChange={formik.handleChange}
            value={
              typeForm === "billing"
                ? formik.values.billing_city
                : formik.values.shipping_city
            }
          />
          {/* {renderErrorMessage("city")} */}
        </div>
      </div>
      <div className="separate">
        <div className="form-group">
          <label>[{typeForm}] Prefecture</label>
          <input
            id=""
            type="text"
            name="prefecture"
            className=""
            onChange={formik.handleChange}
            value={
              typeForm === "billing"
                ? formik.values.billing_prefecture
                : formik.values.shipping_prefecture
            }
          />
          {/* {renderErrorMessage("prefecture")} */}
        </div>
        <div className="form-group">
          <label>[{typeForm}] Street address</label>
          <input
            id=""
            type="text"
            name="street_address"
            className=""
            onChange={formik.handleChange}
            value={
              typeForm === "billing"
                ? formik.values.billing_street_address
                : formik.values.shipping_street_address
            }
          />
          {/* {renderErrorMessage("street_address")} */}
        </div>
      </div>
      <div className="form-group">
        <label>[{typeForm}] Building</label>
        <input
          id=""
          type="text"
          name="building"
          className=""
          onChange={formik.handleChange}
          value={
            typeForm === "billing"
              ? formik.values.billing_building
              : formik.values.shipping_building
          }
        />
        {/* {renderErrorMessage("building")} */}
      </div>
      <div className="form-group">
        <label>[{typeForm}] Phone</label>
        <input
          id=""
          type="text"
          name="phone"
          className=""
          onChange={formik.handleChange}
          value={
            typeForm === "billing"
              ? formik.values.billing_phone
              : formik.values.shipping_phone
          }
        />
        {/* {renderErrorMessage("classification")} */}
      </div>
      <div className="form-group">
        <label>[{typeForm}] Email</label>
        <input
          id=""
          type="text"
          name="email"
          className=""
          onChange={formik.handleChange}
          value={
            typeForm === "billing"
              ? formik.values.billing_email
              : formik.values.shipping_email
          }
        />
        {/* {renderErrorMessage("email")} */}
      </div>
    </form>
  );
};

export default BillingShipForm;
