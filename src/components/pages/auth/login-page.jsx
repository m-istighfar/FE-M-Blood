import React from "react";
import "tailwindcss/tailwind.css";

const LoginPage = () => {
  return (
    <main className="bg-off_white min-h-screen flex items-center justify-center p-8 md:p-0">
      <div className="bg-white shadow-lg flex flex-col items-center rounded-rmd overflow-hidden lg:flex-row lg:w-2/3 2xl:w-1/2">
        <div className="lg:w-1/2 p-8 sm:p-8">
          <h1 className="font-bold text-red text-3xl md:text-4xl md:mb-16">
            Help save lives with your generous donation.
          </h1>

          <form className="flex flex-col space-y-4 mt-8">
            <div>
              <label htmlFor="email" className="block mb-2 text-dark_gray">
                Email Address
              </label>
              <input
                id="email"
                type="email"
                placeholder="youremail@example.com"
                className="w-full px-4 py-2 border-2 border-gray rounded-rsm focus:border-dark_red focus:outline-none"
              />
            </div>

            <div>
              <label htmlFor="password" className="block mb-2 text-dark_gray">
                Password
              </label>
              <input
                id="password"
                type="password"
                placeholder="Enter your password"
                className="w-full px-4 py-2 border-2 border-gray rounded-rsm focus:outline-none focus:border-dark_red"
              />
              <a
                href="/forgot-password"
                className="text-sm text-dark_red hover:underline mt-2 inline-block"
              >
                Forgot password?
              </a>
            </div>

            <button
              type="submit"
              className="bg-dark_red hover:bg-red text-white font-medium text-lg px-4 py-2 rounded-rsm transition-colors duration-200"
            >
              Sign In
            </button>
          </form>

          <p className="mt-6 text-gray">
            New here?{" "}
            <a href="/signup" className="text-dark_red font-semibold underline">
              Create an account
            </a>
          </p>
        </div>

        <div className="hidden lg:block lg:w-1/2">
          <img
            src="src/assets/images/bd5.jpg" // Make sure to use a relevant blood donation image
            alt="Blood Donation"
            className="object-cover w-full h-full"
          />
        </div>
      </div>
    </main>
  );
};

export default LoginPage;
