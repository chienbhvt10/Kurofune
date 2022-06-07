import React, { useEffect } from "react";
import { useTranslation } from "react-i18next";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { navigateLinkAdminData, navigateLinkData } from "../commons/data";
import { LangAfterReload } from "../commons/Languges/langAfterReload";
import HomeLayout from "../commons/layout/HomeLayout";
import {
  LANG_CHINESE,
  LANG_ENGLISH,
  LANG_JAPANESE,
  LANG_PHILIPPINES,
  LANG_VIETNAMESE,
  USER_ROLES,
} from "../constants";
import { getCurrentLanguage, setCurrentLanguage } from "../helper/localStorage";
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
import { Login } from "../pages/auth/login";
import ResetLinkPassword from "../pages/auth/reset-link-password";
import ResetPassword from "../pages/auth/reset-password";
import BillingAddress from "../pages/client/billing-address";
import Cart from "../pages/client/cart";
import CategoryListPage from "../pages/client/category-list";
import CategoryListDetail from "../pages/client/category-list-detail";
import CheckoutPage from "../pages/client/checkout";
import MediaPage from "../pages/client/media";
import MemberPage from "../pages/client/member";
import OrderDetailPage from "../pages/client/order-detail";
import OrderHistoryPage from "../pages/client/order-history";
import PharmacyDetail from "../pages/client/pharmacy-detail";
import PharmacyList from "../pages/client/pharmacy-list";
import ProductDetailPage from "../pages/client/product-detail";
import { Questionnaire } from "../pages/client/questionnaire";
import { Service24H } from "../pages/client/service-24";
import ShippingAddress from "../pages/client/shipping-address";
import { ChangePassword } from "../pages/client/user-info/change-password";
import { ChangeProfile } from "../pages/client/user-info/change-profile";
import { UserLayout } from "../pages/client/user-info/user-layout";
import { NotFound } from "../pages/notFound";
import PrivateRoute from "../commons/PrivateRoute/PrivateRoute";
import { useSelector } from "react-redux";
import useShowProfile from "../hooks/auth/useShowProfile";
import { isAdmin, isVendor } from "../helper/roles";
const appRouter = () => {
  const { i18n } = useTranslation();
  const { profile, userInfo } = useSelector((state) => state.authState);
  const langUrl = i18n.language;
  if (
    langUrl === LANG_VIETNAMESE ||
    langUrl === LANG_PHILIPPINES ||
    langUrl === LANG_ENGLISH ||
    langUrl === LANG_CHINESE ||
    langUrl === LANG_JAPANESE
  ) {
    let checkUrl = window.location.pathname;
    if (
      checkUrl.indexOf("/vi/") !== -1 ||
      checkUrl.indexOf("/tl/") !== -1 ||
      checkUrl.indexOf("/en/") !== -1 ||
      checkUrl.indexOf("/zh/") !== -1 ||
      checkUrl.indexOf("/ja/") !== -1
    ) {
      setCurrentLanguage(window.location.pathname.slice(0, 3));
    } else {
      setCurrentLanguage("");
    }
  } else {
    setCurrentLanguage("");
  }
  const lang = getCurrentLanguage();
  const { showProfile } = useShowProfile();
  useEffect(() => {
    showProfile();
  }, []);

  return (
    <BrowserRouter>
      <Routes>
        {(profile?.roles || userInfo?.roles?.name) && (
          <Route
            path={`/`}
            element={
              <Navigate
                to={
                  isAdmin(profile?.roles) || isAdmin(userInfo?.roles?.name)
                    ? `${lang}/admin`
                    : isVendor(profile?.roles) ||
                      isVendor(userInfo?.roles?.name)
                    ? `${lang}/admin/product-list`
                    : `${lang}/media`
                }
              />
            }
            exact={true}
          />
        )}
        <Route
          path={`/${lang}/`}
          element={
            <PrivateRoute>
              <HomeLayout
                navigateLinkData={navigateLinkData}
                styleColor={"#62A19B"}
              />
            </PrivateRoute>
          }
        >
          <Route
            path={`category-list`}
            element={<CategoryListPage />}
            exact={true}
          />
          <Route
            path={`category-list-detail/:id`}
            element={<CategoryListDetail />}
            exact={true}
          />
          <Route
            path={`product-detail/:id`}
            element={<ProductDetailPage />}
            exact={true}
          />
          <Route
            path={`list-of-pharmacies`}
            element={<PharmacyList />}
            exact={true}
          />
          <Route
            path={`pharmacy-detail/:id`}
            element={<PharmacyDetail />}
            exact={true}
          />
          <Route path={`cart`} element={<Cart />} exact={true}></Route>
          <Route path={`checkout`} element={<CheckoutPage />} exact={true} />
        </Route>
        <Route
          path={`/${lang}/media`}
          element={
            <PrivateRoute>
              <MediaPage />
            </PrivateRoute>
          }
          exact={true}
        />

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

        <Route
          path={`/${lang}/member`}
          element={
            <PrivateRoute>
              <HomeLayout
                navigateLinkData={navigateLinkData}
                styleColor={"#62A19B"}
              />
            </PrivateRoute>
          }
          exact={true}
        >
          <Route
            path={""}
            exact={true}
            element={<Navigate to="questionnaire" />}
          />
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
          path={`/${lang}/member`}
          element={
            <PrivateRoute>
              <UserLayout />
            </PrivateRoute>
          }
          exact={true}
        >
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
          path={`${lang}/admin`}
          element={
            <PrivateRoute roles={[USER_ROLES.ADMIN, USER_ROLES.VENDOR]}>
              <HomeLayout
                navigateLinkData={navigateLinkAdminData}
                styleColor={"#2C3338"}
              />
            </PrivateRoute>
          }
          exact={true}
        >
          <Route path={""} exact={true} element={<Navigate to="user-list" />} />
          <Route
            path={`user-list`}
            element={
              <PrivateRoute roles={[USER_ROLES.ADMIN]}>
                <UserList />
              </PrivateRoute>
            }
            exact={true}
          />
          <Route
            path={`user-create`}
            element={
              <PrivateRoute roles={[USER_ROLES.ADMIN]}>
                <AddUser />
              </PrivateRoute>
            }
            exact={true}
          />
          <Route
            path={`user-update/:id`}
            element={
              <PrivateRoute roles={[USER_ROLES.ADMIN]}>
                <UpdateUser />
              </PrivateRoute>
            }
            exact={true}
          />
          <Route path={`product-list`} element={<ProductList />} exact={true} />
          <Route path={`product/add`} element={<AddProduct />} exact={true} />
          <Route
            path={`product/update/:id`}
            element={<UpdateProduct />}
            exact={true}
          />
          <Route
            path={`category-list`}
            element={
              <PrivateRoute roles={[USER_ROLES.ADMIN]}>
                <CategoryList />
              </PrivateRoute>
            }
            exact={true}
          />
          <Route
            path={`category/add`}
            element={
              <PrivateRoute roles={[USER_ROLES.ADMIN]}>
                <AddCategory />
              </PrivateRoute>
            }
            exact={true}
          />
          <Route
            path={`category/update/:id`}
            element={
              <PrivateRoute roles={[USER_ROLES.ADMIN]}>
                <UpdateCategory />
              </PrivateRoute>
            }
            exact={true}
          />
          <Route
            path={`log-chatbot`}
            element={
              <PrivateRoute roles={[USER_ROLES.ADMIN]}>
                <LogChatBot />
              </PrivateRoute>
            }
            exact={true}
          />
          <Route
            path={`log-questionnaire`}
            element={
              <PrivateRoute roles={[USER_ROLES.ADMIN]}>
                <LogQuestionnaire />
              </PrivateRoute>
            }
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
        <Route
          path={`/${lang}/service-24h`}
          element={
            <PrivateRoute roles={[USER_ROLES.ADMIN]}>
              <Service24H />
            </PrivateRoute>
          }
        />
        <Route path="*" element={<NotFound />} />
      </Routes>
      <LangAfterReload />
    </BrowserRouter>
  );
};

export default appRouter;
