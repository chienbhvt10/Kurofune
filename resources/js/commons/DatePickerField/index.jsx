import React from "react";
import moment from "moment";
import DatePicker from "react-datepicker";
const DatePickerField = ({ formik, field }) => {
  return (
    <>
      <DatePicker
        name={field}
        dateFormat="yyyy-MM-dd"
        selected={
          (formik.values?.[field] && new Date(formik.values?.[field])) ||
          new Date()
        }
        value={formik.values?.[field] || new Date()}
        onChange={(date) =>
          formik.setFieldValue(
            field,
            moment(date, "YYYY-MM-DD").format("YYYY-MM-DD")
          )
        }
      />
    </>
  );
};

export default DatePickerField;
