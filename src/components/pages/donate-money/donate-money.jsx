import { useState, useEffect } from "react";
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

const DonateMoneyPage = () => {
  const [bloodTypes, setBloodTypes] = useState([]);
  const [provinces, setProvinces] = useState([]);
  const [formStatus, setFormStatus] = useState({ loading: false, message: "" });
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

  const onSubmit = async (data) => {
    setFormStatus({ loading: true, message: "" });
    const accessToken = localStorage.getItem("accessToken");
    if (!accessToken) {
      console.error("No access token found. User must be logged in.");
      setFormStatus({ loading: false, message: "User must be logged in." });
      return;
    }

    try {
      const response = await axios.post(
        "http://localhost:3000/appointments/create",
        data,
        { headers: { Authorization: `Bearer ${accessToken}` } }
      );
      console.log("Appointment created successfully:", response.data);
      reset();
      setFormStatus({
        loading: false,
        message:
          "Appointment created successfully. Thank you for your willingness to donate blood!",
      });
    } catch (error) {
      console.error("Error creating appointment:", error);

      let errorMessage = "Error creating appointment.";
      if (error.response && error.response.data && error.response.data.error) {
        errorMessage = error.response.data.error;
      }

      setFormStatus({
        loading: false,
        message: errorMessage,
      });
    }
  };

  const DonateBloodPageDetails = {
    quote: {
      classHint: "quote",
      quoteText: `“By donating money, you provide nourishment. By donating blood, you give the gift of life. Join us in this noble cause today!”`,
    },
    why_donate_blood: {
      subheadingText: "Support the Cause",
      headingText: "Why Your Monetary Donations Matter",
      classHint: "side-col-image why-donate-blood",
      paraText: `Monetary donations play a crucial role in supporting blood donation activities. Here are a few reasons why your financial support is vital:
        \n― Your donation helps in purchasing essential equipment and supplies for blood collection and storage.
        ― It supports the operational costs of blood donation camps and drives.
        ― Financial contributions aid in conducting awareness campaigns, encouraging more people to donate blood.
        ― It helps in funding research and development to improve blood donation processes and safety.
        ― Your support ensures that blood donation services remain available, reliable, and accessible to everyone in need.`,
      imageUrl: "../../../assets/images/blood-donation(1).jpg",
    },
    eligiblity_criteria: {
      subheadingText: "Everyone Can Contribute",
      headingText: "Donation Eligibility",
      classHint: "side-col-image eligibility-criteria",
      paraText: [
        `No age restrictions - everyone is welcome to contribute.`,
        `Donations from all countries accepted.`,
        `Various payment methods available for your convenience.`,
        `No minimum donation amount - every contribution counts.`,
        `Secure and confidential handling of personal and payment information.`,
        `Opportunity to become a regular donor or make a one-time contribution.`,
      ],
      imageUrl: "../../../assets/images/blood-donation(1).jpg",
      buttonText: "Donate Now",
      buttonLink: "/donate-blood",
      buttonHave: false,
    },
    hero: {
      subheadingText: "Support Our Cause",
      headingText: "Your Donation Can Make a Difference",
      classHint: "donate-blood-page-hero",
    },
    stepsText: {
      subheadingText: "Donation Process",
      headingText: "Step-by-Step Guide to Donating Blood",
    },
  };

  const stepDetails = [
    {
      key: "learn-about-impact",
      stepNumber: "01",
      stepName: "Learn About the Impact",
      stepDescription:
        "Understand how your donation supports blood donation activities, such as funding equipment, awareness campaigns, and operational costs.",
    },
    {
      key: "choose-donation-amount",
      stepNumber: "02",
      stepName: "Choose Your Donation Amount",
      stepDescription:
        "Select the amount you wish to donate. Every contribution, big or small, makes a significant difference.",
    },
    {
      key: "complete-donation",
      stepNumber: "03",
      stepName: "Complete Your Donation",
      stepDescription:
        "Fill in your details and complete the donation securely using our online payment system. Your generosity saves lives.",
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
        isLoading={formStatus.loading}
        fields={fields}
        register={register}
        handleSubmit={handleSubmit(onSubmit)}
        errors={errors}
        heading={"Schedule an Appointment"}
        buttonText={"Schedule Now"}
      />
      {formStatus.message && (
        <p className="error-message text-center">{formStatus.message}</p>
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

export default DonateMoneyPage;
