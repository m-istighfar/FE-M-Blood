/* eslint-disable react/prop-types */
import PropTypes from "prop-types";
import { PencilIcon, TrashIcon } from "@heroicons/react/24/outline";

function DisplayTableComponent({
  tableHeader,
  data,
  handleCheckboxChange,
  handleUpdateClick,
  handleDelete,
  status,
  setStatus,
  selectedId,
  setSelectedId,
  updatedData,
  setUpdatedData,
  currentPage, // pass currentPage as a prop
  limit, // pass limit as a prop
}) {
  // Fungsi untuk menampilkan baris tabel
  const renderTableRows = (data) => {
    return data.map((item, index) => (
      <tr key={item.AppointmentID} className="border-b">
        <td className="py-2 px-4">{(currentPage - 1) * limit + index + 1}</td>
        {tableHeader.slice(1).map((header) => (
          <td key={header} className="py-2 px-4">
            {item[header]}
          </td>
        ))}
        <td className="py-2 px-4">
          <button
            onClick={() => handleUpdateClick(item)}
            className="bg-blue text-white px-2 py-1 rounded-md hover:bg-blue-700"
          >
            <PencilIcon className="w-5 h-5" />
          </button>
        </td>
        <td className="py-2 px-4">
          <button
            onClick={() => handleDelete(item)}
            className="bg-red text-white px-2 py-1 rounded-md hover:bg-red-700"
          >
            <TrashIcon className="w-5 h-5" /> {/* Ikon "Trash" */}
          </button>
        </td>
      </tr>
    ));
  };

  return (
    <div className="overflow-x-scroll">
      <table className="mt-10 shadow-lg bg-white w-full">
        <thead className="bg-dark p-4 text-off_white font-normal border border-dark">
          <tr>
            {/* Menampilkan header tabel */}
            {tableHeader.map((header, index) => (
              <th
                className="px-4 py-4 font-normal text-[14px] text-start uppercase tracking-[.3em] border-rmd"
                key={index}
              >
                {header}
              </th>
            ))}
            <th className="px-4 py-4 cols" colSpan={2}>
              Actions
            </th>
          </tr>
        </thead>
        <tbody className="border-b border-off_white">
          {/* Menampilkan baris tabel */}
          {renderTableRows(data)}
        </tbody>
      </table>
    </div>
  );
}

// PropType untuk validasi properti
DisplayTableComponent.propTypes = {
  tableHeader: PropTypes.array.isRequired,
  data: PropTypes.array.isRequired,
  handleCheckboxChange: PropTypes.func.isRequired,
  handleUpdateClick: PropTypes.func.isRequired,
  handleDelete: PropTypes.func.isRequired,
  status: PropTypes.string,
  setStatus: PropTypes.func,
  selectedId: PropTypes.any,
  setSelectedId: PropTypes.func,
  updatedData: PropTypes.object,
  setUpdatedData: PropTypes.func,
};

export default DisplayTableComponent;
