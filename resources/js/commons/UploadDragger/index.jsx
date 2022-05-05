import { faArrowUpFromBracket } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "./upload-dragger.scss";
import React, { useRef } from "react";

const UploadDragger = ({ title, name }) => {
  const inputFile = useRef(null);
  const onButtonClick = () => {
    inputFile.current.click();
  };
  return (
    <div className="form-group form-image-custom">
      <label>{title}</label>
      <div className="image-wrapper" onClick={onButtonClick}>
        <span tabIndex={0} role="button">
          <input ref={inputFile} type="file" accept="image/*" name={name} />
          <div className="before-upload-show">
            <span>
              <FontAwesomeIcon className="icon" icon={faArrowUpFromBracket} />
            </span>
            <span>Upload</span>
          </div>
        </span>
      </div>
    </div>
  );
};

export default UploadDragger;
