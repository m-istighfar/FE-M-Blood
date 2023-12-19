import React, { useState, useEffect } from "react";
import axios from "axios";
import HeaderStats from "../../sections/header-stats/header_stats";
import DisplayTableComponent from "../../sections/display-table/display-table-component";
import FilterableComponent from "../../sections/filterable/filterable-component";

export default function AdminNeedHelp() {
    const [helpOffers, setHelpOffers] = useState([]);
    const [filter, setFilter] = useState("");
    const [selectedOpt, setSelectedOpt] = useState("location");
	const [unauthorized, setUnauthorized] = useState(false);

    useEffect(() => {
        axios.get("http://localhost:3000/help-offer")
            .then(response => {
                setHelpOffers(response.data.data.helpOffers);
                setUnauthorized(false);
            })
            .catch(error => {
                if (error.response && error.response.status === 401) {
                    setUnauthorized(true);
                } else {
                    console.error("Error fetching help offers:", error);
                }
            });
    }, []);

    const filterData = () => {
        if (unauthorized) {
            return []; // Return empty array if unauthorized
        }
        return helpOffers.filter((offer) => {
            if (selectedOpt === "all") {
                return true;
            } else {
                return offer[selectedOpt]?.toString().toLowerCase().includes(filter.toLowerCase());
            }
        });
    };

    const handleSearchChange = (e) => {
        setFilter(e.target.value);
    };

    const handleInputChange = (e) => {
        setSelectedOpt(e.target.value);
    };

    const handleUpdateClick = (offerId, updatedOfferData) => {
        axios.put(`http://localhost:3000/help-offer/${offerId}`, updatedOfferData)
            .then(response => {
                const updatedOffers = helpOffers.map(offer => 
                    offer.OfferID === offerId ? { ...offer, ...updatedOfferData } : offer
                );
                setHelpOffers(updatedOffers);
            })
            .catch(error => {
                console.error("Error updating help offer:", error);
            });
    };

    const handleDelete = (offerId) => {
        axios.delete(`http://localhost:3000/help-offer/${offerId}`)
            .then(() => {
                const updatedOffers = helpOffers.filter(offer => offer.OfferID !== offerId);
                setHelpOffers(updatedOffers);
            })
            .catch(error => {
                console.error("Error deleting help offer:", error);
            });
    };

    const optionsData = [
        { id: 1, name: "All", value: "all" },
        { id: 2, name: "Location", value: "Location" },
        { id: 3, name: "Blood Type", value: "BloodType.Type" },
        // Add more options as needed
    ];

    const tableHeader = [
        "Offer ID",
        "User Name",
        "Blood Type",
        "Willing To Donate",
        "Can Help In Emergency",
        "Location",
        "Reason",
        "Actions", // Actions like update, delete
    ];

    return (
        <>
            <HeaderStats heading="Help Offers" />
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
                        handleUpdateClick={handleUpdateClick}
                        handleDelete={handleDelete}
                        // Pass other props as needed
                    />
                    {unauthorized && <p className="text-red-500">Unauthorized access. Please log in.</p>}
                </div>
            </div>
        </>
    );
}