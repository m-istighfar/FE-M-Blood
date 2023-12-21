/* eslint-disable react/prop-types */
import { Toast } from "flowbite-react";

const ToastNotification = ({ showToast, onClose, title, message, isError }) => {
  if (!showToast) return null;

  return (
    <Toast
      position="top-center"
      onClose={onClose}
      title={title}
      color={isError ? "failure" : "success"}
    >
      {message}
    </Toast>
  );
};

export default ToastNotification;
