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

    fetchUsers();
  }, [currentPage, limit]);

  const cardData = [
    {
      key: 111,
      statSubtitle: "DONATE BLOOD",
      statTitle: "000,030",
      statArrow: "up",
      statPercent: "3.48",
      statIconName: <BiDonateBlood />,
      to: "/admin/donate-blood",
    },
    {
      key: 222,
      statSubtitle: "NEED BLOOD",
      statTitle: "00,023",
      statArrow: "down",
      statPercent: "0.19",
      statIconName: <MdOutlineBloodtype />,
      to: "/admin/need-blood",
    },
    {
      key: 333,
      statSubtitle: "HOST DRIVE",
      statTitle: "00,040",
      statArrow: "up",
      statPercent: "1.10",
      statIconName: <MdOutlineVolunteerActivism />,
      to: "/admin/host-blood-drive",
    },
    {
      key: 444,
      statSubtitle: "NEED HELP",
      statTitle: "00,023",
      statArrow: "down",
      statPercent: "2.19",
      statIconName: <BiHelpCircle />,
      to: "/admin/need-help",
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
