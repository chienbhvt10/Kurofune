import React from "react";

const SubFormCategoryTranslate = ({ lang, className, formik }) => {
  const renderErrorMessage = (field) => {
    return (
      formik.touched[field] && (
        <div className="form-error">{formik.errors[field]}</div>
      )
    );
  };
  return (
    <form className={className}>
      <div className="form-group">
        <label>({lang}) Locale </label>
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
        <label>({lang}) Cat</label>
        <input
          id=""
          type="text"
          name="Cat"
          className=""
          rows={4}
          onChange={formik.handleChange}
          value={formik.values.cat}
        />
        {renderErrorMessage("cat")}
      </div>
      <div className="form-group">
        <label>({lang}) Name</label>
        <input
          id=""
          type="text"
          name="name"
          className=""
          rows={4}
          onChange={formik.handleChange}
          value={formik.values.name}
        />
        {renderErrorMessage("name")}
      </div>
    </form>
  );
};

export default SubFormCategoryTranslate;
