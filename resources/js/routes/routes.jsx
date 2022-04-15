import React from "react";
import { Routes, Route, BrowserRouter } from "react-router-dom";
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
import { UserLayout } from "../pages/client/user-info/user-layout";
import { ChangePassword } from "../pages/client/user-info/change-password";
import { ChangeProfile } from "../pages/client/user-info/change-profile";
const appRouter = () => (
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<HomeLayout />} exact={true}>
        <Route path="member" element={<MemberPage />} exact={true} />
        <Route
          path="list-of-pharmacies"
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
        <Route path="login" element={<Login />} exact={true} />
        <Route path="register" element={<Register />} exact={true} />
        <Route path="lost-password" element={<LostPassword />} exact={true} />
      </Route>
      <Route path="member" element={<UserLayout />} exact={true}>
        <Route
          path="change-password"
          element={<ChangePassword />}
          exact={true}
        />
        <Route path="change-profile" element={<ChangeProfile />} exact={true} />
      </Route>
      <Route path="media" element={<MediaPage />} exact={true} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  </BrowserRouter>
);

export default appRouter;
