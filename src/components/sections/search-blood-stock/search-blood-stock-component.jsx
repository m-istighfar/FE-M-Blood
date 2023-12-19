/* eslint-disable react/prop-types */
import { useState, useEffect } from "react";
import {
  fetchProvinces,
  fetchBloodInventoryByProvince,
} from "../../pages/auth/api";
import GroupedHeadingComponent from "../grouped-heading/grouped-heading-component";
import WrapperSection from "../wrapper-section/wrapper-section-component";

const SearchBloodStockComponent = ({
  subheadingText,
  headingText,
  classHint,
}) => {
  const [province, setProvince] = useState("");
  const [inventoryData, setInventoryData] = useState([]);
  const [provinces, setProvinces] = useState([]);

  useEffect(() => {
    const loadProvinces = async () => {
      try {
        const provincesData = await fetchProvinces();
        setProvinces(provincesData);
      } catch (error) {
        console.error("Failed to load provinces:", error);
      }
    };
    loadProvinces();
  }, []);

  const handleSearch = async (event) => {
    event.preventDefault();
    try {
      if (province) {
        const data = await fetchBloodInventoryByProvince(province);
        setInventoryData(data);
      } else {
        alert("Please select a province");
      }
    } catch (error) {
      console.error("Failed to fetch blood inventory:", error);
    }
  };

  return (
    <WrapperSection>
      <div
        className={`${classHint} bg-off_white wrapper flex flex-col justify-center items-center w-full relative p-6 py-10 sm:py-20 sm:p-20 rounded-rmd z-[25] overflow-hidden`}
      >
        <GroupedHeadingComponent
          subheadingText={subheadingText}
          headingText={headingText}
          mode="dark"
          position="center"
        />
        <div className="w-full mt-10">
          <form
            className="grid grid-cols-1 sm:grid-cols-6 gap-2 w-full"
            onSubmit={handleSearch}
          >
            <select
              name="province"
              id="province"
              className="w-full border sm:col-span-4 border-none bg-[#D9D9D9] rounded-rmd p-2 focus:outline-none focus:ring-2 focus:ring-gray"
              onChange={(e) => setProvince(e.target.value)}
              value={province}
            >
              <option value="" disabled>
                --Select Province--
              </option>
              {provinces.map((prov) => (
                <option key={prov.ProvinceID} value={prov.Name}>
                  {prov.Name}
                </option>
              ))}
            </select>

            <button
              type="submit"
              className="sm:col-span-2 sm:rounded-r-rsm border-dark text-white bg-dark hover:border-dark hover:bg-dark_red hover:text-white transition text-black px-8 py-5 text-sm font-bold"
            >
              Search Availability
            </button>
          </form>
          <div className="mt-10 w-full bg-[#d9d9d9] rounded-rsm p-5 justify-start items-start overflow-x-scroll">
            <table className="w-full overflow-x-scroll">
              <thead>
                <tr className="text-start mb-5 border-b border-off_white pb-5">
                  <th className="text-start text-sm uppercase tracking-widest text-red">
                    Blood Type
                  </th>
                  <th className="text-start text-sm uppercase tracking-widest text-red">
                    Quantity
                  </th>
                </tr>
              </thead>
              <tbody>
                {inventoryData.map((item, index) => (
                  <tr
                    key={index}
                    className="text-start mb-2 border-b border-off_white pb-3"
                  >
                    <td className="text-start sm:text-xl font-semibold">
                      {item.bloodType}
                    </td>
                    <td className="text-start sm:text-xl font-semibold">
                      {item.totalQuantity}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </WrapperSection>
  );
};

export default SearchBloodStockComponent;
