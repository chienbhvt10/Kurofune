import React, { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { navigateLinkAdminData, navigateLinkData } from "../commons/data";
import { LangAfterReload } from "../commons/Languges/langAfterReload";
import HomeLayout from "../commons/layout/HomeLayout";
import PrivateRoute from "../commons/PrivateRoute/PrivateRoute";
import LogChatBot from "../pages/admin/log-chatbot";
import LogQuestionnaire from "../pages/admin/log-questionnaire";
import AddOrder from "../pages/admin/order/order-add";
import OrderList from "../pages/admin/order/order-list";
import UpdateOrder from "../pages/admin/order/order-update";
import AddCategory from "../pages/admin/product-category/category-add";
import CategoryList from "../pages/admin/product-category/category-list";
import UpdateCategory from "../pages/admin/product-category/category-update";
import AddProduct from "../pages/admin/product/product-add";
import ProductList from "../pages/admin/product/product-list";
import UpdateProduct from "../pages/admin/product/product-update";
import AddUser from "../pages/admin/user/user-add";
import { UserList } from "../pages/admin/user/user-list";
import UpdateUser from "../pages/admin/user/user-update";
import { AuthLayout } from "../pages/auth/authLayout";
import ForgotPassword from "../pages/auth/forgot-password";
import ResetLinkPassword from "../pages/auth/reset-link-password";
import ResetPassword from "../pages/auth/reset-password";
import { Login } from "../pages/auth/login";
import BillingAddress from "../pages/client/billing-address";
import Cart from "../pages/client/cart";
import CheckoutPage from "../pages/client/checkout";
import PharmaciesPage from "../pages/client/list-of-pharmacies";
import MediaPage from "../pages/client/media";
import MedicineListPage from "../pages/client/medicine-list";
import MemberPage from "../pages/client/member";
import OrderDetailPage from "../pages/client/order-detail";
import OrderHistoryPage from "../pages/client/order-history";
import ProductDetailPage from "../pages/client/product-detail";
import { Questionnaire } from "../pages/client/questionnaire";
import { Service24H } from "../pages/client/service-24";
import ShippingAddress from "../pages/client/shipping-address";
import { ChangePassword } from "../pages/client/user-info/change-password";
import { ChangeProfile } from "../pages/client/user-info/change-profile";
import { UserLayout } from "../pages/client/user-info/user-layout";
import { NotFound } from "../pages/notFound";
import { authApis } from "../services/auth-apis";

const appRouter = () => {
  const { i18n } = useTranslation();
  const langUrl = i18n.language;
  if (
    langUrl === "vi" ||
    langUrl === "tl" ||
    langUrl === "en" ||
    langUrl === "zh" ||
    langUrl === "ja"
  ) {
    let checkUrl = window.location.pathname;
    if (
      checkUrl.indexOf("/vi/") !== -1 ||
      checkUrl.indexOf("/tl/") !== -1 ||
      checkUrl.indexOf("/en/") !== -1 ||
      checkUrl.indexOf("/zh/") !== -1 ||
      checkUrl.indexOf("/ja/") !== -1
    ) {
      localStorage.setItem("lang", window.location.pathname.slice(0, 3));
    } else {
      localStorage.setItem("lang", "");
    }
  } else {
    localStorage.setItem("lang", "");
  }
  let lang = localStorage.getItem("lang");

  return (
    <BrowserRouter>
      <Routes>
        <Route
          path={`/`}
          element={<Navigate to={`${lang}/member`} />}
          exact={true}
        />
        <Route path={`/${lang}/media`} element={<MediaPage />} exact={true} />
        <Route
          path={`/${lang}/`}
          element={
            <HomeLayout
              navigateLinkData={navigateLinkData}
              styleColor={"#62A19B"}
            />
          }
          exact={true}
        >
          <Route path={`member`} element={<MemberPage />} exact={true} />
          <Route
            path={`medicine-list`}
            element={<MedicineListPage />}
            exact={true}
          />
          <Route
            path={`product-detail`}
            element={<ProductDetailPage />}
            exact={true}
          />
          <Route
            path={`list-of-pharmacies`}
            element={<PharmaciesPage />}
            exact={true}
          />
          <Route path={`cart`} element={<Cart />} exact={true}></Route>
          <Route path={`checkout`} element={<CheckoutPage />} exact={true} />
        </Route>
        <Route path={`/${lang}/`} element={<AuthLayout />} exact={true}>
          <Route path={`login`} element={<Login />} exact={true} />
          <Route
            path={`forgot-password`}
            element={<ForgotPassword />}
            exact={true}
          />
          <Route
            path={`reset-link-password`}
            element={<ResetLinkPassword />}
            exact={true}
          />
          <Route
            path={`reset-password`}
            element={<ResetPassword />}
            exact={true}
          />
        </Route>
        <Route path={`/${lang}/member`} element={<UserLayout />} exact={true}>
          <Route
            path="change-password"
            element={<ChangePassword />}
            exact={true}
          />
          <Route
            path="change-profile"
            element={<ChangeProfile />}
            exact={true}
          />
        </Route>
        <Route
          path={`/${lang}/member`}
          element={
            <HomeLayout
              navigateLinkData={navigateLinkData}
              styleColor={"#62A19B"}
            />
          }
          exact={true}
        >
          <Route
            path="order-history"
            element={<OrderHistoryPage />}
            exact={true}
          />
          <Route
            path="order-detail"
            element={<OrderDetailPage />}
            exact={true}
          />
          <Route
            path="shipping-address"
            element={<ShippingAddress />}
            exact={true}
          />
          <Route
            path="billing-address"
            element={<BillingAddress />}
            exact={true}
          />
          <Route
            path="questionnaire"
            element={<Questionnaire />}
            exact={true}
          />
        </Route>
        <Route
          path={`${lang}/admin`}
          element={<Navigate to={`user-list`} />}
          exact={true}
        />
        <Route
          path={`${lang}/admin`}
          element={
            <HomeLayout
              navigateLinkData={navigateLinkAdminData}
              styleColor={"#2C3338"}
            />
          }
          exact={true}
        >
          <Route path={`user-list`} element={<UserList />} exact={true} />
          <Route path={`user-create`} element={<AddUser />} exact={true} />
          <Route
            path={`user-update/:id`}
            element={<UpdateUser />}
            exact={true}
          />
          <Route path={`product-list`} element={<ProductList />} exact={true} />
          <Route path={`product/add`} element={<AddProduct />} exact={true} />
          <Route
            path={`product/update`}
            element={<UpdateProduct />}
            exact={true}
          />
          <Route
            path={`category-list`}
            element={<CategoryList />}
            exact={true}
          />
          <Route path={`category/add`} element={<AddCategory />} exact={true} />
          <Route
            path={`category/update`}
            element={<UpdateCategory />}
            exact={true}
          />
          <Route path={`log-chatbot`} element={<LogChatBot />} exact={true} />
          <Route
            path={`log-questionnaire`}
            element={<LogQuestionnaire />}
            exact={true}
          />

          <Route path={`order-list`} element={<OrderList />} exact={true} />

          <Route path={`order-add`} element={<AddOrder />} exact={true} />
          <Route
            path={`order-update/:id`}
            element={<UpdateOrder />}
            exact={true}
          />
        </Route>
        <Route path={`/${lang}/service-24h`} element={<Service24H />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
      <LangAfterReload />
    </BrowserRouter>
  );
};

export default appRouter;
