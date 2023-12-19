import React, { useState, useEffect } from "react";
import axios from "axios";
import HeaderStats from "../../sections/header-stats/header_stats";
import DisplayTableComponent from "../../sections/display-table/display-table-component";
import FilterableComponent from "../../sections/filterable/filterable-component";

export default function AdminHostBloodDrive() {
    const [bloodDrives, setBloodDrives] = useState([]);
    const [filter, setFilter] = useState("");
    const [selectedOpt, setSelectedOpt] = useState("name");
	const [unauthorized, setUnauthorized] = useState(false);

    useEffect(() => {
        axios.get("http://localhost:3000/blood-drive")
            .then(response => {
                setBloodDrives(response.data.data.bloodDrives);
                setUnauthorized(false);
            })
            .catch(error => {
                if (error.response && error.response.status === 401) {
                    setUnauthorized(true);
                } else {
                    console.error("Error fetching blood drives:", error);
                }
            });
    }, []);

    const filterData = () => {
        if (unauthorized) {
            return []; // Return empty array if unauthorized
        }
        if (selectedOpt === "all") {
            return bloodDrives;
        } else {
            return bloodDrives.filter((drive) => 
                drive[selectedOpt]?.toString().toLowerCase().includes(filter.toLowerCase())
            );
        }
    };

    const handleSearchChange = (e) => {
        setFilter(e.target.value);
    };

    const handleInputChange = (e) => {
        setSelectedOpt(e.target.value);
    };

    const handleUpdateClick = (driveId, updatedDriveData) => {
        axios.put(`http://localhost:3000/blood-drive/${driveId}`, updatedDriveData)
            .then(response => {
                const updatedDrives = bloodDrives.map(drive => 
                    drive.DriveID === driveId ? { ...drive, ...updatedDriveData } : drive
                );
                setBloodDrives(updatedDrives);
            })
            .catch(error => {
                console.error("Error updating blood drive:", error);
            });
    };

    const handleDelete = (driveId) => {
        axios.delete(`http://localhost:3000/blood-drive/${driveId}`)
            .then(() => {
                const updatedDrives = bloodDrives.filter(drive => drive.DriveID !== driveId);
                setBloodDrives(updatedDrives);
            })
            .catch(error => {
                console.error("Error deleting blood drive:", error);
            });
    };

	const optionsData = [
		{ id: 1, name: "All", value: "all" },
		{ id: 2, name: "Institute", value: "Institute" },
		{ id: 3, name: "Designation", value: "Designation" },
		{ id: 4, name: "City", value: "Province.Name" }, // Assuming you want to filter by city name
		// Add more options if needed
	];

	const tableHeader = [
		"Drive ID",
		"Institute",
		"Designation",
		"Scheduled Date",
		"City",
		"Created At",
		"Updated At",
		"Actions", // Actions like update, delete
	];

	return (
        <>
            <HeaderStats heading="Blood Drive Hosting Users" />
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
                        // ... other props
                    />
                    {unauthorized && <p className="text-red-500">Unauthorized access. Please log in.</p>}
                </div>
            </div>
        </>
    );
}