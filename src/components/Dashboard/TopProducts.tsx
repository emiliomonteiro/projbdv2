import React from 'react';
import { BarChart, Bar, XAxis, YAxis, ResponsiveContainer, Tooltip } from 'recharts';

interface TopProductsProps {
  products: {
    name: string;
    rentals: number;
    revenue: number;
  }[];
}

const TopProducts: React.FC<TopProductsProps> = ({ products }) => {
  const [sortBy, setSortBy] = React.useState<'rentals' | 'revenue'>('revenue');

  const sortedProducts = [...products].sort((a, b) => {
    return b[sortBy] - a[sortBy];
  }).slice(0, 5);

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-semibold text-gray-900">Top Products</h3>
        <div className="flex space-x-2">
          <button
            onClick={() => setSortBy('rentals')}
            className={`px-3 py-1 text-sm rounded-md ${
              sortBy === 'rentals'
                ? 'bg-secondary-100 text-secondary-700'
                : 'text-gray-600 hover:bg-gray-100'
            }`}
          >
            By Rentals
          </button>
          <button
            onClick={() => setSortBy('revenue')}
            className={`px-3 py-1 text-sm rounded-md ${
              sortBy === 'revenue'
                ? 'bg-secondary-100 text-secondary-700'
                : 'text-gray-600 hover:bg-gray-100'
            }`}
          >
            By Revenue
          </button>
        </div>
      </div>
      <div className="h-64">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            layout="vertical"
            data={sortedProducts}
            margin={{
              top: 0,
              right: 0,
              left: 0,
              bottom: 0,
            }}
          >
            <XAxis 
              type="number" 
              tick={{ fill: '#6B7280', fontSize: 12 }}
              tickLine={false}
              axisLine={{ stroke: '#E5E7EB' }}
              tickFormatter={(value) => sortBy === 'revenue' ? `$${value}` : value}
            />
            <YAxis 
              dataKey="name" 
              type="category" 
              scale="band" 
              tick={{ fill: '#6B7280', fontSize: 12 }}
              tickLine={false}
              axisLine={false}
              width={100}
            />
            <Tooltip 
              formatter={(value) => [
                sortBy === 'revenue' ? `$${value}` : value, 
                sortBy === 'revenue' ? 'Revenue' : 'Rentals'
              ]}
              contentStyle={{ 
                backgroundColor: 'white', 
                borderRadius: '0.5rem',
                boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
                border: 'none'
              }}
            />
            <Bar 
              dataKey={sortBy} 
              fill={sortBy === 'revenue' ? '#14B8A6' : '#F59E0B'} 
              radius={[0, 4, 4, 0]} 
              barSize={18}
            />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default TopProducts;