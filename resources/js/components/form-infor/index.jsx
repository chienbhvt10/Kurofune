import React from "react";
import { useTranslation } from "react-i18next";
import "./style.scss";
export const FormInfor = () => {
  const { i18n, t } = useTranslation();
  return (
    <>
      <form>
        <div className="row">
          <div className="form-group">
            <label htmlFor="fullName">{t('member.change_profile.field_full_name')} *</label>
            <input type="text" className="form-control-auth" id="fullName" />
          </div>
          <div className="form-group">
            <label htmlFor="postalCode">{t('member.change_profile.field_postal')} *</label>
            <div id="postalCode" className="input-postal-code">
              <input
                type="text"
                className="form-control-postal-code mr-2"
                id="toPostalCode"
              />
              {"-"}
              <input
                type="text"
                className="form-control-postal-code ml-2"
                id="FromPostalCode"
              />
              <button type="button" className="btn-search">
              {t('member.change_profile.btn_search')}
              </button>
            </div>
          </div>
          <div className="form-group">
            <label htmlFor="Prefecture">{t('member.change_profile.field_prefecture')} *</label>
            <select
              className="p-0 form-control-auth"
              defaultValue={"Open this select menu"}
              aria-label="Default select example"
            >
              <option>Open this select menu</option>
              <option value="1">One</option>
              <option value="2">Two</option>
              <option value="3">Three</option>
            </select>
          </div>
          <div className="form-group">
            <label htmlFor="city"> {t('member.change_profile.field_city')} *</label>
            <input type="text" className="form-control-auth" id="city" />
          </div>
          <div className="form-group">
            <label htmlFor="street"> {t('member.change_profile.field_street')} *</label>
            <input type="text" className="form-control-auth" id="street" />
          </div>
          <div className="form-group">
            <label htmlFor="building"> {t('member.change_profile.field_building')}</label>
            <input type="text" className="form-control-auth" id="building" />
          </div>
          <div className="form-group">
            <label htmlFor="phone"> {t('member.change_profile.field_phone')} *</label>
            <input type="text" className="form-control-auth" id="phone" />
          </div>
          <div className="form-group">
            <label htmlFor="email"> {t('member.change_profile.field_email')} *</label>
            <input type="text" className="form-control-auth" id="email" />
          </div>
        </div>
        <button
          className="btn btn-primary d-block ml-auto"
          onClick={() => {
            Alert("asda");
          }}
        >
           {t('member.user_profile.btn_save')}
        </button>
      </form>
    </>
  );
};
