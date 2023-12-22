/* eslint-disable react/prop-types */
import React from "react";

function Filters({
  bloodTypes,
  provinces,
  filters,
  onFilterChange,
  onClearFilters,
  dateFilterName,
  dateFilterLabel,
  statusOptions,
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
          <option value="">All</option>
          {bloodTypes.map((type) => (
            <option key={type.BloodTypeID} value={type.Type}>
              {type.Type}
            </option>
          ))}
        </select>
      </div>

      {dateFilterName && (
        <div>
          <label
            htmlFor={dateFilterName}
            className="text-sm font-medium text-gray-700"
          >
            {dateFilterLabel}
          </label>
          <input
            type="date"
            id={dateFilterName}
            name={dateFilterName}
            value={filters[dateFilterName]}
            onChange={onFilterChange}
            className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
          />
        </div>
      )}

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
          <option value="">All</option>
          {provinces.map((province) => (
            <option key={province.ProvinceID} value={province.Name}>
              {province.Name}
            </option>
          ))}
        </select>
      </div>

      {/* Status Filter */}
      <div>
        <label htmlFor="status" className="text-sm font-medium text-gray-700">
          Status
        </label>
        <select
          id="status"
          name="status"
          value={filters.status}
          onChange={onFilterChange}
          className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
        >
          <option value="">All</option>
          {statusOptions.map((status) => (
            <option key={status} value={status}>
              {status}
            </option>
          ))}
        </select>
      </div>

      {/* Search By Filter */}
      <div>
        <label htmlFor="searchBy" className="text-sm font-medium text-gray-700">
          Search By
        </label>
        <select
          id="searchBy"
          name="searchBy"
          value={filters.searchBy}
          onChange={onFilterChange}
          className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
        >
          <option value="all">All</option>
          <option value="bloodType">Blood Type</option>
          <option value="location">Location</option>
          <option value="status">Status</option>
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
