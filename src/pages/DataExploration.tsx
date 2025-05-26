import React, { useState } from 'react';
import { ChevronDown, ChevronRight, RefreshCw, Download } from 'lucide-react';

const DataExploration: React.FC = () => {
  const [activeDimension, setActiveDimension] = useState<string>('time');
  const [drillLevel, setDrillLevel] = useState<number>(0);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const dimensions = [
    { id: 'time', name: 'Time', levels: ['Year', 'Quarter', 'Month', 'Week', 'Day'] },
    { id: 'location', name: 'Location', levels: ['Country', 'Region', 'State', 'City', 'Store'] },
    { id: 'product', name: 'Product', levels: ['Category', 'Genre', 'Series', 'Title'] },
  ];

  const measures = [
    { id: 'revenue', name: 'Revenue', format: 'currency' },
    { id: 'rentals', name: 'Rental Count', format: 'number' },
    { id: 'duration', name: 'Avg. Rental Duration', format: 'days' },
    { id: 'customers', name: 'Customer Count', format: 'number' },
    { id: 'rating', name: 'Avg. Rating', format: 'stars' },
  ];

  const activeDimensionObj = dimensions.find(d => d.id === activeDimension);
  const activeLevel = activeDimensionObj?.levels[drillLevel] || '';

  // Mock data for OLAP cube
  const generateMockData = () => {
    const mockData = [];
    
    // Generate mock rows based on active dimension and drill level
    if (activeDimension === 'time') {
      if (drillLevel === 0) { // Year level
        for (let i = 2020; i <= 2023; i++) {
          mockData.push({
            dimension: i.toString(),
            revenue: Math.floor(Math.random() * 1000000) + 500000,
            rentals: Math.floor(Math.random() * 50000) + 10000,
            duration: (Math.random() * 2 + 3).toFixed(1),
            customers: Math.floor(Math.random() * 15000) + 5000,
            rating: (Math.random() * 1 + 4).toFixed(1),
          });
        }
      } else if (drillLevel === 1) { // Quarter level
        const quarters = ['Q1', 'Q2', 'Q3', 'Q4'];
        quarters.forEach(quarter => {
          mockData.push({
            dimension: `2023 ${quarter}`,
            revenue: Math.floor(Math.random() * 300000) + 100000,
            rentals: Math.floor(Math.random() * 15000) + 5000,
            duration: (Math.random() * 2 + 3).toFixed(1),
            customers: Math.floor(Math.random() * 5000) + 2000,
            rating: (Math.random() * 1 + 4).toFixed(1),
          });
        });
      } else if (drillLevel === 2) { // Month level
        const months = ['Jan', 'Feb', 'Mar'];
        months.forEach(month => {
          mockData.push({
            dimension: `2023 Q1 ${month}`,
            revenue: Math.floor(Math.random() * 100000) + 30000,
            rentals: Math.floor(Math.random() * 5000) + 1000,
            duration: (Math.random() * 2 + 3).toFixed(1),
            customers: Math.floor(Math.random() * 2000) + 500,
            rating: (Math.random() * 1 + 4).toFixed(1),
          });
        });
      }
    } else if (activeDimension === 'location') {
      if (drillLevel === 0) { // Country level
        const countries = ['USA', 'Canada', 'Mexico', 'UK'];
        countries.forEach(country => {
          mockData.push({
            dimension: country,
            revenue: Math.floor(Math.random() * 1000000) + 500000,
            rentals: Math.floor(Math.random() * 50000) + 10000,
            duration: (Math.random() * 2 + 3).toFixed(1),
            customers: Math.floor(Math.random() * 15000) + 5000,
            rating: (Math.random() * 1 + 4).toFixed(1),
          });
        });
      } else if (drillLevel === 1) { // Region level
        const regions = ['Northeast', 'Southeast', 'Midwest', 'West'];
        regions.forEach(region => {
          mockData.push({
            dimension: `USA - ${region}`,
            revenue: Math.floor(Math.random() * 300000) + 100000,
            rentals: Math.floor(Math.random() * 15000) + 5000,
            duration: (Math.random() * 2 + 3).toFixed(1),
            customers: Math.floor(Math.random() * 5000) + 2000,
            rating: (Math.random() * 1 + 4).toFixed(1),
          });
        });
      }
    } else if (activeDimension === 'product') {
      if (drillLevel === 0) { // Category level
        const categories = ['Movies', 'TV Shows', 'Documentaries', 'Animation'];
        categories.forEach(category => {
          mockData.push({
            dimension: category,
            revenue: Math.floor(Math.random() * 1000000) + 500000,
            rentals: Math.floor(Math.random() * 50000) + 10000,
            duration: (Math.random() * 2 + 3).toFixed(1),
            customers: Math.floor(Math.random() * 15000) + 5000,
            rating: (Math.random() * 1 + 4).toFixed(1),
          });
        });
      } else if (drillLevel === 1) { // Genre level
        const genres = ['Action', 'Comedy', 'Drama', 'Sci-Fi', 'Horror'];
        genres.forEach(genre => {
          mockData.push({
            dimension: `Movies - ${genre}`,
            revenue: Math.floor(Math.random() * 300000) + 100000,
            rentals: Math.floor(Math.random() * 15000) + 5000,
            duration: (Math.random() * 2 + 3).toFixed(1),
            customers: Math.floor(Math.random() * 5000) + 2000,
            rating: (Math.random() * 1 + 4).toFixed(1),
          });
        });
      }
    }
    
    return mockData;
  };

  const data = generateMockData();

  const handleDrillDown = () => {
    if (activeDimensionObj && drillLevel < activeDimensionObj.levels.length - 1) {
      setIsLoading(true);
      // Simulate loading
      setTimeout(() => {
        setDrillLevel(drillLevel + 1);
        setIsLoading(false);
      }, 500);
    }
  };

  const handleRollUp = () => {
    if (drillLevel > 0) {
      setIsLoading(true);
      // Simulate loading
      setTimeout(() => {
        setDrillLevel(drillLevel - 1);
        setIsLoading(false);
      }, 500);
    }
  };

  const formatValue = (value: number | string, format: string) => {
    if (format === 'currency') {
      return `$${Number(value).toLocaleString()}`;
    } else if (format === 'days') {
      return `${value} days`;
    } else if (format === 'stars') {
      return `${value} ★`;
    }
    return value.toLocaleString();
  };

  return (
    <div className="animate-fade-in">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900">OLAP Data Exploration</h1>
        <p className="text-gray-600">Analyze data across multiple dimensions with drill-down capabilities</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 mb-6">
        <div className="lg:col-span-1 bg-white rounded-lg shadow-card p-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Dimensions</h2>
          <div className="space-y-3">
            {dimensions.map((dimension) => (
              <div 
                key={dimension.id}
                className={`p-3 rounded-lg cursor-pointer ${
                  activeDimension === dimension.id 
                    ? 'bg-primary-50 border border-primary-200' 
                    : 'hover:bg-gray-50 border border-gray-200'
                }`}
                onClick={() => {
                  setActiveDimension(dimension.id);
                  setDrillLevel(0);
                }}
              >
                <div className="flex items-center justify-between">
                  <span className={activeDimension === dimension.id ? 'text-primary-700 font-medium' : 'text-gray-700'}>
                    {dimension.name}
                  </span>
                  {activeDimension === dimension.id && (
                    <ChevronRight className="h-4 w-4 text-primary-500" />
                  )}
                </div>
                {activeDimension === dimension.id && (
                  <div className="mt-2 text-sm text-gray-600">
                    <div className="flex items-center">
                      <span className="mr-1">Levels:</span> 
                      {dimension.levels.map((level, idx) => (
                        <span 
                          key={level} 
                          className={`${idx === drillLevel ? 'font-medium text-primary-600' : ''} ${idx > 0 ? 'ml-1' : ''}`}
                        >
                          {level}{idx < dimension.levels.length - 1 ? ' >' : ''}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
          
          <h2 className="text-lg font-semibold text-gray-900 mt-6 mb-4">Measures</h2>
          <div className="space-y-2">
            {measures.map((measure) => (
              <div 
                key={measure.id}
                className="flex items-center p-2 hover:bg-gray-50 rounded-md"
              >
                <input 
                  type="checkbox" 
                  id={measure.id}
                  className="mr-2 h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded"
                  defaultChecked
                />
                <label htmlFor={measure.id} className="text-sm text-gray-700 cursor-pointer">
                  {measure.name}
                </label>
              </div>
            ))}
          </div>
        </div>

        <div className="lg:col-span-3 bg-white rounded-lg shadow-card p-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-2 sm:mb-0">
              Data by {activeDimensionObj?.name} ({activeLevel})
            </h2>
            <div className="flex space-x-2">
              <button 
                onClick={handleRollUp}
                disabled={drillLevel === 0 || isLoading}
                className={`px-3 py-1 text-sm rounded-md flex items-center ${
                  drillLevel === 0 || isLoading
                    ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                    : 'bg-secondary-50 text-secondary-700 hover:bg-secondary-100'
                }`}
              >
                Roll Up
              </button>
              <button 
                onClick={handleDrillDown}
                disabled={!activeDimensionObj || drillLevel >= activeDimensionObj.levels.length - 1 || isLoading}
                className={`px-3 py-1 text-sm rounded-md flex items-center ${
                  !activeDimensionObj || drillLevel >= activeDimensionObj.levels.length - 1 || isLoading
                    ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                    : 'bg-primary-50 text-primary-700 hover:bg-primary-100'
                }`}
              >
                Drill Down
              </button>
              <button 
                className="px-3 py-1 text-sm rounded-md bg-gray-100 text-gray-700 hover:bg-gray-200 flex items-center"
                onClick={() => {
                  setIsLoading(true);
                  setTimeout(() => setIsLoading(false), 500);
                }}
              >
                <RefreshCw className="h-3 w-3 mr-1" />
                Refresh
              </button>
              <button className="px-3 py-1 text-sm rounded-md bg-gray-100 text-gray-700 hover:bg-gray-200 flex items-center">
                <Download className="h-3 w-3 mr-1" />
                Export
              </button>
            </div>
          </div>

          {isLoading ? (
            <div className="flex items-center justify-center h-64">
              <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-primary-500"></div>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      {activeDimensionObj?.name} ({activeLevel})
                    </th>
                    {measures.map(measure => (
                      <th key={measure.id} scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        {measure.name}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {data.map((row, rowIdx) => (
                    <tr key={rowIdx} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                        <div className="flex items-center">
                          <button 
                            className="mr-2 text-primary-500 hover:text-primary-700"
                            onClick={handleDrillDown}
                            disabled={!activeDimensionObj || drillLevel >= activeDimensionObj.levels.length - 1}
                          >
                            <ChevronDown className="h-4 w-4" />
                          </button>
                          {row.dimension}
                        </div>
                      </td>
                      {measures.map(measure => (
                        <td key={measure.id} className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {formatValue(row[measure.id], measure.format)}
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default DataExploration;