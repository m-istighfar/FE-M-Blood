/* eslint-disable react/prop-types */
import "./side-by-side-styles.scss";

import GroupedHeadingComponent from "../grouped-heading/grouped-heading-component";
import ParaComponent from "../para/para-component";
import WrapperSection from "../wrapper-section/wrapper-section-component";
import ButtonComponent from "../button/button-component";

const SideBySideComponent = ({
    subheadingText,
    headingText,
    paraText,
    imageUrl,
    buttonText,
    buttonLink,
    classHint,
    buttonHave,
}) => {
    return (
        <WrapperSection>
            <div className="side-by-side-wrapper grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
                <div
                    className={`image-col bg-cover bg-center rounded-rlg shadow-lg w-full ${classHint}`}
                    style={{ backgroundImage: `url(${imageUrl})`, height: '100%' }}
                ></div>
                <div className="content-col bg-white p-6 md:p-10 rounded-rlg shadow-lg flex flex-col justify-center">
                    <GroupedHeadingComponent
                        subheadingText={subheadingText}
                        headingText={headingText}
                        subheadingClass="text-lg md:text-xl text-gray-700"
                        headingClass="text-xl md:text-3xl text-gray-800 font-semibold"
                    />
                    <ParaComponent innerText={paraText} className="text-sm md:text-base text-gray-600 my-4" />
                    {buttonHave && (
                        <ButtonComponent
                            buttonText={buttonText}
                            buttonLink={buttonLink}
                            buttonType="solid"
                            buttonClass="mt-4 text-white bg-dark hover:bg-blue"
                        />
                    )}
                </div>
            </div>
        </WrapperSection>
    );
};

export default SideBySideComponent;
