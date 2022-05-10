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
          name="fullname"
          className=""
          // onChange={formik.handleChange}
          // value={formik.values.fullname}
        />
        {/* {renderErrorMessage("fullname")} */}
      </div>
      <div className="separate">
        <div className="form-group">
          <label>[{typeForm}] Postal code</label>
          <input
            id=""
            type="text"
            name="postalCode"
            className=""
            // onChange={formik.handleChange}
            // value={formik.values.postalCode}
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
            // onChange={formik.handleChange}
            // value={formik.values.city}
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
            // onChange={formik.handleChange}
            // value={formik.values.prefecture}
          />
          {/* {renderErrorMessage("prefecture")} */}
        </div>
        <div className="form-group">
          <label>[{typeForm}] Street address</label>
          <input
            id=""
            type="text"
            name="streetAddress"
            className=""
            // onChange={formik.handleChange}
            // value={formik.values.streetAddress}
          />
          {/* {renderErrorMessage("streetAddress")} */}
        </div>
      </div>
      <div className="form-group">
        <label>[{typeForm}] Building</label>
        <input
          id=""
          type="text"
          name="building"
          className=""
          // onChange={formik.handleChange}
          // value={formik.values.building}
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
          // onChange={formik.handleChange}
          // value={formik.values.phone}
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
          // onChange={formik.handleChange}
          // value={formik.values.email}
        />
        {/* {renderErrorMessage("email")} */}
      </div>
    </form>
  );
};

export default BillingShipForm;
