import React, { useState, useEffect } from "react";
import axios from "axios";
import { useForm } from "react-hook-form";
import { Dialog, Listbox } from "@headlessui/react";
import { useNavigate } from "react-router-dom";
import bd5Image from "../../../assets/images/bd5.jpg";

const BASE_URL = import.meta.env.VITE_BASE_URL;

const RegisterPage = () => {
  const [provinces, setProvinces] = useState([]);
  const [selectedProvince, setSelectedProvince] = useState(null);

  const [modalState, setModalState] = useState({ isOpen: false, type: "" });

  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    setValue,
    reset,
    formState: { errors },
  } = useForm();

  useEffect(() => {
    const fetchProvinces = async () => {
      try {
        const response = await axios.get(`${BASE_URL}/province`);
        setProvinces(response.data.data);
        setSelectedProvince(response.data.data[0]);
      } catch (error) {
        console.error("Error fetching provinces:", error);
      }
    };

    fetchProvinces();
  }, []);

  useEffect(() => {
    setValue("provinceId", selectedProvince?.ProvinceID);
  }, [selectedProvince, setValue]);

  const onSubmit = async (data) => {
    try {
      const response = await axios.post(`${BASE_URL}/auth/register`, data, {
        headers: { "Content-Type": "application/json" },
      });
      console.log(response.data);
      setModalState({ isOpen: true, type: "success" });
      reset();
    } catch (error) {
      console.error("Error during registration:", error);
      setModalState({
        isOpen: true,
        type: "error",
        message: error.response?.data?.error || "Registration failed",
      });
    }
  };

  const closeModal = () => {
    setModalState({ isOpen: false, type: "" });
    if (modalState.type === "success") {
      navigate("/login");
    }
  };

  return (
    <main className="bg-off_white min-h-screen flex items-center justify-center p-8 md:p-0">
      <div className="bg-white shadow-lg flex flex-col items-center rounded-rmd overflow-hidden lg:flex-row lg:w-2/3 2xl:w-1/2">
        <div className="lg:w-1/2 p-8 sm:p-8">
          <h1 className="font-bold text-red text-3xl md:text-4xl md:mb-16">
            Join us in saving lives.
          </h1>

          <form
            onSubmit={handleSubmit(onSubmit)}
            className="flex flex-col space-y-4 mt-8"
          >
            <div>
              <label htmlFor="username" className="block mb-2 text-dark_gray">
                Username
              </label>
              <input
                id="username"
                {...register("username", { required: "Username is required" })}
                className="w-full px-4 py-2 border-2 border-gray rounded-rsm focus:border-dark_red focus:outline-none"
              />
              {errors.username && (
                <p className="text-red-500">{errors.username.message}</p>
              )}
            </div>

            <div>
              <label htmlFor="email" className="block mb-2 text-dark_gray">
                Email Address
              </label>
              <input
                id="email"
                {...register("email", {
                  required: "Email is required",
                  pattern: {
                    value: /^\S+@\S+\.\S+$/,
                    message: "Invalid email format",
                  },
                })}
                className="w-full px-4 py-2 border-2 border-gray rounded-rsm focus:border-dark_red focus:outline-none"
              />
              {errors.email && (
                <p className="text-red-500">{errors.email.message}</p>
              )}
            </div>

            <div>
              <label htmlFor="password" className="block mb-2 text-dark_gray">
                Password
              </label>
              <input
                id="password"
                {...register("password", { required: "Password is required" })}
                type="password"
                className="w-full px-4 py-2 border-2 border-gray rounded-rsm focus:border-dark_red focus:outline-none"
              />
              {errors.password && (
                <p className="text-red-500">{errors.password.message}</p>
              )}
            </div>

            <div>
              <label htmlFor="name" className="block mb-2 text-dark_gray">
                Full Name
              </label>
              <input
                id="name"
                {...register("name", { required: "Full Name is required" })}
                className="w-full px-4 py-2 border-2 border-gray rounded-rsm focus:border-dark_red focus:outline-none"
              />
              {errors.name && (
                <p className="text-red-500">{errors.name.message}</p>
              )}
            </div>

            <div>
              <label htmlFor="phone" className="block mb-2 text-dark_gray">
                Phone Number
              </label>
              <input
                id="phone"
                {...register("phone", { required: "Phone number is required" })}
                type="tel"
                className="w-full px-4 py-2 border-2 border-gray rounded-rsm focus:border-dark_red focus:outline-none"
              />
              {errors.phone && (
                <p className="text-red-500">{errors.phone.message}</p>
              )}
            </div>

            <Listbox value={selectedProvince} onChange={setSelectedProvince}>
              {({ open }) => (
                <>
                  <Listbox.Label className="block mb-2 text-dark_gray">
                    Province
                  </Listbox.Label>
                  <Listbox.Button className="w-full px-4 py-2 border-2 border-gray rounded-rsm focus:border-dark_red focus:outline-none">
                    {selectedProvince?.Name || "Select a province"}
                  </Listbox.Button>
                  {open && (
                    <Listbox.Options className="w-full mt-1 max-h-60 border-2 border-gray rounded-rsm overflow-y-auto focus:outline-none">
                      {provinces.map((province) => (
                        <Listbox.Option
                          key={province.ProvinceID}
                          value={province}
                          as={React.Fragment}
                        >
                          {({ active }) => (
                            <li
                              className={`${
                                active ? "bg-blue text-white" : "text-gray-900"
                              } cursor-pointer select-none relative px-4 py-2`}
                            >
                              {province.Name}
                            </li>
                          )}
                        </Listbox.Option>
                      ))}
                    </Listbox.Options>
                  )}
                </>
              )}
            </Listbox>

            <button
              type="submit"
              className="bg-dark_red hover:bg-red text-white font-medium text-lg px-4 py-2 rounded-rsm transition-colors duration-200"
            >
              Register
            </button>
          </form>

          <p className="mt-6 text-gray">
            Already have an account?{" "}
            <a href="/login" className="text-dark_red font-semibold underline">
              Sign in
            </a>
          </p>
        </div>

        <div className="hidden lg:block lg:w-1/2">
          <img
            src={bd5Image}
            alt="Join our community"
            className="object-cover w-full h-full"
          />
        </div>
      </div>

      <Dialog
        open={modalState.isOpen}
        onClose={closeModal}
        className="relative z-50"
      >
        <div className="fixed inset-0 bg-black/30" aria-hidden="true" />
        <div className="fixed inset-0 flex items-center justify-center p-4">
          <Dialog.Panel className="w-full max-w-md rounded bg-white p-6">
            <Dialog.Title className="text-lg font-medium leading-6 text-gray-900">
              {modalState.type === "success"
                ? "Registration Successful"
                : "Error"}
            </Dialog.Title>
            <Dialog.Description className="mt-2">
              {modalState.type === "success"
                ? "Congratulations! Your account has been successfully created. You can now log in with your credentials."
                : modalState.message}
            </Dialog.Description>
            <button
              onClick={closeModal}
              className="mt-4 bg-dark_red hover:bg-red text-white font-medium text-lg px-4 py-2 rounded-rsm transition-colors duration-200"
            >
              OK
            </button>
          </Dialog.Panel>
        </div>
      </Dialog>
    </main>
  );
};

export default RegisterPage;
