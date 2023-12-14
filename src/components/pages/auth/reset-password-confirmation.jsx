const ResetPasswordConfirmationPage = () => {
  return (
    <main className="bg-off_white min-h-screen flex items-center justify-center p-8 md:p-0">
      <div className="bg-white shadow-lg flex flex-col items-center rounded-rmd overflow-hidden lg:max-w-lg">
        <div className="w-full p-8 text-center">
          <h1 className="font-bold text-red text-3xl mb-8">
            Password Reset Requested
          </h1>
          <p className="mb-6">
            If there is an account associated with the email provided, we have
            sent a link to reset your password. Please check your email and
            follow the instructions to set a new password.
          </p>
          <p>
            If you do not receive an email, please ensure you&apos;ve entered
            the address associated with your account, or check your spam folder.
          </p>
          <a
            href="/login"
            className="inline-block bg-dark_red hover:bg-red text-white font-medium text-lg px-4 py-2 rounded-rsm transition-colors duration-200 mt-8"
          >
            Return to Sign In
          </a>
        </div>
      </div>
    </main>
  );
};

export default ResetPasswordConfirmationPage;
