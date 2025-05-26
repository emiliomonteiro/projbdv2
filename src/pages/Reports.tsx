import React, { useState } from 'react';
import { FilterIcon, Download, Share2 } from 'lucide-react';

const Reports: React.FC = () => {
  const [selectedDimension, setSelectedDimension] = useState<string>('time');
  const [timeRange, setTimeRange] = useState<string>('last30days');
  const [location, setLocation] = useState<string>('all');
  const [category, setCategory] = useState<string>('all');

  const dimensions = [
    { id: 'time', name: 'Time' },
    { id: 'location', name: 'Location' },
    { id: 'category', name: 'Product Category' },
    { id: 'customer', name: 'Customer Segment' },
  ];

  const timeRanges = [
    { id: 'last7days', name: 'Last 7 Days' },
    { id: 'last30days', name: 'Last 30 Days' },
    { id: 'last90days', name: 'Last 90 Days' },
    { id: 'lastYear', name: 'Last Year' },
    { id: 'custom', name: 'Custom Range' },
  ];

  const locations = [
    { id: 'all', name: 'All Locations' },
    { id: 'new-york', name: 'New York' },
    { id: 'los-angeles', name: 'Los Angeles' },
    { id: 'chicago', name: 'Chicago' },
    { id: 'houston', name: 'Houston' },
    { id: 'phoenix', name: 'Phoenix' },
  ];

  const categories = [
    { id: 'all', name: 'All Categories' },
    { id: 'action', name: 'Action' },
    { id: 'comedy', name: 'Comedy' },
    { id: 'drama', name: 'Drama' },
    { id: 'sci-fi', name: 'Sci-Fi' },
    { id: 'family', name: 'Family' },
  ];

  const reports = [
    {
      id: 1,
      name: 'Monthly Sales Summary',
      description: 'Overview of sales performance with key metrics and trends',
      dimensions: ['time', 'category'],
      lastUpdated: '2023-05-15',
    },
    {
      id: 2,
      name: 'Regional Performance',
      description: 'Analysis of sales and rentals by geographic location',
      dimensions: ['location', 'time'],
      lastUpdated: '2023-05-14',
    },
    {
      id: 3,
      name: 'Product Category Analysis',
      description: 'Performance breakdown by product categories and subcategories',
      dimensions: ['category', 'time'],
      lastUpdated: '2023-05-13',
    },
    {
      id: 4,
      name: 'Customer Segment Report',
      description: 'Rental patterns and preferences across different customer segments',
      dimensions: ['customer', 'category'],
      lastUpdated: '2023-05-12',
    },
    {
      id: 5,
      name: 'Temporal Trend Analysis',
      description: 'Year-over-year and seasonal trend analysis of key metrics',
      dimensions: ['time'],
      lastUpdated: '2023-05-10',
    },
  ];

  const getFilteredReports = () => {
    return reports.filter(report => {
      return report.dimensions.includes(selectedDimension);
    });
  };

  return (
    <div className="animate-fade-in">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Analytical Reports</h1>
        <p className="text-gray-600">Access and generate detailed business reports</p>
      </div>

      <div className="bg-white rounded-lg shadow-card p-6 mb-8">
        <div className="flex flex-col md:flex-row md:items-center justify-between mb-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-4 md:mb-0">Report Filters</h2>
          <div className="flex space-x-2">
            <button className="px-4 py-2 bg-white text-gray-700 border border-gray-300 rounded-lg hover:bg-gray-50 flex items-center">
              <Download className="w-4 h-4 mr-2" />
              Export
            </button>
            <button className="px-4 py-2 bg-white text-gray-700 border border-gray-300 rounded-lg hover:bg-gray-50 flex items-center">
              <Share2 className="w-4 h-4 mr-2" />
              Share
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Analysis Dimension
            </label>
            <select
              value={selectedDimension}
              onChange={(e) => setSelectedDimension(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded-md focus:ring-primary-500 focus:border-primary-500"
            >
              {dimensions.map((dimension) => (
                <option key={dimension.id} value={dimension.id}>
                  {dimension.name}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Time Range
            </label>
            <select
              value={timeRange}
              onChange={(e) => setTimeRange(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded-md focus:ring-primary-500 focus:border-primary-500"
            >
              {timeRanges.map((range) => (
                <option key={range.id} value={range.id}>
                  {range.name}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Location
            </label>
            <select
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded-md focus:ring-primary-500 focus:border-primary-500"
            >
              {locations.map((loc) => (
                <option key={loc.id} value={loc.id}>
                  {loc.name}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Product Category
            </label>
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded-md focus:ring-primary-500 focus:border-primary-500"
            >
              {categories.map((cat) => (
                <option key={cat.id} value={cat.id}>
                  {cat.name}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div className="mt-4 flex justify-end">
          <button className="px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 flex items-center">
            <FilterIcon className="w-4 h-4 mr-2" />
            Apply Filters
          </button>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow-card p-6">
        <h2 className="text-lg font-semibold text-gray-900 mb-6">Available Reports</h2>
        
        <div className="space-y-4">
          {getFilteredReports().map((report) => (
            <div key={report.id} className="border border-gray-200 rounded-lg p-4 hover:border-primary-300 transition-colors">
              <div className="flex flex-col md:flex-row md:items-center justify-between">
                <div>
                  <h3 className="text-md font-medium text-gray-900">{report.name}</h3>
                  <p className="text-sm text-gray-600 mt-1">{report.description}</p>
                  <div className="mt-2 flex flex-wrap">
                    {report.dimensions.map((dim) => {
                      const dimension = dimensions.find(d => d.id === dim);
                      return (
                        <span key={dim} className="text-xs bg-gray-100 text-gray-800 px-2 py-1 rounded mr-2 mb-2">
                          {dimension?.name || dim}
                        </span>
                      );
                    })}
                  </div>
                </div>
                <div className="mt-4 md:mt-0 flex items-center">
                  <span className="text-xs text-gray-500 mr-4">
                    Updated: {report.lastUpdated}
                  </span>
                  <button className="px-3 py-1 bg-primary-50 text-primary-700 rounded-md hover:bg-primary-100 text-sm font-medium">
                    View Report
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Reports;