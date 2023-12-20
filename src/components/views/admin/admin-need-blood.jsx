/* eslint-disable react-hooks/exhaustive-deps */
import { useState, useEffect } from "react";
import axios from "axios";
import HeaderStats from "../../sections/header-stats/header_stats";
import DisplayTableComponent from "../../sections/display-table/display-table-component";
import { format } from "date-fns";
import { Pagination, Modal, Toast } from "flowbite-react";
import { XMarkIcon } from "@heroicons/react/24/outline";
import DeleteConfirmationModal from "../../utils/modal";
import formatStatus from "../../utils/format-status";
// import InitialDataFetching from "../../utility-functions/initial-data-fetching";

export default function AdminDonateBlood() {
  const [data, setData] = useState([]);
  const [status, setStatus] = useState("pending");
  const [selectedId, setSelectedId] = useState(null);

  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [limit, setLimit] = useState(10);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [appointmentToUpdate, setAppointmentToUpdate] = useState({});

  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState("");
  const [isError, setIsError] = useState(false);

  const [isStatusChanged, setIsStatusChanged] = useState(false);

  const [isDeleteConfirmationOpen, setIsDeleteConfirmationOpen] =
    useState(false);
  const [appointmentToDelete, setAppointmentToDelete] = useState(null);

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

  const fetchAppointments = async () => {
    try {
      const accessToken = localStorage.getItem("accessToken");
      if (!accessToken) {
        console.error("No access token found. User must be logged in.");
        return;
      }

      const response = await axios.get(
        `http://localhost:3000/emergency?page=${currentPage}&limit=${limit}`, // Update this URL to the correct endpoint
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
  };

  useEffect(() => {
    fetchAppointments();
  }, [currentPage, limit]);

  const handleDonatedChange = (id) => {
    const item = data.find((item) => item.id === id);
    let status = !item.donated;

    axios
      .put(`http://localhost:3001/api/donate-blood/donated`, {
        status,
        id,
      })
      .then((response) => {
        setData(
          data.map((item) =>
            item.id === id ? { ...item, donated: status } : item
          )
        );
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const handleDelete = (appointment) => {
    console.log("Deleting appointment:", appointment);
    setAppointmentToDelete(appointment);
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
        `http://localhost:3000/emergency/${appointmentToDelete.RequestID}`,
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
      fetchAppointments(); // Refresh the list after deletion
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
    setAppointmentToDelete(null);
  };

  const handleUpdateClick = (appointment) => {
    setAppointmentToUpdate({
      ...appointment,
      Status: "", // Gunakan string kosong atau nilai lain yang mengindikasikan tidak ada status yang dipilih
    });
    setIsModalOpen(true);
  };

  const handleStatusChange = (e) => {
    setAppointmentToUpdate({
      ...appointmentToUpdate,
      Status: e.target.value.trim(),
    });
    setIsStatusChanged(true);
  };

  const handleUpdateAppointment = async (e) => {
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
    if (!allowedStatusValues.includes(appointmentToUpdate.Status)) {
      setToastMessage("Invalid status value. Please select a valid status.");
      setIsError(true);
      setShowToast(true);
      // Do not close the modal here to allow the user to correct the input
      return;
    }

    try {
      const updatePayload = {
        // ... Your existing payload data
      };

      await axios.put(
        `http://localhost:3000/emergency/${appointmentToUpdate.RequestID}`,
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
      fetchAppointments(); // Refresh the list
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
  return (
    <>
      <HeaderStats heading="Blood Donating Users" />
      <div className="bg-white p-10 m-10 -mt-20 rounded-rsm">
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
            handleCheckboxChange={handleDonatedChange}
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
        {appointmentToUpdate && (
          <Modal show={isModalOpen} onClose={() => setIsModalOpen(false)}>
            <Modal.Header>Update Emergency Request</Modal.Header>
            <Modal.Body>
              <form onSubmit={handleUpdateAppointment}>
                <div className="space-y-4">
                  {/* Blood Type Input */}
                  <div>
                    <label
                      htmlFor="bloodType"
                      className="block text-sm font-medium text-gray-700"
                    >
                      Blood Type
                    </label>
                    <input
                      type="text"
                      id="bloodType"
                      required
                      className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                      value={appointmentToUpdate.BloodType}
                      onChange={(e) =>
                        setAppointmentToUpdate({
                          ...appointmentToUpdate,
                          BloodType: e.target.value,
                        })
                      }
                    />
                  </div>
                  {/* Location Input */}
                  <div>
                    <label
                      htmlFor="location"
                      className="block text-sm font-medium text-gray-700"
                    >
                      Location
                    </label>
                    <input
                      type="text"
                      id="location"
                      required
                      className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                      value={appointmentToUpdate.Location}
                      onChange={(e) =>
                        setAppointmentToUpdate({
                          ...appointmentToUpdate,
                          Location: e.target.value,
                        })
                      }
                    />
                  </div>
                  {/* Status Dropdown */}
                  {/* Status Dropdown */}
                  {/* Status Dropdown */}
                  <select
                    id="status"
                    required
                    className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                    value={appointmentToUpdate.Status}
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
                      value={appointmentToUpdate.AdditionalInfo}
                      onChange={(e) =>
                        setAppointmentToUpdate({
                          ...appointmentToUpdate,
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
