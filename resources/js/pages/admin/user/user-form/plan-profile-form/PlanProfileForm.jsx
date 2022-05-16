import moment from "moment";
import React from "react";
import "react-datepicker/dist/react-datepicker.css";
import { useSelector } from "react-redux";
import DatePickerField from "../../../../../commons/DatePickerField";
import RenderApiErrorMessage from "../../../../../commons/RenderErrorMessage/RenderApiErrorMessage";
import RenderFormikErrorMessage from "../../../../../commons/RenderErrorMessage/RenderFormikErrorMessage";
const PlanProfileForm = ({ formik, className }) => {
  const response = useSelector((state) => state.userState.response);

  return (
    <div className={`common-profile-form ${className}`}>
      <form>
        <div className="separate">
          <div className="form-group">
            <label>DOB</label>
            <DatePickerField formik={formik} field="dob" />
            <RenderFormikErrorMessage formikInstance={formik} field="dob" />
            <RenderApiErrorMessage response={response} field="dob" />
          </div>
          <div className="form-group">
            <label>Gender</label>
            <select
              name="gender"
              value={formik.values.gender}
              onChange={formik.handleChange}
            >
              <option value="0">MALE</option>
              <option value="1">FEMALE</option>
            </select>
            <RenderFormikErrorMessage formikInstance={formik} field="gender" />
            <RenderApiErrorMessage response={response} field="gender" />
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
            <RenderFormikErrorMessage
              formikInstance={formik}
              field="facebook"
            />
            <RenderApiErrorMessage response={response} field="facebook" />
          </div>
          <div className="form-group">
            <label>Line</label>
            <input
              type="text"
              name="line"
              value={formik.values.line}
              onChange={formik.handleChange}
            />
            <RenderFormikErrorMessage formikInstance={formik} field="line" />
            <RenderApiErrorMessage response={response} field="line" />
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
            <RenderFormikErrorMessage formikInstance={formik} field="address" />
            <RenderApiErrorMessage response={response} field="address" />
          </div>
          <div className="form-group">
            <label>Nationality</label>
            <input
              type="text"
              name="nationality"
              value={formik.values.nationality}
              onChange={formik.handleChange}
            />
            <RenderFormikErrorMessage
              formikInstance={formik}
              field="nationality"
            />
            <RenderApiErrorMessage response={response} field="nationality" />
          </div>
        </div>
        <div className="separate">
          <div className="form-group">
            <label>Visa Type</label>
            <input
              type="text"
              name="visa_type"
              value={formik.values.visa_type}
              onChange={formik.handleChange}
            />
            <RenderFormikErrorMessage
              formikInstance={formik}
              field="visa_type"
            />
            <RenderApiErrorMessage response={response} field="visa_type" />
          </div>
          <div className="form-group">
            <label>Job Name</label>
            <input
              type="text"
              name="job_name"
              value={formik.values.job_name}
              onChange={formik.handleChange}
            />
            <RenderFormikErrorMessage
              formikInstance={formik}
              field="job_name"
            />
            <RenderApiErrorMessage response={response} field="job_name" />
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
            <RenderFormikErrorMessage
              formikInstance={formik}
              field="company_representative"
            />
            <RenderApiErrorMessage
              response={response}
              field="company_representative"
            />
          </div>
          <div className="form-group">
            <label>Inflow Source</label>
            <input
              type="text"
              name="inflow_source"
              value={formik.values.inflow_source}
              onChange={formik.handleChange}
            />
            <RenderFormikErrorMessage
              formikInstance={formik}
              field="inflow_source"
            />
            <RenderApiErrorMessage response={response} field="inflow_source" />
          </div>
        </div>
        <div className="separate">
          <div className="form-group">
            <label>Payment</label>
            <select
              name="payment"
              value={formik.values.gender}
              onChange={formik.handleChange}
            >
              <option value="1">Yes</option>
              <option value="0">No</option>
            </select>
            <RenderFormikErrorMessage formikInstance={formik} field="gender" />
            <RenderApiErrorMessage response={response} field="gender" />
          </div>
          <div className="form-group">
            <label>Insurance Status</label>
            <select
              name="insurance_status"
              value={formik.values.insurance_status}
              onChange={formik.handleChange}
            >
              <option value="1">1</option>
              <option value="2">2</option>
              <option value="3">3</option>
              <option value="4">4</option>
              <option value="5">5</option>
              <option value="6">6</option>
            </select>
            <RenderFormikErrorMessage
              formikInstance={formik}
              field="insurance_status"
            />
            <RenderApiErrorMessage
              response={response}
              field="insurance_status"
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
            <RenderFormikErrorMessage
              formikInstance={formik}
              field="insurance_support"
            />
            <RenderApiErrorMessage
              response={response}
              field="insurance_support"
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
            <RenderFormikErrorMessage
              formikInstance={formik}
              field="insurance_start_date"
            />
            <RenderApiErrorMessage
              response={response}
              field="insurance_start_date"
            />
          </div>
        </div>
        <div className="separate">
          <div className="form-group">
            <label>Overseas Remittance Status</label>
            <select
              name="overseas_remittance_status"
              value={formik.values.overseas_remittance_status}
              onChange={formik.handleChange}
            >
              <option value="0">UNREGISTERED </option>
              <option value="1">REGISTERED</option>
            </select>
            <RenderFormikErrorMessage
              formikInstance={formik}
              field="overseas_remittance_status"
            />
            <RenderApiErrorMessage
              response={response}
              field="overseas_remittance_status"
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
            <RenderFormikErrorMessage
              formikInstance={formik}
              field="orientation"
            />
            <RenderApiErrorMessage response={response} field="orientation" />
          </div>
        </div>
        <div className="separate">
          <div className="form-group">
            <label>Start Date Education</label>
            <DatePickerField formik={formik} field="start_date_education" />
            <RenderFormikErrorMessage
              formikInstance={formik}
              field="start_date_education"
            />
            <RenderApiErrorMessage
              response={response}
              field="start_date_education"
            />
          </div>
          <div className="form-group">
            <label>End Date Education</label>
            <DatePickerField formik={formik} field="end_date_education" />
            <RenderFormikErrorMessage
              formikInstance={formik}
              field="end_date_education"
            />
            <RenderApiErrorMessage
              response={response}
              field="end_date_education"
            />
          </div>
        </div>
        <div className="separate">
          <div className="form-group">
            <label>Education Status</label>
            <select
              name="education_status"
              value={formik.values.education_status}
              onChange={formik.handleChange}
            >
              <option value="1">EDU_N1 </option>
              <option value="2">EDU_N2 </option>
              <option value="3">EDU_N3 </option>
              <option value="4">EDU_N4 </option>
              <option value="5">EDU_N5 </option>
              <option value="6">EDU_N0 </option>
              <option value="7">EDU_UNREGISTERED </option>
              <option value="8">EDU_UNDER_ERASURE </option>
            </select>
            <RenderFormikErrorMessage
              formikInstance={formik}
              field="education_status"
            />
            <RenderApiErrorMessage
              response={response}
              field="education_status"
            />
          </div>
          <div className="form-group">
            <label>Wabisabi My Page Registration</label>
            <select
              name="wabisabi_my_page_registration"
              value={formik.values.wabisabi_my_page_registration}
              onChange={formik.handleChange}
            >
              <option value="1">Yes</option>
              <option value="0">No</option>
            </select>
            <RenderFormikErrorMessage
              formikInstance={formik}
              field="wabisabi_my_page_registration"
            />
            <RenderApiErrorMessage
              response={response}
              field="wabisabi_my_page_registration"
            />
          </div>
        </div>
      </form>
    </div>
  );
};

export default PlanProfileForm;
