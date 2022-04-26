import { useFormik } from "formik";
import React from "react";

const SubFormProductTranslate = ({ lang, className, formik }) => {
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
          <label>({lang}) Locale </label>
          <textarea
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
          <label>({lang}) Medicinal efficacy classification</label>
          <textarea
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
          <label>({lang}) Features</label>
          <textarea
            id=""
            type="text"
            name="features"
            className=""
            rows={4}
            onChange={formik.handleChange}
            value={formik.values.features}
          />
          {renderErrorMessage("features")}
        </div>
        <div className="form-group">
          <label>({lang}) Precautions</label>
          <textarea
            id=""
            type="text"
            name="precautions"
            className=""
            rows={4}
            onChange={formik.handleChange}
            value={formik.values.precautions}
          />
          {renderErrorMessage("precautions")}
        </div>
      </div>
      <div className="separate">
        <div className="form-group">
          <label>({lang}) Efficacy Effect</label>
          <textarea
            id=""
            type="text"
            name="efficacyEffect"
            className=""
            rows={4}
            onChange={formik.handleChange}
            value={formik.values.efficacyEffect}
          />
          {renderErrorMessage("efficacyEffect")}
        </div>
        <div className="form-group">
          <label>({lang}) Usage Does</label>
          <textarea
            id=""
            type="text"
            name="usageDoes"
            className=""
            rows={4}
            onChange={formik.handleChange}
            value={formik.values.usageDoes}
          />
          {renderErrorMessage("name")}
        </div>
      </div>
      <div className="separate">
        <div className="form-group">
          <label>({lang}) Active Ingredients</label>
          <textarea
            id=""
            type="text"
            name="activeIngredients"
            className=""
            rows={4}
            onChange={formik.handleChange}
            value={formik.values.activeIngredients}
          />
          {renderErrorMessage("activeIngredients")}
        </div>
        <div className="form-group">
          <label>({lang}) Additives</label>
          <textarea
            id=""
            type="text"
            name="additives"
            className=""
            rows={4}
            onChange={formik.handleChange}
            value={formik.values.additives}
          />
          {renderErrorMessage("additives")}
        </div>
      </div>
      <div className="separate">
        <div className="form-group">
          <label>({lang}) Precautions Storage Handling</label>
          <textarea
            id=""
            type="text"
            name="precautions Storage Handling"
            className=""
            rows={4}
            onChange={formik.handleChange}
            value={formik.values.precautionsStorageHandling}
          />
          {renderErrorMessage("Precautions Storage Handling")}
        </div>
        <div className="form-group">
          <label>({lang}) Manufacturer </label>
          <textarea
            id=""
            type="text"
            name="manufacturer"
            className=""
            rows={4}
            onChange={formik.handleChange}
            value={formik.values.manufacturer}
          />
          {renderErrorMessage("manufacturer")}
        </div>
      </div>
    </form>
  );
};

export default SubFormProductTranslate;
