import { useState, useEffect } from "react";
import { Modal } from "flowbite-react";
import HeroComponent from "../../sections/hero/hero-component";
import ThreeStepProcessComponent from "../../sections/three-step-process/three-step-process-component";
import SideBySideComponent from "../../sections/side-by-side/side-by-side-component";
import QuoteComponent from "../../sections/quote/quote-component";
import CriteriaComponent from "../../sections/criteria/criteria-component";
import FormComponent from "../../sections/form/form-component";
import HeaderComponent from "../../sections/header/header-component";
import BeforeFooterCTA from "../../sections/before-footer-cta/before-footer-cta-components";
import FooterComponent from "../../sections/footer/footer-component";
import { useForm } from "react-hook-form";
import axios from "axios";

const BASE_URL = import.meta.env.VITE_BASE_URL;

const DonateBloodPage = () => {
  const [bloodTypes, setBloodTypes] = useState([]);
  const [provinces, setProvinces] = useState([]);
  const [modalContent, setModalContent] = useState({
    isVisible: false,
    title: "",
    body: "",
  });
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    await fetchBloodTypes();
    await fetchProvinces();
  };

  const fetchBloodTypes = async () => {
    try {
      const response = await axios.get(`${BASE_URL}/blood-type`);
      setBloodTypes(response.data.data);
    } catch (error) {
      console.error("Error fetching blood types:", error);
    }
  };

  const fetchProvinces = async () => {
    try {
      const response = await axios.get(`${BASE_URL}/province`);
      setProvinces(response.data.data);
    } catch (error) {
      console.error("Error fetching provinces:", error);
    }
  };

  const onSubmit = async (data) => {
    if (!localStorage.getItem("accessToken")) {
      showModal("Error", "You must be logged in to submit this form.");
      return;
    }
    try {
      await submitAppointment(data);
    } catch (error) {
      handleSubmissionError(error);
    }
  };

  const submitAppointment = async (data) => {
    const accessToken = localStorage.getItem("accessToken");
    const response = await axios.post(`${BASE_URL}/appointments/create`, data, {
      headers: { Authorization: `Bearer ${accessToken}` },
    });
    console.log("Appointment created successfully:", response.data);
    reset();
    showModal(
      "Success",
      "Appointment created successfully. Thank you for your willingness to donate blood!"
    );
  };

  const handleSubmissionError = (error) => {
    let errorMessage = "Error creating appointment.";
    if (error.response?.data?.error) {
      errorMessage = error.response.data.error;
    }
    showModal("Error", errorMessage);
  };

  const showModal = (title, body) => {
    setModalContent({ isVisible: true, title, body });
  };

  const closeModal = () => {
    setModalContent({ ...modalContent, isVisible: false });
  };

  const DonateBloodPageDetails = {
    quote: {
      classHint: "quote",
      quoteText: `“By donating money, you provide nourishment. By donating blood, you give the gift of life. Join us in this noble cause today!”`,
    },
    why_donate_blood: {
      subheadingText: "Donate blood today",
      headingText: "Why should you donate blood?",
      classHint: "side-col-image why-donate-blood",
      paraText: `Donating blood is a selfless act that has the power to save lives. Here are a few reasons why you should consider donating blood:
			\n― You could help save up to three lives with just one donation.
			― Blood is always needed in emergency situations, such as natural disasters and accidents.
			― Blood is needed for patients undergoing surgeries, cancer treatment, and other medical procedures.
			― Blood cannot be manufactured, which means that the only source of blood is through donations from volunteers.
			― Donating blood can also have health benefits for the donor, such as reducing the risk of heart disease and cancer.`,
      imageUrl: "../../../assets/images/blood-donation(1).jpg",
    },
    eligiblity_criteria: {
      subheadingText: "Are you ready?",
      headingText: "Eligibility Criteria",
      classHint: "side-col-image eligibility-criteria",
      paraText: [
        `18-50 years, above 50 Kg.`,
        `Normal temperature, pulse and blood pressure.`,
        `No Respiratory Diseases`,
        `Above 12.5 g/dL Hemoglobin`,
        `No skin disease, puncture or scars`,
        `No history of transmissible disease`,
      ],
      imageUrl: "../../../assets/images/blood-donation(1).jpg",
      buttonText: "Donate Now",
      buttonLink: "/donate-blood",
      buttonHave: false,
    },
    hero: {
      subheadingText: "Donate Blood",
      headingText: "Save Life By Donating Blood Today",
      classHint: "donate-blood-page-hero",
    },
    stepsText: {
      subheadingText: "Donation Process",
      headingText: "Step-by-Step Guide to Donating Blood",
    },
  };

  const stepDetails = [
    {
      key: "check-eligibility",
      stepNumber: "01",
      stepName: "Check your eligibility",
      stepDescription:
        "Confirm you meet the eligibility requirements to donate blood, such as age, weight, and overall health.",
    },
    {
      key: "schedule-an-appointment",
      stepNumber: "02",
      stepName: "Schedule an appointment",
      stepDescription:
        "Schedule an appointment at a blood bank or blood drive near you.",
    },
    {
      key: "donate-blood",
      stepNumber: "03",
      stepName: "Donate Blood",
      stepDescription:
        "Arrive at the appointment, fill out a questionnaire, and donate blood. The process takes about 10-15 minutes.",
    },
  ];

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
    {
      key: "scheduledDate",
      name: "scheduledDate",
      type: "date",
      placeholder: "Scheduled Date",
      required: true,
    },
  ];

  return (
    <>
      <HeaderComponent />

      <HeroComponent {...DonateBloodPageDetails.hero} />
      <FormComponent
        isLoading={false}
        fields={fields}
        register={register}
        handleSubmit={handleSubmit(onSubmit)}
        errors={errors}
        heading={"Schedule an Appointment"}
        buttonText={"Schedule Now"}
      />
      {modalContent.isVisible && (
        <Modal show={modalContent.isVisible} onClose={closeModal}>
          <Modal.Header>{modalContent.title}</Modal.Header>
          <Modal.Body>
            <p>{modalContent.body}</p>
          </Modal.Body>
        </Modal>
      )}

      <ThreeStepProcessComponent
        stepsText={DonateBloodPageDetails.stepsText}
        stepDetails={stepDetails}
      />
      <CriteriaComponent {...DonateBloodPageDetails.eligiblity_criteria} />
      <SideBySideComponent {...DonateBloodPageDetails.why_donate_blood} />
      <QuoteComponent {...DonateBloodPageDetails.quote} />
      <BeforeFooterCTA />
      <FooterComponent />
    </>
  );
};

export default DonateBloodPage;
