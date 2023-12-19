/* eslint-disable react-hooks/exhaustive-deps */
import { useState, useEffect } from "react";
import axios from "axios";
import HeaderStats from "../../sections/header-stats/header_stats";
import DisplayTableComponent from "../../sections/display-table/display-table-component";
import { format } from "date-fns";
import { Pagination } from "flowbite-react";
// import InitialDataFetching from "../../utility-functions/initial-data-fetching";

export default function AdminDonateBlood() {
  const [data, setData] = useState([]);
  const [status, setStatus] = useState("normal");
  const [selectedId, setSelectedId] = useState(null);

  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [limit, setLimit] = useState(10);

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
        `http://localhost:3000/appointments?page=${currentPage}&limit=${limit}`,
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

  const handleDelete = (id) => {
    axios
      .delete(`http://localhost:3001/api/donate-blood/delete/${id}`)
      .then((response) => {
        setData(data.filter((item) => item.id !== id));
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const handleUpdateClick = (id) => {
    axios
      .put(`http://localhost:3001/api/donate-blood/update/${id}`, {
        updatedData,
      })
      .then((response) => {
        setData(
          data.map((item) =>
            item.id === id
              ? {
                  ...item,
                  name: updatedData.name,
                  phone: updatedData.phone,
                  bloodType: updatedData.bloodType,
                  message: updatedData.message,
                }
              : item
          )
        );
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const tableHeader = [
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
  return (
    <>
      <HeaderStats heading="Blood Donating Users" />
      <div className="bg-white p-10 m-10 -mt-20 rounded-rsm">
        <div className="overflow-x-scroll">
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
      </div>
    </>
  );
}
