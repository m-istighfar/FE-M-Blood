const NewPasswordSetConfirmationPage = () => {
  return (
    <main className="bg-off_white min-h-screen flex items-center justify-center p-8 md:p-0">
      <div className="bg-white shadow-lg flex flex-col items-center rounded-rmd overflow-hidden lg:max-w-lg">
        <div className="w-full p-8 text-center">
          <h1 className="font-bold text-red text-3xl mb-8">
            Password Reset Successful
          </h1>
          <p className="mb-6">
            Your password has been successfully reset. You can now sign in with
            your new password.
          </p>
          <a
            href="/login"
            className="inline-block bg-dark_red hover:bg-red text-white font-medium text-lg px-4 py-2 rounded-rsm transition-colors duration-200 mt-8"
          >
            Sign In
          </a>
        </div>
      </div>
    </main>
  );
};

export default NewPasswordSetConfirmationPage;
