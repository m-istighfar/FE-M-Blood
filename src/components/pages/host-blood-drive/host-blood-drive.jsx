import React, { useEffect, useState } from "react";
import HeroComponent from "../../sections/hero/hero-component";
import ThreeStepProcessComponent from "../../sections/three-step-process/three-step-process-component";
import SideBySideComponent from "../../sections/side-by-side/side-by-side-component";
import QuoteComponent from "../../sections/quote/quote-component";
import FormComponent from "../../sections/form/form-component";
import HeaderComponent from "../../sections/header/header-component";
import BeforeFooterCTA from "../../sections/before-footer-cta/before-footer-cta-components";
import FooterComponent from "../../sections/footer/footer-component";
import { useForm } from "react-hook-form";


import axios from "axios";
import newUsersInsertRequest from "../../utility-functions/new-users-insert-request";

const HostBloodDrivePage = () => {

	const [provinces, setProvinces] = useState([]);
	const [selectedProvince, setSelectedProvince] = useState(null);

	const { setValue } = useForm();

	const [formData, setFormData] = useState({
		institute: "",
		province:"",
		designation: "",
		schedule:""
	});

	useEffect(() => {
		const fetchProvinces = async () => {
			try {
				const response = await axios.get("http://localhost:3000/province");
				setProvinces(response.data.data);
				setSelectedProvince(response.data.data[0]);
			} catch (error) {
				console.error("Error fetching provinces:", error);
			}
		};
		
			fetchProvinces();
		}, []);

		useEffect(() => {
			setValue("provinceId", selectedProvince?.ProvinceID);
		}, [selectedProvince, setValue]);

	const handleSubmit = (e) => {
		e.preventDefault();

		console.log(formData);

		axios.post("http://localhost:3000/blood-drive/create", {
			institute: formData.institute,
			province: selectedProvince?.ProvinceID,
			designation: formData.designation,
			schedule: formData.schedule
		})
			.then((response) => {
				console.log("success");
				console.log(response.data);
			})
			.catch((error) => {
				console.log(error);
			});

		newUsersInsertRequest(formData, "host-blood-drive");

		setFormData({
			institute: "",
			province:"",
			designation: "",
			schedule: ""
		});
	};

	const HostBloodDrivePageDetails = {
		quote: {
			classHint: "quote host-drive-quote",
			quoteText: `“Host a blood drive and witness the power of community. Every drop tells a story of hope, each donation a narrative of compassion. Together, we can paint a masterpiece of aid—where the art is survival, and the medium is kindness.”`,
		},
		benefits_host_drive: {
			subheadingText: "Being a Hero",
			headingText: "Benefits of Hosting a Blood Drive",
			classHint: "side-col-image benefits-host-drive",
			paraText: `Hosting a blood drive is a great way to give back to your community and help save lives.
			By providing a convenient location for people to donate, you can help ensure that there is a steady supply of blood for those in need.
			Blood drives also provide an opportunity for team building and community involvement, and can boost morale and engagement among employees or group members.`,
			imageUrl: "../../../assets/images/blood-donation(1).jpg",
		},

		hosting_blood_drive: {
			subheadingText: "",
			headingText: "Hosting the Blood Drive",
			classHint: "side-col-image hosting-blood-drive",
			paraText: `On the day of the blood drive, it's important to ensure that everything runs smoothly and that donors have a positive experience.
			Make sure you have enough volunteers to help with registration, refreshments, and donor follow-up.
			Provide a comfortable and welcoming environment for donors, and ensure that all equipment is properly sanitized and maintained.`,
			imageUrl: "../../../assets/images/blood-donation(1).jpg",
		},

		hero: {
			subheadingText: "Join Us to Save Lives",
			headingText: "Host a Blood Drive to Save Lives With Us",
			classHint: "host-blood-drive-page-hero",
		},
		stepsText: {
			subheadingText: "Guide for Hosting",
			headingText: "Promoting Your Blood Drive",
		},
	};

	const stepDetails = [
		{
			key: "promote-widely",
			stepNumber: "01",
			stepName: "Promote Widely",
			stepDescription:
				"Use social media, flyers, and emails to spread the word.",
		},
		{
			key: "emphasize-benefits",
			stepNumber: "02",
			stepName: "Emphasize Benefits",
			stepDescription: "Highlight the positive impact donors can make.",
		},
		{
			key: "varity-of-channels",
			stepNumber: "03",
			stepName: "Variety of Channels",
			stepDescription:
				"Use multiple marketing channels to reach potential donors.",
		},
	];

	const fields = [
		{
			key: "institute",
			name: "institute",
			type: "text",
			placeholder: "Institute",
			required: true,
		},
		{
			key: "province",
			name: "province",
			type: "select",
			options: provinces.map((province) => ({
			value: province.ProvinceID,
			label: province.Name
			})),
			placeholder: "Province",
			required: true,
		},
		{
			key: "designation",
			name: "designation",
			type: "text",
			placeholder: "Designation",
			required: false,
		},
		{
			key: "schedule",
			name: "schedule",
			type: "date",
			placeholder: "Schedule",
			required: true,
		},
	];

	return (
		<>
			<HeaderComponent />
			<HeroComponent {...HostBloodDrivePageDetails.hero} />
			<FormComponent
				fields={fields}
				heading={"Host a Blood Drive"}
				buttonText={"Schedule Host"}
				handleSubmit={handleSubmit}
				formData={formData}
				setFormData={setFormData}
			/>
			<ThreeStepProcessComponent
				stepsText={HostBloodDrivePageDetails.stepsText}
				stepDetails={stepDetails}
			/>
			<SideBySideComponent
				{...HostBloodDrivePageDetails.benefits_host_drive}
			/>

			<QuoteComponent {...HostBloodDrivePageDetails.quote} />
			<SideBySideComponent
				{...HostBloodDrivePageDetails.hosting_blood_drive}
			/>
			<BeforeFooterCTA />
			<FooterComponent />
		</>
	);
};

export default HostBloodDrivePage;