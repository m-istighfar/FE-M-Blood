import React, { useState, useEffect } from "react";
import axios from "axios";
import HeaderStats from "../../sections/header-stats/header_stats";
import DisplayTableComponent from "../../sections/display-table/display-table-component";
import FilterableComponent from "../../sections/filterable/filterable-component";

export default function AdminNeedBlood() {
    const [appointments, setAppointments] = useState([]);
    const [filter, setFilter] = useState("");
    const [selectedOpt, setSelectedOpt] = useState("name");
	const [unauthorized, setUnauthorized] = useState(false);
	const optionsData = [
        { id: 1, name: "All", value: "all" },
        { id: 2, name: "Name", value: "name" },
        { id: 3, name: "Phone", value: "phone" },
        { id: 4, name: "Email", value: "email" },
        { id: 5, name: "Blood Type", value: "bloodType" },

    ];

	const handleRescheduleAppointment = (appointmentId, newScheduledDate) => {
        axios.post("http://localhost:3000/appointments/reschedule", {
            appointmentId,
            newScheduledDate
        })
        .then(response => {
        })
        .catch(error => {
            console.error("Error rescheduling appointment:", error);
        });
    };

    const handleCancelAppointment = (appointmentId) => {
        axios.post("http://localhost:3000/appointments/cancel", {
            appointmentId
        })
        .then(response => {
            // Refresh appointments list or handle UI update
        })
        .catch(error => {
            console.error("Error cancelling appointment:", error);
        });
    };

    const handleCompleteAppointment = (appointmentId) => {
        axios.post("http://localhost:3000/appointments/complete", {
            appointmentId
        })
        .then(response => {
            // Refresh appointments list or handle UI update
        })
        .catch(error => {
            console.error("Error completing appointment:", error);
        });
    };

    useEffect(() => {
        axios.get("http://localhost:3000/emergency")
            .then(response => {
                setAppointments(response.data.data.appointments);
                setUnauthorized(false); // Set unauthorized to false upon successful data fetch
            })
            .catch(error => {
                if (error.response && error.response.status === 401) {
                    setUnauthorized(true); // Set unauthorized to true if status code is 401
                } else {
                    console.error("Error fetching appointments:", error);
                }
            });
    }, []);

	const filterData = () => {
        if (unauthorized) {
            return [];
        }

        return appointments.filter((item) => {
            if (selectedOpt === "all") {
                return true;
            } else {
                return item[selectedOpt]?.toString().toLowerCase().includes(filter.toLowerCase());
            }
        });
    };

	const getFilteredData = () => {
        if (unauthorized) {
            return []; // Return empty array if unauthorized
        }
        return appointments.filter((item) => {
            if (selectedOpt === "all") {
                return true;
            } else if (item[selectedOpt]?.toString().toLowerCase().includes(filter.toLowerCase())) {
                return true;
            }
            return false;
        });
    };

	const handleSearchChange = (e) => {
        setFilter(e.target.value);
    };

	const handleInputChange = (e) => {
        setSelectedOpt(e.target.value);
    };

    const tableHeader = [
        "Appointment ID",
        "User ID",
        "Blood Type",
        "Scheduled Date",
        "Location",
        "Status",
        "Actions",
    ];

    return (
        <>
            <HeaderStats heading="Emergency Blood Requests" />
            <div className="bg-white p-10 m-10 -mt-20 rounded-rsm">
                <FilterableComponent
                    filter={filter}
                    handleSearchChange={handleSearchChange}
                    optionsData={optionsData}
                    selectedOpt={selectedOpt}
                    handleInputChange={handleInputChange}
                />
                <div className="overflow-x-scroll">
                    <DisplayTableComponent
                        tableHeader={tableHeader}
                        filterData={filterData}
                    />
                    {unauthorized && <p className="text-red-500">Unauthorized access. Please log in.</p>}
                </div>
            </div>
        </>
    );
}
