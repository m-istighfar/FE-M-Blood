/* eslint-disable react/prop-types */
import "./criteria-styles.scss";

import GroupedHeadingComponent from "../grouped-heading/grouped-heading-component";
import ListComponent from "../list/list-component";
import WrapperSection from "../wrapper-section/wrapper-section-component";

const CriteriaComponent = ({
    subheadingText,
    headingText,
    paraText,
    classHint,
}) => {
    return (
        <WrapperSection>
            <div className={`${classHint} wrapper flex flex-col justify-center items-center w-full relative p-10 py-24 sm:p-24 bg-opacity-90 bg-gray-800 text-white rounded-rlg shadow-xl`}>
                <GroupedHeadingComponent
                    subheadingText={subheadingText}
                    headingText={headingText}
                    mode="light"
                />
                <ul className="list-disc list-inside mt-6 text-lg font-semibold text-blue-600">
                    {paraText.map((itemText, index) => (
                        <li key={index} className="mb-2">
                            <ListComponent itemText={itemText} />
                        </li>
                    ))}
                </ul>
            </div>
        </WrapperSection>
    );
};

export default CriteriaComponent;
