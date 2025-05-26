import React from 'react';
import { Settings as SettingsIcon } from 'lucide-react';

const Settings: React.FC = () => {
  return (
    <div className="animate-fade-in">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Settings</h1>
        <p className="text-gray-600">Configure your application preferences</p>
      </div>
      
      <div className="bg-white rounded-lg shadow-card p-6">
        <div className="flex items-center justify-center h-64 text-gray-500">
          <div className="text-center">
            <SettingsIcon className="w-12 h-12 mx-auto mb-4" />
            <p>Settings features coming soon</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Settings; 