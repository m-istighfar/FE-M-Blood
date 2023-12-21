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
import TotalDonationsComponent from "../../sections/total-donation/total-donation";
import { useForm } from "react-hook-form";
import axios from "axios";

const BASE_URL = import.meta.env.VITE_BASE_URL;

const DonateMoneyPage = () => {
  const [formStatus, setFormStatus] = useState({ loading: false, message: "" });
  const [totalRecords, setTotalRecords] = useState("Loading...");
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://app.sandbox.midtrans.com/snap/snap.js";
    script.setAttribute("data-client-key", "SB-Mid-client-D7Pe2FmM10sLsp6J");
    document.body.appendChild(script);

    fetchTotalDonations();
  }, []);

  const fetchTotalDonations = async () => {
    try {
      const response = await axios.get(`${BASE_URL}/donation/total-donations`);
      setTotalRecords(response.data.data.totalRecords);
    } catch (error) {
      console.error("Error fetching total donations:", error);
      setTotalRecords("Error");
    }
  };

  const onSubmit = async (data) => {
    setFormStatus({ loading: true, message: "" });

    try {
      const response = await axios.post(`${BASE_URL}/donation/create`, data);
      if (response.data.snapToken) {
        window.snap.pay(response.data.snapToken);
      }
      reset();
      setFormStatus({
        loading: false,
        message: "Donation processed successfully. Thank you for your support!",
      });
      fetchTotalDonations();
    } catch (error) {
      console.error("Error processing donation:", error);
      setFormStatus({
        loading: false,
        message: "Error processing donation. Please try again.",
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
      key: "firstName",
      name: "firstName",
      type: "text",
      placeholder: "First Name",
      required: "First name is required",
    },
    {
      key: "lastName",
      name: "lastName",
      type: "text",
      placeholder: "Last Name",
      required: "Last name is required",
    },
    {
      key: "email",
      name: "email",
      type: "email",
      placeholder: "Email",
      required: "Email is required",
    },
    {
      key: "phone",
      name: "phone",
      type: "tel",
      placeholder: "Phone Number",
      required: "Phone number is required",
    },
    {
      key: "amount",
      name: "amount",
      type: "number",
      placeholder: "Donation Amount",
      required: "Donation amount is required",
    },
  ];

  return (
    <>
      <HeaderComponent />

      <HeroComponent
        subheadingText={DonateBloodPageDetails.hero.subheadingText}
        headingText={DonateBloodPageDetails.hero.headingText}
        buttonText={DonateBloodPageDetails.hero.buttonText}
        buttonLink={DonateBloodPageDetails.hero.buttonLink}
        classHint={DonateBloodPageDetails.hero.classHint}
      />
      <TotalDonationsComponent totalRecords={totalRecords} />

      <FormComponent
        isLoading={formStatus.loading}
        fields={fields}
        register={register}
        handleSubmit={handleSubmit(onSubmit)}
        errors={errors}
        heading={"Make a Donation"}
        buttonText={"Donate Now"}
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
