import { useState } from "react";

const ForgotPasswordPage = () => {
  const [email, setEmail] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();

    console.log({ email });
  };

  return (
    <main className="bg-off_white min-h-screen flex items-center justify-center p-8 md:p-0">
      <div className="bg-white shadow-lg flex flex-col items-center rounded-rmd overflow-hidden lg:max-w-lg">
        <div className="w-full p-8">
          <h1 className="font-bold text-red text-3xl mb-16">
            Forgot your password?
          </h1>
          <p className="mb-8">
            Enter your email address below and we&apos;ll send you a link to
            reset your password.
          </p>
          <form onSubmit={handleSubmit} className="flex flex-col space-y-4">
            <div>
              <label htmlFor="email" className="block mb-2 text-dark_gray">
                Email Address
              </label>
              <input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="youremail@example.com"
                className="w-full px-4 py-2 border-2 border-gray rounded-rsm focus:border-dark_red focus:outline-none"
                required
              />
            </div>
            <button
              type="submit"
              className="bg-dark_red hover:bg-red text-white font-medium text-lg px-4 py-2 rounded-rsm transition-colors duration-200"
            >
              Send Reset Link
            </button>
          </form>
          <p className="mt-6 text-gray">
            Remembered your password?{" "}
            <a href="/login" className="text-dark_red font-semibold underline">
              Sign in
            </a>
          </p>
        </div>
      </div>
    </main>
  );
};

export default ForgotPasswordPage;
