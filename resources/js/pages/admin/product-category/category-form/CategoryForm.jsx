import { useFormik } from "formik";
import React from "react";
import * as Yup from "yup";
import FormHeader from "../../../../commons/FormHeader";
import "./category-form.scss";
import TranslateCategoryForm from "./TranslateCategoryForm";

const credential = Yup.object().shape({});
const CategoryForm = ({ item, typeForm, title, onCancel, onSave }) => {
  const initialCommonValues = {
    user: "",
    slug: "",
    categoryImage: "",
    type: "",
  };

  const formik = useFormik({
    initialValues: initialCommonValues,
    validationSchema: credential,
    onSubmit: () => {
      const submitInput = {
        ...formik.values,
        ja: {
          ...formikJP.values,
        },
        vi: {
          ...formikVI.values,
        },
        tl: {
          ...formikTL.values,
        },
        zh: {
          ...formikZH.values,
        },
        en: {
          ...formikEN.values,
        },
      };
      console.log("submit input ", submitInput);
    },
  });
  const initialTranslateValues = {
    cat: "",
    locale: "",
    name: "",
  };
  const formikJP = useFormik({
    initialValues: item?.ja || initialTranslateValues,
    validationSchema: credential,
  });
  const formikVI = useFormik({
    initialValues: item?.vi || initialTranslateValues,
    validationSchema: credential,
  });
  const formikTL = useFormik({
    initialValues: item?.tl || initialTranslateValues,
    validationSchema: credential,
  });
  const formikEN = useFormik({
    initialValues: item?.en || initialTranslateValues,
    validationSchema: credential,
  });
  const formikZH = useFormik({
    initialValues: item?.zh || initialTranslateValues,
    validationSchema: credential,
  });

  const renderErrorMessage = (field) => {
    return (
      formik.touched[field] && (
        <div className="form-error">{formik.errors[field]}</div>
      )
    );
  };
  return (
    <div id="category-form">
      <form onSubmit={formik.handleSubmit}>
        <FormHeader
          breadcrumb={[
            { name: "Home", routerLink: "../" },
            { name: "Category List", routerLink: "/admin/category-list" },
            { name: "Add", routerLink: "/admin/category/add" },
          ]}
          title={title}
          onCancel={onCancel}
        />
        <div className="form-group">
          <label>User</label>
          <input
            id=""
            type="text"
            name="user"
            className=""
            onChange={formik.handleChange}
            value={formik.values.user}
          />
          {renderErrorMessage("user")}
        </div>
        <div className="form-group">
          <label>Slug</label>
          <input
            id=""
            type="text"
            name="slug"
            className=""
            onChange={formik.handleChange}
            value={formik.values.slug}
          />
          {renderErrorMessage("slug")}
        </div>
        <div className="form-group">
          <label>Image</label>
          <input
            id=""
            type="text"
            name="categoryImage"
            className=""
            onChange={formik.handleChange}
            value={formik.values.categoryImage}
          />
          {renderErrorMessage("categoryImage")}
        </div>
      </form>
      <TranslateCategoryForm
        formikEN={formikEN}
        formikJP={formikJP}
        formikTL={formikTL}
        formikVI={formikVI}
        formikZH={formikZH}
      />
    </div>
  );
};

export default CategoryForm;
