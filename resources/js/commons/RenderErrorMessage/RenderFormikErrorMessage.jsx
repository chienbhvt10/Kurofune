import React from "react";

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
