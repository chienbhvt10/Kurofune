import { auto } from "@popperjs/core";
import React from "react";
import { useSelector } from "react-redux";
import RenderApiErrorMessage from "../../../../../commons/RenderErrorMessage/RenderApiErrorMessage";
import RenderFormikErrorMessage from "../../../../../commons/RenderErrorMessage/RenderFormikErrorMessage";

const CommonInfoForm = ({ className, formik }) => {
  const errorMessage = useSelector((state) => state.userState.errorMessage);
  return (
    <form className={className}>
      <div className="separate">
        <div className="form-group">
          <label>Postal code</label>
          <input
            type="text"
            name="postal_code"
            onChange={formik.handleChange}
            value={formik.values.postal_code}
          />
          <RenderFormikErrorMessage
            formikInstance={formik}
            field="postal_code"
          />
          <RenderApiErrorMessage
            errorMessage={errorMessage}
            field="postal_code"
          />
        </div>
        <div className="form-group">
          <label>City</label>
          <input
            type="text"
            name="city"
            onChange={formik.handleChange}
            value={formik.values.city}
          />
          <RenderFormikErrorMessage formikInstance={formik} field="city" />
          <RenderApiErrorMessage errorMessage={errorMessage} field="city" />
        </div>
      </div>
      <div className="separate">
        <div className="form-group">
          <label>Prefecture</label>
          <input
            type="text"
            name="prefecture"
            onChange={formik.handleChange}
            value={formik.values.prefecture}
          />
          <RenderFormikErrorMessage
            formikInstance={formik}
            field="prefecture"
          />
          <RenderApiErrorMessage
            errorMessage={errorMessage}
            field="prefecture"
          />
        </div>
        <div className="form-group">
          <label>Street address</label>
          <input
            type="text"
            name="street_address"
            onChange={formik.handleChange}
            value={formik.values.street_address}
          />
          <RenderFormikErrorMessage
            formikInstance={formik}
            field="street_address"
          />
          <RenderApiErrorMessage
            errorMessage={errorMessage}
            field="street_address"
          />
        </div>
      </div>
      <div className="form-group">
        <label>Building</label>
        <input
          type="text"
          name="building"
          onChange={formik.handleChange}
          value={formik.values.building}
        />
        <RenderFormikErrorMessage formikInstance={formik} field="building" />
        <RenderApiErrorMessage errorMessage={errorMessage} field="building" />
      </div>
    </form>
  );
};
export default CommonInfoForm;
