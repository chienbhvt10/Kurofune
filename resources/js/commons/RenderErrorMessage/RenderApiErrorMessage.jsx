import React from "react";
import "./RenderErrorMessage.scss";

const RenderApiErrorMessage = ({ response, field }) => {
  return (
    <div className="form-error">
      {response?.message?.[field] ? (
        response?.message?.[field]?.map((item, index) => (
          <span className="" key={index}>
            {item}
          </span>
        ))
      ) : (
        <span>{response?.message}</span>
      )}
    </div>
  );
};

export default RenderApiErrorMessage;