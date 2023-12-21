import { useState, useEffect } from "react";
import HeroComponent from "../../sections/hero/hero-component";
import ThreeStepProcessComponent from "../../sections/three-step-process/three-step-process-component";
import QuoteComponent from "../../sections/quote/quote-component";
import CriteriaComponent from "../../sections/criteria/criteria-component";
import FormComponent from "../../sections/form/form-component";
import SearchBloodStockComponent from "../../sections/search-blood-stock/search-blood-stock-component";
import HeaderComponent from "../../sections/header/header-component";
import BeforeFooterCTA from "../../sections/before-footer-cta/before-footer-cta-components";
import FooterComponent from "../../sections/footer/footer-component";
import { Modal } from "flowbite-react";
import { useForm } from "react-hook-form";

import axios from "axios";

const NeedBloodPage = () => {
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

  const onSubmit = async (data) => {
    if (!localStorage.getItem("accessToken")) {
      showModal("Error", "You must be logged in to submit this form.");
      return;
    }
    try {
      await submitEmergencyRequest(data);
    } catch (error) {
      handleSubmissionError(error);
    }
  };

  const submitEmergencyRequest = async (data) => {
    const accessToken = localStorage.getItem("accessToken");
    const response = await axios.post(
      "http://localhost:3000/emergency/request",
      data,
      {
        headers: { Authorization: `Bearer ${accessToken}` },
      }
    );
    console.log("Emergency request submitted:", response.data);
    reset();
    showModal("Success", "Emergency request submitted successfully.");
  };

  const handleSubmissionError = (error) => {
    let errorMessage = "Error submitting emergency request.";
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

  const NeedBloodPageDetails = {
    quote: {
      classHint: "quote need-blood-quote",
      quoteText: `Facing a blood emergency?\n 
            Request a callback and let us help you!`,
    },
    tips_for_managing_blood_loss: {
      subheadingText: "",
      headingText: "Tips for Managing Blood Loss",
      classHint: "tips-for-managing-blood-loss",
      paraText: [
        `Stay calm and avoid any strenuous activity.`,
        `Elevate the affected area if possible to reduce blood flow.`,
        `Apply pressure to the wound to slow down or stop the bleeding.`,
        `Drink fluids such as water or sports drinks to help replenish lost fluids.`,
        `Consume foods that are high in iron and protein, such as spinach, beans, and lean meats to help replenish lost nutrients.`,
        `Consider taking iron supplements if recommended by your doctor.`,
        `Keep a record of any symptoms and changes in condition to share with medical professionals.`,
      ],
      imageUrl: "../../../assets/images/blood-donation(1).jpg",
      buttonHave: false,
    },
    hero: {
      subheadingText: "Need blood?",
      headingText: "Your Blood Needs Are Our Priority.",
      classHint: "hero need-blood-page-hero",
    },
    stepsText: {
      subheadingText: "Collecting Blood",
      headingText: "From start to finish, here's what to expect.",
    },
    bloodStock: {
      subheadingText: "When you need it",
      headingText: "Find Available Blood Stock",
      classHint: "search-blood-stock",
    },
  };

  const stepDetails = [
    {
      key: "registration",
      stepNumber: "01",
      stepName: "Registration",
      stepDescription:
        "You will be asked to fill out a form with your personal information and medical history.",
    },
    {
      key: "screening",
      stepNumber: "02",
      stepName: "Screening",
      stepDescription:
        "A medical professional will check your vitals and ask you a series of questions to ensure you are eligible to donate.",
    },
    {
      key: "donation",
      stepNumber: "03",
      stepName: "Donation",
      stepDescription:
        "A sterile needle will be inserted into your arm to collect your blood, which will then be stored and used for transfusions.",
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
      key: "additionalInfo",
      name: "additionalInfo",
      type: "text",
      placeholder: "Additional Information",
    },
  ];

  return (
    <>
      <HeaderComponent />

      <HeroComponent {...NeedBloodPageDetails.hero} />
      <FormComponent
        isLoading={modalContent.isVisible}
        fields={fields}
        heading={"Request For Emergency Blood"}
        buttonText={"Request Blood"}
        register={register}
        handleSubmit={handleSubmit(onSubmit)}
        errors={errors}
      />
      {modalContent.isVisible && (
        <Modal show={modalContent.isVisible} onClose={closeModal}>
          <Modal.Header>{modalContent.title}</Modal.Header>
          <Modal.Body>
            <p>{modalContent.body}</p>
          </Modal.Body>
        </Modal>
      )}
      <QuoteComponent {...NeedBloodPageDetails.quote} />
      <SearchBloodStockComponent {...NeedBloodPageDetails.bloodStock} />
      <ThreeStepProcessComponent
        stepsText={NeedBloodPageDetails.stepsText}
        stepDetails={stepDetails}
      />
      <CriteriaComponent
        {...NeedBloodPageDetails.tips_for_managing_blood_loss}
      />
      <BeforeFooterCTA />
      <FooterComponent />
    </>
  );
};

export default NeedBloodPage;
