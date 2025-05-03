import React, { useState, useEffect } from 'react';
import { FaCalendarAlt, FaTimes, FaSignOutAlt, FaBars, FaChartLine } from 'react-icons/fa';

const LeadsPage = () => {
  const [allLeads, setAllLeads] = useState([]);
  const [filteredLeads, setFilteredLeads] = useState([]);
  const [filters, setFilters] = useState({
    searchText: '',
    postcode: '',
    startDate: '',
    endDate: '',
    status: [],
    subscription: [],
    leadType: [],
    broker: [],
  });
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const statusOptions = ['new', 'no feedback', 'In Progress', 'waiting', 'no success', 'order placed', 'completed'];
  const subscriptionOptions = ['Prepaid', 'Premium', 'Basic'];
  const leadTypeOptions = ['Salesperson', 'Buyer', 'Investor'];
  const brokerOptions = ['Prime', 'Standard', 'Elite'];

  useEffect(() => {
    const fetchAllLeads = async () => {
      try {
        const response = await fetch('http://localhost:5000/api/get-leads');
        if (!response.ok) {
          throw new Error('Failed to fetch leads from the backend');
        }
        const data = await response.json();
        setAllLeads(data);
        setFilteredLeads(data);
      } catch (error) {
        console.error('Error fetching leads:', error);
        setAllLeads([]);
        setFilteredLeads([]);
      }
    };
    fetchAllLeads();
  }, []);

  useEffect(() => {
    let updatedLeads = [...allLeads];

    if (filters.searchText) {
      updatedLeads = updatedLeads.filter(
        (lead) =>
          lead._id.toString().toLowerCase().includes(filters.searchText.toLowerCase()) ||
          lead.objectId.toLowerCase().includes(filters.searchText.toLowerCase()) ||
          lead.company.toLowerCase().includes(filters.searchText.toLowerCase()) ||
          lead.name.toLowerCase().includes(filters.searchText.toLowerCase())
      );
    }

    if (filters.postcode) {
      updatedLeads = updatedLeads.filter((lead) =>
        lead.postcode.toLowerCase().includes(filters.postcode.toLowerCase())
      );
    }

    if (filters.startDate) {
      updatedLeads = updatedLeads.filter((lead) => {
        const [day, month, year] = lead.date.split('/');
        const leadDate = new Date(`${year}-${month}-${day}`);
        const startDate = new Date(filters.startDate);
        console.log(`Start Date Filter - Lead Date: ${leadDate}, Start Date: ${startDate}, Result: ${leadDate >= startDate}`);
        return leadDate >= startDate;
      });
    }

    if (filters.endDate) {
      updatedLeads = updatedLeads.filter((lead) => {
        const [day, month, year] = lead.action.split('/');
        const leadActionDate = new Date(`${year}-${month}-${day}`);
        const endDate = new Date(filters.endDate);
        console.log(`End Date Filter - Lead Action Date: ${leadActionDate}, End Date: ${endDate}, Result: ${leadActionDate <= endDate}`);
        return leadActionDate <= endDate;
      });
    }

    if (filters.status.length > 0) {
      updatedLeads = updatedLeads.filter((lead) => filters.status.includes(lead.status));
    }

    if (filters.subscription.length > 0) {
      updatedLeads = updatedLeads.filter((lead) => filters.subscription.includes(lead.subscription));
    }

    if (filters.leadType.length > 0) {
      updatedLeads = updatedLeads.filter((lead) => filters.leadType.includes(lead.type));
    }

    if (filters.broker.length > 0) {
      updatedLeads = updatedLeads.filter((lead) => filters.broker.includes(lead.broker));
    }

    setFilteredLeads(updatedLeads);
  }, [filters, allLeads]);

  const updateFilter = (filterName, value) => {
    setFilters((prevFilters) => ({
      ...prevFilters,
      [filterName]: value,
    }));
  };

  const addFilterValue = (filterName, value) => {
    setFilters((prevFilters) => {
      const currentValues = prevFilters[filterName];
      if (!currentValues.includes(value)) {
        return { ...prevFilters, [filterName]: [...currentValues, value] };
      }
      return prevFilters;
    });
  };

  const removeFilterValue = (filterName, value) => {
    setFilters((prevFilters) => ({
      ...prevFilters,
      [filterName]: prevFilters[filterName].filter((item) => item !== value),
    }));
  };

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-gray-50 to-green-50">
      <nav className="bg-white shadow-lg p-4 flex justify-between items-center sticky top-0 z-50">
        <div className="flex items-center space-x-3">
          <FaChartLine className="text-green-600 text-3xl" />
          <span className="text-2xl font-bold text-gray-800">Leads Dashboard</span>
        </div>
        <div className="hidden md:flex space-x-6">
          <a href="#" className="text-gray-600 hover:text-green-600">Home</a>
          <a href="#" className="text-gray-600 hover:text-green-600">Leads</a>
          <a href="#" className="text-gray-600 hover:text-green-600">Reports</a>
          <button className="text-gray-600 hover:text-green-600 flex items-center">
            <FaSignOutAlt className="mr-2" /> Logout
          </button>
        </div>
        <button className="md:hidden text-gray-600" onClick={() => setIsMenuOpen(!isMenuOpen)}>
          <FaBars className="text-2xl" />
        </button>
      </nav>

      {isMenuOpen && (
        <div className="md:hidden bg-white shadow-lg p-4 flex flex-col space-y-3">
          <a href="#" className="text-gray-600 hover:text-green-600">Home</a>
          <a href="#" className="text-gray-600 hover:text-green-600">Leads</a>
          <a href="#" className="text-gray-600 hover:text-green-600">Reports</a>
          <button className="text-gray-600 hover:text-green-600 flex items-center">
            <FaSignOutAlt className="mr-2" /> Logout
          </button>
        </div>
      )}

      <div className="flex-1 p-4 sm:p-6 lg:p-8">
        <h1 className="text-3xl sm:text-4xl font-bold text-gray-800 mb-8 flex items-center">
          <span className="text-green-600 mr-3">📊</span> Leads
        </h1>

        <div className="bg-white p-4 sm:p-6 lg:p-8 rounded-2xl shadow-xl mb-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 mb-6">
            <input
              type="text"
              placeholder="Search by customer, lead ID, property ID, agent"
              className="border border-gray-200 p-3 rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-green-500"
              value={filters.searchText}
              onChange={(e) => updateFilter('searchText', e.target.value)}
            />
            <input
              type="text"
              placeholder="Search by postcode"
              className="border border-gray-200 p-3 rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-green-500"
              value={filters.postcode}
              onChange={(e) => updateFilter('postcode', e.target.value)}
            />
            <div className="flex items-center border border-gray-200 p-3 rounded-lg">
              <FaCalendarAlt className="mr-2 text-green-600" />
              <input
                type="date"
                className="w-full outline-none"
                value={filters.startDate}
                onChange={(e) => updateFilter('startDate', e.target.value)}
              />
            </div>
            <div className="flex items-center border border-gray-200 p-3 rounded-lg">
              <FaCalendarAlt className="mr-2 text-green-600" />
              <input
                type="date"
                className="w-full outline-none"
                value={filters.endDate}
                onChange={(e) => updateFilter('endDate', e.target.value)}
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 mb-6">
            <div>
              <select
                className="border border-gray-200 p-3 rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-green-500"
                onChange={(e) => addFilterValue('status', e.target.value)}
                value=""
              >
                <option value="" disabled>Status</option>
                {statusOptions.map((status) => (
                  <option key={status} value={status}>
                    {status}
                  </option>
                ))}
              </select>
              <div className="flex flex-wrap gap-2 mt-3">
                {filters.status.map((status) => (
                  <span
                    key={status}
                    className="bg-green-100 text-green-800 text-sm px-3 py-1 rounded-full flex items-center"
                  >
                    {status}
                    <FaTimes
                      className="ml-2 cursor-pointer hover:text-red-500"
                      onClick={() => removeFilterValue('status', status)}
                    />
                  </span>
                ))}
              </div>
            </div>

            <div>
              <select
                className="border border-gray-200 p-3 rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-green-500"
                onChange={(e) => addFilterValue('subscription', e.target.value)}
                value=""
              >
                <option value="" disabled>Subscription</option>
                {subscriptionOptions.map((subscription) => (
                  <option key={subscription} value={subscription}>
                    {subscription}
                  </option>
                ))}
              </select>
              <div className="flex flex-wrap gap-2 mt-3">
                {filters.subscription.map((subscription) => (
                  <span
                    key={subscription}
                    className="bg-green-100 text-green-800 text-sm px-3 py-1 rounded-full flex items-center"
                  >
                    {subscription}
                    <FaTimes
                      className="ml-2 cursor-pointer hover:text-red-500"
                      onClick={() => removeFilterValue('subscription', subscription)}
                    />
                  </span>
                ))}
              </div>
            </div>

            <div>
              <select
                className="border border-gray-200 p-3 rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-green-500"
                onChange={(e) => addFilterValue('leadType', e.target.value)}
                value=""
              >
                <option value="" disabled>Lead Type</option>
                {leadTypeOptions.map((type) => (
                  <option key={type} value={type}>
                    {type}
                  </option>
                ))}
              </select>
              <div className="flex flex-wrap gap-2 mt-3">
                {filters.leadType.map((type) => (
                  <span
                    key={type}
                    className="bg-green-100 text-green-800 text-sm px-3 py-1 rounded-full flex items-center"
                  >
                    {type}
                    <FaTimes
                      className="ml-2 cursor-pointer hover:text-red-500"
                      onClick={() => removeFilterValue('leadType', type)}
                    />
                  </span>
                ))}
              </div>
            </div>

            <div>
              <select
                className="border border-gray-200 p-3 rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-green-500"
                onChange={(e) => addFilterValue('broker', e.target.value)}
                value=""
              >
                <option value="" disabled>Broker</option>
                {brokerOptions.map((broker) => (
                  <option key={broker} value={broker}>
                    {broker}
                  </option>
                ))}
              </select>
              <div className="flex flex-wrap gap-2 mt-3">
                {filters.broker.map((broker) => (
                  <span
                    key={broker}
                    className="bg-green-100 text-green-800 text-sm px-3 py-1 rounded-full flex items-center"
                  >
                    {broker}
                    <FaTimes
                      className="ml-2 cursor-pointer hover:text-red-500"
                      onClick={() => removeFilterValue('broker', broker)}
                    />
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-2xl shadow-xl overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="bg-green-50 text-gray-700">
                <th className="p-4 sm:p-5 font-semibold">Date</th>
                <th className="p-4 sm:p-5 font-semibold">Lead ID</th>
                <th className="p-4 sm:p-5 font-semibold">Object ID</th>
                <th className="p-4 sm:p-5 font-semibold">Type</th>
                <th className="p-4 sm:p-5 font-semibold">Company</th>
                <th className="p-4 sm:p-5 font-semibold">Name</th>
                <th className="p-4 sm:p-5 font-semibold">Action Date</th>
                <th className="p-4 sm:p-5 font-semibold">Status</th>
                <th className="p-4 sm:p-5 font-semibold">Subscription</th>
                <th className="p-4 sm:p-5 font-semibold">Broker</th>
                <th className="p-4 sm:p-5 font-semibold">Postcode</th>
              </tr>
            </thead>
            <tbody>
              {filteredLeads.map((lead) => (
                <tr key={lead._id} className="border-t hover:bg-green-50">
                  <td className="p-4 sm:p-5">{lead.date}</td>
                  <td className="p-4 sm:p-5">{lead._id}</td>
                  <td className="p-4 sm:p-5">{lead.objectId}</td>
                  <td className="p-4 sm:p-5">{lead.type}</td>
                  <td className="p-4 sm:p-5">{lead.company}</td>
                  <td className="p-4 sm:p-5">{lead.name}</td>
                  <td className="p-4 sm:p-5">{lead.action}</td>
                  <td className="p-4 sm:p-5">{lead.status}</td>
                  <td className="p-4 sm:p-5">{lead.subscription}</td>
                  <td className="p-4 sm:p-5">{lead.broker}</td>
                  <td className="p-4 sm:p-5">{lead.postcode}</td>
                </tr>
              ))}
              {filteredLeads.length === 0 && (
                <tr>
                  <td colSpan="11" className="p-4 sm:p-5 text-center text-gray-500">
                    No leads match the filters.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      <footer className="bg-white shadow-inner p-4 sm:p-6 text-center text-gray-600">
        <p className="mb-2">© {new Date().getFullYear()} Leads Dashboard. All rights reserved.</p>
        <div className="flex flex-wrap justify-center gap-4">
          <a href="#" className="text-green-600 hover:underline">Privacy Policy</a>
          <a href="#" className="text-green-600 hover:underline">Terms of Service</a>
          <a href="#" className="text-green-600 hover:underline">Contact Us</a>
        </div>
      </footer>
    </div>
  );
};

export default LeadsPage;