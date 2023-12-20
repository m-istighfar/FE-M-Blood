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

const ContactPage = () => {
  const [formStatus, setFormStatus] = useState({ loading: false, message: "" });
  const [bloodTypes, setBloodTypes] = useState([]);
  const [provinces, setProvinces] = useState([]);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  useEffect(() => {
    const fetchBloodTypes = async () => {
      try {
        const response = await axios.get("http://localhost:3000/blood-type");
        setBloodTypes(response.data.data);
      } catch (error) {
        console.error("Error fetching blood types:", error);
      }
    };
    const fetchProvinces = async () => {
      try {
        const response = await axios.get("http://localhost:3000/province");
        setProvinces(response.data.data);
      } catch (error) {
        console.error("Error fetching provinces:", error);
      }
    };

    fetchBloodTypes();
    fetchProvinces();
  }, []);

  const submitForm = async (data) => {
    return new Promise(async (resolve, reject) => {
      setFormStatus({ loading: true, message: "" });
      const accessToken = localStorage.getItem("accessToken");
  
      if (!accessToken) {
        console.error("No access token found. User must be logged in.");
        setFormStatus({ loading: false, message: "Please log in to submit this form." });
        reject("Unauthorized: User must be logged in.");
        return;
      }
  
      data.isWillingToDonate = data.isWillingToDonate === "true";
      data.canHelpInEmergency = data.canHelpInEmergency === "true";
  
      try {
        const response = await axios.post(
          "http://localhost:3000/help-offer/offer",
          data,
          { headers: { Authorization: `Bearer ${accessToken}` } }
        );
        console.log("Help offer created successfully:", response.data);
        reset();
        resolve(response.data); // Resolve the promise with response data
      } catch (error) {
        if (error.response && error.response.status === 401) {
          setFormStatus({ loading: false, message: "Unauthorized. Please log in again." });
        } else {
          console.error("Error creating help offer:", error);
          let errorMessage = "Error creating help offer.";
          if (error.response && error.response.data && error.response.data.error) {
            errorMessage = error.response.data.error;
          }
          setFormStatus({ loading: false, message: errorMessage });
        }
        reject(error); // Reject the promise with error
      }
    });
  };
  

  const handleFormSubmission = handleSubmit(submitForm);

  const ContactPageDetails = {
    hero: {
      subheadingText: "Got any Questions?",
      headingText: "We're Here to Help",
      classHint: "contact-page-hero",
    },
  };

  const fields = [
    {
      key: "bloodType",
      name: "bloodType",
      type: "select",
      options: [
        { value: "", label: "Select Blood Type", disabled: true },
        ...bloodTypes.map((type) => ({ value: type.Type, label: type.Type })),
      ],
      placeholder: "Blood Type",
      required: "Blood type is required",
    },
    {
      key: "isWillingToDonate",
      name: "isWillingToDonate",
      type: "select",
      options: [
        { value: true, label: "Yes" },
        { value: false, label: "No" },
      ],
      placeholder: "Are you willing to donate blood?",
      required: "This field is required",
    },
    {
      key: "canHelpInEmergency",
      name: "canHelpInEmergency",
      type: "select",
      options: [
        { value: true, label: "Yes" },
        { value: false, label: "No" },
      ],
      placeholder: "Can you help in emergencies?",
      required: "This field is required",
    },
    {
      key: "reason",
      name: "reason",
      type: "text",
      placeholder: "Why do you want to help?",
      required: false,
    },
    {
      key: "location",
      name: "location",
      type: "select",
      options: [
        { value: "", label: "Select a Province", disabled: true },
        ...provinces.map((province) => ({
          value: province.Name,
          label: province.Name,
        })),
      ],
      placeholder: "Location",
      required: "Location is required",
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
        isLoading={formStatus.loading}
        fields={fields}
        register={register}
        onFormSubmit={handleFormSubmission}
        errors={errors}
        heading={"Want to Help? Let Us Know"}
        buttonText={"Submit"}
      />
      {formStatus.message && (
        <p className="error-message text-center">{formStatus.message}</p>
      )}
      <ContactDetailsComponent contactDetails={contactDetails} />
      <BeforeFooterCTA />
      <FooterComponent />
    </>
  );
};

export default ContactPage;
