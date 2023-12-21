/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
import { useState, useEffect } from "react";
import axios from "axios";
import HeaderStats from "../../sections/header-stats/header_stats";
import DisplayTableComponent from "../../sections/display-table/display-table-component";
import { format } from "date-fns";
import { Pagination, Modal, Toast } from "flowbite-react";
import { XMarkIcon } from "@heroicons/react/24/outline";
import DeleteConfirmationModal from "../../utils/modal";

const BASE_URL = import.meta.env.VITE_BASE_URL;

export default function BloodInventoryAdmin() {
  const [inventory, setInventory] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [limit, setLimit] = useState(10);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [itemToUpdate, setItemToUpdate] = useState({});

  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState("");
  const [isError, setIsError] = useState(false);

  const [isDeleteConfirmationOpen, setIsDeleteConfirmationOpen] =
    useState(false);
  const [itemToDelete, setItemToDelete] = useState(null);

  const [isNewInventoryModalOpen, setIsNewInventoryModalOpen] = useState(false);
  const [newInventory, setNewInventory] = useState({
    bloodTypeID: "",
    quantity: "",
    provinceID: "",
  });

  const [provinces, setProvinces] = useState([]);
  const [bloodTypes, setBloodTypes] = useState([]);

  useEffect(() => {
    // Fetch provinces
    const fetchProvinces = async () => {
      try {
        const response = await axios.get(`${BASE_URL}/province`);
        setProvinces(response.data.data);
      } catch (error) {
        console.error("Error fetching provinces:", error);
      }
    };

    // Fetch blood types
    const fetchBloodTypes = async () => {
      try {
        const response = await axios.get(`${BASE_URL}/blood-type`);
        setBloodTypes(response.data.data);
      } catch (error) {
        console.error("Error fetching blood types:", error);
      }
    };

    fetchProvinces();
    fetchBloodTypes();
  }, []);

  const toastDuration = 3000;

  useEffect(() => {
    if (showToast) {
      const timer = setTimeout(() => {
        setShowToast(false);
      }, toastDuration);
      return () => clearTimeout(timer);
    }
  }, [showToast, toastDuration]);

  const fetchInventory = async () => {
    try {
      const accessToken = localStorage.getItem("accessToken");
      if (!accessToken) {
        console.error("No access token found. User must be logged in.");
        return;
      }

      const response = await axios.get(
        `${BASE_URL}/blood-inventory?page=${currentPage}&limit=${limit}`,
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );

      const formattedData = response.data.data.inventory.map((item, index) => ({
        ...item,
        No: (currentPage - 1) * limit + index + 1,
        ExpiryDate: format(new Date(item.ExpiryDate), "yyyy-MM-dd"),
        BloodType: item.BloodType.Type,
        Province: item.Province.Name,
      }));

      setInventory(formattedData);
      setTotalPages(response.data.data.totalPages);
    } catch (error) {
      console.error("Error fetching inventory:", error);
    }
  };

  useEffect(() => {
    fetchInventory();
  }, [currentPage, limit]);

  const handleDelete = (item) => {
    setItemToDelete(item);
    setIsDeleteConfirmationOpen(true);
  };

  const handleConfirmDelete = async () => {
    const accessToken = localStorage.getItem("accessToken");
    if (!accessToken) {
      console.error("No access token found. User must be logged in.");
      setToastMessage("User is not authenticated.");
      setIsError(true);
      setShowToast(true);
      closeDeleteConfirmation();
      return;
    }

    const id = itemToDelete.InventoryID;

    try {
      await axios.delete(`${BASE_URL}/blood-inventory/${id}`, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });

      setInventory(inventory.filter((item) => item.InventoryID !== id));
      setToastMessage("Inventory item deleted successfully");
      setIsError(false);
      setShowToast(true);
    } catch (error) {
      console.error("Error deleting the inventory item:", error);
      setToastMessage("Error deleting inventory item");
      setIsError(true);
      setShowToast(true);
    } finally {
      closeDeleteConfirmation();
    }
  };

  const closeDeleteConfirmation = () => {
    setIsDeleteConfirmationOpen(false);
    setItemToDelete(null);
  };

  const handleUpdateClick = (item) => {
    // Check if ExpiryDate is valid, if not set a default value
    const validExpiryDate = item.ExpiryDate
      ? new Date(item.ExpiryDate)
      : new Date();
    setItemToUpdate({ ...item, ExpiryDate: validExpiryDate });
    setIsModalOpen(true);
  };

  const handleUpdateInventory = async (e) => {
    e.preventDefault();
    const accessToken = localStorage.getItem("accessToken");
    if (!accessToken) {
      console.error("No access token found. User must be logged in.");
      return;
    }

    try {
      await axios.put(
        `${BASE_URL}/blood-inventory/${itemToUpdate.InventoryID}`,
        {
          Quantity: itemToUpdate.quantity,
          ExpiryDate: itemToUpdate.expiryDate,
        },
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );

      setToastMessage("Inventory item updated successfully");
      setIsError(false);
      setShowToast(true);
      fetchInventory();
    } catch (error) {
      console.error("Error updating the inventory item:", error);
      setToastMessage("Error updating inventory item");
      setIsError(true);
      setShowToast(true);
    } finally {
      setIsModalOpen(false);
    }
  };

  const handleNewInventorySubmit = async (e) => {
    e.preventDefault();
    const accessToken = localStorage.getItem("accessToken");
    if (!accessToken) {
      console.error("No access token found. User must be logged in.");
      return;
    }

    const payload = {
      ...newInventory,
      provinceID: parseInt(newInventory.provinceID, 10),
      bloodTypeID: parseInt(newInventory.bloodTypeID, 10),
      quantity: parseInt(newInventory.quantity, 10),
    };

    try {
      const response = await axios.post(
        `${BASE_URL}/blood-inventory`,
        payload,
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );

      setToastMessage("New blood inventory added successfully");
      setIsError(false);
      setShowToast(true);
      fetchInventory(); // To refresh the inventory list
      setIsNewInventoryModalOpen(false); // Close the modal
    } catch (error) {
      console.error("Error adding new inventory:", error);
      setToastMessage("Error adding new inventory item");
      setIsError(true);
      setShowToast(true);
    }
  };

  const tableHeader = [
    "No.",
    "BloodType",
    "Quantity",
    "ExpiryDate",
    "Province",
  ];

  const handlePageChange = (newPage) => {
    if (newPage >= 1 && newPage <= totalPages) {
      setCurrentPage(newPage);
    }
  };

  return (
    <>
      <HeaderStats heading="Blood Inventory Management" />
      <div className="bg-white p-10 m-10 -mt-20 rounded-rsm">
        {showToast && (
          <Toast
            position="top-center"
            onClose={() => setShowToast(false)}
            title={isError ? "Error" : "Success"}
            color={isError ? "failure" : "success"}
            className="shadow-lg border-2 border-blue"
          >
            {toastMessage}
            <button onClick={() => setShowToast(false)} className="text-red">
              <XMarkIcon className="h-5 w-5" />
            </button>
          </Toast>
        )}
        <button
          onClick={() => setIsNewInventoryModalOpen(true)}
          className="bg-blue text-white p-2 rounded"
        >
          Create New Inventory
        </button>
        <DisplayTableComponent
          tableHeader={tableHeader}
          data={inventory}
          handleUpdateClick={handleUpdateClick}
          handleDelete={handleDelete}
          currentPage={currentPage}
          limit={limit}
        />

        <div className="flex justify-center mt-4">
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={handlePageChange}
            showIcons={true}
          />
        </div>

        <DeleteConfirmationModal
          isOpen={isDeleteConfirmationOpen}
          onClose={closeDeleteConfirmation}
          onConfirm={handleConfirmDelete}
          message="Are you sure you want to delete this inventory item?"
        />

        {itemToUpdate && (
          <Modal show={isModalOpen} onClose={() => setIsModalOpen(false)}>
            <Modal.Header>Update Inventory Item</Modal.Header>
            <Modal.Body>
              <form onSubmit={handleUpdateInventory}>
                {/* Quantity Field */}
                <div className="mb-4">
                  <label
                    htmlFor="quantity"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Quantity
                  </label>
                  <input
                    type="number"
                    id="quantity"
                    required
                    className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                    value={itemToUpdate.Quantity}
                    onChange={(e) =>
                      setItemToUpdate({
                        ...itemToUpdate,
                        Quantity: e.target.value,
                      })
                    }
                  />
                </div>
                <div className="mb-4">
                  <label
                    htmlFor="expiryDate"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Expiry Date
                  </label>
                  <input
                    type="date"
                    id="expiryDate"
                    required
                    className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                    value={
                      itemToUpdate.ExpiryDate
                        ? format(
                            new Date(itemToUpdate.ExpiryDate),
                            "yyyy-MM-dd"
                          )
                        : ""
                    }
                    onChange={(e) =>
                      setItemToUpdate({
                        ...itemToUpdate,
                        ExpiryDate: e.target.value,
                      })
                    }
                  />
                </div>
                <div className="flex justify-end">
                  <button
                    type="submit"
                    className="inline-flex justify-center w-full rounded-md border border-transparent shadow-sm px-4 py-2 bg-blue text-base font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 sm:text-sm"
                  >
                    Update Item
                  </button>
                </div>
              </form>
            </Modal.Body>
          </Modal>
        )}
        {isNewInventoryModalOpen && (
          <Modal
            show={isNewInventoryModalOpen}
            onClose={() => setIsNewInventoryModalOpen(false)}
          >
            <Modal.Header>Create New Inventory Item</Modal.Header>
            <Modal.Body>
              <form onSubmit={handleNewInventorySubmit}>
                {/* Blood Type ID Field */}
                <div className="mb-4">
                  <label
                    htmlFor="bloodType"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Blood Type
                  </label>
                  <select
                    id="bloodType"
                    required
                    className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                    value={newInventory.bloodTypeID}
                    onChange={(e) =>
                      setNewInventory({
                        ...newInventory,
                        bloodTypeID: e.target.value,
                      })
                    }
                  >
                    <option value="">Select Blood Type</option>
                    {bloodTypes.map((type) => (
                      <option key={type.BloodTypeID} value={type.BloodTypeID}>
                        {type.Type}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Quantity Field */}
                <div className="mb-4">
                  <label
                    htmlFor="quantity"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Quantity
                  </label>
                  <input
                    type="number"
                    id="quantity"
                    required
                    className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                    value={newInventory.quantity}
                    onChange={(e) =>
                      setNewInventory({
                        ...newInventory,
                        quantity: e.target.value,
                      })
                    }
                  />
                </div>

                {/* Province ID Field */}
                <div className="mb-4">
                  <label
                    htmlFor="province"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Province
                  </label>
                  <select
                    id="province"
                    required
                    className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                    value={newInventory.provinceID}
                    onChange={(e) =>
                      setNewInventory({
                        ...newInventory,
                        provinceID: e.target.value,
                      })
                    }
                  >
                    <option value="">Select Province</option>
                    {provinces.map((province) => (
                      <option
                        key={province.ProvinceID}
                        value={province.ProvinceID}
                      >
                        {province.Name}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="flex justify-end">
                  <button
                    type="submit"
                    className="inline-flex justify-center w-full rounded-md border border-transparent shadow-sm px-4 py-2 bg-blue text-base font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 sm:text-sm"
                  >
                    Submit
                  </button>
                </div>
              </form>
            </Modal.Body>
          </Modal>
        )}
      </div>
    </>
  );
}
