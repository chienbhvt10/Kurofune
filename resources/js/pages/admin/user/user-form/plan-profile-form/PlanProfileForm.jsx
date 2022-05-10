import React from "react";

const PlanProfileForm = ({ formik }) => {
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
            <input
              type="text"
              name="dob"
              value={formik.values.dob}
              onChange={formik.handleChange}
            />
          </div>
          <div className="form-group">
            <label>Gender</label>
            <input
              type="text"
              name="gender"
              value={formik.values.gender}
              onChange={formik.handleChange}
            />
          </div>
        </div>
        <div className="separate">
          <div className="form-group">
            <label>Facebook</label>
            <input
              type="text"
              name="facebook"
              value={formik.values.facebook}
              onChange={formik.handleChange}
            />
          </div>
          <div className="form-group">
            <label>Line</label>
            <input
              type="text"
              name="line"
              value={formik.values.line}
              onChange={formik.handleChange}
            />
          </div>
        </div>
        <div className="separate">
          <div className="form-group">
            <label>Address</label>
            <input
              type="text"
              name="address"
              value={formik.values.address}
              onChange={formik.handleChange}
            />
          </div>
          <div className="form-group">
            <label>Nationality</label>
            <input
              type="text"
              name="nationality"
              value={formik.values.nationality}
              onChange={formik.handleChange}
            />
          </div>
        </div>
        <div className="separate">
          <div className="form-group">
            <label>Visa Type</label>
            <input
              type="text"
              name="visaType"
              value={formik.values.visaType}
              onChange={formik.handleChange}
            />
          </div>
          <div className="form-group">
            <label>Job Name</label>
            <input
              type="text"
              name="jobName"
              value={formik.values.jobName}
              onChange={formik.handleChange}
            />
          </div>
        </div>
        <div className="separate">
          <div className="form-group">
            <label>Company representative</label>
            <input
              type="text"
              name="companyRepresentative"
              value={formik.values.companyRepresentative}
              onChange={formik.handleChange}
            />
          </div>
          <div className="form-group">
            <label>Inflow Source</label>
            <input
              type="text"
              name="inflowSource"
              value={formik.values.inflowSource}
              onChange={formik.handleChange}
            />
          </div>
        </div>
        <div className="separate">
          <div className="form-group">
            <label>Payment</label>
            <input
              type="text"
              name="payment"
              value={formik.values.payment}
              onChange={formik.handleChange}
            />
          </div>
          <div className="form-group">
            <label>Insurance Status</label>
            <input
              type="text"
              name="insuranceStatus"
              value={formik.values.insuranceStatus}
              onChange={formik.handleChange}
            />
          </div>
        </div>
        <div className="separate">
          <div className="form-group">
            <label>Insurance Support</label>
            <input
              type="text"
              name="insuranceSupport"
              value={formik.values.insuranceSupport}
              onChange={formik.handleChange}
            />
          </div>
          <div className="form-group">
            <label>Insurance Start Date</label>
            <input
              type="text"
              name="insuranceStartDate"
              value={formik.values.insuranceStartDate}
              onChange={formik.handleChange}
            />
          </div>
        </div>
        <div className="separate">
          <div className="form-group">
            <label>Overseas Remittance Status</label>
            <input
              type="text"
              name="overseasRemittanceStatus"
              value={formik.values.overseasRemittanceStatus}
              onChange={formik.handleChange}
            />
          </div>
          <div className="form-group">
            <label>Orientation</label>
            <input
              type="text"
              name="orientation"
              value={formik.values.orientation}
              onChange={formik.handleChange}
            />
          </div>
        </div>
        <div className="separate">
          <div className="form-group">
            <label>Start Date Education</label>
            <input
              type="text"
              name="startDateEducation"
              value={formik.values.startDateEducation}
              onChange={formik.handleChange}
            />
          </div>
          <div className="form-group">
            <label>End Date Education</label>
            <input
              type="text"
              name="endDateEducation"
              value={formik.values.endDateEducation}
              onChange={formik.handleChange}
            />
          </div>
        </div>
        <div className="separate">
          <div className="form-group">
            <label>Education Status</label>
            <input
              type="text"
              name="educationStatus"
              value={formik.values.educationStatus}
              onChange={formik.handleChange}
            />
          </div>
          <div className="form-group">
            <label>Wabisabi My Page Registration</label>
            <input
              type="text"
              name="wabisabiMyPageRegistration"
              value={formik.values.wabisabiMyPageRegistration}
              onChange={formik.handleChange}
            />
          </div>
        </div>
      </form>
    </div>
  );
};

export default PlanProfileForm;
