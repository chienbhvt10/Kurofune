/**
 * First we will load all of this project's JavaScript dependencies which
 * includes React and other helpers. It's a great starting point while
 * building robust, powerful web applications using React + Laravel.
 */

require("./bootstrap");

/**
 * Next, we will create a fresh React component instance and attach it to
 * the page. Then, you may begin adding components to this application
 * or customize the JavaScript scaffolding to fit your unique needs.
 */

import React from "react";
import { render } from "react-dom";
import { I18nextProvider } from "react-i18next";
import { Provider } from "react-redux";
import "antd/dist/antd.css";
import "../less/app.less";
import store from "./redux/store";
import Routes from "./routes/routes";
import i18n from "./translate/i18n";
import { ConfigProvider } from 'antd';

let composeEnhancers = null;
if (
  process.env.NODE_ENV === "development" &&
  window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
) {
  composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__;
} else {
  // composeEnhancers = compose
}
render(
  <Provider store={store}>
     <ConfigProvider getPopupContainer={(triggerNode) =>(triggerNode?.parentNode) || document.body}>
      <I18nextProvider i18n={i18n}>
        <Routes />
      </I18nextProvider>
      </ConfigProvider>
  </Provider>,
  document.getElementById("app")
);
