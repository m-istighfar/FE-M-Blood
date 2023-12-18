/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import React from "react";

// components

// import CardStats from "components/Cards/CardStats.js";

export default function HeaderStats({
	heading = "Welcome to MBlood",
	subheading = "Admin Dashboard",
}) {
	return (
		<>
			{/* Header */}
			<div className=" bg-dark_red md:pt-32 pb-32 pt-12">
				<div className="px-4 md:px-10 mx-auto w-full">
					<div>
						{/* Card stats */}
						<h2 className="text-white font-bold text-[50px]">
							{heading}
						</h2>
						<h3 className="text-off_white tracking-[10px] font-medium text-[20px] uppercase">
							{subheading}
						</h3>
						<div className="flex flex-wrap">
						</div>
					</div>
				</div>
			</div>
		</>
	);
}