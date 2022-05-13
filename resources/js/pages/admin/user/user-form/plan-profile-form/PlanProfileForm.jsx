import React from "react";

const PlanProfileForm = ({ formik, className }) => {
  const renderErrorMessage = (field) => {
    return (
      formik.touched[field] && (
        <div className="form-error">{formik.errors[field]}</div>
      )
    );
  };
  return (
    <div className={`common-profile-form ${className}`}>
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
              value={formik.values.visa_type}
              onChange={formik.handleChange}
            />
          </div>
          <div className="form-group">
            <label>Job Name</label>
            <input
              type="text"
              name="job_name"
              value={formik.values.job_name}
              onChange={formik.handleChange}
            />
          </div>
        </div>
        <div className="separate">
          <div className="form-group">
            <label>Company representative</label>
            <input
              type="text"
              name="company_representative"
              value={formik.values.company_representative}
              onChange={formik.handleChange}
            />
          </div>
          <div className="form-group">
            <label>Inflow Source</label>
            <input
              type="text"
              name="inflowSource"
              value={formik.values.inflow_source}
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
              name="insurance_status"
              value={formik.values.insurance_status}
              onChange={formik.handleChange}
            />
          </div>
        </div>
        <div className="separate">
          <div className="form-group">
            <label>Insurance Support</label>
            <input
              type="text"
              name="insurance_support"
              value={formik.values.insurance_support}
              onChange={formik.handleChange}
            />
          </div>
          <div className="form-group">
            <label>Insurance Start Date</label>
            <input
              type="text"
              name="insurance_start_date"
              value={formik.values.insurance_start_date}
              onChange={formik.handleChange}
            />
          </div>
        </div>
        <div className="separate">
          <div className="form-group">
            <label>Overseas Remittance Status</label>
            <input
              type="text"
              name="overseas_remittance_status"
              value={formik.values.overseas_remittance_status}
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
              name="start_date_education"
              value={formik.values.start_date_education}
              onChange={formik.handleChange}
            />
          </div>
          <div className="form-group">
            <label>End Date Education</label>
            <input
              type="text"
              name="end_date_education"
              value={formik.values.end_date_education}
              onChange={formik.handleChange}
            />
          </div>
        </div>
        <div className="separate">
          <div className="form-group">
            <label>Education Status</label>
            <input
              type="text"
              name="education_status"
              value={formik.values.education_status}
              onChange={formik.handleChange}
            />
          </div>
          <div className="form-group">
            <label>Wabisabi My Page Registration</label>
            <input
              type="text"
              name="wabisabi_my_page_registration"
              value={formik.values.wabisabi_my_page_registration}
              onChange={formik.handleChange}
            />
          </div>
        </div>
      </form>
    </div>
  );
};

export default PlanProfileForm;
