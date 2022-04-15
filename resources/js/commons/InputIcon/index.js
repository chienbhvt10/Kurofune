import React from "react";
import './style.scss'

export const InputIcon = (props) => {
  return (
    <>
      <div className"form-group">
        <label htmlFor={props.name}>{props.label}</label>
        <input
          type={props.type}
          className"form-control-auth"
          id={props.name}
        />
        <img className="icon-input" src={props.icon} alt={props.icon} />
      </div>
    </>
  );
};
