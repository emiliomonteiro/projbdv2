import React, { useState } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, LineChart, Line } from 'recharts';
import { ChevronDown, Filter, RefreshCw, Download, BarChart2, Users } from 'lucide-react';

const Predictions: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'clustering' | 'sales'>('clustering');
  const [timeRange, setTimeRange] = useState<string>('next6months');
  const [confidenceLevel, setConfidenceLevel] = useState<string>('medium');

  // Mock data for customer clustering
  const clusteringData = [
    {
      name: 'High Value',
      count: 256,
      rentals: 3450,
      avgSpend: 135,
      characteristics: [
        'Rents 8+ videos per month',
        'Prefers premium content',
        'Spends $100+ per month',
        'Long membership duration'
      ]
    },
    {
      name: 'Regular',
      count: 1240,
      rentals: 7890,
      avgSpend: 65,
      characteristics: [
        'Rents 3-7 videos per month',
        'Mix of new and catalog titles',
        'Spends $40-100 per month',
        'Moderate membership duration'
      ]
    },
    {
      name: 'Occasional',
      count: 2150,
      rentals: 4380,
      avgSpend: 28,
      characteristics: [
        'Rents 1-2 videos per month',
        'Prefers catalog titles',
        'Spends under $40 per month',
        'Variable membership duration'
      ]
    },
    {
      name: 'New',
      count: 560,
      rentals: 1120,
      avgSpend: 42,
      characteristics: [
        'Less than 3 months as member',
        'Exploring different genres',
        'Variable spending patterns',
        'High promotional responsiveness'
      ]
    },
    {
      name: 'Lapsed',
      count: 890,
      rentals: 890,
      avgSpend: 22,
      characteristics: [
        'No rentals in past 45+ days',
        'Previously regular customer',
        'Low recent spending',
        'Low engagement with communications'
      ]
    }
  ];

  // Mock data for sales prediction
  const salesPredictionData = [
    { month: 'Jun 23', actual: 24600, predicted: null, lower: null, upper: null },
    { month: 'Jul 23', actual: 26200, predicted: null, lower: null, upper: null },
    { month: 'Aug 23', actual: 25800, predicted: null, lower: null, upper: null },
    { month: 'Sep 23', actual: 27500, predicted: null, lower: null, upper: null },
    { month: 'Oct 23', actual: 28900, predicted: null, lower: null, upper: null },
    { month: 'Nov 23', actual: 30500, predicted: null, lower: null, upper: null },
    { month: 'Dec 23', actual: 32800, predicted: null, lower: null, upper: null },
    { month: 'Jan 24', actual: 29700, predicted: null, lower: null, upper: null },
    { month: 'Feb 24', actual: 27300, predicted: null, lower: null, upper: null },
    { month: 'Mar 24', actual: 28800, predicted: null, lower: null, upper: null },
    { month: 'Apr 24', actual: 30200, predicted: null, lower: null, upper: null },
    { month: 'May 24', actual: 31500, predicted: 31500, lower: 31500, upper: 31500 },
    { month: 'Jun 24', actual: null, predicted: 33200, lower: 31800, upper: 34600 },
    { month: 'Jul 24', actual: null, predicted: 34900, lower: 32900, upper: 36900 },
    { month: 'Aug 24', actual: null, predicted: 34100, lower: 31700, upper: 36500 },
    { month: 'Sep 24', actual: null, predicted: 36200, lower: 33200, upper: 39200 },
    { month: 'Oct 24', actual: null, predicted: 38500, lower: 35000, upper: 42000 },
    { month: 'Nov 24', actual: null, predicted: 40700, lower: 36700, upper: 44700 }
  ];

  return (
    <div className="animate-fade-in">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Data Mining & Predictions</h1>
        <p className="text-gray-600">Customer segmentation and sales forecasting</p>
      </div>

      <div className="mb-6 bg-white rounded-lg shadow-card">
        <div className="border-b border-gray-200">
          <nav className="flex">
            <button
              onClick={() => setActiveTab('clustering')}
              className={`px-6 py-4 text-sm font-medium ${
                activeTab === 'clustering'
                  ? 'border-b-2 border-primary-500 text-primary-600'
                  : 'text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              <div className="flex items-center">
                <Users className="mr-2 h-4 w-4" />
                Customer Clustering
              </div>
            </button>
            <button
              onClick={() => setActiveTab('sales')}
              className={`px-6 py-4 text-sm font-medium ${
                activeTab === 'sales'
                  ? 'border-b-2 border-primary-500 text-primary-600'
                  : 'text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              <div className="flex items-center">
                <BarChart2 className="mr-2 h-4 w-4" />
                Sales Prediction
              </div>
            </button>
          </nav>
        </div>

        <div className="p-6">
          {activeTab === 'clustering' && (
            <div>
              <div className="mb-6 flex flex-col md:flex-row md:items-center justify-between">
                <h2 className="text-lg font-semibold text-gray-900 mb-4 md:mb-0">Customer Segments Analysis</h2>
                <div className="flex space-x-2">
                  <button className="px-3 py-1 text-sm rounded-md bg-white text-gray-700 border border-gray-300 hover:bg-gray-50 flex items-center">
                    <Filter className="h-3 w-3 mr-1" />
                    Filter
                  </button>
                  <button className="px-3 py-1 text-sm rounded-md bg-white text-gray-700 border border-gray-300 hover:bg-gray-50 flex items-center">
                    <RefreshCw className="h-3 w-3 mr-1" />
                    Refresh
                  </button>
                  <button className="px-3 py-1 text-sm rounded-md bg-white text-gray-700 border border-gray-300 hover:bg-gray-50 flex items-center">
                    <Download className="h-3 w-3 mr-1" />
                    Export
                  </button>
                </div>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <div className="lg:col-span-2">
                  <div className="h-80">
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart
                        data={clusteringData}
                        margin={{
                          top: 20,
                          right: 30,
                          left: 20,
                          bottom: 5,
                        }}
                      >
                        <CartesianGrid strokeDasharray="3 3" vertical={false} />
                        <XAxis dataKey="name" />
                        <YAxis yAxisId="left" orientation="left" stroke="#3B82F6" />
                        <YAxis yAxisId="right" orientation="right" stroke="#F59E0B" />
                        <Tooltip />
                        <Legend />
                        <Bar yAxisId="left" dataKey="count" name="Customer Count" fill="#3B82F6" radius={[4, 4, 0, 0]} />
                        <Bar yAxisId="right" dataKey="avgSpend" name="Avg. Spend ($)" fill="#F59E0B" radius={[4, 4, 0, 0]} />
                      </BarChart>
                    </ResponsiveContainer>
                  </div>
                </div>
                <div>
                  <div className="mb-4">
                    <h3 className="text-md font-medium text-gray-900 mb-2">Segment Details</h3>
                    <div className="bg-gray-50 p-3 rounded-lg">
                      <select
                        className="w-full p-2 border border-gray-300 rounded-md focus:ring-primary-500 focus:border-primary-500"
                        defaultValue="High Value"
                      >
                        {clusteringData.map(cluster => (
                          <option key={cluster.name} value={cluster.name}>{cluster.name}</option>
                        ))}
                      </select>
                    </div>
                  </div>
                  
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <h4 className="font-medium text-gray-900 mb-2">High Value Customers</h4>
                    <div className="grid grid-cols-2 gap-4 mb-4">
                      <div>
                        <p className="text-xs text-gray-500">Count</p>
                        <p className="text-lg font-semibold">{clusteringData[0].count}</p>
                      </div>
                      <div>
                        <p className="text-xs text-gray-500">Total Rentals</p>
                        <p className="text-lg font-semibold">{clusteringData[0].rentals}</p>
                      </div>
                      <div>
                        <p className="text-xs text-gray-500">Avg. Spend</p>
                        <p className="text-lg font-semibold">${clusteringData[0].avgSpend}</p>
                      </div>
                      <div>
                        <p className="text-xs text-gray-500">% of Revenue</p>
                        <p className="text-lg font-semibold">28.3%</p>
                      </div>
                    </div>
                    
                    <h4 className="font-medium text-gray-900 mb-2">Characteristics</h4>
                    <ul className="list-disc pl-5 text-sm text-gray-700 space-y-1">
                      {clusteringData[0].characteristics.map((char, idx) => (
                        <li key={idx}>{char}</li>
                      ))}
                    </ul>
                    
                    <div className="mt-4">
                      <button className="w-full px-3 py-2 bg-primary-600 text-white rounded-md hover:bg-primary-700">
                        View Detailed Analysis
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'sales' && (
            <div>
              <div className="mb-6 flex flex-col md:flex-row md:items-center justify-between">
                <h2 className="text-lg font-semibold text-gray-900 mb-4 md:mb-0">Sales Forecasting</h2>
                <div className="flex flex-wrap gap-2">
                  <select
                    value={timeRange}
                    onChange={(e) => setTimeRange(e.target.value)}
                    className="px-3 py-1 text-sm rounded-md bg-white text-gray-700 border border-gray-300 focus:ring-primary-500 focus:border-primary-500"
                  >
                    <option value="next3months">Next 3 Months</option>
                    <option value="next6months">Next 6 Months</option>
                    <option value="next12months">Next 12 Months</option>
                  </select>
                  <select
                    value={confidenceLevel}
                    onChange={(e) => setConfidenceLevel(e.target.value)}
                    className="px-3 py-1 text-sm rounded-md bg-white text-gray-700 border border-gray-300 focus:ring-primary-500 focus:border-primary-500"
                  >
                    <option value="high">High Confidence (80%)</option>
                    <option value="medium">Medium Confidence (95%)</option>
                    <option value="low">Low Confidence (99%)</option>
                  </select>
                  <button className="px-3 py-1 text-sm rounded-md bg-white text-gray-700 border border-gray-300 hover:bg-gray-50 flex items-center">
                    <RefreshCw className="h-3 w-3 mr-1" />
                    Recalculate
                  </button>
                </div>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
                <div className="lg:col-span-3">
                  <div className="h-80">
                    <ResponsiveContainer width="100%" height="100%">
                      <LineChart
                        data={salesPredictionData}
                        margin={{
                          top: 20,
                          right: 30,
                          left: 20,
                          bottom: 5,
                        }}
                      >
                        <CartesianGrid strokeDasharray="3 3" vertical={false} />
                        <XAxis dataKey="month" />
                        <YAxis tickFormatter={(value) => `$${value / 1000}k`} />
                        <Tooltip formatter={(value) => [`$${value.toLocaleString()}`, 'Revenue']} />
                        <Legend />
                        <Line 
                          type="monotone" 
                          dataKey="actual" 
                          name="Actual Revenue"
                          stroke="#3B82F6" 
                          strokeWidth={2} 
                          dot={{ r: 4 }} 
                          activeDot={{ r: 6 }} 
                        />
                        <Line 
                          type="monotone" 
                          dataKey="predicted" 
                          name="Predicted Revenue"
                          stroke="#10B981" 
                          strokeWidth={2} 
                          strokeDasharray="5 5"
                          dot={{ r: 4 }} 
                        />
                        <Line 
                          type="monotone" 
                          dataKey="upper" 
                          name="Upper Bound"
                          stroke="#F59E0B" 
                          strokeWidth={1}
                          dot={false}
                        />
                        <Line 
                          type="monotone" 
                          dataKey="lower" 
                          name="Lower Bound"
                          stroke="#F59E0B" 
                          strokeWidth={1}
                          dot={false}
                        />
                      </LineChart>
                    </ResponsiveContainer>
                  </div>
                </div>
                <div>
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <h4 className="font-medium text-gray-900 mb-3">Prediction Summary</h4>
                    
                    <div className="space-y-4">
                      <div>
                        <p className="text-xs text-gray-500">Predicted Revenue (Next 6 Months)</p>
                        <p className="text-xl font-semibold text-primary-700">$217,600</p>
                        <p className="text-xs text-success-600">+12.5% vs Previous 6 Months</p>
                      </div>
                      
                      <div>
                        <p className="text-xs text-gray-500">Confidence Interval</p>
                        <p className="text-sm">$204,300 - $229,800</p>
                        <p className="text-xs text-gray-500">95% confidence level</p>
                      </div>
                      
                      <div>
                        <p className="text-xs text-gray-500">Model Accuracy</p>
                        <div className="w-full bg-gray-200 rounded-full h-2.5 mt-1 mb-1">
                          <div className="bg-success-500 h-2.5 rounded-full" style={{ width: '87%' }}></div>
                        </div>
                        <p className="text-xs flex justify-between">
                          <span>87% MAPE</span>
                          <span className="text-success-600">Good</span>
                        </p>
                      </div>
                      
                      <div>
                        <p className="text-xs text-gray-500">Key Factors</p>
                        <ul className="list-disc pl-5 text-sm text-gray-700 space-y-1 mt-1">
                          <li>Seasonal patterns (Q4 increase)</li>
                          <li>New release schedule</li>
                          <li>Customer growth rate</li>
                          <li>Pricing strategy changes</li>
                        </ul>
                      </div>
                    </div>
                    
                    <div className="mt-4">
                      <button className="w-full px-3 py-2 bg-primary-600 text-white rounded-md hover:bg-primary-700">
                        Download Forecast Report
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Predictions;