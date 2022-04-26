import React from "react";
import { useTranslation } from "react-i18next";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { navigateLinkData, navigateLinkAdminData } from "../commons/data";
import { LangAfterReload } from "../commons/Languges/langAfterReload";
import HomeLayout from "../commons/layout/HomeLayout";
import AddProduct from "../pages/admin/product/product-add";
import ProductList from "../pages/admin/product/product-list";
import UpdateProduct from "../pages/admin/product/product-update";
import { UserItem } from "../pages/admin/user/user-item";
import { UserList } from "../pages/admin/user/user-list";
import { AuthLayout } from "../pages/auth/authLayout";
import LostPassword from "../pages/auth/forget-password";
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
        <Route
          path="/"
          element={
            <HomeLayout
              navigateLinkData={navigateLinkData}
              styleColor={"#62A19B"}
            />
          }
          exact={true}
        >
          <Route
            path={`/${lang}/member`}
            element={<MemberPage />}
            exact={true}
          />
          <Route
            path={`/${lang}/medicine-list`}
            element={<MedicineListPage />}
            exact={true}
          />
          <Route
            path={`/${lang}/product-detail`}
            element={<ProductDetailPage />}
            exact={true}
          />
          <Route
            path={`/${lang}/list-of-pharmacies`}
            element={<PharmaciesPage />}
            exact={true}
          />
          <Route path={`/${lang}/cart`} element={<Cart />} exact={true}></Route>
          <Route
            path={`/${lang}/checkout`}
            element={<CheckoutPage />}
            exact={true}
          />
        </Route>
        <Route path="/" element={<AuthLayout />} exact={true}>
          <Route path={`/${lang}/login`} element={<Login />} exact={true} />
          <Route
            path={`/${lang}/lost-password`}
            element={<LostPassword />}
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
          <Route
            path={`user-create`}
            element={<UserItem identify={"create"} />}
            exact={true}
          />
          <Route
            path={`user-update/:id`}
            element={<UserItem identify={"update"} />}
            exact={true}
          />
          <Route path={`product-list`} element={<ProductList />} exact={true} />
          <Route path={`product/add`} element={<AddProduct />} exact={true} />
          <Route
            path={`product/update`}
            element={<UpdateProduct />}
            exact={true}
          />
        </Route>
        <Route path={`/${lang}/media`} element={<MediaPage />} exact={true} />
        <Route path={`/${lang}/service-24h`} element={<Service24H />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
      <LangAfterReload />
    </BrowserRouter>
  );
};

export default appRouter;
