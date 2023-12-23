/* eslint-disable no-unused-vars */
/* eslint-disable react-hooks/exhaustive-deps */
import { useState, useEffect, useCallback } from "react";
import axios from "axios";
import HeaderStats from "../../sections/header-stats/header_stats";
import DisplayTableComponent from "../../sections/display-table/display-table-component";
import { format } from "date-fns";
import { Pagination, Modal, Toast } from "flowbite-react";
import { XMarkIcon } from "@heroicons/react/24/outline";
import DeleteConfirmationModal from "../../utils/modal";
import formatStatus from "../../utils/format-status";
import Filters from "../../sections/filterable/filterable-component";
// import InitialDataFetching from "../../utility-functions/initial-data-fetching";

const BASE_URL = import.meta.env.VITE_BASE_URL;

export default function AdminNeedBlood() {
  const [data, setData] = useState([]);
  const [status, setStatus] = useState("pending");
  const [selectedId, setSelectedId] = useState(null);

  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [limit, setLimit] = useState(10);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [requestToUpdate, setRequestToUpdate] = useState({});

  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState("");
  const [isError, setIsError] = useState(false);

  const [isStatusChanged, setIsStatusChanged] = useState(false);

  const [isDeleteConfirmationOpen, setIsDeleteConfirmationOpen] =
    useState(false);
  const [requestToDelete, setRequestToDelete] = useState(null);

  const [bloodTypes, setBloodTypes] = useState([]);
  const [provinces, setProvinces] = useState([]);

  const [filters, setFilters] = useState({
    bloodType: "",
    requestDate: "", // Renamed from scheduledDate
    location: "",
    status: "",
    searchBy: "all",
    query: "",
  });

  // Fetch blood types on component mount
  useEffect(() => {
    const fetchBloodTypes = async () => {
      try {
        const response = await axios.get(`${BASE_URL}/blood-type`);
        setBloodTypes(response.data.data);
      } catch (error) {
        console.error("Error fetching blood types:", error);
      }
    };

    const fetchProvinces = async () => {
      try {
        const response = await axios.get(`${BASE_URL}/province`);
        setProvinces(response.data.data);
      } catch (error) {
        console.error("Error fetching provinces:", error);
      }
    };

    fetchBloodTypes();
    fetchProvinces();
  }, []);

  const toastDuration = 3000;

  useEffect(() => {
    if (showToast) {
      const timer = setTimeout(() => {
        setShowToast(false);
      }, toastDuration);

      // Cleanup the timer when the component is unmounted or the showToast changes
      return () => clearTimeout(timer);
    }
  }, [showToast, toastDuration]);

  const [updatedData, setUpdatedData] = useState({
    name: "",
    phone: "",
    bloodType: "",
    message: "",
  });

  const fetchRequests = useCallback(async () => {
    try {
      const accessToken = localStorage.getItem("accessToken");
      if (!accessToken) {
        console.error("No access token found. User must be logged in.");
        return;
      }

      const queryParams = new URLSearchParams(
        Object.entries(filters).reduce((acc, [key, value]) => {
          if (value) acc[key] = value;
          return acc;
        }, {})
      ).toString();

      console.log("Current Filters: ", filters);
      console.log("Query Params: ", queryParams.toString());

      const response = await axios.get(
        `${BASE_URL}/emergency?page=${currentPage}&limit=${limit}&${queryParams}`,
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );
      if (
        response.data &&
        response.data.data &&
        Array.isArray(response.data.data.emergencyRequests) // Corrected data path
      ) {
        const formattedData = response.data.data.emergencyRequests.map(
          (request, index) => ({
            ...request,
            No: (currentPage - 1) * limit + index + 1,
            RequestDate: format(
              new Date(request.RequestDate),
              "yyyy-MM-dd HH:mm:ss"
            ),
            BloodType: request.BloodType?.Type,
            Status: formatStatus(request.Status),
          })
        );

        setData(formattedData);
        setTotalPages(response.data.data.totalPages);
      } else {
        console.error("Unexpected data structure from API:", response.data);
      }
    } catch (error) {
      console.error("Error fetching emergency requests:", error);
    }
  });

  useEffect(() => {
    fetchRequests();
  }, [fetchRequests]);

  const handleDelete = (request) => {
    console.log("Deleting appointment:", request);
    setRequestToDelete(request);
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

    try {
      const response = await axios.delete(
        `${BASE_URL}/emergency/${requestToDelete.RequestID}`,
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );

      if (response.status === 200 || response.status === 204) {
        setToastMessage("Emergency request deleted successfully.");
        setIsError(false);
      } else {
        setToastMessage("Failed to delete the emergency request.");
        setIsError(true);
      }
      setShowToast(true);
      fetchRequests(); // Refresh the list after deletion
    } catch (error) {
      console.error("Error deleting the emergency request:", error);
      setToastMessage("Error occurred while deleting the emergency request.");
      setIsError(true);
      setShowToast(true);
    } finally {
      closeDeleteConfirmation();
    }
  };

  const closeDeleteConfirmation = () => {
    setIsDeleteConfirmationOpen(false);
    setRequestToDelete(null);
  };

  const handleUpdateClick = (request) => {
    setRequestToUpdate({
      ...request,
      Status: "", // Gunakan string kosong atau nilai lain yang mengindikasikan tidak ada status yang dipilih
    });
    setIsModalOpen(true);
  };

  const handleStatusChange = (e) => {
    setRequestToUpdate({
      ...requestToUpdate,
      Status: e.target.value.trim(),
    });
    setIsStatusChanged(true);
  };

  const handleUpdateRequest = async (e) => {
    e.preventDefault(); // Prevent form from refreshing the page

    const accessToken = localStorage.getItem("accessToken");
    if (!accessToken) {
      console.error("No access token found. User must be logged in.");
      setToastMessage("User is not authenticated.");
      setIsError(true);
      setShowToast(true);
      setIsModalOpen(false); // Close the modal
      return;
    }

    const allowedStatusValues = [
      "pending",
      "inProgress",
      "fulfilled",
      "expired",
      "cancelled",
    ];
    if (!allowedStatusValues.includes(requestToUpdate.Status)) {
      setToastMessage("Invalid status value. Please select a valid status.");
      setIsError(true);
      setShowToast(true);
      // Do not close the modal here to allow the user to correct the input
      return;
    }

    try {
      const updatePayload = {
        bloodType: requestToUpdate.BloodType,
        location: requestToUpdate.Location,
        status: requestToUpdate.Status,
        additionalInfo: requestToUpdate.AdditionalInfo,
      };

      await axios.put(
        `${BASE_URL}/emergency/${requestToUpdate.RequestID}`,
        updatePayload,
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );

      setToastMessage("Emergency request updated successfully");
      setIsError(false);
      setShowToast(true);
      fetchRequests(); // Refresh the list
    } catch (error) {
      let errorMessage = "Error occurred while updating the emergency request.";
      if (error.response && error.response.data && error.response.data.error) {
        errorMessage = error.response.data.error; // Gunakan pesan error dari server
      }
      setToastMessage(errorMessage);
      setIsError(true);
      setShowToast(true);
    } finally {
      setIsModalOpen(false); // Close the modal
    }
  };

  const tableHeader = [
    "No.",
    "UserID",
    "BloodType",
    "RequestDate",
    "Location",
    "Status",
  ];

  const handlePageChange = (newPage) => {
    if (newPage >= 1 && newPage <= totalPages) {
      setCurrentPage(newPage);
    }
  };

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters((prevFilters) => ({
      ...prevFilters,
      [name]: value,
    }));
  };

  const handleClearFilters = () => {
    setFilters({
      bloodType: "",
      requestDate: "",
      location: "",
      status: "",
      searchBy: "all",
      query: "",
    });
    fetchRequests();
  };

  const emergencyRequestStatusOptions = [
    "pending",
    "inProgress",
    "fulfilled",
    "expired",
    "cancelled",
  ];
  return (
    <>
      <HeaderStats heading="Emergency Request Users" />
      <div className="bg-white p-10 m-10 -mt-20 rounded-rsm">
        <Filters
          bloodTypes={bloodTypes}
          provinces={provinces}
          filters={filters}
          onFilterChange={handleFilterChange}
          onClearFilters={handleClearFilters}
          dateFilterName="requestDate"
          dateFilterLabel="Request Date"
          statusOptions={emergencyRequestStatusOptions}
        />
        <div className="overflow-x-scroll">
          {showToast && (
            <Toast
              position="top-center"
              onClose={() => setShowToast(false)}
              title={isError ? "Error" : "Success"}
              color={isError ? "failure" : "success"}
              className="shadow-lg border-2 border-blue" // Custom styling
            >
              {toastMessage}
              <button onClick={() => setShowToast(false)} className="text-red">
                <XMarkIcon className="h-5 w-5" />{" "}
                {/* Tombol tutup dengan ikon */}
              </button>
            </Toast>
          )}
          <DisplayTableComponent
            tableHeader={tableHeader}
            data={data} // Pass the entire dataset
            type={"donate-blood"}
            handleUpdateClick={handleUpdateClick}
            handleDelete={handleDelete}
            status={status}
            setStatus={setStatus}
            selectedId={selectedId}
            setSelectedId={setSelectedId}
            updatedData={updatedData}
            setUpdatedData={setUpdatedData}
            currentPage={currentPage}
            limit={limit}
          />
          <div className="flex justify-center">
            <Pagination
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={(page) => setCurrentPage(page)}
              showIcons={true}
            />
          </div>
        </div>{" "}
        <DeleteConfirmationModal
          isOpen={isDeleteConfirmationOpen}
          onClose={closeDeleteConfirmation}
          onConfirm={handleConfirmDelete}
          message="Are you sure you want to delete this appointment?"
        />
        {requestToUpdate && (
          <Modal show={isModalOpen} onClose={() => setIsModalOpen(false)}>
            <Modal.Header>Update Emergency Request</Modal.Header>
            <Modal.Body>
              <form onSubmit={handleUpdateRequest}>
                <div className="space-y-4">
                  {/* Blood Type Input */}
                  <div>
                    <label
                      htmlFor="bloodType"
                      className="block text-sm font-medium text-gray-700"
                    >
                      Blood Type
                    </label>
                    <select
                      id="bloodType"
                      required
                      className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                      value={requestToUpdate.BloodType}
                      onChange={(e) =>
                        setRequestToUpdate({
                          ...requestToUpdate,
                          BloodType: e.target.value,
                        })
                      }
                    >
                      {bloodTypes.map((type) => (
                        <option key={type.BloodTypeID} value={type.Type}>
                          {type.Type}
                        </option>
                      ))}
                    </select>
                  </div>
                  {/* Location Input */}
                  <div>
                    <label
                      htmlFor="location"
                      className="block text-sm font-medium text-gray-700"
                    >
                      Location (Province)
                    </label>
                    <select
                      id="location"
                      required
                      className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                      value={requestToUpdate.Location}
                      onChange={(e) =>
                        setRequestToUpdate({
                          ...requestToUpdate,
                          Location: e.target.value,
                        })
                      }
                    >
                      {provinces.map((province) => (
                        <option key={province.ProvinceID} value={province.Name}>
                          {province.Name}
                        </option>
                      ))}
                    </select>
                  </div>
                  {/* Status Dropdown */}
                  {/* Status Dropdown */}
                  {/* Status Dropdown */}
                  <select
                    id="status"
                    required
                    className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                    value={requestToUpdate.Status}
                    onChange={handleStatusChange}
                  >
                    <option value="">-- Select Status --</option>{" "}
                    {/* Tambahkan ini */}
                    <option value="pending">Pending</option>
                    <option value="inProgress">In Progress</option>
                    <option value="fulfilled">Fulfilled</option>
                    <option value="expired">Expired</option>
                    <option value="cancelled">Cancelled</option>
                  </select>

                  {/* Additional Information Input */}
                  <div>
                    <label
                      htmlFor="additionalInfo"
                      className="block text-sm font-medium text-gray-700"
                    >
                      Additional Information
                    </label>
                    <textarea
                      id="additionalInfo"
                      required
                      className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                      value={requestToUpdate.AdditionalInfo}
                      onChange={(e) =>
                        setRequestToUpdate({
                          ...requestToUpdate,
                          AdditionalInfo: e.target.value,
                        })
                      }
                    />
                  </div>
                </div>
                <div className="mt-5 sm:mt-6">
                  <button
                    type="submit"
                    className="inline-flex justify-center w-full rounded-md border border-transparent shadow-sm px-4 py-2 bg-blue text-base font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 sm:text-sm"
                  >
                    Update Request
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
