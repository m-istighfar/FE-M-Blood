/* eslint-disable react/prop-types */
import React, { useState } from 'react';
import "./form-component-styles.scss";
import WrapperSection from "../wrapper-section/wrapper-section-component";



const FormComponent = ({
  fields,
  heading,
  buttonText,
  register,
  onFormSubmit,
  errors,
}) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isFormSubmittedModalOpen, setIsFormSubmittedModalOpen] = useState(false);
  const [modalMessage, setModalMessage] = useState("");
  
  const closeModal = () => {
    setIsModalOpen(false);
    setIsFormSubmittedModalOpen(false);
  };

  const handleInternalFormSubmit = async (e) => {
    e.preventDefault();
    const formData = fields.reduce((acc, field) => {
      acc[field.name] = e.target[field.name].value;
      return acc;
    }, {});

    const loggedIn = localStorage.getItem("userLoggedIn");
    if (!loggedIn) {
      setModalMessage("Anda harus login untuk melanjutkan.");
      setIsModalOpen(true);
      return;
    }

    try {
      await onFormSubmit(formData); // Assuming onFormSubmit returns a promise
      setModalMessage("Form anda sudah terkirim.");
      setIsFormSubmittedModalOpen(true);
    } catch (error) {
      // Handle submission error
      setModalMessage("Error: Unable to submit form.");
      setIsFormSubmittedModalOpen(true);
    }
  };

  const inputStyles = `block w-full px-4 py-2 bg-dark text-white border border-gray rounded-rmd shadow-sm focus:outline-none focus:ring-2 focus:ring-blue focus:border-blue`;
  
  return (
    <WrapperSection>
      {/* Combined Modal for Login Warning and Form Submission Success */}
      {(isModalOpen || isFormSubmittedModalOpen) && (
        <div className="modal-overlay">
          <div className="modal-content">
            <p>{modalMessage}</p>
            <button onClick={closeModal} className="close-button">OK</button>
          </div>
        </div>
      )}

      <div className="form-wrapper mt-0 w-full p-6 lg:p-20 rounded-rlg shadow-lg bg-gradient-to-br from-blue to-purple-600 text-white">
        <h3 className="text-center font-semibold text-lg sm:text-2xl mb-6">
          {heading}
        </h3>
        <form className="grid grid-cols-1 md:grid-cols-2 gap-4" onSubmit={handleInternalFormSubmit}>
          {fields.map((field) => (
            <div key={field.key} className="md:col-span-2">
              {field.type === "select" ? (
                <div className="relative">
                  <label htmlFor={field.name} className="block font-semibold">
                    {field.placeholder}
                  </label>
                  <select
                    {...register(field.name)}
                    className={inputStyles}
                    required={field.required}
                  >
                    {field.options.map((option) => (
                      <option key={option.value} value={option.value}>
                        {option.label}
                      </option>
                    ))}
                  </select>
                  {errors[field.name] && (
                    <p className="error-message">
                      {errors[field.name].message}
                    </p>
                  )}
                </div>
              ) : (
                <div className="relative">
                  <label htmlFor={field.name} className="block font-semibold">
                    {field.placeholder}
                  </label>
                  <input
                    {...register(field.name)}
                    type={field.type}
                    className={inputStyles}
                    required={field.required}
                  />
                  {errors[field.name] && (
                    <p className="error-message">
                      {errors[field.name].message}
                    </p>
                  )}
                </div>
              )}
            </div>
          ))}
          <div className="md:col-span-2 flex justify-center">
            <button 
              type="submit" 
              className="bg-blue text-white font-bold py-2 px-4 rounded-rmd shadow-md hover:bg-blue hover:shadow-lg transition duration-150 ease-in-out transform hover:scale-105"
            >
              {buttonText}
            </button>
          </div>
        </form>
      </div>
    </WrapperSection>
  );
};

export default FormComponent;
