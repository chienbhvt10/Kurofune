import { auto } from "@popperjs/core";
import React from "react";

const CommonInfoForm = ({ className, formik }) => {
  const renderErrorMessage = (field) => {
    return (
      formik.touched[field] && (
        <div className="form-error">{formik.errors[field]}</div>
      )
    );
  };
  return (
    <form className={className}>
      <div className="separate">
        <div className="form-group">
          <label>Postal code</label>
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
          <label>City</label>
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
          <label>Prefecture</label>
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
          <label>Street address</label>
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
        <label>Building</label>
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
    </form>
  );
};
export default CommonInfoForm;
