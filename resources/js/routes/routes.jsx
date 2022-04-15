import React from "react";
import { Routes, Route, BrowserRouter, useLocation } from "react-router-dom";
import { NotFound } from "../pages/notFound";
import { Login } from "../pages/auth/login";
import { Register } from "../pages/auth/register";
import { AuthLayout } from "../pages/auth/authLayout";
import LostPassword from "../pages/auth/forget-password";
import MediaPage from "../pages/media";
import HomeLayout from "../commons/layout/HomeLayout";
import MemberPage from "../pages/member";
import PharmaciesPage from "../pages/list-of-pharmacies";
import MedicineListPage from "../pages/medicine-list";
import ProductDetailPage from "../pages/product-detail";
import { LangAfterReload } from "../commons/Languges/langAfterReload";
import { useTranslation } from "react-i18next";
const appRouter = () => { 
  const { i18n } = useTranslation();
  const langUrl = i18n.language
  if(langUrl === 'vi' || langUrl === 'tl' || langUrl === 'en' || langUrl === 'zh'){
    localStorage.setItem('lang', window.location.pathname.slice(0, 3));
  }else{
    localStorage.setItem('lang', '');
  }
  let lang = localStorage.getItem('lang')
  return (
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<HomeLayout />} exact={true}>
        <Route path="member" element={<MemberPage />} exact={true} />
        <Route
          path={`/${lang}/list-of-pharmacies`}
          element={<PharmaciesPage />}
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
      </Route>
      <Route path="/" element={<AuthLayout />} exact={true}>
        <Route path={`/${lang}/login`} element={<Login />} exact={true} />
        <Route path={`/${lang}/register`} element={<Register />} exact={true} />
        <Route path={`/${lang}/lost-password`} element={<LostPassword />} exact={true} />
      </Route>
      <Route path="media" element={<MediaPage />} exact={true} />
      <Route path="*" element={<NotFound />} />
    </Routes>
    <LangAfterReload/>
  </BrowserRouter>
  
)};

export default appRouter;
