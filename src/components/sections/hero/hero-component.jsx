/* eslint-disable react/prop-types */
import "./hero-component-styles.scss";

const HeroComponent = ({
  subheadingText,
  headingText,
  buttonText,
  buttonLink,
  classHint,
  totalDonations,
}) => {
  return (
    <section className={`main-wrapper ${classHint}`}>
      <div className="hero-container home-page-hero-animated flex justify-center items-center">
        <div className="text-container md:w-[700px] flex flex-col justify-center items-center p-5">
          <h2 className="subheading text-lg md:text-2xl font-semibold text-center tracking-wide uppercase text-white">
            {subheadingText}
          </h2>
          <h1 className="heading text-2xl md:text-5xl font-bold text-center tracking-tighter leading-snug text-white">
            {headingText}
          </h1>
          {/* Displaying total donations */}
          {totalDonations && (
            <p className="total-donations text-md md:text-xl text-center text-white mt-2">
              Total Donations: Rp{totalDonations}
            </p>
          )}
          {buttonText && (
            <a
              href={buttonLink}
              className="mt-4 bg-primary hover:bg-primary-dark text-white py-2 px-6 rounded shadow-lg transition duration-300"
            >
              {buttonText}
            </a>
          )}
        </div>
      </div>
    </section>
  );
};

export default HeroComponent;
