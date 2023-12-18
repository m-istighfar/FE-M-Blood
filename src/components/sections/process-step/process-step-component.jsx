/* eslint-disable react/prop-types */
import ParaComponent from "../para/para-component";

const ProcessStepComponent = ({
    stepNumber,
    stepName,
    stepDescription,
    stepUrl,
}) => {
    return (
        <a href={stepUrl} className="process-step flex flex-col items-center p-4 hover:bg-gray rounded-rlg transition-all duration-300" key={stepNumber}>
            <div className="step-number-wrapper w-[60px] h-[60px] bg-white rounded-full flex justify-center items-center mb-4">
            <span className="step-number font-bold text-[24px] text-dark">
                {stepNumber}
            </span>
            </div>
            <div className="step-content-wrapper text-center">
                <h3 className="step-name font-bold text-[20px] text-dark mb-2">
                    {stepName}
                </h3>
                <ParaComponent innerText={stepDescription} className="text-sm text-dark" />
            </div>
        </a>
    );
};

export default ProcessStepComponent;