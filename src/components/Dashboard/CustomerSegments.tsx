import React from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from 'recharts';

interface CustomerSegmentsProps {
  segments: {
    name: string;
    percentage: number;
  }[];
}

const CustomerSegments: React.FC<CustomerSegmentsProps> = ({ segments }) => {
  // Chart colors
  const COLORS = ['#3B82F6', '#14B8A6', '#F59E0B', '#6366F1'];

  // Calculate total for rendering
  const total = segments.reduce((sum, segment) => sum + segment.percentage, 0);

  return (
    <div>
      <h3 className="text-lg font-semibold text-gray-900 mb-6">Customer Segments</h3>
      <div className="flex">
        <div className="w-1/2">
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={segments}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={80}
                  paddingAngle={2}
                  dataKey="percentage"
                >
                  {segments.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip 
                  formatter={(value) => [`${value}%`, 'Percentage']}
                  contentStyle={{ 
                    backgroundColor: 'white', 
                    borderRadius: '0.5rem',
                    boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
                    border: 'none'
                  }}
                />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>
        <div className="w-1/2 flex items-center">
          <div className="space-y-3">
            {segments.map((segment, index) => (
              <div key={segment.name} className="flex items-center">
                <div 
                  className="w-3 h-3 rounded-full mr-2" 
                  style={{ backgroundColor: COLORS[index % COLORS.length] }}
                ></div>
                <span className="text-sm text-gray-700">{segment.name}</span>
                <span className="ml-auto text-sm font-medium">{segment.percentage}%</span>
              </div>
            ))}
            <div className="pt-2 mt-2 border-t border-gray-200">
              <div className="flex items-center">
                <span className="text-sm font-medium text-gray-700">Total</span>
                <span className="ml-auto text-sm font-medium">{total}%</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CustomerSegments;