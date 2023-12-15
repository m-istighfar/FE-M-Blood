import { useState } from "react";
import HeroComponent from "../../sections/hero/hero-component";
import FormComponent from "../../sections/form/form-component";
import ContactDetailsComponent from "../../sections/details/details-component";
import HeaderComponent from "../../sections/header/header-component";
import BeforeFooterCTA from "../../sections/before-footer-cta/before-footer-cta-components";
import FooterComponent from "../../sections/footer/footer-component";

import Axios from "axios";

import { FaPhoneAlt, FaMapMarkerAlt } from "react-icons/fa";
import { MdEmail } from "react-icons/md";
import newUsersInsertRequest from "../../utility-functions/new-users-insert-request";

const ContactPage = () => {
	const [formData, setFormData] = useState({
		bloodType: "",
		isWillingToDonate: "",
		canHelpInEmergency: "",
		reason: "",
		province: "",
	});

	const handleSubmit = (e) => {
		e.preventDefault();

		console.log(formData);

		Axios.post("http://localhost:3000/help-offer/offer", {
			bloodType: formData.bloodType,
			isWillingToDonate: formData.isWillingToDonate,
			canHelpInEmergency: formData.canHelpInEmergency,
			reason: formData.reason,
			location: formData.location,
		})
			.then((response) => {
				console.log("success");
				console.log(response.data);
			})
			.catch((error) => {
				console.log(error);
			});

		newUsersInsertRequest(formData, "need-help");

		setFormData({
		bloodType: "",
		isWillingToDonate: "",
		canHelpInEmergency: "",
		reason: "",
		province: "",
		});
	};

	const ContactPageDetails = {
		hero: {
			subheadingText: "Got any Questions?",
			headingText: "Don't Know What to Do? Let Us Assist You.",
			classHint: "contact-page-hero",
		},
	};

	const fields = [
		{
			key: "bloodType",
			name: "bloodType",
			type: "select",
			options: [
				{ value: "A", label: "A" },
				{ value: "B", label: "B" },
				{ value: "AB", label: "AB" },
				{ value: "O", label: "O" },
			],
			placeholder: "Blood Type",
			required: true,
		},
		{
			key: "isWillingToDonate",
			name: "isWillingToDonate",
			type: "select",
			options: [
				{ value: "yes", label: "Yes" },
				{ value: "no", label: "No" },
			],
			placeholder: "Are you willing to donate?",
			required: true,
		},
		{
			key: "canHelpInEmergency",
			name: "canHelpInEmergency",
			type: "select",
			options: [
				{ value: "yes", label: "Yes" },
				{ value: "no", label: "No" },
			],
			placeholder: "Can you help in an emergency?",
			required: true,
		},
		{
			key: "reason",
			name: "reason",
			type: "text",
			placeholder: "Reason",
			required: false,
		},
		{
			key: "province",
			name: "province",
			type: "select",
			options: [
				{ value: "province1", label: "Province 1" },
				{ value: "province2", label: "Province 2" },
				{ value: "province3", label: "Province 3" },
			],
			placeholder: "Province",
			required: true,
		},
	];

	const contactDetails = [
		{
			key: "phone",
			stepNumber: <FaPhoneAlt />,
			stepName: "Phone",
			stepDescription: "(+62)877799770xx",
			stepUrl: "tel:+62877799770xx",
		},
		{
			key: "email",
			stepNumber: <MdEmail />,
			stepName: "Email",
			stepDescription: "help@mblood.com",
			stepUrl: "mailto:help@mblood.com",
		},
		{
			key: "address",
			stepNumber: <FaMapMarkerAlt />,
			stepName: "Address",
			stepDescription: "Indonesia",
			stepUrl: "https://goo.gl/maps/sszR4K9aDKuYfy2Y8",
		},
	];

	return (
		<>
			<HeaderComponent />

			<HeroComponent {...ContactPageDetails.hero} />
			<FormComponent
				fields={fields}
				heading={"We're to help"}
				buttonText={"Send Message"}
				handleSubmit={handleSubmit}
				formData={formData}
				setFormData={setFormData}
			/>
			<ContactDetailsComponent contactDetails={contactDetails} />
			<BeforeFooterCTA />
			<FooterComponent />
		</>
	);
};

export default ContactPage;