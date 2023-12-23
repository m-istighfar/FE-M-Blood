import React from "react";
import { Route, Routes, Navigate, Outlet } from "react-router-dom";

import Sidebar from "../sidebar/sidebar";

export default function Admin() {
	return (
		<>
			<Sidebar />
			<div className="relative md:ml-64 bg-off_white outline">
				{/* <AdminNavbar /> */}
				{/* Header */}
				{/* <HeaderStats /> */}
				<div className="w-full h-full mx-auto bg-off_white">
					<Outlet />
					{/* <Routes>
						<Route path="/" exact element={<Dashboard />} />
						<Route
							path="donate-blood"
							exact
							element={<AdminDonateBlood />}
						/>
						<Route
							path="need-blood"
							exact
							element={<AdminNeedBlood />}
						/>
						<Route
							path="host-blood-drive"
							exact
							element={<AdminHostBloodDrive />}
						/>
						<Route
							path="need-help"
							exact
							element={<AdminNeedHelp />}
						/>
						<Route path="/redirect" element={<Navigate to="/" />} />
					</Routes> */}
					{/* <FooterAdmin /> */}
				</div>
			</div>
		</>
	);
}