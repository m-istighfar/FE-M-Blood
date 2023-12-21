import React, { useState, useEffect } from "react";
import axios from "axios";
import { format } from "date-fns";
import HeaderStats from "../../sections/header-stats/header_stats";
import DisplayTableComponent from "../../sections/display-table/display-table-component";
import ToastNotification from "../../sections/toast-notification/toast-notification";
import { Pagination } from "flowbite-react";

export default function AdminDonationPage() {
  const [donations, setDonations] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [limit, setLimit] = useState(10);
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState("");
  const [isError, setIsError] = useState(false);
  const handleUpdateClick = (item) => {};

  const handleDelete = (item) => {};

  useEffect(() => {
    const fetchDonations = async () => {
      try {
        const response = await axios.get(
          `http://localhost:3000/?page=${currentPage}&limit=${limit}`
        );
        setDonations(formatDonationsData(response.data.data.donations));
        setTotalPages(response.data.data.totalPages);
      } catch (error) {
        console.error("Error fetching donations:", error);
        showToastWithMessage("Failed to fetch donations", true);
      }
    };

    fetchDonations();
  }, [currentPage, limit]);

  const formatDonationsData = (donationsData) => {
    return donationsData.map((donation) => ({
      ...donation,
      CreatedAt: format(new Date(donation.CreatedAt), "yyyy-MM-dd HH:mm:ss"),
    }));
  };

  const showToastWithMessage = (message, error = false) => {
    setToastMessage(message);
    setIsError(error);
    setShowToast(true);
  };

  const handlePageChange = (newPage) => {
    if (newPage >= 1 && newPage <= totalPages) {
      setCurrentPage(newPage);
    }
  };

  const tableHeader = [
    "No.",
    "DonationID",
    "DonorName",
    "DonorEmail",
    "Amount",
    "Status",
    "CreatedAt",
  ];

  return (
    <>
      <HeaderStats heading="Money Donations Management" />
      <div className="bg-white p-10 m-10 -mt-20 rounded-rsm">
        <ToastNotification
          showToast={showToast}
          onClose={() => setShowToast(false)}
          title={isError ? "Error" : "Success"}
          message={toastMessage}
          isError={isError}
        />
        <div className="overflow-x-auto">
          <DisplayTableComponent
            tableHeader={tableHeader}
            data={donations}
            currentPage={currentPage}
            limit={limit}
            handleUpdateClick={handleUpdateClick}
            handleDelete={handleDelete}
          />
        </div>
        <div className="flex justify-center mt-4">
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={handlePageChange}
            showIcons
          />
        </div>
      </div>
    </>
  );
}
