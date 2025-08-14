import { ThemeProvider } from "./providers/theme-provider";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Route, Routes } from "react-router";
import { Toaster } from "sonner";
import { SuspenseWrapper } from "./components/shared/suspense-warpper";
import { AuthLayout } from "./components/layouts/auth-layout";
import { MainLayout } from "./components/layouts/main-layout";
import { HomePage } from "./pages/home-page";
import { lazy } from "react";

const NotFound = lazy(() => import("@/pages/not-found-page"));
const AuthPage = lazy(() => import("@/pages/auth-page"));
const AccoutSettingPage = lazy(() => import("@/pages/account-setting-page"));
const SecuritySettingPage = lazy(() => import("@/pages/security-setting-page"));
const ShopPage = lazy(() => import("@/pages/shop-page"));
const ProductDetails = lazy(() => import("@/pages/product-details-page"));
const AboutUs = lazy(() => import("@/pages/about-us-page"));
const ContactUs = lazy(() => import("@/pages/contact-us-page"));
const Checkout = lazy(() => import("@/pages/checkout-page"));

const queryClient = new QueryClient();

export default function App() {
  return (
    <ThemeProvider>
      <QueryClientProvider client={queryClient}>
        <Routes>
          {/* Main layout and its children */}
          <Route element={<MainLayout />}>
            <Route index element={<HomePage />} />
            <Route
              path="/profile/settings"
              element={
                <SuspenseWrapper>
                  <AccoutSettingPage />
                </SuspenseWrapper>
              }
            />
            <Route
              path="/profile/security"
              element={
                <SuspenseWrapper>
                  <SecuritySettingPage />
                </SuspenseWrapper>
              }
            />
            <Route
              path="/shop"
              element={
                <SuspenseWrapper>
                  <ShopPage />
                </SuspenseWrapper>
              }
            />
            <Route
              path="/shop/:id"
              element={
                <SuspenseWrapper>
                  <ProductDetails />
                </SuspenseWrapper>
              }
            />
            <Route
              path="/about-us"
              element={
                <SuspenseWrapper>
                  <AboutUs />
                </SuspenseWrapper>
              }
            />
            <Route
              path="/contact-us"
              element={
                <SuspenseWrapper>
                  <ContactUs />
                </SuspenseWrapper>
              }
            />
            <Route
              path="/checkout"
              element={
                <SuspenseWrapper>
                  <Checkout />
                </SuspenseWrapper>
              }
            />
          </Route>

          {/* Auth layout and its children */}
          <Route path="/auth/:pathname" element={<AuthLayout />}>
            <Route
              index
              element={
                <SuspenseWrapper>
                  <AuthPage />
                </SuspenseWrapper>
              }
            />
            <Route
              path="*"
              element={
                <SuspenseWrapper>
                  <AuthPage />
                </SuspenseWrapper>
              }
            />
          </Route>

          {/* Catch all route for 404 */}
          <Route
            path="*"
            element={
              <SuspenseWrapper>
                <NotFound />
              </SuspenseWrapper>
            }
          />
        </Routes>

        <Toaster dir="rtl" />
      </QueryClientProvider>
    </ThemeProvider>
  );
}
