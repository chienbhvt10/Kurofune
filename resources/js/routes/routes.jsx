import React from "react";
import { Routes, Route, BrowserRouter, useLocation } from "react-router-dom";
import { NotFound } from "../pages/notFound";
import { Login } from "../pages/auth/login";
import { Register } from "../pages/auth/register";
import { AuthLayout } from "../pages/auth/authLayout";
import LostPassword from "../pages/auth/forget-password";
import HomeLayout from "../commons/layout/HomeLayout";
import MemberPage from "../pages/client/member";
import PharmaciesPage from "../pages/client/list-of-pharmacies";
import MedicineListPage from "../pages/client/medicine-list";
import ProductDetailPage from "../pages/client/product-detail";
import OrderHistoryPage from "../pages/client/order-history";
import OrderDetailPage from "../pages/client/order-detail";
import { UserLayout } from "../pages/client/user-info/user-layout";
import { LangAfterReload } from "../commons/Languges/langAfterReload";
import { ChangePassword } from "../pages/client/user-info/change-password";
import { ChangeProfile } from "../pages/client/user-info/change-profile";
import MediaPage from "../pages/client/media";
import { useTranslation } from "react-i18next";
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
    let checkUrl =  window.location.pathname;
    if(
      checkUrl.indexOf("/vi/") !== -1  ||
      checkUrl.indexOf("/tl/") !== -1 ||
      checkUrl.indexOf("/en/") !== -1 ||
      checkUrl.indexOf("/zh/") !== -1 ||
      checkUrl.indexOf("/ja/") !== -1
    ){
        localStorage.setItem("lang", window.location.pathname.slice(0, 3));
    }else{
      localStorage.setItem("lang", "");
    }
  } else {
    localStorage.setItem("lang", "");
  }
  let lang = localStorage.getItem("lang");
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomeLayout />} exact={true}>
          <Route path="member" element={<MemberPage />} exact={true} />
          <Route
            path={`/${lang}/list-of-pharmacies`}
            element={<OrderHistoryPage />}
            exact={true}
          />
          <Route
            path="medicine-list"
            element={<MedicineListPage />}
            exact={true}
          />
          <Route
            path="product-detail"
            element={<ProductDetailPage />}
            exact={true}
          />
          <Route
            path="list-of-pharmacies"
            element={<PharmaciesPage />}
            exact={true}
          />
        </Route>
        <Route path="/" element={<AuthLayout />} exact={true}>
          <Route path={`/${lang}/login`} element={<Login />} exact={true} />
          <Route
            path={`/${lang}/register`}
            element={<Register />}
            exact={true}
          />
          <Route
            path={`/${lang}/lost-password`}
            element={<LostPassword />}
            exact={true}
          />
        </Route>
        <Route path="member" element={<UserLayout />} exact={true}>
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
        <Route path="member" element={<HomeLayout />} exact={true}>
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
        </Route>
        <Route path="media" element={<MediaPage />} exact={true} />
        <Route path="*" element={<NotFound />} />
      </Routes>
      <LangAfterReload />
    </BrowserRouter>
  );
};

export default appRouter;
