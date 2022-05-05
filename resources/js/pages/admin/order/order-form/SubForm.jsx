import React from "react";
import * as Yup from "yup";

const credential = Yup.object().shape({});

const SubForm = ({ lang, className, formik, typeForm }) => {
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
          <label>First Name</label>
          <input
            id=""
            type="text"
            name="locale"
            className=""
            rows={4}
            onChange={formik.handleChange}
            value={formik.values.locale}
          />
          {renderErrorMessage("locale")}
        </div>
        <div className="form-group">
          <label>Last Name</label>
          <input
            id=""
            type="text"
            name="classification"
            className=""
            rows={4}
            onChange={formik.handleChange}
            value={formik.values.classification}
          />
          {renderErrorMessage("classification")}
        </div>
      </div>
      <div className="form-group">
        <label>Company</label>
        <input
          id=""
          type="text"
          name="locale"
          className=""
          rows={4}
          onChange={formik.handleChange}
          value={formik.values.locale}
        />
        {renderErrorMessage("locale")}
      </div>
      <div className="separate">
        <div className="form-group">
          <label>Address line 1</label>
          <input
            id=""
            type="text"
            name="locale"
            className=""
            rows={4}
            onChange={formik.handleChange}
            value={formik.values.locale}
          />
          {renderErrorMessage("locale")}
        </div>
        <div className="form-group">
          <label>Address line 2</label>
          <input
            id=""
            type="text"
            name="classification"
            className=""
            rows={4}
            onChange={formik.handleChange}
            value={formik.values.classification}
          />
          {renderErrorMessage("classification")}
        </div>
      </div>
      <div className="separate">
        <div className="form-group">
          <label>City</label>
          <input
            id=""
            type="text"
            name="locale"
            className=""
            rows={4}
            onChange={formik.handleChange}
            value={formik.values.locale}
          />
          {renderErrorMessage("locale")}
        </div>
        <div className="form-group">
          <label>Postcode / ZIP</label>
          <input
            id=""
            type="text"
            name="classification"
            className=""
            rows={4}
            onChange={formik.handleChange}
            value={formik.values.classification}
          />
          {renderErrorMessage("classification")}
        </div>
      </div>
      <div className="separate">
        <div className="form-group">
          <label>Country/Region</label>
          <input
            id=""
            type="text"
            name="locale"
            className=""
            rows={4}
            onChange={formik.handleChange}
            value={formik.values.locale}
          />
          {renderErrorMessage("locale")}
        </div>
        <div className="form-group">
          <label>State / County</label>
          <input
            id=""
            type="text"
            name="classification"
            className=""
            rows={4}
            onChange={formik.handleChange}
            value={formik.values.classification}
          />
          {renderErrorMessage("classification")}
        </div>
      </div>
      <div className="separate">
        {typeForm === "BILLING" ? (
          <div className="form-group">
            <label>Email address</label>
            <input
              id=""
              type="text"
              name="locale"
              className=""
              rows={4}
              onChange={formik.handleChange}
              value={formik.values.locale}
            />
            {renderErrorMessage("locale")}
          </div>
        ) : (
          <></>
        )}
        <div className="form-group">
          <label>Phone</label>
          <input
            id=""
            type="text"
            name="classification"
            className=""
            rows={4}
            onChange={formik.handleChange}
            value={formik.values.classification}
          />
          {renderErrorMessage("classification")}
        </div>
      </div>
      {typeForm === "BILLING" ? (
        <>
          <div className="form-group">
            <label>Payment method:</label>
            <select
              name="classification"
              className=""
              onChange={formik.handleChange}
              value={formik.values.classification}
            >
              <option value="">N/A</option>
              <option value="">Cash on delivery</option>
              <option value="">Other</option>
            </select>
            {renderErrorMessage("classification")}
          </div>
          <div className="form-group">
            <label>Transaction ID</label>
            <input
              id=""
              type="text"
              name="classification"
              className=""
              rows={4}
              onChange={formik.handleChange}
              value={formik.values.classification}
            />
            {renderErrorMessage("classification")}
          </div>
        </>
      ) : (
        <></>
      )}
      {typeForm === "SHIPPING" ? (
        <div className="form-group">
          <label>Transaction ID</label>
          <textarea
            id=""
            type="text"
            name="classification"
            className=""
            placeholder="Customer notes about the order"
            rows={2}
            onChange={formik.handleChange}
            value={formik.values.classification}
          />
          {renderErrorMessage("classification")}
        </div>
      ) : (
        <></>
      )}
    </form>
  );
};

export default SubForm;
