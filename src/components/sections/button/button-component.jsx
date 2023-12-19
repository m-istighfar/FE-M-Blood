/* eslint-disable react/prop-types */

import { NavLink } from "react-router-dom";

const ButtonComponent = ({ buttonText, buttonLink, buttonType }) => {
    return (
        <NavLink
            to={buttonLink}
            className={`cta-btn mt-5 mx-auto rounded-rsm border
                ${
                    buttonType === "solid"
                        ? "bg-dark text-blue hover:bg-white hover:text-red" 
                        : "bg-transparent text-dark border border-gray hover:border-blue hover:bg-blue hover:text-dark"
                }
                transition duration-300 ease-in-out
                text-lg px-4 py-2 font-bold inline-block text-center`}
        >
            {buttonText}
        </NavLink>
    );
};

export default ButtonComponent;