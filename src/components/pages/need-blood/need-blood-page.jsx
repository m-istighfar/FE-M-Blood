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
import { useForm } from "react-hook-form";

import axios from "axios";
import newUsersInsertRequest from "../../utility-functions/new-users-insert-request";

const NeedBloodPage = () => {
  const [bloodTypes, setBloodTypes] = useState([]);
  const [selectedBlood, setSelectedBlood] = useState(null);

  const { setValue } = useForm();

  const [formData, setFormData] = useState({
    bloodType: "",
    additionalInfo: "",
  });

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

    axios
      .post("http://localhost:3001/create-need-blood", {
        bloodType: formData.bloodType,
        additionalInfo: formData.additionalInfo,
      })
      .then((response) => {
        console.log("success");
        console.log(response.data);
      })
      .catch((error) => {
        console.log(error);
      });

    newUsersInsertRequest(formData, "need-blood");

    setFormData({
      bloodType: "",
      additionalInfo: "",
    });
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
      options: bloodTypes.map((bloodType) => ({
        value: bloodType.BloodID,
        label: bloodType.Type,
      })),
      placeholder: "Blood Type",
      required: true,
    },
    {
      key: "additionalInfo",
      name: "additionalInfo",
      type: "text",
      placeholder: "Additional Info",
      required: false,
    },
  ];

  return (
    <>
      <HeaderComponent />

      <HeroComponent {...NeedBloodPageDetails.hero} />
      <FormComponent
        fields={fields}
        heading={"Request For Emergency Blood"}
        buttonText={"Request blood"}
        handleSubmit={handleSubmit}
        formData={formData}
        setFormData={setFormData}
      />
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
