import React from "react";

const SubFormUserTranslate = ({ lang, className, formik }) => {
  const renderErrorMessage = (field) => {
    return (
      formik.touched[field] && (
        <div className="form-error">{formik.errors[field]}</div>
      )
    );
  };
  return (
    <form className={className}>
      <div className="separate">
        <div className="form-group">
          <label>({lang}) Locate </label>
          <input type="text" name="locate" />
        </div>
        <div className="form-group">
          <label>({lang}) Name </label>
          <input type="text" name="name" />
        </div>
      </div>
      <div className="separate">
        <div className="form-group">
          <label>({lang}) Permit classification </label>
          <textarea type="text" name="permitClassification" />
        </div>
        <div className="form-group">
          <label>({lang}) Founder </label>
          <textarea type="text" name="founder" />
        </div>
      </div>
      <div className="separate">
        <div className="form-group">
          <label>({lang}) Items to be stated in the permit </label>
          <textarea type="text" name="itemsStatedPermit" />
        </div>
        <div className="form-group">
          <label>({lang}) Management pharmacist </label>
          <textarea type="text" name="managementPharmacist" />
        </div>
      </div>
      <div className="separate">
        <div className="form-group">
          <label>({lang}) Registered Seller Working </label>
          <textarea type="text" name="registeredSellerWorking" />
        </div>
        <div className="form-group">
          <label>({lang}) Drug Handled </label>
          <textarea type="text" name="drugHandled" />
        </div>
      </div>
      <div className="separate">
        <div className="form-group">
          <label>({lang}) Distinguishing by name </label>
          <textarea type="text" name="drugHandled" />
        </div>
        <div className="form-group">
          <label>({lang}) Business Hours </label>
          <textarea type="text" name="businessHours" />
        </div>
      </div>
      <div className="separate">
        <div className="form-group">
          <label>({lang}) Consultation Hours </label>
          <textarea type="text" name="consultationHours" />
        </div>
        <div className="form-group">
          <label>({lang}) Contact Information </label>
          <textarea type="text" name="contactInformation" />
        </div>
      </div>
      <div className="separate">
        <div className="form-group">
          <label>({lang}) Currently Working </label>
          <textarea type="text" name="currentlyWorking" />
        </div>
        <div className="form-group">
          <label>({lang}) Open Sale Time </label>
          <textarea type="text" name="openSaleTime" />
        </div>
      </div>
      <div className="separate">
        <div className="form-group">
          <label>({lang})Time Order Outside</label>
          <textarea type="text" name="timeOrderOutside" />
        </div>
        <div className="form-group">
          <label>({lang})Expiration Date Of Drug</label>
          <textarea type="text" name="expirationDateOfDrug" />
        </div>
      </div>
    </form>
  );
};

export default SubFormUserTranslate;
