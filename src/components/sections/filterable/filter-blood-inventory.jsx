/* eslint-disable react/prop-types */

function InventoryFilters({
  bloodTypes,
  provinces,
  filters,
  onFilterChange,
  onClearFilters,
}) {
  return (
    <div className="flex flex-wrap gap-4 justify-center">
      {/* Blood Type Filter */}
      <div>
        <label
          htmlFor="bloodType"
          className="text-sm font-medium text-gray-700"
        >
          Blood Type
        </label>
        <select
          id="bloodType"
          name="bloodType"
          value={filters.bloodType}
          onChange={onFilterChange}
          className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
        >
          <option value="">All Types</option>
          {bloodTypes.map((type) => (
            <option key={type.BloodTypeID} value={type.Type}>
              {type.Type}
            </option>
          ))}
        </select>
      </div>

      {/* Expiry Date Filter */}
      <div>
        <label
          htmlFor="expiriDate"
          className="text-sm font-medium text-gray-700"
        >
          Expiry Date
        </label>
        <input
          type="date"
          id="expiriDate"
          name="expiriDate"
          value={filters.expiriDate}
          onChange={onFilterChange}
          className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
        />
      </div>

      {/* Province Filter */}
      {/* Province Filter */}
      <div>
        <label
          htmlFor="provinceName"
          className="text-sm font-medium text-gray-700"
        >
          Province
        </label>
        <select
          id="provinceName"
          name="provinceName"
          value={filters.province}
          onChange={onFilterChange}
          className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
        >
          <option value="">All Provinces</option>
          {provinces.map((province) => (
            <option key={province.ProvinceID} value={province.Name}>
              {province.Name}
            </option>
          ))}
        </select>
      </div>

      {/* Query Filter */}
      <div>
        <label htmlFor="query" className="text-sm font-medium text-gray-700">
          Query
        </label>
        <input
          type="text"
          id="query"
          name="query"
          value={filters.query}
          onChange={onFilterChange}
          className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
          placeholder="General Search"
        />
      </div>

      {/* Clear Filters Button */}
      <div className="flex items-end">
        <button
          onClick={onClearFilters}
          className="bg-gray hover:bg-gray-700 text-white font-bold py-2 px-4 rounded"
        >
          Clear Filters
        </button>
      </div>
    </div>
  );
}

export default InventoryFilters;
