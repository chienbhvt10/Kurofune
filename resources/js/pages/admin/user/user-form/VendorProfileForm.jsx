import React from "react";
import TranslateUserForm from "./TranslateUserForm";
import UploadDragger from "../../../../commons/UploadDragger";
const VendorProfileForm = () => {
  return (
    <div className="vendor-profile-form">
      <div className="control-image">
        <UploadDragger title="Image1" name="image1" />
        <UploadDragger title="Image2" name="image2" />
      </div>
      <TranslateUserForm />
    </div>
  );
};

export default VendorProfileForm;
