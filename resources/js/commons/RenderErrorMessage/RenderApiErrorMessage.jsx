import React from "react";

const RenderApiErrorMessage = ({ response, field }) => {
  return (
    <div className="form-error">
      {response?.message?.[field]?.map((item, index) => (
        <span className="" key={index}>
          {item}
        </span>
      ))}
    </div>
  );
};

export default RenderApiErrorMessage;
