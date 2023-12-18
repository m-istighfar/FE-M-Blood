/* eslint-disable react/prop-types */
const WrapperSection = ({ children }) => {
    return (
        <section className="wrapper-section bg-white shadow-lg rounded-rlg overflow-hidden mx-auto my-6 px-4 py-8 md:py-12">
            <div className="section-container max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0 md:space-x-4 text-dark">
                {children}
            </div>
        </section>
    );
};

export default WrapperSection;