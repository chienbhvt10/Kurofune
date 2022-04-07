import React from "react";
import App from "./../pages/client/home/index";
import { Routes, Route, BrowserRouter } from "react-router-dom";
import { NotFound } from "../pages/notFound";
import { Login } from "../pages/auth/login";
import { Register } from "../pages/auth/register";
import { AuthLayout } from "../pages/auth/authLayout";
const appRouter = () => (
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<App />} exact={true} />
      <Route path="/" element={<AuthLayout />} exact={true}>
        <Route path="login" element={<Login />} exact={true} />
        <Route path="register" element={<Register />} exact={true} />
      </Route>
      <Route path="*" element={<NotFound />} />
    </Routes>
  </BrowserRouter>
);

export default appRouter;
