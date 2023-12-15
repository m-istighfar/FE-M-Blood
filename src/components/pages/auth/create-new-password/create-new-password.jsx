import { useState } from "react";
import { useForm } from "react-hook-form";
import { Dialog } from "@headlessui/react";
import { useNavigate, useParams } from "react-router-dom";
import "tailwindcss/tailwind.css";

import { resetPassword } from "../api";

const CreateNewPasswordPage = () => {
  const [modalState, setModalState] = useState({
    isOpen: false,
    type: "",
    message: "",
  });
  const navigate = useNavigate();
  const { resetToken } = useParams();
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    if (data.newPassword !== data.confirmPassword) {
      setModalState({
        isOpen: true,
        type: "error",
        message: "Passwords do not match.",
      });
      return;
    }

    try {
      await resetPassword(resetToken, data.newPassword, data.confirmPassword);
      setModalState({
        isOpen: true,
        type: "success",
        message: "Your password has been reset successfully.",
      });
    } catch (error) {
      setModalState({
        isOpen: true,
        type: "error",
        message: error.response?.data?.error || "Failed to reset password.",
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
            Create New Password
          </h1>
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="flex flex-col space-y-4"
          >
            <div>
              <label
                htmlFor="newPassword"
                className="block mb-2 text-dark_gray"
              >
                New Password
              </label>
              <input
                id="newPassword"
                type="password"
                {...register("newPassword", {
                  required: "New password is required",
                })}
                placeholder="Enter new password"
                className="w-full px-4 py-2 border-2 border-gray rounded-rsm focus:border-dark_red focus:outline-none"
              />
              {errors.newPassword && (
                <p className="text-red-500">{errors.newPassword.message}</p>
              )}
            </div>
            <div>
              <label
                htmlFor="confirmPassword"
                className="block mb-2 text-dark_gray"
              >
                Confirm New Password
              </label>
              <input
                id="confirmPassword"
                type="password"
                {...register("confirmPassword", {
                  required: "Please confirm your new password",
                  validate: (value) =>
                    value === watch("newPassword") ||
                    "The passwords do not match",
                })}
                placeholder="Confirm new password"
                className="w-full px-4 py-2 border-2 border-gray rounded-rsm focus:border-dark_red focus:outline-none"
              />
              {errors.confirmPassword && (
                <p className="text-red-500">{errors.confirmPassword.message}</p>
              )}
            </div>
            <button
              type="submit"
              className="bg-dark_red hover:bg-red text-white font-medium text-lg px-4 py-2 rounded-rsm transition-colors duration-200"
            >
              Set New Password
            </button>
          </form>
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
              {modalState.type === "success" ? "Success" : "Error"}
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

export default CreateNewPasswordPage;
