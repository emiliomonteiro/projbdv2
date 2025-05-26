import React from 'react';
import { Calendar } from 'lucide-react';

const TimeAnalysis: React.FC = () => {
  return (
    <div className="animate-fade-in">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Time Analysis</h1>
        <p className="text-gray-600">Analyze trends and patterns over time</p>
      </div>
      
      <div className="bg-white rounded-lg shadow-card p-6">
        <div className="flex items-center justify-center h-64 text-gray-500">
          <div className="text-center">
            <Calendar className="w-12 h-12 mx-auto mb-4" />
            <p>Time analysis features coming soon</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TimeAnalysis; 