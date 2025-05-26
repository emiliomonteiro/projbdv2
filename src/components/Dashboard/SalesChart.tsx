import React, { useState } from 'react';
import { 
  AreaChart, 
  Area, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer 
} from 'recharts';

interface SalesChartProps {
  data: {
    month: string;
    revenue: number;
  }[];
}

const SalesChart: React.FC<SalesChartProps> = ({ data }) => {
  const [timeframe, setTimeframe] = useState<'yearly' | 'quarterly' | 'monthly'>('yearly');

  const getFilteredData = () => {
    if (timeframe === 'quarterly') {
      return data.slice(data.length - 3);
    } else if (timeframe === 'monthly') {
      return data.slice(data.length - 1);
    }
    return data;
  };

  const formatYAxis = (value: number) => {
    if (value >= 1000) {
      return `$${(value / 1000).toFixed(0)}k`;
    }
    return `$${value}`;
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-semibold text-gray-900">Revenue Trend</h3>
        <div className="flex space-x-2">
          <button
            onClick={() => setTimeframe('monthly')}
            className={`px-3 py-1 text-sm rounded-md ${
              timeframe === 'monthly'
                ? 'bg-primary-100 text-primary-700'
                : 'text-gray-600 hover:bg-gray-100'
            }`}
          >
            Monthly
          </button>
          <button
            onClick={() => setTimeframe('quarterly')}
            className={`px-3 py-1 text-sm rounded-md ${
              timeframe === 'quarterly'
                ? 'bg-primary-100 text-primary-700'
                : 'text-gray-600 hover:bg-gray-100'
            }`}
          >
            Quarterly
          </button>
          <button
            onClick={() => setTimeframe('yearly')}
            className={`px-3 py-1 text-sm rounded-md ${
              timeframe === 'yearly'
                ? 'bg-primary-100 text-primary-700'
                : 'text-gray-600 hover:bg-gray-100'
            }`}
          >
            Yearly
          </button>
        </div>
      </div>
      <div className="h-80">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart
            data={getFilteredData()}
            margin={{
              top: 10,
              right: 30,
              left: 0,
              bottom: 0,
            }}
          >
            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#EEE" />
            <XAxis 
              dataKey="month" 
              tick={{ fill: '#6B7280' }} 
              tickLine={false}
              axisLine={{ stroke: '#E5E7EB' }}
            />
            <YAxis 
              tickFormatter={formatYAxis} 
              tick={{ fill: '#6B7280' }}
              tickLine={false}
              axisLine={false}
            />
            <Tooltip 
              formatter={(value) => [`$${value}`, 'Revenue']}
              contentStyle={{ 
                backgroundColor: 'white', 
                borderRadius: '0.5rem',
                boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
                border: 'none'
              }}
            />
            <Area 
              type="monotone" 
              dataKey="revenue" 
              stroke="#3B82F6" 
              fill="url(#colorRevenue)" 
              activeDot={{ r: 6, strokeWidth: 0 }}
            />
            <defs>
              <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#3B82F6" stopOpacity={0.3} />
                <stop offset="95%" stopColor="#3B82F6" stopOpacity={0} />
              </linearGradient>
            </defs>
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default SalesChart;