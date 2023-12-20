/* eslint-disable react/prop-types */
import { Modal } from "flowbite-react";

export default function DeleteConfirmationModal({
  isOpen,
  onClose,
  onConfirm,
  message,
}) {
  return (
    <Modal show={isOpen} onClose={onClose}>
      <Modal.Header>Confirm Delete</Modal.Header>
      <Modal.Body>{message}</Modal.Body>
      <Modal.Footer>
        <button
          onClick={onConfirm}
          className="inline-flex justify-center w-full rounded-md border border-transparent shadow-sm px-4 py-2 bg-red text-base font-medium text-white hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 sm:text-sm"
        >
          Confirm Delete
        </button>
        <button
          onClick={onClose}
          className="inline-flex justify-center w-full rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500 sm:text-sm"
        >
          Cancel
        </button>
      </Modal.Footer>
    </Modal>
  );
}
