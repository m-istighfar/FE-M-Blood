/* eslint-disable no-unused-vars */
import HomePage from "./components/pages/home/home-page";
import { Routes, Route, Navigate } from "react-router-dom";
import LoginPage from "./components/pages/auth/login-page/login-page";
import RegisterPage from "./components/pages/auth/register-page";
import ForgotPasswordPage from "./components/pages/auth/forgot-password/forgot-password";
import ResetPasswordConfirmationPage from "./components/pages/auth/reset-password-confirmation";
import CreateNewPasswordPage from "./components/pages/auth/create-new-password/create-new-password";
import NewPasswordSetConfirmationPage from "./components/pages/auth/new-password-set-confirmation";
import DonateBloodPage from "./components/pages/donate-blood/donate-blood-page";
import HostBloodDrivePage from "./components/pages/host-blood-drive/host-blood-drive";
import NeedBloodPage from "./components/pages/need-blood/need-blood-page";
import ContactPage from "./components/pages/contact/contact-page";
import DonateMoneyPage from "./components/pages/donate-money/donate-money";
import Admin from "./components/layouts/admin";

import Dashboard from "../src/components/views/admin/dashboard";
import AdminDonateBlood from "../src/components/views/admin/admin-donate-blood";
import AdminNeedBlood from "../src/components/views/admin/admin-need-blood";
import AdminHostBloodDrive from "../src/components/views/admin/admin-host-blood-drive";
import AdminNeedHelp from "../src/components/views/admin/admin-need-help";

export default function App() {
  return (
    <>
      {/* <HeaderComponent /> */}
      {/* <BrowserRouter> */}
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/forgot-password" element={<ForgotPasswordPage />} />
        <Route
          path="/reset-password-confirmation"
          element={<ResetPasswordConfirmationPage />}
        />
        <Route
          path="/reset-password/:resetToken"
          element={<CreateNewPasswordPage />}
        />
        <Route
          path="/new-password-set-confirmation"
          element={<NewPasswordSetConfirmationPage />}
        />

        <Route exact path="/" element={<HomePage />} />
        <Route path="/host-blood-drive" element={<HostBloodDrivePage />} />
        <Route path="/donate-money" element={<DonateMoneyPage />} />
        <Route path="/donate-blood" element={<DonateBloodPage />} />
        <Route path="/need-blood" element={<NeedBloodPage />} />
        <Route path="/contact" element={<ContactPage />} />
        <Route path="/admin" element={<Admin />}>
          <Route index element={<Dashboard />} />
          <Route path="donate-blood" element={<AdminDonateBlood />} />
          <Route path="need-blood" element={<AdminNeedBlood />} />
          <Route path="host-blood-drive" element={<AdminHostBloodDrive />} />
          <Route path="need-help" element={<AdminNeedHelp />} />
          {/* <Route path="/redirect" element={<Navigate to="/" />} /> */}
        </Route>
      </Routes>
      {/* </BrowserRouter> */}
      {/* <BeforeFooterCTA />
			<FooterComponent /> */}
    </>
  );
}
