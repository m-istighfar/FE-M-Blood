import "./two-cta-styles.scss";

import WrapperSection from "../wrapper-section/wrapper-section-component";
import ButtonComponent from "../button/button-component";

const TwoCtaComponent = () => {
    const ctaDetails = [
        {
            key: "donate-blood",
            ctaClass: "first-cta-col",
            subheading: "Help Others with Your Donation",
            heading: "Join Our Blood Donor Community",
            btnText: "Become a Donor",
            ctaLink: "/donate-blood",
            buttonType: "solid"
        },
        {
            key: "request-blood",
            ctaClass: "second-cta-col",
            subheading: "In Need of Blood?",
            heading: "Find Donors Near You",
            btnText: "Find Blood",
            ctaLink: "/need-blood",
            buttonType: "solid"
        },
    ];

    return (
        <WrapperSection>
            <div className="cta-grid-wrapper grid sm:grid-cols-2 gap-4 w-full">
                {ctaDetails.map((ctaDetail) => (
                    <div 
                        key={ctaDetail.key}
                        className={`cta-col sm:before:transition rounded-rmd overflow-hidden w-full relative z-[25] pt-[150px] pb-[30px] sm:pb-[50px] px-[30px] sm:px-[50px] ${ctaDetail.ctaClass}`}
                    >
                        <div className="cta-col-content relative z-50">
                            
                            <p className="cta-subheading not-italic font-medium text-sm sm:text-md leading-normal tracking-[0.2em] uppercase">
                                {ctaDetail.subheading}
                            </p>
                            <h2 className="cta-heading not-italic font-semibold text-[30px] sm:text-[40px] leading-tight capitalize">
                                {ctaDetail.heading}
                            </h2>
                            <ButtonComponent
                                buttonText={ctaDetail.btnText}
                                buttonLink={ctaDetail.ctaLink}
                                buttonType={ctaDetail.buttonType}
                            />
                        </div>
                    </div>
                ))}
            </div>
        </WrapperSection>
    );
};

export default TwoCtaComponent;