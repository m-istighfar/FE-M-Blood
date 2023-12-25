import { useState } from "react";
import { useForm } from "react-hook-form";
import { Dialog } from "@headlessui/react";
import { useNavigate } from "react-router-dom";
import "tailwindcss/tailwind.css";
import bd5Image from "../../../../assets/images/bd5.jpg";

import { loginUser } from "../api";

const LoginPage = () => {
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
      const response = await loginUser(data);
      localStorage.setItem("accessToken", response.data.accessToken);
      localStorage.setItem("userLoggedIn", "true");
      localStorage.setItem("userRole", response.data.role);

      const userRole = response.data.role;

      setModalState({
        isOpen: true,
        type: "success",
        message: "Login successful. Redirecting...",
      });

      setTimeout(() => {
        if (userRole === "admin") {
          window.location.replace("/admin");
        } else {
          window.location.replace("/");
        }
      }, 2000);
    } catch (error) {
      setModalState({
        isOpen: true,
        type: "error",
        message: error.response?.data?.error || "Login failed",
      });
    }
  };

  const closeModal = () => {
    setModalState({ isOpen: false, type: "", message: "" });
    if (modalState.type === "success") {
      navigate("/");
    }
  };

  return (
    <main className="bg-off_white min-h-screen flex items-center justify-center p-8 md:p-0">
      <div className="bg-white shadow-lg flex flex-col items-center rounded-rmd overflow-hidden lg:flex-row lg:w-2/3 2xl:w-1/2">
        <div className="lg:w-1/2 p-8 sm:p-8">
          <h1 className="font-bold text-red text-3xl md:text-4xl md:mb-16">
            Help save lives with your generous donation.
          </h1>

          <form
            onSubmit={handleSubmit(onSubmit)}
            className="flex flex-col space-y-4 mt-8"
          >
            <div>
              <label htmlFor="username" className="block mb-2 text-dark_gray">
                Username
              </label>
              <input
                id="username"
                {...register("username", { required: "Username is required" })}
                type="text"
                placeholder="Enter your username"
                className="w-full px-4 py-2 border-2 border-gray rounded-rsm focus:border-dark_red focus:outline-none"
              />
              {errors.username && (
                <p className="text-red-500">{errors.username.message}</p>
              )}
            </div>

            <div>
              <label htmlFor="password" className="block mb-2 text-dark_gray">
                Password
              </label>
              <input
                id="password"
                {...register("password", { required: "Password is required" })}
                type="password"
                placeholder="Enter your password"
                className="w-full px-4 py-2 border-2 border-gray rounded-rsm focus:outline-none focus:border-dark_red"
              />
              {errors.password && (
                <p className="text-red-500">{errors.password.message}</p>
              )}
              <a
                href="/forgot-password"
                className="text-sm text-dark_red hover:underline mt-2 inline-block"
              >
                Forgot password?
              </a>
            </div>

            <button
              type="submit"
              className="bg-dark_red hover:bg-red text-white font-medium text-lg px-4 py-2 rounded-rsm transition-colors duration-200"
            >
              Sign In
            </button>
          </form>

          <p className="mt-6 text-gray">
            New here?{" "}
            <a
              href="/register"
              className="text-dark_red font-semibold underline"
            >
              Create an account
            </a>
          </p>
        </div>

        <div className="hidden lg:block lg:w-1/2">
          <img
            src={bd5Image}
            alt="Blood Donation"
            className="object-cover w-full h-full"
          />
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
              {modalState.type === "success"
                ? "Login Successful"
                : "Login Error"}
            </Dialog.Title>
            <Dialog.Description className="mt-2">
              {modalState.message ||
                (modalState.type === "success"
                  ? "You are successfully logged in."
                  : "Failed to log in, please try again.")}
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

export default LoginPage;
