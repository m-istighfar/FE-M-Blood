/* eslint-disable react/prop-types */
import "./quote-component-styles.scss";

import WrapperSection from "../wrapper-section/wrapper-section-component";
import ButtonComponent from "../button/button-component";

const QuoteComponent = ({
    quoteText,
    classHint,
    buttonHave,
    buttonText,
    buttonLink,
}) => {
    return (
        <WrapperSection>
            <div className={`quote-container relative p-8 md:p-16 grid place-items-center w-full rounded-xl shadow-md bg-gradient-to-r from-indigo-500 to-purple-500 ${classHint}`}>
            <blockquote className="w-full md:w-[90%] lg:w-[75%] text-lg md:text-xl lg:text-2xl text-center font-semibold text-gray-700 bg-white/70 backdrop-blur-sm p-6 rounded-lg shadow-sm">
                <span className="block mb-4 italic">&ldquo;{quoteText}&rdquo;</span>
                {buttonHave && (
                    <ButtonComponent
                        buttonText={buttonText}
                        buttonLink={buttonLink}
                        buttonType="solid"
                    />
                )}
            </blockquote>
            </div>
        </WrapperSection>
    );
};

export default QuoteComponent;
