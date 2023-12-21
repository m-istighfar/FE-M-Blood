/* eslint-disable react/prop-types */

const TotalDonationsComponent = ({ totalRecords }) => {
  const formatter = new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    minimumFractionDigits: 0,
  });

  const formattedTotalRecords = formatter.format(totalRecords);
  return (
    <div className="flex flex-col items-center justify-center p-6 bg-white shadow rounded-lg">
      <div className="bg-gray-100 rounded-full flex items-center justify-center mb-4 p-2">
        <span className="text-3xl font-semibold text-black">
          {formattedTotalRecords}
        </span>
      </div>
      <h3 className="text-xl font-semibold text-red mb-2">Total Donations</h3>
      <p className="text-gray-500">The total amount of donations received.</p>
    </div>
  );
};

export default TotalDonationsComponent;
