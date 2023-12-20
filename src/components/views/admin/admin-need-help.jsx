import { useState, useEffect } from "react";
import axios from "axios";
import HeaderStats from "../../sections/header-stats/header_stats";
import DisplayTableComponent from "../../sections/display-table/display-table-component";
import { Pagination, Modal, Toast } from "flowbite-react";
import { XMarkIcon } from "@heroicons/react/24/outline";
import DeleteConfirmationModal from "../../utils/modal";

export default function AdminHelpOfferPage() {
  const [data, setData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [limit, setLimit] = useState(10);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [offerToUpdate, setOfferToUpdate] = useState({});
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState("");
  const [isError, setIsError] = useState(false);
  const [isDeleteConfirmationOpen, setIsDeleteConfirmationOpen] =
    useState(false);
  const [offerToDelete, setOfferToDelete] = useState(null);

  const toastDuration = 3000;

  useEffect(() => {
    if (showToast) {
      const timer = setTimeout(() => setShowToast(false), toastDuration);
      return () => clearTimeout(timer);
    }
  }, [showToast, toastDuration]);

  const fetchHelpOffers = async () => {
    try {
      const accessToken = localStorage.getItem("accessToken");
      if (!accessToken) {
        console.error("No access token found. User must be logged in.");
        return;
      }

      const response = await axios.get(
        `http://localhost:3000/help-offer?page=${currentPage}&limit=${limit}`,
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );

      const formattedData = response.data.data.helpOffers.map((offer) => ({
        ...offer,
        UserID: offer.UserID,
        "Blood Type": offer.BloodType.Type,
        "Donate?": offer.IsWillingToDonate ? "Yes" : "No",
        "Emergency?": offer.CanHelpInEmergency ? "Yes" : "No",
        Location: offer.Location,
        Reason: offer.Reason,
      }));

      setData(formattedData);
      setTotalPages(response.data.data.totalPages);
    } catch (error) {
      console.error("Error fetching help offers:", error);
    }
  };

  useEffect(() => {
    fetchHelpOffers();
  }, [currentPage, limit]);

  const handleDelete = (offer) => {
    console.log("Offer to delete:", offer);
    if (!offer.OfferID) {
      console.error("OfferID is missing in the selected offer");
      // Handle this situation appropriately
      return;
    }
    setOfferToDelete(offer);
    setIsDeleteConfirmationOpen(true);
  };

  const handleConfirmDelete = async () => {
    try {
      const accessToken = localStorage.getItem("accessToken");
      if (!accessToken) {
        throw new Error("No access token found. User must be logged in.");
      }
      const offerId = offerToDelete.OfferID;
      if (!offerId) {
        console.error("No OfferID found for deletion.");
        // Additional handling here, such as setting an error message
        return;
      }

      const response = await axios.delete(
        `http://localhost:3000/help-offer/${offerToDelete.OfferID}`,
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );

      setToastMessage(
        response.data.message || "Help offer deleted successfully"
      );
      setIsError(false);
      setShowToast(true);
      fetchHelpOffers(); // Refresh the list
      setIsDeleteConfirmationOpen(false);
    } catch (error) {
      console.error("Error deleting the help offer:", error);
      setToastMessage("Error deleting help offer");
      setIsError(true);
      setShowToast(true);
      setIsDeleteConfirmationOpen(false);
    }
  };

  const handleUpdateClick = (offer) => {
    setOfferToUpdate({
      ...offer,
      BloodType: offer.BloodType.Type, // Menggunakan string tipe darah
    });
    setIsModalOpen(true);
  };

  const handleUpdateHelpOffer = async (e) => {
    e.preventDefault();
    try {
      const accessToken = localStorage.getItem("accessToken");
      if (!accessToken) {
        throw new Error("No access token found. User must be logged in.");
      }

      await axios.put(
        `http://localhost:3000/help-offer/${offerToUpdate.OfferID}`,
        {
          BloodType: offerToUpdate.bloodType,
          IsWillingToDonate: offerToUpdate.isWillingToDonate,
          CanHelpInEmergency: offerToUpdate.canHelpInEmergency,
          Location: offerToUpdate.location,
        },
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );

      setToastMessage("Help offer updated successfully");
      setIsError(false);
    } catch (error) {
      let errorMessage = "An error occurred while updating the help offer.";
      if (error.response && error.response.data && error.response.data.error) {
        errorMessage = error.response.data.error;
      }
      setToastMessage(errorMessage);
      setIsError(true);
    } finally {
      setShowToast(true);
      fetchHelpOffers(); // Refresh the list
      setIsModalOpen(false); // Close the modal regardless of the outcome
    }
  };

  const tableHeader = [
    "No.",
    "UserID",
    "Blood Type",
    "Donate?",
    "Emergency?",
    "Location",
  ];

  const handlePageChange = (newPage) => {
    if (newPage >= 1 && newPage <= totalPages) {
      setCurrentPage(newPage);
    }
  };

  return (
    <>
      <HeaderStats heading="Help Offer Management" />
      <div className="bg-white p-10 m-10 -mt-20 rounded-rsm">
        <div className="overflow-x-scroll">
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
          <DisplayTableComponent
            tableHeader={tableHeader}
            data={data}
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
        </div>
        <DeleteConfirmationModal
          isOpen={isDeleteConfirmationOpen}
          onClose={() => setIsDeleteConfirmationOpen(false)}
          onConfirm={handleConfirmDelete}
          message="Are you sure you want to delete this help offer?"
        />
        {offerToUpdate && (
          <Modal show={isModalOpen} onClose={() => setIsModalOpen(false)}>
            <Modal.Header>Update Help Offer</Modal.Header>
            <Modal.Body>
              <form onSubmit={handleUpdateHelpOffer}>
                <div className="space-y-4">
                  {/* Blood Type Field */}
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
                      value={offerToUpdate.BloodType || ""}
                      onChange={(e) =>
                        setOfferToUpdate({
                          ...offerToUpdate,
                          BloodType: e.target.value,
                        })
                      }
                    />
                  </div>

                  {/* Willingness to Donate Field */}
                  <div>
                    <label
                      htmlFor="isWillingToDonate"
                      className="block text-sm font-medium text-gray-700"
                    >
                      Is Willing To Donate
                    </label>
                    <input
                      type="checkbox"
                      id="isWillingToDonate"
                      className="mt-1"
                      checked={offerToUpdate.IsWillingToDonate || false}
                      onChange={(e) =>
                        setOfferToUpdate({
                          ...offerToUpdate,
                          IsWillingToDonate: e.target.checked,
                        })
                      }
                    />
                  </div>

                  {/* Can Help in Emergency Field */}
                  <div>
                    <label
                      htmlFor="canHelpInEmergency"
                      className="block text-sm font-medium text-gray-700"
                    >
                      Can Help In Emergency
                    </label>
                    <input
                      type="checkbox"
                      id="canHelpInEmergency"
                      className="mt-1"
                      checked={offerToUpdate.CanHelpInEmergency || false}
                      onChange={(e) =>
                        setOfferToUpdate({
                          ...offerToUpdate,
                          CanHelpInEmergency: e.target.checked,
                        })
                      }
                    />
                  </div>

                  {/* Location Field */}
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
                      value={offerToUpdate.Location || ""}
                      onChange={(e) =>
                        setOfferToUpdate({
                          ...offerToUpdate,
                          Location: e.target.value,
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
                    Update Help Offer
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
