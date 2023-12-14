/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import { useState } from "react";
import "./form-component-styles.scss";
import WrapperSection from "../wrapper-section/wrapper-section-component";

const FormComponent = ({
    fields,
    heading,
    buttonText,
    formData,
    setFormData,
    handleSubmit,
}) => {
    const [status, setStatus] = useState("Pending");
    const inputStyles = `block w-full px-4 py-2 bg-white text-gray-800 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500`;

    return (
        <WrapperSection>
            <div className="form-wrapper -mt-[10em] w-full p-6 lg:p-20 rounded-lg shadow-lg bg-gradient-to-br from-blue-500 to-purple-600 text-white">
                <h3 className="text-center font-semibold text-lg sm:text-2xl mb-6">
                    {heading}
                </h3>
                {status === "Submited" ? (
                    <p className="text-center text-base mt-5">
                        Thank you for contacting MBlood. We will get back to you as soon as possible.
                    </p>
                ) : (
                    <form
                        className="grid grid-cols-1 md:grid-cols-2 gap-4"
                        onSubmit={handleSubmit}
                    >
                        {fields.map((field, index) => (
                            <input
                                key={field.key}
                                type={field.type}
                                name={field.name}
                                id={field.name}
                                className={inputStyles}
                                placeholder={field.placeholder}
                                required={field.required}
                                onChange={(e) =>
                                    setFormData({
                                        ...formData,
                                        [field.name]: e.target.value,
                                    })
                                }
                                value={formData[field.name]}
                            />
                        ))}
                        <textarea
                            className={`${inputStyles} md:col-span-2 h-32`}
                            onChange={(e) =>
                                setFormData({
                                    ...formData,
                                    message: e.target.value,
                                })
                            }
                            value={formData.message}
                            name="message"
                            id="message"
                            placeholder="Any other information..."
                        />
                        <div className="md:col-span-2 flex justify-center">
                            <button
                                type="submit"
                                className="rounded-md border border-transparent bg-white text-blue-600 hover:bg-blue-600 hover:text-white transition px-6 py-3 text-sm font-semibold cursor-pointer"
                                onClick={(e) => {
                                    handleSubmit(e);
                                    setStatus("Submited");
                                }}
                            >
                                {buttonText}
                            </button>
                        </div>
                    </form>
                )}
            </div>
        </WrapperSection>
    );
};

export default FormComponent;
