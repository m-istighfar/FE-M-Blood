import "./before-footer-cta-styles.scss";

import ButtonComponent from "../button/button-component";
import GroupedHeadingComponent from "../grouped-heading/grouped-heading-component";

const BeforeFooterCTA = () => {
    return (
        <section className="before-footer-cta flex flex-col justify-center items-center w-full mx-auto my-0 px-4 py-20 bg-gradient-to-br from-blue-500 to-purple-600">
            <div className="container mx-auto p-4">
                <div className="cta-content text-center text-dark">
                    <GroupedHeadingComponent
                        subheadingText={"Join the Movement"}
                        headingText={"Make a Difference, Give Blood"}
                        mode="light"
                        position="center"
                        boxWidth="large"
                    />
                    <ButtonComponent
                        buttonText={"Start Now"}
                        buttonLink={"/donate-blood"}
                        buttonType="solid"
                    />
                </div>
            </div>
        </section>
    );
};

export default BeforeFooterCTA;
