/* eslint-disable react/prop-types */
import GroupedHeadingComponent from "../grouped-heading/grouped-heading-component";
import ProcessStepComponent from "../process-step/process-step-component";
import WrapperSection from "../wrapper-section/wrapper-section-component";

const ThreeStepProcessComponent = ({ stepDetails, stepsText }) => {
    return (
        <WrapperSection>
            <div className="process-section-container">
                <GroupedHeadingComponent
                    subheadingText={stepsText.subheadingText}
                    headingText={stepsText.headingText}
                />
                <div className="process-steps-grid py-6 md:py-12 grid grid-cols-1 md:grid-cols-3 gap-4">
                    {stepDetails.map((stepDetail, index) => (
                        <ProcessStepComponent key={index} {...stepDetail} />
                    ))}
                </div>
            </div>
        </WrapperSection>
    );
};

export default ThreeStepProcessComponent;