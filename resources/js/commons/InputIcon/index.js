import React from "react";
import './style.scss'

export const InputIcon = (props) => {
  return (
    <>
      <div class="form-group">
        <label for={props.name}>{props.label}</label>
        <input
          type="email"
          class="form-control-auth"
          id={props.name}
          placeholder={props.label}
        />
        <img className="icon-input" src={props.icon} alt={props.icon} />
      </div>
    </>
  );
};
