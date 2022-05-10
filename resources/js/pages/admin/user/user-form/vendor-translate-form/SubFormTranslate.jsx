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
          <input
            type="text"
            name="locate"
            // value={formik.values.locate}
            // onChange={formik.handleChange}
          />
        </div>
        <div className="form-group">
          <label>({lang}) Name </label>
          <input
            type="text"
            name="name"
            // value={formik.values.name}
            // onChange={formik.handleChange}
          />
        </div>
      </div>
      <div className="separate">
        <div className="form-group">
          <label>({lang}) Permit classification </label>
          <textarea
            type="text"
            name="permitClassification"
            // value={formik.values.permitClassification}
            // onChange={formik.handleChange}
          />
        </div>
        <div className="form-group">
          <label>({lang}) Founder </label>
          <textarea
            type="text"
            name="founder"
            // value={formik.values.founder}
            // onChange={formik.handleChange}
          />
        </div>
      </div>
      <div className="separate">
        <div className="form-group">
          <label>({lang}) Items to be stated in the permit </label>
          <textarea
            type="text"
            name="itemsStatedPermit"
            // value={formik.values.itemsStatedPermit}
            // onChange={formik.handleChange}
          />
        </div>
        <div className="form-group">
          <label>({lang}) Management pharmacist </label>
          <textarea
            type="text"
            name="managementPharmacist"
            // value={formik.values.managementPharmacist}
            // onChange={formik.handleChange}
          />
        </div>
      </div>
      <div className="separate">
        <div className="form-group">
          <label>({lang}) Registered Seller Working </label>
          <textarea
            type="text"
            name="registeredSellerWorking"
            // value={formik.values.registeredSellerWorking}
            // onChange={formik.handleChange}
          />
        </div>
        <div className="form-group">
          <label>({lang}) Drug Handled </label>
          <textarea
            type="text"
            name="drugHandled"
            // value={formik.values.drugHandled}
            // onChange={formik.handleChange}
          />
        </div>
      </div>
      <div className="separate">
        <div className="form-group">
          <label>({lang}) Distinguishing by name </label>
          <textarea
            type="text"
            name="distinguishingByName"
            // value={formik.values.distinguishingByName}
            // onChange={formik.handleChange}
          />
        </div>
        <div className="form-group">
          <label>({lang}) Business Hours </label>
          <textarea
            type="text"
            name="businessHours"
            // value={formik.values.businessHours}
            // onChange={formik.handleChange}
          />
        </div>
      </div>
      <div className="separate">
        <div className="form-group">
          <label>({lang}) Consultation Hours </label>
          <textarea
            type="text"
            name="consultationHours"
            // value={formik.values.consultationHours}
            // onChange={formik.handleChange}
          />
        </div>
        <div className="form-group">
          <label>({lang}) Contact Information </label>
          <textarea
            type="text"
            name="contactInformation"
            // value={formik.values.contactInformation}
            // onChange={formik.handleChange}
          />
        </div>
      </div>
      <div className="separate">
        <div className="form-group">
          <label>({lang}) Currently Working </label>
          <textarea
            type="text"
            name="currentlyWorking"
            // value={formik.values.currentlyWorking}
            // onChange={formik.handleChange}
          />
        </div>
        <div className="form-group">
          <label>({lang}) Open Sale Time </label>
          <textarea
            type="text"
            name="openSaleTime"
            // value={formik.values.openSaleTime}
            // onChange={formik.handleChange}
          />
        </div>
      </div>
      <div className="separate">
        <div className="form-group">
          <label>({lang})Time Order Outside</label>
          <textarea
            type="text"
            name="timeOrderOutside"
            // value={formik.values.timeOrderOutside}
            // onChange={formik.handleChange}
          />
        </div>
        <div className="form-group">
          <label>({lang})Expiration Date Of Drug</label>
          <textarea
            type="text"
            name="expirationDateOfDrug"
            // value={formik.values.expirationDateOfDrug}
            // onChange={formik.handleChange}
          />
        </div>
      </div>
    </form>
  );
};

export default SubFormUserTranslate;
