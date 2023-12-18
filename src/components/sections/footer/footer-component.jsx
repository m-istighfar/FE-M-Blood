/* eslint-disable react/no-unescaped-entities */
/* eslint-disable no-undef */

import { NavLink } from "react-router-dom";

const FooterComponent = () => {
    const exploreLinks = [
        {
            title: "Home",
            link: "/",
        },
        {
            title: "Donate Blood",
            link: "/donate-blood",
        },
        {
            title: "Request Blood",
            link: "/need-blood",
        },
        {
            title: "Donate Money",
            link: "https://donorbox.org/donate-money-11",
        },
        {
            title: "Host Blood Drive",
            link: "/host-blood-drive",
        },
        {
            title: "Contact",
            link: "/contact",
        },
        {
            title: "Admin Dashboard",
            link: "/admin",
        },
    ];

    const contactLinks = [
		{
			title: "(+62)-8777-99-770xx",
			link: "tel:+62877799770xx",
		},
		{
			title: "help@mblood.com",
			link: "mailto:help@mblood.com",
		},
		{
			title: "Indonesia",
			link: "https://goo.gl/maps/QCLpYP3yyUqdT8HA7",
		},
		{
			title: "Open 24/7",
			link: "/contact",
		},
	];

    return (
        <footer className="footer bg-off_white text-dark pt-12 pb-8 px-4">
            <div className="container mx-auto grid md:grid-cols-3 gap-8">
                <div className="footer-branding">
                    <h2 className="text-4xl font-bold mb-3">
                        M<span className="text-red-500">Blood</span>
                    </h2>
                    <p className="text-dark">
                        You don't have to be a doctor to save a life: Just donate blood
                    </p>
                </div>

                <div className="footer-explore">
                    <h3 className="text-lg font-semibold uppercase mb-4">
                        Explore
                    </h3>
                    <ul>
                        {exploreLinks.map((link, index) => (
                            <li key={index} className="mb-2">
                                <NavLink to={link.link} className="hover:text-red-500 transition-colors duration-300">
                                    {link.title}
                                </NavLink>
                            </li>
                        ))}
                    </ul>
                </div>

                <div className="footer-contact">
                    <h3 className="text-lg font-semibold uppercase mb-4">
                        Contact
                    </h3>
                    <ul>
                        {contactLinks.map((link, index) => (
                            <li key={index} className="mb-2">
                                <NavLink to={link.link} className="hover:text-red-500 transition-colors duration-300">
                                    {link.title}
                                </NavLink>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>

            <div className="footer-bottom text-center border-t border-gray mt-8 pt-6">
                <p>
                    ©️ 2023 M Blood - Website design by{"Restu WP & M Istigfar "}
                    <a href="linkedin.com/in/restu-windri-pangestu-590849257" className="underline hover:text-red-500" target="_blank" rel="noreferrer">
                        AlphaDev
                    </a>
                </p>
            </div>
        </footer>
    );
};

export default FooterComponent;
