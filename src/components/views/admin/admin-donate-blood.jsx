import React, { useState, useEffect } from "react";
import axios from "axios";
import HeaderStats from "../../sections/header-stats/header_stats";
import DisplayTableComponent from "../../sections/display-table/display-table-component";
import FilterableComponent from "../../sections/filterable/filterable-component";

export default function AdminDonateBlood() {
    const [appointments, setAppointments] = useState([]);
    const [selectedAppointment, setSelectedAppointment] = useState(null);
    const [filter, setFilter] = useState("");
    const [selectedOpt, setSelectedOpt] = useState("location");
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);
    const [unauthorized, setUnauthorized] = useState(false);
	const handleRescheduleAppointment = (appointmentId, newScheduledDate) => {
        axios.post("http://localhost:3000/appointments/reschedule", {
            appointmentId: appointmentId,
            newScheduledDate: newScheduledDate
        })
        .then(response => {
            console.log(response.data.message);
        })
        .catch(error => {
            console.error("Error rescheduling appointment:", error);
        });
    };

	const filterData = (search) => {
        if (unauthorized) {
            // Return an empty array if unauthorized
            return [];
        }

        return appointments.filter((appointment) => {
            if (selectedOpt === "all") {
                return Object.values(appointment).join(" ").toLowerCase().includes(search.toLowerCase());
            } else {
                return appointment[selectedOpt]?.toString().toLowerCase().includes(search.toLowerCase());
            }
        });
    };

    const getFilteredData = () => {
        return filterData(filter);
    };

    useEffect(() => {
        setIsLoading(true);
        axios.get("http://localhost:3000/appointments")
            .then(response => {
                setAppointments(response.data.data.appointments);
            })
            .catch(error => {
                if (error.response && error.response.status === 401) {
                    setUnauthorized(true);
                } else {
                    console.error("Error fetching appointments:", error);
                    setError(error);
                }
            })
            .finally(() => {
                setIsLoading(false);
            });
    }, []);

    const fetchAppointmentById = (id) => {
        axios.get(`http://localhost:3000/appointments/${id}`)
            .then(response => {
                setSelectedAppointment(response.data.data);
            })
            .catch(error => {
                console.error(`Error fetching appointment with ID ${id}:`, error);
            });
    };

    const handleSearchChange = (e) => {
        setFilter(e.target.value);
    };

    const handleInputChange = (e) => {
        setSelectedOpt(e.target.value);
    };

    const handleViewDetails = (appointmentId) => {
        fetchAppointmentById(appointmentId);
    };

    const optionsData = [
        { id: 1, name: "All", value: "all" },
        { id: 2, name: "Location", value: "location" },
        { id: 3, name: "Status", value: "status" },
        { id: 4, name: "Blood Type", value: "BloodType.Type" },
    ];

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
            <HeaderStats heading="Blood Donation Appointments" />
            <div className="bg-white p-10 m-10 -mt-20 rounded-rsm">
                {isLoading ? <p>Loading Appointments...</p> : (
                    <>
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
                                filterData={getFilteredData}
                                onViewDetails={handleViewDetails}
                                onReschedule={handleRescheduleAppointment}
                            />
                        </div>
                        {unauthorized && <p className="text-red-500">Unauthorized access. Please log in.</p>}
                    </>
                )}
                {error && !unauthorized && <p className="text-red-500">Error loading data: {error.message}</p>}
                {selectedAppointment && (
                    <div>
                        {/* Display selected appointment details here */}
                    </div>
                )}
            </div>
        </>
    );
}