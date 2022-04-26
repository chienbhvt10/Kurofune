import React from "react";
import { useTranslation } from "react-i18next";
import FormHeader from "../../../../commons/FormHeader";

import "./style.scss";
export const UserItem = ({ identify }) => {
  const { i18n, t } = useTranslation();
  return (
    <div className="user-container">
      <FormHeader
        breadcrumb={[
          { name: "Home", routerLink: "../" },
          { name: "User List", routerLink: "/admin/user-list" },
          { name: "Add", routerLink: "/admin/product/add" },
        ]}
        title="Add User"
        onCancel={() => {}}
      />
      <form className="mt-3">
        <div className="row">
          <div className="form-group">
            <label htmlFor="Username">
              {t("admins.user.create.form_infor.field_username")} *
            </label>
            <input type={"text"} className="form-control-auth" id="Username" />
          </div>
          <div className="form-group">
            <label htmlFor="Name">
              {t("admins.user.create.form_infor.field_name")} *
            </label>
            <input type={"text"} className="form-control-auth" id="Name" />
          </div>
          <div className="form-group">
            <label htmlFor="Email">
              {t("admins.user.create.form_infor.field_email")} *
            </label>
            <input type={"email"} className="form-control-auth" id="Email" />
          </div>
          <div className="form-group">
            <label htmlFor="Avatar">
              {t("admins.user.create.form_infor.field_avatar")} *
            </label>
            <input
              class="form-control form-control-sm"
              id="Avatar"
              type="file"
            />
          </div>
          <div className="form-group">
            <label htmlFor="role">
              {t("admins.user.create.form_infor.field_role")} *
            </label>
            <select class="form-select" aria-label="Default select example">
              <option value="">Open this select menu</option>
              <option value="1">One</option>
              <option value="2">Two</option>
              <option value="3">Three</option>
            </select>
          </div>
        </div>
      </form>
    </div>
  );
};
