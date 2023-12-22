import { useState, useEffect } from "react";
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
import { Modal } from "flowbite-react";
// import newUsersInsertRequest from "../../utility-functions/new-users-insert-request";

const BASE_URL = import.meta.env.VITE_BASE_URL;

const HostBloodDrivePage = () => {
  const [provinces, setProvinces] = useState([]);
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();
  const [modalContent, setModalContent] = useState({
    isVisible: false,
    title: "",
    body: "",
  });

  useEffect(() => {
    fetchProvinces();
  }, []);

  const fetchProvinces = async () => {
    try {
      const response = await axios.get(`${BASE_URL}/province`);
      setProvinces(response.data.data);
    } catch (error) {
      console.error("Error fetching provinces:", error);
      showModal("Error", "Unable to fetch provinces. Please try again later.");
    }
  };

  const onSubmit = async (data) => {
    if (!localStorage.getItem("accessToken")) {
      showModal("Error", "You must be logged in to submit this form.");
      return;
    }
    try {
      await submitForm(data);
    } catch (error) {
      handleSubmissionError(error);
    }
  };

  const submitForm = async (data) => {
    const accessToken = localStorage.getItem("accessToken");
    const response = await axios.post(`${BASE_URL}/blood-drive/create`, data, {
      headers: { Authorization: `Bearer ${accessToken}` },
    });
    console.log("Blood drive created successfully:", response.data);
    reset();
    showModal(
      "Success",
      "Blood drive created successfully. Thank you for your contribution!"
    );
  };

  const handleSubmissionError = (error) => {
    let errorMessage = "Error creating blood drive.";
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
      placeholder: "Institute Name",
      required: "Institute name is required",
    },
    {
      key: "designation",
      name: "designation",
      type: "text",
      placeholder: "Designation",
      required: true,
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
      placeholder: "Select Province",
      required: "Province selection is required",
    },
    {
      key: "scheduledDate",
      name: "scheduledDate",
      type: "date",
      placeholder: "Scheduled Date",
      required: "Scheduled date is required",
    },
  ];

  return (
    <>
      <HeaderComponent />
      <HeroComponent {...HostBloodDrivePageDetails.hero} />
      <FormComponent
        isLoading={modalContent.isVisible}
        fields={fields}
        register={register}
        handleSubmit={handleSubmit(onSubmit)}
        errors={errors}
        heading={"Host a Blood Drive"}
        buttonText={"Submit Request"}
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
        stepsText={HostBloodDrivePageDetails.stepsText}
        stepDetails={stepDetails}
      />
      <SideBySideComponent {...HostBloodDrivePageDetails.benefits_host_drive} />

      <QuoteComponent {...HostBloodDrivePageDetails.quote} />
      <SideBySideComponent {...HostBloodDrivePageDetails.hosting_blood_drive} />
      <BeforeFooterCTA />
      <FooterComponent />
    </>
  );
};

export default HostBloodDrivePage;
