import { useState, useEffect } from "react";
import HeroComponent from "../../sections/hero/hero-component";
import FormComponent from "../../sections/form/form-component";
import ContactDetailsComponent from "../../sections/details/details-component";
import HeaderComponent from "../../sections/header/header-component";
import BeforeFooterCTA from "../../sections/before-footer-cta/before-footer-cta-components";
import FooterComponent from "../../sections/footer/footer-component";
import { useForm } from "react-hook-form";

import axios from "axios";

import { FaPhoneAlt, FaMapMarkerAlt } from "react-icons/fa";
import { MdEmail } from "react-icons/md";
import newUsersInsertRequest from "../../utility-functions/new-users-insert-request";

const ContactPage = () => {

	const [provinces, setProvinces] = useState([]);
	const [selectedProvince, setSelectedProvince] = useState(null);
	const [bloodTypes, setBloodTypes] = useState([]);
	const [selectedBlood, setSelectedBlood] = useState(null);

	const { setValue } = useForm();

	const [formData, setFormData] = useState({
		bloodType: "",
		isWillingToDonate: "",
		canHelpInEmergency: "",
		reason: "",
		province: "",
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

		useEffect(() => {
			const fetchBlood = async () => {
				try {
					const response = await axios.get("http://localhost:3000/blood-type");
					setBloodTypes(response.data.data);
					setSelectedBlood(response.data.data[0]);
				} catch (error) {
					console.error("Error fetching blood:", error);
				}
			};
			
				fetchBlood();
			}, []);
	
			useEffect(() => {
				setValue("BloodTypeID", selectedBlood?.BloodTypeID);
			}, [selectedBlood, setValue]);

	const handleSubmit = (e) => {
		e.preventDefault();

		console.log(formData);

		axios.post("http://localhost:3000/help-offer/offer", {
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
			options: bloodTypes.map((bloodType) => ({
			value: bloodType.BloodID,
			label: bloodType.Type,
			})),
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
			options: provinces.map((province) => ({
			value: province.ProvinceID,
			label: province.Name
			})),
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