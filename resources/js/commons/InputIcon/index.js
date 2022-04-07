import React from "react";

export const InputIcon = (props) => {
  return (
    <>
      <div class="form-group">
        <label for={props.name}>{props.label}</label>
        <input
          type="email"
          class="form-control"
          id={props.name}
          placeholder={props.label}
        />
      </div>
    </>
  );
};
