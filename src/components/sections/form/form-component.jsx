/* eslint-disable react/prop-types */

import "./form-component-styles.scss"; // Ensure this path is correct for your styles
import WrapperSection from "../wrapper-section/wrapper-section-component";

const FormComponent = ({
  fields,
  heading,
  buttonText,
  register,
  handleSubmit,
  errors,
}) => {
  const inputStyles = `block w-full px-4 py-2 bg-dark text-white border border-gray rounded-rmd shadow-sm focus:outline-none focus:ring-2 focus:ring-blue focus:border-blue`; // Modify as per your styling requirements

  return (
    <WrapperSection>
      <div className="form-wrapper mt-0 w-full p-6 lg:p-20 rounded-rlg shadow-lg bg-gradient-to-br from-blue to-purple-600 text-white">
        <h3 className="text-center font-semibold text-lg sm:text-2xl mb-6">
          {heading}
        </h3>
        <form
          className="grid grid-cols-1 md:grid-cols-2 gap-4"
          onSubmit={handleSubmit}
        >
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
              className="bg-red text-white font-sans py-2 px-4 rounded-full shadow-lg hover:shadow-xl transition-transform transform hover:scale-105"
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
