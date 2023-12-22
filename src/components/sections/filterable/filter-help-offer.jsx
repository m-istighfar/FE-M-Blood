/* eslint-disable react/prop-types */
import React from "react";

function Filters({
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

      {/* Willingness to Donate Filter */}
      <div>
        <label
          htmlFor="isWillingToDonate"
          className="text-sm font-medium text-gray-700"
        >
          Willing to Donate
        </label>
        <select
          id="isWillingToDonate"
          name="isWillingToDonate"
          value={filters.isWillingToDonate}
          onChange={onFilterChange}
          className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
        >
          <option value="">Any</option>
          <option value="true">Yes</option>
          <option value="false">No</option>
        </select>
      </div>

      {/* Can Help in Emergency Filter */}
      <div>
        <label
          htmlFor="canHelpInEmergency"
          className="text-sm font-medium text-gray-700"
        >
          Can Help In Emergency
        </label>
        <select
          id="canHelpInEmergency"
          name="canHelpInEmergency"
          value={filters.canHelpInEmergency}
          onChange={onFilterChange}
          className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
        >
          <option value="">Any</option>
          <option value="true">Yes</option>
          <option value="false">No</option>
        </select>
      </div>

      {/* Location Filter */}
      <div>
        <label htmlFor="location" className="text-sm font-medium text-gray-700">
          Location
        </label>
        <select
          id="location"
          name="location"
          value={filters.location}
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

export default Filters;
