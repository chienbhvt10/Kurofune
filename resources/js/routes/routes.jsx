import React from "react";
import App from "./../pages/client/home/index";
import { Routes, Route, BrowserRouter } from "react-router-dom";
import { NotFound } from "../pages/notFound";
import { Login } from "../pages/auth/login";
import { Register } from "../pages/auth/register";
import { AuthLayout } from "../pages/auth/authLayout";
import LostPassword from "../pages/auth/forget-password";
import MediaPage from "../pages/media";
import HomeLayout from "../commons/layout/HomeLayout";
import MemberPage from "../pages/member";
const appRouter = () => (
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<HomeLayout />} exact={true}>
        <Route path="member" element={<MemberPage />} exact={true} />
      </Route>
      <Route path="/" element={<AuthLayout />} exact={true}>
        <Route path="login" element={<Login />} exact={true} />
        <Route path="register" element={<Register />} exact={true} />
        <Route path="lost-password" element={<LostPassword />} exact={true} />
      </Route>
      <Route path="media" element={<MediaPage />} exact={true} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  </BrowserRouter>
);

export default appRouter;
