import React, { useState, useEffect } from "react";
import { Dialog } from "@headlessui/react";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";
import { NavLink, useLocation } from "react-router-dom";
import BlackLogo from "../../../../public/BD Logo Hitam.png";
import WhiteLogo from "../../../../public/BD_Logo_Putih-removebg-preview.png";

const companyName = "MBlood Blood Bank";

const HeaderComponent = () => {
  const [isUserLoggedIn, setIsUserLoggedIn] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [blurActivation, setBlurActivation] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const loggedIn = localStorage.getItem("userLoggedIn");
    setIsUserLoggedIn(!!loggedIn);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("userLoggedIn");
    localStorage.removeItem("accessToken");
    setIsUserLoggedIn(false);
  };

  const navigation = [
    { name: "Home", href: "/" },
    { name: "Host Blood Drive", href: "/host-blood-drive" },
    { name: "Donate Money", href: "/donate-money" },
    { name: "Help Needed", href: "/contact" },
    { name: "Need Blood", href: "/need-blood" },
    { name: "Donate Blood", href: "/donate-blood" },
    isUserLoggedIn
      ? { name: "Logout", href: "/", action: handleLogout }
      : { name: "Login", href: "/login" },
  ];

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      if (blurActivation !== currentScrollY > 5) {
        setBlurActivation(currentScrollY > 5);
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => window.removeEventListener("scroll", handleScroll);
  }, [blurActivation]);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 border-b border-dark_gray ${
        blurActivation ? "bg-white/80 backdrop-blur-md shadow-md" : ""
      }`}
    >
      <nav className="flex items-center justify-between p-4 lg:px-8 max-w-7xl mx-auto">
        {/* Logo */}
        <a href="/" className="-m-1.5 p-1.5">
          <img
            className="w-auto h-12 lg:h-20"
            src={blurActivation ? BlackLogo : WhiteLogo}
            alt={companyName}
          />
        </a>

        {/* Mobile menu button */}
        <div className="flex lg:hidden">
          <button
            onClick={() => setMobileMenuOpen(true)}
            className="-m-2.5 p-2.5 text-dark"
          >
            <Bars3Icon className="w-6 h-6" aria-hidden="true" />
          </button>
        </div>

        {/* Desktop Navigation */}
        <div className="hidden lg:flex lg:gap-x-4">
          {navigation.map((item) => (
            <NavLink
              key={item.name}
              to={item.href}
              onClick={item.action ? item.action : null}
              className={`text-sm font-bold px-3 py-2 rounded-md ${
                location.pathname === item.href
                  ? "bg-blue text-white"
                  : "hover:bg-dark hover:text-white"
              } ${
                item.name === "Login" || item.name === "Logout"
                  ? "bg-red text-white"
                  : ""
              }`}
            >
              {item.name}
            </NavLink>
          ))}
        </div>
      </nav>

      {/* Mobile Menu */}
      <Dialog as="div" open={mobileMenuOpen} onClose={setMobileMenuOpen}>
        <div className="fixed inset-0 z-50 bg-dark_overlay/60 backdrop-blur-sm" />
        <Dialog.Panel className="fixed inset-y-0 right-0 z-50 w-full px-6 py-6 overflow-y-auto bg-white/[.85] backdrop-blur-lg sm:max-w-sm">
          <div className="flex items-center justify-between">
            {/* Mobile Logo */}
            <a href="/">
              <img className="w-auto h-12" src={BlackLogo} alt={companyName} />
            </a>
            <button
              onClick={() => setMobileMenuOpen(false)}
              className="-m-2.5 p-2.5 text-dark"
            >
              <XMarkIcon className="w-6 h-6" aria-hidden="true" />
            </button>
          </div>
          <div className="mt-6">
            {navigation.map((item) => (
              <NavLink
                key={item.name}
                to={item.href}
                onClick={item.action ? item.action : null}
                className={`block px-3 py-2 text-lg font-bold leading-7 rounded-rmd ${
                  location.pathname === item.href
                    ? "bg-blue text-white"
                    : "hover:bg-dark hover:text-white"
                } ${
                  item.name === "Login" || item.name === "Logout"
                    ? "bg-blue text-blue"
                    : "text-dark"
                }`}
              >
                {item.name}
              </NavLink>
            ))}
          </div>
        </Dialog.Panel>
      </Dialog>
    </header>
  );
};

export default HeaderComponent;
