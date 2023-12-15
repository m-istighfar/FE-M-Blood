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
    const [error, setError] = useState("");
    const [status, setStatus] = useState("Pending");
    const inputStyles = `block w-full px-4 py-2 bg-dark text-gray-800 border border-gray-300 rounded-rmd shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500`;

    return (
        <WrapperSection>
            <div className="form-wrapper mt-0 w-full p-6 lg:p-20 rounded-rlg shadow-lg bg-gradient-to-br from-blue-500 to-purple-600 text-white">
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
                    <div key={field.key} className={field.name === 'province' || field.name === 'schedule' ? 'md:col-span-1' : 'md:col-span-2'}>
                        {field.type === "select" ? (
                        <div className="relative">
                            <label htmlFor={field.name} className="block font-semibold">
                            {field.placeholder}
                            </label>
                            <select
                            name={field.name}
                            id={field.name}
                            className={inputStyles}
                            required={field.required}
                            onChange={(e) =>
                                setFormData({
                                ...formData,
                                [field.name]: e.target.value,
                                })
                            }
                            value={formData[field.name]}
                            >
                            <option value="" disabled>
                                Select {field.placeholder}
                            </option>
                            {field.options.map((option) => (
                                <option key={option.value} value={option.value}>
                                {option.label}
                                </option>
                            ))}
                            </select>
                        </div>
                        ) : field.type === "date" ? (
                        <div className="relative">
                            <label htmlFor={field.name} className="block font-semibold">
                            {field.placeholder}
                            </label>
                            <input
                            type="date"
                            name={field.name}
                            id={field.name}
                            className={inputStyles}
                            required={field.required}
                            onChange={(e) =>
                                setFormData({
                                ...formData,
                                [field.name]: e.target.value,
                                })
                            }
                            value={formData[field.name]}
                            />
                        </div>
                        ) : (
                        <input
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
                        )}
                    </div>
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
                        className="rounded-rmd border border-transparent bg-dark text-blue-600 hover:bg-blue hover:text-white transition px-6 py-3 text-sm font-semibold cursor-pointer"
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
