import React, { useState, useEffect } from "react";
import CardStats from "../../sections/cta-card/cta-card-component";
import HeaderStats from "../../sections/header-stats/header_stats";
import { Link } from "react-router-dom";
import axios from "axios";
import { BiDonateBlood, BiHelpCircle } from "react-icons/bi";
import { MdOutlineBloodtype } from "react-icons/md";
import { MdOutlineVolunteerActivism } from "react-icons/md";
import CardLineChart from "../../sections/chart/chart-component";
import FilterableComponent from "../../sections/filterable/filterable-component";
import DisplayTableComponent from "../../sections/display-table/display-table-component";
import { Pagination } from "flowbite-react";
import { format } from "date-fns";

const Dashboard = () => {
  const [users, setUsers] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [limit, setLimit] = useState(10);

  const [totalAppointments, setTotalAppointments] = useState(0);
  const [totalEmergencies, setTotalEmergencies] = useState(0);
  const [totalHelpOffers, setTotalHelpOffers] = useState(0);
  const [totalBloodDrives, setTotalBloodDrives] = useState(0);
  const [totalDonations, setTotalDonations] = useState(0);
  const [totalUsers, setTotalUsers] = useState(0);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const accessToken = localStorage.getItem("accessToken");
        if (!accessToken) {
          console.error("No access token found. User must be logged in.");
          return;
        }

        const response = await axios.get(
          `http://localhost:3000/user/list-users?page=${currentPage}&limit=${limit}`,
          {
            headers: {
              Authorization: `Bearer ${accessToken}`,
            },
          }
        );

        const formattedData = response.data.data.users.map((user) => ({
          ...user,
          CreatedAt: format(new Date(user.CreatedAt), "yyyy-MM-dd HH:mm:ss"),
        }));
        setUsers(formattedData);
        setTotalPages(response.data.data.totalPages);
      } catch (error) {
        console.error("Error fetching users:", error);
      }
    };

    const fetchData = async (url, setter) => {
      try {
        const accessToken = localStorage.getItem("accessToken");
        if (!accessToken) {
          console.error("No access token found. User must be logged in.");
          return;
        }

        const response = await axios.get(url, {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        });
        setter(response.data.data.totalRecords);
      } catch (error) {
        console.error(`Error fetching data from ${url}:`, error);
      }
    };

    fetchUsers();
    fetchData("http://localhost:3000/appointments", setTotalAppointments);
    fetchData("http://localhost:3000/emergency", setTotalEmergencies);
    fetchData("http://localhost:3000/help-offer", setTotalHelpOffers);
    fetchData("http://localhost:3000/blood-drive", setTotalBloodDrives);
    fetchData("http://localhost:3000/total-donations", setTotalDonations);
    fetchData("http://localhost:3000/user/list-users", setTotalUsers);
  }, [currentPage, limit]);

  const cardData = [
    {
      key: 111,
      statSubtitle: "DONATE BLOOD",
      statTitle: totalAppointments?.toLocaleString() || "Loading...",
      statArrow: "up",
      statPercent: "3.48",
      statIconName: <BiDonateBlood />,
      to: "/admin/donate-blood",
    },
    {
      key: 222,
      statSubtitle: "NEED BLOOD",
      statTitle: totalEmergencies?.toLocaleString() || "Loading...",
      statArrow: "down",
      statPercent: "0.19",
      statIconName: <MdOutlineBloodtype />,
      to: "/admin/need-blood",
    },
    {
      key: 333,
      statSubtitle: "HOST DRIVE",
      statTitle: totalBloodDrives?.toLocaleString() || "Loading...",
      statArrow: "up",
      statPercent: "1.10",
      statIconName: <MdOutlineVolunteerActivism />,
      to: "/admin/host-blood-drive",
    },
    {
      key: 444,
      statSubtitle: "NEED HELP",
      statTitle: totalHelpOffers?.toLocaleString() || "Loading...",
      statArrow: "down",
      statPercent: "2.19",
      statIconName: <BiHelpCircle />,
      to: "/admin/need-help",
    },
    {
      key: 555,
      statSubtitle: "DONATIONS",
      statTitle:
        totalDonations || totalDonations === 0
          ? `${totalDonations.toLocaleString("id-ID", {
              style: "currency",
              currency: "IDR",
              minimumFractionDigits: 0,
              maximumFractionDigits: 0,
            })}`
          : "Loading...",
      statArrow: "down",
      statPercent: "2.19",
      statIconName: <BiHelpCircle />,
      to: "/admin/donate-money",
    },
    {
      key: 666,
      statSubtitle: "USERS",
      statTitle: totalUsers?.toLocaleString() || "Loading...",
      statArrow: "down",
      statPercent: "2.19",
      statIconName: <BiHelpCircle />,
      to: "/admin",
    },
  ];

  const tableHeader = [
    "UserID",
    "Name",
    "Email",
    "Phone",
    "Province",
    "CreatedAt",
  ];

  const handlePageChange = (newPage) => {
    if (newPage >= 1 && newPage <= totalPages) {
      setCurrentPage(newPage);
    }
  };

  const handleUpdateClick = (item) => {};

  const handleDelete = (item) => {};

  return (
    <>
      <HeaderStats />
      <div className="bg-white p-10 m-10 -mt-20 rounded-rsm">
        <div className="flex flex-wrap">
          {cardData.map((item, index) => (
            <Link
              to={item.to}
              className="w-full lg:w-6/12 xl:w-3/12 px-4"
              key={item.key}
            >
              <CardStats
                key={item.key}
                statSubtitle={item.statSubtitle}
                statTitle={item.statTitle}
                statArrow={item.statArrow}
                statPercent={item.statPercent}
                statIconName={item.statIconName}
                statIconColor="bg-dark_red"
              />
            </Link>
          ))}
        </div>
        {/* <div className="w-full xl:w-8/12 mb-12 xl:mb-0 px-4">
					<CardLineChart />
				</div> */}

        <h2 className="text-dark_red font-semibold mt-10 mb-5 text-[35px]">
          User Management
        </h2>

        <div className="overflow-x-scroll">
          <DisplayTableComponent
            tableHeader={tableHeader}
            data={users}
            currentPage={currentPage}
            limit={limit}
            handleUpdateClick={handleUpdateClick}
            handleDelete={handleDelete}
          />
          <div className="flex justify-center">
            <Pagination
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={handlePageChange}
              showIcons={true}
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default Dashboard;
