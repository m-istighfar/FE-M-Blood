/* eslint-disable react/prop-types */
function UserFilters({ provinces, filters, onFilterChange, onClearFilters }) {
  return (
    <div className="flex flex-wrap gap-4 justify-center">
      <div>
        <label htmlFor="location" className="text-sm font-medium text-gray-700">
          Province
        </label>
        <select
          id="location"
          name="location"
          value={filters.provinceName}
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
          placeholder="General Search"
          className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
        />
      </div>

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

export default UserFilters;
