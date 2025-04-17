import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import { ThemeProvider } from "@/components/theme-provider";
import { Toaster } from "@/components/ui/sonner";
import { BrowserRouter, Routes, Route } from "react-router";
import Dashboard from "@/pages/dashboard.tsx";
import Signup from "@/pages/auth/signup.tsx";
import Confirm from "@/pages/auth/confirm.tsx";
import Error from "@/pages/auth/error.tsx";
import ForgotPassword from "@/pages/auth/forgot-password.tsx";
import ResetPassword from "@/pages/auth/reset-password.tsx";
import AuthLayout from "@/pages/auth/layout.tsx";
import Admin from "@/pages/protected/admin.tsx";
import ProtectedLayout from "@/pages/protected/layout.tsx";
import Login from "@/pages/auth/login.tsx";
import Profile from "@/pages/protected/settings/profile.tsx";
import Appearance from "@/pages/protected/settings/appearance/index.tsx";
import Notifications from "@/pages/protected/settings/notifications/index.tsx";
import Display from "@/pages/protected/settings/display/index.tsx";
import SettingsLayout from "@/pages/protected/settings/layout.tsx";
import Account from "@/pages/protected/settings/account/index.tsx";
import Onboarding from "@/pages/protected/onboarding/index.tsx";
import Tes from "@/pages/examples/tes.tsx";
import OnboardingPage from "@/pages/examples/onboarding.tsx";
import CreateNewUser from "./pages/auth/create-new-user.tsx";
import AccountStatus from "./pages/protected/account-status.tsx";

createRoot(document.getElementById("root")!).render(
  <ThemeProvider defaultTheme="light" storageKey="vite-ui-theme">
    <BrowserRouter>
      <Routes>
        {/* TES */}
        <Route path="/tes" element={<Tes />} />

        {/* HOME */}
        <Route index path="/" element={<App />} />

        {/* AUTH */}
        <Route element={<AuthLayout />}>
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />

          <Route path="/auth/confirm" element={<Confirm />} />
          <Route path="/auth/error" element={<Error />} />

          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/reset-password" element={<ResetPassword />} />
        </Route>

        {/* AUTH CALLBACK */}
        {/* <Route path="/auth/callback" element={<AuthCallback />} /> */}

        {/* PROTECTED */}
        <Route element={<ProtectedLayout />}>
          <Route path="/admin" element={<Admin />} />

          {/* SETTINGS */}
          <Route element={<SettingsLayout />}>
            <Route path="/settings/profile" element={<Profile />} />
            <Route path="/settings/account" element={<Account />} />
            <Route path="/settings/appearance" element={<Appearance />} />
            <Route path="/settings/notifications" element={<Notifications />} />
            <Route path="/settings/display" element={<Display />} />
          </Route>

          {/* DASHBOARD */}
          <Route path="/dashboard" element={<Dashboard />} />

          {/* ONBOARDING */}
          <Route path="/onboarding" element={<Onboarding />} />

          {/* BANNER INFO */}
          <Route path="/account-status" element={<AccountStatus />} />

          {/* EXAMPLE ONBOARDING */}
          <Route path="/example/onboarding" element={<OnboardingPage />} />
        </Route>

        <Route path="/create-new-user" element={<CreateNewUser />} />
      </Routes>
    </BrowserRouter>
    <Toaster richColors position="top-center" />
  </ThemeProvider>
);
