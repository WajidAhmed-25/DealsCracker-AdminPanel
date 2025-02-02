import React, { useState, useEffect } from "react";
import axios from "axios";
import { Search, ChevronLeft, ChevronRight, Eye } from "lucide-react";

const localUrl = "http://localhost:8000/api/v1";

function ContactQueries() {
  const [queries, setQueries] = useState([]);
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(false);
  const [selectedMessage, setSelectedMessage] = useState(null); // State for selected message
  const [isModalOpen, setIsModalOpen] = useState(false); // State for modal visibility

  useEffect(() => {
    fetchContactQueries();
  }, [search, page, limit]);

  const fetchContactQueries = async () => {
    setLoading(true);
    try {
      const response = await axios.get(
        `${localUrl}/contactUs/getAllContactQueries`,
        {
          params: {
            search,
            page,
            limit,
          },
        }
      );
      setQueries(response.data.queries || []);
      setTotalPages(response.data.totalPages || 1);
    } catch (error) {
      console.error("Error fetching contact queries:", error);
    } finally {
      setLoading(false);
    }
  };

  const handlePageChange = (newPage) => {
    if (newPage >= 1 && newPage <= totalPages) {
      setPage(newPage);
    }
  };

  const openModal = (message) => {
    setSelectedMessage(message);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setSelectedMessage(null);
    setIsModalOpen(false);
  };

  return (
    <div className={`${isModalOpen ? "backdrop-blur-sm" : ""} p-8`}>
      <h2 className="text-2xl font-bold mb-6">Contact Queries</h2>

      {/* Search Bar & Limit Selection */}
      <div className="flex flex-col sm:flex-row justify-between items-center mb-4 gap-4">
        <div className="relative w-full sm:w-1/3">
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search by name, email, or message..."
            className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-[#237da0f8] focus:border-[#237da0f8]"
          />
          <Search className="absolute right-3 top-2.5 text-[#267fa2da] w-5 h-5" />
        </div>
        <div>
          <span className="text-sm font-semibold">Show</span>
          <select
            value={limit}
            onChange={(e) => setLimit(Number(e.target.value))}
            className="ml-2 p-2 border border-gray-300 rounded-md shadow-sm"
          >
            <option value={1}>01 per page</option>
            <option value={10}>10 per page</option>
            <option value={50}>50 per page</option>
            <option value={100}>100 per page</option>
          </select>
        </div>
      </div>

      {/* Table */}
      <div className="bg-white rounded-lg shadow-md">
        <div className="grid grid-cols-5 gap-4 p-4 font-semibold border-b bg-gray-100">
          <div>Name</div>
          <div>Email</div>
          <div>Phone</div>
          <div>Message</div>
          <div>Actions</div>
        </div>

        {loading ? (
          <div className="p-4 text-center">Loading...</div>
        ) : queries.length > 0 ? (
          queries.map((contact) => (
            <div
              key={contact._id}
              className="grid grid-cols-5 gap-4 p-4 border-b hover:bg-gray-50"
            >
              <div>
                {contact.firstName} {contact.lastName}
              </div>
              <div>{contact.email}</div>
              <div>{contact.phoneNumber}</div>
              <div className="truncate max-w-[200px]" title={contact.message}>
                {contact.message}
              </div>
              <div>
                <button
                  onClick={() => openModal(contact.message)}
                  className="text-blue-500 hover:text-blue-700"
                >
                  <Eye className="w-5 h-5 text-[#267fa2da]" />
                </button>
              </div>
            </div>
          ))
        ) : (
          <div className="p-4 text-center text-gray-500">
            No contact queries found.
          </div>
        )}
      </div>

      {/* Pagination */}
      <div className="flex justify-center mt-4 gap-2">
        <button
          onClick={() => handlePageChange(page - 1)}
          disabled={page === 1}
          className="px-4 py-2 text-sm font-medium text-white bg-[#267fa2da] border border-gray-300 rounded-md hover:bg-white hover:text-gray-700 disabled:opacity-50"
        >
          <ChevronLeft className="w-4 h-4 inline-block" /> Previous
        </button>
        <span className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md">
          Page {page} of {totalPages}
        </span>
        <button
          onClick={() => handlePageChange(page + 1)}
          disabled={page === totalPages}
          className="px-4 py-2 text-sm font-medium text-white bg-[#267fa2da] border border-gray-300 rounded-md hover:bg-white hover:text-gray-700 disabled:opacity-50"
        >
          Next <ChevronRight className="w-4 h-4 inline-block" />
        </button>
      </div>

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-50 backdrop-blur-sm">
          <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-md mx-4 sm:mx-0">
            <h3 className="text-lg font-bold mb-4">Full Message</h3>
            <p className="text-gray-700">{selectedMessage}</p>
            <div className="mt-4 flex justify-end">
              <button
                onClick={closeModal}
                className="px-4 py-2 bg-[#267fa2da] text-white rounded-md hover:bg-[#267fa2da]/70"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default ContactQueries;
