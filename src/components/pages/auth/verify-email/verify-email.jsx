import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";

const BASE_URL = import.meta.env.VITE_BASE_URL;

const EmailVerificationConfirmationPage = () => {
  const { token } = useParams();
  const navigate = useNavigate();

  const [verificationStatus, setVerificationStatus] = useState(null);
  const [errorMessage, setErrorMessage] = useState(null);

  const verifyEmail = async () => {
    try {
      const response = await axios.get(
        `${BASE_URL}/auth/verify-email/${token}`
      );
      const { data } = response;

      if (data.success) {
        setVerificationStatus("success");
      } else {
        setVerificationStatus("error");
        setErrorMessage(data.message);
      }
    } catch (error) {
      setVerificationStatus("error");
      setErrorMessage("Failed to verify email. Please try again.");
    }
  };

  useEffect(() => {
    if (token) {
      verifyEmail();
    }
  }, [token]);

  const renderVerificationMessage = () => {
    if (verificationStatus === "success") {
      return (
        <div>
          <h1>Email Verified!</h1>
          <p>Your email has been successfully verified.</p>
          <button onClick={() => navigate("/login")}>Go to Login</button>
        </div>
      );
    } else if (verificationStatus === "error") {
      return (
        <div>
          <h1>Verification Error</h1>
          <p>{errorMessage}</p>
        </div>
      );
    } else {
      return (
        <div>
          <h1>Verifying Email...</h1>
          <p>Please wait while we verify your email address.</p>
        </div>
      );
    }
  };

  return (
    <main className="bg-off_white min-h-screen flex items-center justify-center p-8 md:p-0">
      <div className="bg-white shadow-lg flex flex-col items-center rounded-rmd overflow-hidden lg:max-w-lg">
        <div className="w-full p-8 text-center">
          {renderVerificationMessage()}
        </div>
      </div>
    </main>
  );
};

export default EmailVerificationConfirmationPage;
