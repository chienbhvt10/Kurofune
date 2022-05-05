import { useFormik } from "formik";
import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import FormHeader from "../../../../commons/FormHeader";
import UploadDragger from "../../../../commons/UploadDragger";
import CommonProfileForm from "./CommonProfileForm";
import "./user-form.scss";
import VendorProfileForm from "./VendorProfileForm";

export const UserForm = ({ item, typeForm, onCancel, onSave }) => {
  const { i18n, t } = useTranslation();
  const [currentRole, setCurrentRole] = useState("");
  const lang = localStorage.getItem("lang");
  const initialValues = {};
  const formik = useFormik({
    initialValues: initialValues,
  });
  return (
    <div className="user-container">
      <FormHeader
        breadcrumb={[
          { name: "Home", routerLink: "../" },
          { name: "User List", routerLink: `${lang}/admin/user-list` },
          {
            name: "Update",
            routerLink: `${lang}/admin/user/update`,
          },
        ]}
        title="Update User"
        onCancel={onCancel}
      />
      <div className="form-content">
        <div className="common-info">
          <form enctype="multipart/form-data">
            <div className="control-avatar">
              <UploadDragger title="Avatar" name="avatar" />
            </div>
            <div className="control-field">
              <div className="form-group">
                <label>Role</label>
                <select
                  name="role"
                  aria-label="Default select example"
                  value={currentRole}
                  onChange={(e) => setCurrentRole(e.target.value)}
                >
                  <option value="">Open this select menu</option>
                  <option value="vendor">Vendor</option>
                  <option value="user">User</option>
                  <option value="another">Another</option>
                </select>
              </div>
              <div className="form-group">
                <label>Name</label>
                <input type="text" name="name" />
              </div>
              <div className="form-group">
                <label>Email</label>
                <input type="email" name="email" />
              </div>
              <div className="form-group">
                <label>Username</label>
                <input type="text" name="username" />
              </div>
              <div className="form-group">
                <label>Password</label>
                <input type="password" name="password" />
              </div>
            </div>
          </form>
        </div>
        <div className="translate-role">
          {currentRole === "vendor" ? (
            <VendorProfileForm />
          ) : (
            <CommonProfileForm />
          )}
        </div>
      </div>
    </div>
  );
};
