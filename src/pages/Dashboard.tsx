// src/pages/Dashboard.tsx
import React, { useState, useEffect } from 'react';
import KPICard from '../components/Dashboard/KPICard';
import SalesChart from '../components/Dashboard/SalesChart';
import TopProducts from '../components/Dashboard/TopProducts';
import CustomerSegments from '../components/Dashboard/CustomerSegments';
import RevenueByLocation from '../components/Dashboard/RevenueByLocation';
import { fetchDashboardData } from '../services/api/dashboardService';
import { DashboardData } from '../types/dashboard'; // Adjust path if your types are elsewhere

const Dashboard: React.FC = () => {
  const [dashboardData, setDashboardData] = useState<DashboardData | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadData = async () => {
      try {
        setLoading(true);
        setError(null); // Reset error state before a new fetch attempt
        const data = await fetchDashboardData();
        setDashboardData(data);
      } catch (err) {
        setError('Failed to load dashboard data. Please try again later.');
        console.error('Dashboard data fetch error:', err); // Log the actual error
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, []); // Empty dependency array ensures this runs once on component mount

  if (loading) {
    return (
      <div className="flex items-center justify-center h-full">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary-500"></div>
        {/* You can add a "Loading dashboard..." text here if you like */}
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative" role="alert">
        <strong className="font-bold">Error:</strong>
        <span className="block sm:inline"> {error}</span>
        <button
          className="mt-2 px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 transition-colors"
          onClick={() => window.location.reload()} // Simple retry, or could call loadData() again
        >
          Retry
        </button>
      </div>
    );
  }

  if (!dashboardData) {
    // This case handles if data is null after loading is false and no error (should be rare if API always returns data or throws)
    return (
      <div className="text-center p-8">
        <p>No dashboard data available at the moment.</p>
      </div>
    );
  }

  return (
    <div className="animate-fade-in p-4 md:p-6"> {/* Added some padding */}
      <div className="mb-6">
        <h1 className="text-2xl md:text-3xl font-bold text-gray-800">Dashboard</h1> {/* Adjusted text color/size */}
        <p className="text-gray-600">Video rental business analytics overview</p>
      </div>

      {/* KPIs Section */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 mb-6 md:mb-8">
        <KPICard
          title="Total Revenue"
          value={dashboardData.kpis.totalRevenue}
          change={dashboardData.kpis.revenueChange}
          icon="dollar" // Ensure your KPICard handles these icon strings
          color="primary"
        />
        <KPICard
          title="Active Rentals"
          value={dashboardData.kpis.activeRentals}
          change={dashboardData.kpis.rentalsChange}
          icon="film"
          color="secondary"
        />
        <KPICard
          title="New Customers"
          value={dashboardData.kpis.newCustomers}
          change={dashboardData.kpis.customersChange}
          icon="users"
          color="accent"
        />
        <KPICard
          title="Avg. Rental Duration" // Changed title for clarity
          value={dashboardData.kpis.avgRentalDuration}
          change={dashboardData.kpis.durationChange}
          icon="clock"
          color="success"
        />
      </div>

      {/* Sales Trend and Top Products Section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 md:gap-6 mb-6 md:mb-8">
        <div className="lg:col-span-2 bg-white rounded-lg shadow-lg p-4 md:p-6"> {/* Enhanced shadow */}
          <h2 className="text-xl font-semibold text-gray-700 mb-4">Sales Trend</h2>
          <SalesChart data={dashboardData.salesTrend} />
        </div>
        <div className="bg-white rounded-lg shadow-lg p-4 md:p-6">
          <h2 className="text-xl font-semibold text-gray-700 mb-4">Top Products</h2>
          <TopProducts products={dashboardData.topProducts} />
        </div>
      </div>

      {/* Customer Segments and Revenue by Location Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
        <div className="bg-white rounded-lg shadow-lg p-4 md:p-6">
          <h2 className="text-xl font-semibold text-gray-700 mb-4">Customer Segments</h2>
          <CustomerSegments segments={dashboardData.customerSegments} />
        </div>
        <div className="bg-white rounded-lg shadow-lg p-4 md:p-6">
          <h2 className="text-xl font-semibold text-gray-700 mb-4">Revenue By Location</h2>
          <RevenueByLocation locations={dashboardData.revenueByLocation} />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;