import React from "react";

const RenderApiErrorMessage = ({ errorMessage, field }) => {
  return (
    <div className="form-error">
      {errorMessage?.message?.[field]?.map((item, index) => (
        <span className="" key={index}>
          {item}
        </span>
      ))}
    </div>
  );
};

export default RenderApiErrorMessage;
