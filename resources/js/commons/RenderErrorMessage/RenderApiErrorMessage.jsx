import React from "react";
import "./RenderErrorMessage.scss";

const RenderApiErrorMessage = ({ errorMessage, field }) => {
  return (
    <div className="form-error">
      {errorMessage?.message?.[field] ? errorMessage?.message?.[field]?.map((item, index) => (
        <span className="" key={index}>
          {item}
        </span>
      )) : errorMessage?.message}
    </div>
  );
};

export default RenderApiErrorMessage;
