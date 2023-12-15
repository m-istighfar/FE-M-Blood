/* eslint-disable react/prop-types */

import { NavLink } from "react-router-dom";

const ButtonComponent = ({ buttonText, buttonLink, buttonType }) => {
    return (
        <NavLink
            to={buttonLink}
            className={`cta-btn mt-5 mx-auto rounded-rsm border
                ${
                    buttonType === "solid"
                        ? "bg-dark text-blue hover:bg-blue-600 hover:text-blue-800" 
                        : "bg-transparent text-gray-300 border border-gray-300 hover:border-blue-600 hover:bg-blue-600 hover:text-gray-100"
                }
                transition duration-300 ease-in-out
                text-lg px-4 py-2 font-semibold inline-block text-center`}
        >
            {buttonText}
        </NavLink>
    );
};

export default ButtonComponent;