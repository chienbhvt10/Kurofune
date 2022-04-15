import React from "react";
import Helmet from "react-helmet";
import "./style.scss";
export const ChangeProfile = () => {
  return (
    <>
      <Helmet>
        <meta charSet="utf-8" />
        <title>Change profile</title>
        <meta name="description" content="Change profile Page" />
        <meta name="og:title" content="Change profile" />
      </Helmet>
      <form>
        <div className="row">
          <div className="form-group">
            <label htmlFor="fullName">氏名 *</label>
            <input type="text" className="form-control-auth" id="fullName" />
          </div>
          <div className="form-group">
            <label htmlFor="postalCode">郵便番号 *</label>
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
                住所検索
              </button>
            </div>
          </div>
          <div className="form-group">
            <label htmlFor="Prefecture">都道府県 *</label>
            <select className="p-0 form-control-auth" aria-label="Default select example">
              <option selected>Open this select menu</option>
              <option value="1">One</option>
              <option value="2">Two</option>
              <option value="3">Three</option>
            </select>
            {/* <input type="text" className="form-control-auth" id="Prefecture" /> */}
          </div>
          <div className="form-group">
            <label htmlFor="city">市区町村 *</label>
            <input type="text" className="form-control-auth" id="city" />
          </div>
          <div className="form-group">
            <label htmlFor="street">丁目・番地・号 *</label>
            <input type="text" className="form-control-auth" id="street" />
          </div>
          <div className="form-group">
            <label htmlFor="building">建物名・部屋番号</label>
            <input type="text" className="form-control-auth" id="building" />
          </div>
          <div className="form-group">
            <label htmlFor="phone">電話番号 *</label>
            <input type="text" className="form-control-auth" id="phone" />
          </div>
          <div className="form-group">
            <label htmlFor="email">メールアドレス *</label>
            <input type="text" className="form-control-auth" id="email" />
          </div>
        </div>
      <button className="btn btn-primary d-block ml-auto" onClick={() =>{Alert("asda")}}>変更を保存する</button>

      </form>
    </>
  );
};
