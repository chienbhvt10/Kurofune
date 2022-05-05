import React from "react";

const CommonProfileForm = ({ formik }) => {
  const renderErrorMessage = (field) => {
    return (
      formik.touched[field] && (
        <div className="form-error">{formik.errors[field]}</div>
      )
    );
  };
  return (
    <div className="common-profile-form">
      <form>
        <div className="separate">
          <div className="form-group">
            <label>DOB</label>
            <input type="text" name="dob" />
          </div>
          <div className="form-group">
            <label>Gender</label>
            <input type="text" name="gender" />
          </div>
        </div>
        <div className="separate">
          <div className="form-group">
            <label>Facebook</label>
            <input type="text" name="facebook" />
          </div>
          <div className="form-group">
            <label>Line</label>
            <input type="text" name="line" />
          </div>
        </div>
        <div className="separate">
          <div className="form-group">
            <label>Address</label>
            <input type="text" name="address" />
          </div>
          <div className="form-group">
            <label>Nationality</label>
            <input type="text" name="nationality" />
          </div>
        </div>
        <div className="separate">
          <div className="form-group">
            <label>Visa Type</label>
            <input type="text" name="visaType" />
          </div>
          <div className="form-group">
            <label>Job Name</label>
            <input type="text" name="jobName" />
          </div>
        </div>
        <div className="separate">
          <div className="form-group">
            <label>Company representative</label>
            <input type="text" name="companyRepresentative" />
          </div>
          <div className="form-group">
            <label>Inflow Source</label>
            <input type="text" name="inflowSource" />
          </div>
        </div>
        <div className="separate">
          <div className="form-group">
            <label>Payment</label>
            <input type="text" name="payment" />
          </div>
          <div className="form-group">
            <label>Insurance Status</label>
            <input type="text" name="insuranceStatus" />
          </div>
        </div>
        <div className="separate">
          <div className="form-group">
            <label>Insurance Support</label>
            <input type="text" name="insuranceSupport" />
          </div>
          <div className="form-group">
            <label>Insurance Start Date</label>
            <input type="text" name="insuranceStartDate" />
          </div>
        </div>
        <div className="separate">
          <div className="form-group">
            <label>Overseas Remittance Status</label>
            <input type="text" name="overseasRemittanceStatus" />
          </div>
          <div className="form-group">
            <label>Orientation</label>
            <input type="text" name="orientation" />
          </div>
        </div>
        <div className="separate">
          <div className="form-group">
            <label>Start Date Education</label>
            <input type="text" name="startDateEducation" />
          </div>
          <div className="form-group">
            <label>End Date Education</label>
            <input type="text" name="endDateEducation" />
          </div>
        </div>
        <div className="separate">
          <div className="form-group">
            <label>Education Status</label>
            <input type="text" name="educationStatus" />
          </div>
          <div className="form-group">
            <label>Wabisabi My Page Registration</label>
            <input type="text" name="wabisabiMyPageRegistration" />
          </div>
        </div>
      </form>
    </div>
  );
};

export default CommonProfileForm;
