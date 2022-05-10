import React from "react";
import TranslateVendorForm from "./TranslateVendorForm";
import UploadDragger from "../../../../../commons/UploadDragger";
const VendorProfileForm = ({
  formikEN,
  formikJP,
  formikTL,
  formikVI,
  formikZH,
  className,
}) => {
  return (
    <div className={`vendor-profile-form ${className}`}>
      <div className="control-image">
        <UploadDragger title="Image1" name="image1" />
        <UploadDragger title="Image2" name="image2" />
      </div>
      <TranslateVendorForm
        formikEN={formikEN}
        formikJP={formikJP}
        formikTL={formikTL}
        formikZH={formikZH}
        formikVI={formikVI}
      />
    </div>
  );
};

export default VendorProfileForm;
