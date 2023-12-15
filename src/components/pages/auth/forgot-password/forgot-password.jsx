import { useState } from "react";
import { useForm } from "react-hook-form";
import { Dialog } from "@headlessui/react";
import { useNavigate } from "react-router-dom";
import "tailwindcss/tailwind.css";

import { requestPasswordReset } from "../api";

const ForgotPasswordPage = () => {
  const [modalState, setModalState] = useState({
    isOpen: false,
    type: "",
    message: "",
  });
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    try {
      await requestPasswordReset({ email: data.email });
      setModalState({
        isOpen: true,
        type: "success",
        message:
          "If your email is registered, you will receive a password reset link.",
      });
    } catch (error) {
      setModalState({
        isOpen: true,
        type: "error",
        message:
          error.response?.data?.error || "Failed to send password reset link.",
      });
    }
  };

  const closeModal = () => {
    setModalState({ isOpen: false, type: "", message: "" });
    if (modalState.type === "success") {
      navigate("/login");
    }
  };

  return (
    <main className="bg-off_white min-h-screen flex items-center justify-center p-8 md:p-0">
      <div className="bg-white shadow-lg flex flex-col items-center rounded-rmd overflow-hidden lg:max-w-lg">
        <div className="w-full p-8">
          <h1 className="font-bold text-red text-3xl mb-16">
            Forgot your password?
          </h1>
          <p className="mb-8">
            Enter your email address below and we&apos;ll send you a link to
            reset your password.
          </p>
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="flex flex-col space-y-4"
          >
            <div>
              <label htmlFor="email" className="block mb-2 text-dark_gray">
                Email Address
              </label>
              <input
                id="email"
                type="email"
                {...register("email", { required: "Email is required" })}
                placeholder="youremail@example.com"
                className="w-full px-4 py-2 border-2 border-gray rounded-rsm focus:border-dark_red focus:outline-none"
              />
              {errors.email && (
                <p className="text-red-500">{errors.email.message}</p>
              )}
            </div>
            <button
              type="submit"
              className="bg-dark_red hover:bg-red text-white font-medium text-lg px-4 py-2 rounded-rsm transition-colors duration-200"
            >
              Send Reset Link
            </button>
          </form>
          <p className="mt-6 text-gray">
            Remembered your password?{" "}
            <a href="/login" className="text-dark_red font-semibold underline">
              Sign in
            </a>
          </p>
        </div>
      </div>

      <Dialog
        open={modalState.isOpen}
        onClose={closeModal}
        className="relative z-50"
      >
        <div className="fixed inset-0 bg-black/30" aria-hidden="true" />
        <div className="fixed inset-0 flex items-center justify-center p-4">
          <Dialog.Panel className="w-full max-w-md rounded bg-white p-6">
            <Dialog.Title className="text-lg font-medium leading-6 text-gray-900">
              {modalState.type === "success" ? "Request Sent" : "Error"}
            </Dialog.Title>
            <Dialog.Description className="mt-2">
              {modalState.message}
            </Dialog.Description>
            <button
              onClick={closeModal}
              className="mt-4 bg-dark_red hover:bg-red text-white font-medium text-lg px-4 py-2 rounded-rsm transition-colors duration-200"
            >
              OK
            </button>
          </Dialog.Panel>
        </div>
      </Dialog>
    </main>
  );
};

export default ForgotPasswordPage;
