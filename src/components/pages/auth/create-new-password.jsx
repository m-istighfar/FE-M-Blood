import { useState } from "react";

const CreateNewPasswordPage = () => {
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();

    if (newPassword !== confirmPassword) {
      alert("Passwords do not match.");
      return;
    }

    console.log({ newPassword });
  };

  return (
    <main className="bg-off_white min-h-screen flex items-center justify-center p-8 md:p-0">
      <div className="bg-white shadow-lg flex flex-col items-center rounded-rmd overflow-hidden lg:max-w-lg">
        <div className="w-full p-8">
          <h1 className="font-bold text-red text-3xl mb-16">
            Create New Password
          </h1>
          <form onSubmit={handleSubmit} className="flex flex-col space-y-4">
            <div>
              <label
                htmlFor="newPassword"
                className="block mb-2 text-dark_gray"
              >
                New Password
              </label>
              <input
                id="newPassword"
                type="password"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                placeholder="Enter new password"
                className="w-full px-4 py-2 border-2 border-gray rounded-rsm focus:border-dark_red focus:outline-none"
                required
              />
            </div>
            <div>
              <label
                htmlFor="confirmPassword"
                className="block mb-2 text-dark_gray"
              >
                Confirm New Password
              </label>
              <input
                id="confirmPassword"
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                placeholder="Confirm new password"
                className="w-full px-4 py-2 border-2 border-gray rounded-rsm focus:border-dark_red focus:outline-none"
                required
              />
            </div>
            <button
              type="submit"
              className="bg-dark_red hover:bg-red text-white font-medium text-lg px-4 py-2 rounded-rsm transition-colors duration-200"
            >
              Set New Password
            </button>
          </form>
        </div>
      </div>
    </main>
  );
};

export default CreateNewPasswordPage;
