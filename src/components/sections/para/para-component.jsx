/* eslint-disable react/prop-types */
const ParaComponent = ({ innerText, size = "medium" }) => {
    return (
        <p className={`para-text ${size === "large" ? "text-lg" : "text-base"} leading-relaxed text-gray-600 my-2`}>
            {innerText}
        </p>
    );
};

export default ParaComponent;
