/* eslint-disable no-unused-vars */
import { useState, useEffect } from "react";

import { Dialog } from "@headlessui/react";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";
import { Link, NavLink, useLocation  } from "react-router-dom";


import BlackLogo from "../../../../public/BD Logo Hitam.png";
import WhiteLogo from "../../../../public/BD_Logo_Putih-removebg-preview.png";

const navigation = [
    { name: "Home", href: "/" },
	{ name: "Host Blood Drive", href: "/host-blood-drive" },
	{ name: "Donate Money", href: "https://donorbox.org/donate-money-11" },
	{ name: "Help Needed", href: "/contact" },
	{ name: "Need Blood", href: "/need-blood", secondLast: true },
	{ name: "Donate Blood", href: "/donate-blood", last: true },
];

const compnayName = "MBlood Blood Bank";

const HeaderComponent = () => {
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const [blurActivation, setBlurActivation] = useState(false);
    const [isActiveName, setIsActiveName] = useState(null);
    const location = useLocation();

    const reuseableClass = {
        for_last: `last:bg-dark last:text-blue last:hover:bg-blue last:hover:text-dark`,
        for_second_last: `rounded-rsm border border-blue/[.5] hover:bg-blue hover:text-dark`,
    };

    useEffect(() => {
        const handleScroll = () => {
            const currentScrollY = window.scrollY;
            if (blurActivation !== (currentScrollY > 5)) {
                setBlurActivation(currentScrollY > 5);
            }
        };

        window.addEventListener("scroll", handleScroll, { passive: true });


        const currentPath = location.pathname;
        setIsActiveName(currentPath);

        return () => window.removeEventListener("scroll", handleScroll);
    }, [blurActivation, location.pathname]);

    return (
        <header className={`fixed inset-x-0 top-0 z-50 border-b border-blue-300 ${blurActivation ? "bg-white/[.2] backdrop-blur-md shadow-md" : ""}`}>
            <nav className="flex items-center justify-between p-4 lg:px-8 max-w-7xl m-auto">
                <div className="flex lg:flex-1">
                    <a href="/" className="-m-1.5 p-1.5">
                        <span className="sr-only">{compnayName}</span>
                        <img className="w-auto h-20" src={WhiteLogo} alt="MBlood Logo" />
                    </a>
                </div>

                {/* Mobile menu button hidden on large screens */}
                <div className="flex lg:hidden">
					<button
						type="button"
						className="-m-2.5 inline-flex items-center justify-center rounded-rmd p-2.5 text-off_white"
						onClick={() => setMobileMenuOpen(true)}
					>
						<span className="sr-only">Open main menu</span>
						<Bars3Icon className="w-6 h-6" aria-hidden="true" />
					</button>
				</div>

                {/* Desktop navigation */}
                <div className="hidden lg:flex lg:gap-x-4">
                    {navigation.map((item) => (
                        <NavLink
							key={item.name}
							onClick={() => {
								setIsActiveName(item.name);
								setMobileMenuOpen(false);
							}}
							to={item.href}
							active="bg-red"
							className={`text-sm font-medium hover:bg-blue lg:transition leading-6 text-off_blue px-3 py-2 rounded-rsm ${
								item.secondLast &&
								`${reuseableClass.for_second_last}`
							} ${item.last && `${reuseableClass.for_last}`} ${
								isActiveName == item.name ? `bg-blue` : ``
							}`}
						>
							{item.name}
						</NavLink>
                    ))}
                </div>
            </nav>

            {/* Mobile menu */}
            <Dialog
				as="div"
				className="lg:hidden"
				open={mobileMenuOpen}
				onClose={setMobileMenuOpen}
			>
				<div className="fixed inset-0 z-50" />
				<Dialog.Panel className="fixed inset-y-0 right-0 z-50 w-full px-6 py-6 overflow-y-auto bg-blue sm:max-w-sm sm:ring-1 sm:ring-blue-900/10">
					<div className="flex items-center justify-between">
						<a href="/" className="-m-1.5 p-1.5">
							<span className="sr-only">{compnayName}</span>
							<img
								className="w-auto h-12"
								src={BlackLogo}
								alt=""
							/>
						</a>
						<button
							type="button"
							className="-m-2.5 rounded-rmd p-2.5 text-blue-900"
							onClick={() => setMobileMenuOpen(false)}
						>
							<span className="sr-only">Close menu</span>
							<XMarkIcon className="w-6 h-6" aria-hidden="true" />
						</button>
					</div>
					<div className="flow-root mt-6">
						<div className="-my-6 divide-y divide-blue-500/10">
							<div className="py-6 space-y-2">
								{navigation.map((item) => (
									<NavLink
										key={item.name}
										onClick={() => {
											setIsActiveName(item.name);
											setMobileMenuOpen(false);
										}}
										to={item.href}
										className={`-mx-3 block px-3 py-2 text-base font-semibold leading-7 text-blue-900 hover:bg-dark rounded-rsm ${
											item.secondLast &&
											`rounded-rsm border border-dark/[.5] hover:bg-blue hover:text-dark`
										} ${
											item.last &&
											`last:bg-dark last:text-blue last:hover:bg-blue last:hover:text-dark`
										} ${
											isActiveName == item.name
												? `bg-dark text-blue`
												: ``
										}`}
									>
										{item.name}
									</NavLink>
								))}
							</div>
						</div>
					</div>
				</Dialog.Panel>
			</Dialog>
        </header>
    );
};

export default HeaderComponent;
