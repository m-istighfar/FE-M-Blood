/* eslint-disable no-unused-vars */
/* eslint-disable react-hooks/exhaustive-deps */
import { useState, useEffect, useCallback } from "react";
import axios from "axios";
import HeaderStats from "../../sections/header-stats/header_stats";
import DisplayTableComponent from "../../sections/display-table/display-table-component";
import Filters from "../../sections/filterable/filterable-component";
import { format } from "date-fns";
import { Pagination, Modal, Toast } from "flowbite-react";
import { XMarkIcon } from "@heroicons/react/24/outline";
import DeleteConfirmationModal from "../../utils/modal";
// import InitialDataFetching from "../../utility-functions/initial-data-fetching";

const BASE_URL = import.meta.env.VITE_BASE_URL;

export default function AdminDonateBlood() {
  const [data, setData] = useState([]);

  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [limit, setLimit] = useState(10);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [appointmentToUpdate, setAppointmentToUpdate] = useState({});

  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState("");
  const [isError, setIsError] = useState(false);

  const [isDeleteConfirmationOpen, setIsDeleteConfirmationOpen] =
    useState(false);
  const [appointmentToDelete, setAppointmentToDelete] = useState(null);

  const [bloodTypes, setBloodTypes] = useState([]);
  const [provinces, setProvinces] = useState([]);

  const [filters, setFilters] = useState({
    bloodType: "",
    scheduledDate: "",
    location: "",
    status: "",
    searchBy: "all",
    query: "",
  });

  // Fetch blood types and provinces on component mount
  useEffect(() => {
    const fetchDropdownData = async () => {
      try {
        // Fetch blood types
        const bloodTypesResponse = await axios.get(`${BASE_URL}/blood-type`);
        setBloodTypes(bloodTypesResponse.data.data);

        // Fetch provinces
        const provincesResponse = await axios.get(`${BASE_URL}/province`);
        setProvinces(provincesResponse.data.data);
      } catch (error) {
        console.error("Error fetching dropdown data:", error);
      }
    };

    fetchDropdownData();
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

  const fetchAppointments = useCallback(async () => {
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

      console.log("Filters:", filters);
      console.log("Query Params:", queryParams);

      const response = await axios.get(
        `${BASE_URL}/appointments?${queryParams}`,
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );

      // Ubah format tanggal di sini
      const formattedData = response.data.data.appointments.map(
        (appointment) => ({
          ...appointment,
          ScheduledDate: format(
            new Date(appointment.ScheduledDate),
            "yyyy-MM-dd HH:mm:ss"
          ),
          BloodType: appointment.BloodType.Type, // Ganti BloodTypeID dengan BloodType.Type
        })
      );

      setData(formattedData); // Update state dengan data yang telah diubah format tanggal
      setTotalPages(response.data.data.totalPages);
    } catch (error) {
      console.error("Error fetching appointments:", error);
    }
  });

  useEffect(() => {
    fetchAppointments();
  }, [fetchAppointments]);

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters((prevFilters) => ({
      ...prevFilters,
      [name]: value,
    }));
  };

  const handleClearFilters = () => {
    setFilters({
      bloodType: "", // Reset bloodType filter
      scheduledDate: "", // Reset scheduledDate filter
      location: "", // Reset location filter
      status: "", // Reset status filter
      searchBy: "all", // Reset searchBy filter to "all"
      query: "", // Reset query filter
    });
    fetchAppointments(); // Fetch appointments with reset filters
  };

  const handleDelete = (appointment) => {
    setAppointmentToDelete(appointment);
    setIsDeleteConfirmationOpen(true);
  };

  const handleConfirmDelete = () => {
    const accessToken = localStorage.getItem("accessToken");

    if (!accessToken) {
      console.error("No access token found. User must be logged in.");
      setToastMessage("User is not authenticated.");
      setIsError(true);
      setShowToast(true);
      closeDeleteConfirmation(); // Close the delete confirmation modal
      return;
    }

    const id = appointmentToDelete.AppointmentID;

    axios
      .delete(`${BASE_URL}/appointments/delete/${id}`, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      })
      .then(() => {
        setData(data.filter((item) => item.AppointmentID !== id));
        setToastMessage("Appointment deleted successfully");
        setIsError(false);
        setShowToast(true);
        closeDeleteConfirmation(); // Close the delete confirmation modal
      })
      .catch((error) => {
        console.error("Error deleting the appointment:", error);
        setToastMessage("Error deleting appointment");
        setIsError(true);
        setShowToast(true);
        closeDeleteConfirmation(); // Close the delete confirmation modal
      });
  };

  const closeDeleteConfirmation = () => {
    setIsDeleteConfirmationOpen(false);
    setAppointmentToDelete(null);
  };

  const handleUpdateClick = (appointment) => {
    setAppointmentToUpdate(appointment);
    setIsModalOpen(true);
  };

  const handleUpdateAppointment = async (e) => {
    const accessToken = localStorage.getItem("accessToken");
    e.preventDefault(); // Prevent form from refreshing the page
    try {
      const response = await axios.put(
        `${BASE_URL}/appointments/update/${appointmentToUpdate.AppointmentID}`,
        {
          bloodType: appointmentToUpdate.BloodType,
          scheduledDate: appointmentToUpdate.ScheduledDate,
          location: appointmentToUpdate.Location,
          status: appointmentToUpdate.Status,
        },
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );
      setToastMessage(
        response.data.message || "Appointment updated successfully"
      );
      setIsError(false);
      setShowToast(true);
      fetchAppointments(); // Refresh the list
    } catch (error) {
      let errorMessage = "An error occurred while updating the appointment.";
      if (error.response && error.response.data.error) {
        errorMessage = error.response.data.error;
      }
      setToastMessage(errorMessage);
      setIsError(true);
      setShowToast(true);
    } finally {
      setIsModalOpen(false); // Close the modal regardless of the outcome
    }
  };

  const tableHeader = [
    "No.",
    "UserID",
    "BloodType",
    "ScheduledDate",
    "Location",
    "Status",
  ];
  const handlePageChange = (newPage) => {
    if (newPage >= 1 && newPage <= totalPages) {
      setCurrentPage(newPage);
    }
  };

  const appointmentStatusOptions = [
    "scheduled",
    "completed",
    "cancelled",
    "rescheduled",
  ];
  return (
    <>
      <HeaderStats heading="Blood Donating Users" />
      <div className="bg-white p-10 m-10 -mt-20 rounded-rsm">
        <Filters
          bloodTypes={bloodTypes}
          provinces={provinces}
          filters={filters}
          onFilterChange={handleFilterChange}
          onClearFilters={handleClearFilters}
          dateFilterName="scheduledDate"
          dateFilterLabel="Scheduled Date"
          statusOptions={appointmentStatusOptions}
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
            handleUpdateClick={handleUpdateClick}
            handleDelete={handleDelete}
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
            <Modal.Header>Update Appointment</Modal.Header>
            <Modal.Body>
              <form onSubmit={handleUpdateAppointment}>
                <div className="space-y-4">
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
                      value={appointmentToUpdate.BloodType}
                      onChange={(e) =>
                        setAppointmentToUpdate({
                          ...appointmentToUpdate,
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
                  <div>
                    <label
                      htmlFor="scheduledDate"
                      className="block text-sm font-medium text-gray-700"
                    >
                      Scheduled Date
                    </label>
                    <input
                      type="datetime-local"
                      id="scheduledDate"
                      required
                      className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                      value={appointmentToUpdate.ScheduledDate}
                      onChange={(e) =>
                        setAppointmentToUpdate({
                          ...appointmentToUpdate,
                          ScheduledDate: e.target.value,
                        })
                      }
                    />
                  </div>
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
                      value={appointmentToUpdate.Location}
                      onChange={(e) =>
                        setAppointmentToUpdate({
                          ...appointmentToUpdate,
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
                  <div>
                    <label
                      htmlFor="status"
                      className="block text-sm font-medium text-gray-700"
                    >
                      Status
                    </label>
                    <select
                      id="status"
                      required
                      className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                      value={appointmentToUpdate.Status}
                      onChange={(e) =>
                        setAppointmentToUpdate({
                          ...appointmentToUpdate,
                          Status: e.target.value,
                        })
                      }
                    >
                      <option value="scheduled">Scheduled</option>
                      <option value="completed">Completed</option>
                      <option value="cancelled">Cancelled</option>
                      <option value="rescheduled">Rescheduled</option>
                      {/* Add more options as needed */}
                    </select>
                  </div>
                </div>
                <div className="mt-5 sm:mt-6">
                  <button
                    type="submit"
                    className="inline-flex justify-center w-full rounded-md border border-transparent shadow-sm px-4 py-2 bg-blue text-base font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 sm:text-sm"
                  >
                    Update Appointment
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
