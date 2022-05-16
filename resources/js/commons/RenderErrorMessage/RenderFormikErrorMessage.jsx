import React from "react";
import "./RenderErrorMessage.scss";

const RenderFormikErrorMessage = ({ formikInstance, field }) => {
  return (
    <>
      {formikInstance.touched[field] && (
        <div className="form-error">{formikInstance.errors[field]}</div>
      )}
    </>
  );
};

export default RenderFormikErrorMessage;
