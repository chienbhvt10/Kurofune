import React from "react";
import { useSelector } from "react-redux";
import RenderApiErrorMessage from "../../../../../commons/RenderErrorMessage/RenderApiErrorMessage";
import RenderFormikErrorMessage from "../../../../../commons/RenderErrorMessage/RenderFormikErrorMessage";

const SubFormUserTranslate = ({ lang, className, formik }) => {
  const errorMessage = useSelector((state) => state.userState.errorMessage);
  return (
    <form className={className}>
      <div className="separate">
        <div className="form-group">
          <label>({lang}) Locale </label>
          <input
            type="text"
            name="locale"
            value={formik.values.locale}
            onChange={formik.handleChange}
          />
          <RenderFormikErrorMessage
            formikInstance={formik}
            field="orientation"
          />
          <RenderApiErrorMessage
            errorMessage={errorMessage}
            field="orientation"
          />
        </div>
        <div className="form-group">
          <label>({lang}) Name </label>
          <input
            type="text"
            name="name"
            value={formik.values.name}
            onChange={formik.handleChange}
          />
          <RenderFormikErrorMessage formikInstance={formik} field="name" />
          <RenderApiErrorMessage errorMessage={errorMessage} field="name" />
        </div>
      </div>
      <div className="separate">
        <div className="form-group">
          <label>({lang}) Permit classification </label>
          <textarea
            type="text"
            name="permit_classification"
            value={formik.values.permit_classification}
            onChange={formik.handleChange}
          />
          <RenderFormikErrorMessage
            formikInstance={formik}
            field="permit_classification"
          />
          <RenderApiErrorMessage
            errorMessage={errorMessage}
            field="permit_classification"
          />
        </div>
        <div className="form-group">
          <label>({lang}) Founder </label>
          <textarea
            type="text"
            name="founder"
            value={formik.values.founder}
            onChange={formik.handleChange}
          />
          <RenderFormikErrorMessage formikInstance={formik} field="founder" />
          <RenderApiErrorMessage errorMessage={errorMessage} field="founder" />
        </div>
      </div>
      <div className="separate">
        <div className="form-group">
          <label>({lang}) Items to be stated in the permit </label>
          <textarea
            type="text"
            name="items_stated_permit"
            value={formik.values.items_stated_permit}
            onChange={formik.handleChange}
          />
          <RenderFormikErrorMessage
            formikInstance={formik}
            field="items_stated_permit"
          />
          <RenderApiErrorMessage
            errorMessage={errorMessage}
            field="items_stated_permit"
          />
        </div>
        <div className="form-group">
          <label>({lang}) Management pharmacist </label>
          <textarea
            type="text"
            name="management_pharmacist"
            value={formik.values.management_pharmacist}
            onChange={formik.handleChange}
          />
          <RenderFormikErrorMessage
            formikInstance={formik}
            field="management_pharmacist"
          />
          <RenderApiErrorMessage
            errorMessage={errorMessage}
            field="management_pharmacist"
          />
        </div>
      </div>
      <div className="separate">
        <div className="form-group">
          <label>({lang}) Registered Seller Working </label>
          <textarea
            type="text"
            name="registered_seller_working"
            value={formik.values.registered_seller_working}
            onChange={formik.handleChange}
          />
          <RenderFormikErrorMessage
            formikInstance={formik}
            field="registered_seller_working"
          />
          <RenderApiErrorMessage
            errorMessage={errorMessage}
            field="registered_seller_working"
          />
        </div>
        <div className="form-group">
          <label>({lang}) Drugs Handled </label>
          <textarea
            type="text"
            name="drugs_handled"
            value={formik.values.drugs_handled}
            onChange={formik.handleChange}
          />
          <RenderFormikErrorMessage
            formikInstance={formik}
            field="drugs_handled"
          />
          <RenderApiErrorMessage
            errorMessage={errorMessage}
            field="drugs_handled"
          />
        </div>
      </div>
      <div className="separate">
        <div className="form-group">
          <label>({lang}) Distinguishing by name </label>
          <textarea
            type="text"
            name="distinguishing_by_name"
            value={formik.values.distinguishing_by_name}
            onChange={formik.handleChange}
          />
          <RenderFormikErrorMessage
            formikInstance={formik}
            field="distinguishing_by_name"
          />
          <RenderApiErrorMessage
            errorMessage={errorMessage}
            field="distinguishing_by_name"
          />
        </div>
        <div className="form-group">
          <label>({lang}) Business Hours </label>
          <textarea
            type="text"
            name="business_hours"
            value={formik.values.business_hours}
            onChange={formik.handleChange}
          />
          <RenderFormikErrorMessage
            formikInstance={formik}
            field="business_hours"
          />
          <RenderApiErrorMessage
            errorMessage={errorMessage}
            field="business_hours"
          />
        </div>
      </div>
      <div className="separate">
        <div className="form-group">
          <label>({lang}) Consultation Hours </label>
          <textarea
            type="text"
            name="consultation_hours"
            value={formik.values.consultation_hours}
            onChange={formik.handleChange}
          />
          <RenderFormikErrorMessage
            formikInstance={formik}
            field="consultation_hours"
          />
          <RenderApiErrorMessage
            errorMessage={errorMessage}
            field="consultation_hours"
          />
        </div>
        <div className="form-group">
          <label>({lang}) Contact Information </label>
          <textarea
            type="text"
            name="contact_information"
            value={formik.values.contact_information}
            onChange={formik.handleChange}
          />
          <RenderFormikErrorMessage
            formikInstance={formik}
            field="contact_information"
          />
          <RenderApiErrorMessage
            errorMessage={errorMessage}
            field="contact_information"
          />
        </div>
      </div>
      <div className="separate">
        <div className="form-group">
          <label>({lang}) Currently Working </label>
          <textarea
            type="text"
            name="currently_working"
            value={formik.values.currently_working}
            onChange={formik.handleChange}
          />
          <RenderFormikErrorMessage
            formikInstance={formik}
            field="currently_working"
          />
          <RenderApiErrorMessage
            errorMessage={errorMessage}
            field="currently_working"
          />
        </div>
        <div className="form-group">
          <label>({lang}) Open Sale Time </label>
          <textarea
            type="text"
            name="open_sale_time"
            value={formik.values.open_sale_time}
            onChange={formik.handleChange}
          />
          <RenderFormikErrorMessage
            formikInstance={formik}
            field="open_sale_time"
          />
          <RenderApiErrorMessage
            errorMessage={errorMessage}
            field="open_sale_time"
          />
        </div>
      </div>
      <div className="separate">
        <div className="form-group">
          <label>({lang})Time Order Outside</label>
          <textarea
            type="text"
            name="time_order_outside"
            value={formik.values.time_order_outside}
            onChange={formik.handleChange}
          />
          <RenderFormikErrorMessage
            formikInstance={formik}
            field="time_order_outside"
          />
          <RenderApiErrorMessage
            errorMessage={errorMessage}
            field="time_order_outside"
          />
        </div>
        <div className="form-group">
          <label>({lang})Expiration Date Of Drug</label>
          <textarea
            type="text"
            name="expiration_date_of_drugs"
            value={formik.values.expiration_date_of_drugs}
            onChange={formik.handleChange}
          />
          <RenderFormikErrorMessage
            formikInstance={formik}
            field="expiration_date_of_drugs"
          />
          <RenderApiErrorMessage
            errorMessage={errorMessage}
            field="expiration_date_of_drugs"
          />
        </div>
      </div>
    </form>
  );
};

export default SubFormUserTranslate;
