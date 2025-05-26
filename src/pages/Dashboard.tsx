import React, { useState, useEffect } from 'react';
import KPICard from '../components/Dashboard/KPICard';
import SalesChart from '../components/Dashboard/SalesChart';
import TopProducts from '../components/Dashboard/TopProducts';
import CustomerSegments from '../components/Dashboard/CustomerSegments';
import RevenueByLocation from '../components/Dashboard/RevenueByLocation';
import { fetchDashboardData } from '../services/api/dashboardService';

const Dashboard: React.FC = () => {
  const [dashboardData, setDashboardData] = useState<any>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadDashboardData = async () => {
      try {
        setLoading(true);
        const data = await fetchDashboardData();
        setDashboardData(data);
        setError(null);
      } catch (err) {
        setError('Failed to load dashboard data');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    // For now, we'll use mock data instead of calling the API
    // loadDashboardData();
    setDashboardData(mockDashboardData);
    setLoading(false);
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-full">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary-500"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-error-50 p-4 rounded-lg text-error-700">
        <p>{error}</p>
        <button 
          className="mt-2 px-4 py-2 bg-primary-500 text-white rounded-lg hover:bg-primary-600 transition-colors"
          onClick={() => window.location.reload()}
        >
          Retry
        </button>
      </div>
    );
  }

  return (
    <div className="animate-fade-in">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>
        <p className="text-gray-600">Video rental business analytics overview</p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <KPICard 
          title="Total Revenue" 
          value={dashboardData?.kpis.totalRevenue} 
          change={dashboardData?.kpis.revenueChange} 
          icon="dollar"
          color="primary"
        />
        <KPICard 
          title="Active Rentals" 
          value={dashboardData?.kpis.activeRentals} 
          change={dashboardData?.kpis.rentalsChange} 
          icon="film"
          color="secondary"
        />
        <KPICard 
          title="New Customers" 
          value={dashboardData?.kpis.newCustomers} 
          change={dashboardData?.kpis.customersChange} 
          icon="users"
          color="accent"
        />
        <KPICard 
          title="Rental Duration" 
          value={dashboardData?.kpis.avgRentalDuration} 
          change={dashboardData?.kpis.durationChange} 
          icon="clock"
          color="success"
        />
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
        <div className="lg:col-span-2 bg-white rounded-lg shadow-card p-6">
          <SalesChart data={dashboardData?.salesTrend} />
        </div>
        <div className="bg-white rounded-lg shadow-card p-6">
          <TopProducts products={dashboardData?.topProducts} />
        </div>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-lg shadow-card p-6">
          <CustomerSegments segments={dashboardData?.customerSegments} />
        </div>
        <div className="bg-white rounded-lg shadow-card p-6">
          <RevenueByLocation locations={dashboardData?.revenueByLocation} />
        </div>
      </div>
    </div>
  );
};

// Mock data for development
const mockDashboardData = {
  kpis: {
    totalRevenue: '$245,670',
    revenueChange: 12.5,
    activeRentals: '1,234',
    rentalsChange: 7.8,
    newCustomers: '256',
    customersChange: 15.3,
    avgRentalDuration: '4.2 days',
    durationChange: -2.1
  },
  salesTrend: [
    { month: 'Jan', revenue: 18500 },
    { month: 'Feb', revenue: 17200 },
    { month: 'Mar', revenue: 19800 },
    { month: 'Apr', revenue: 21500 },
    { month: 'May', revenue: 20300 },
    { month: 'Jun', revenue: 22800 },
    { month: 'Jul', revenue: 24100 },
    { month: 'Aug', revenue: 23700 },
    { month: 'Sep', revenue: 25900 },
    { month: 'Oct', revenue: 27300 },
    { month: 'Nov', revenue: 26800 },
    { month: 'Dec', revenue: 28100 }
  ],
  topProducts: [
    { name: 'Action Movie Collection', rentals: 324, revenue: 4860 },
    { name: 'Sci-Fi Classics', rentals: 286, revenue: 4290 },
    { name: 'New Releases Bundle', rentals: 253, revenue: 5060 },
    { name: 'Family Movies Pack', rentals: 215, revenue: 3225 },
    { name: 'Documentary Series', rentals: 198, revenue: 2970 }
  ],
  customerSegments: [
    { name: 'Frequent Renters', percentage: 35 },
    { name: 'Occasional Viewers', percentage: 42 },
    { name: 'New Customers', percentage: 15 },
    { name: 'Premium Subscribers', percentage: 8 }
  ],
  revenueByLocation: [
    { city: 'New York', revenue: 68540 },
    { city: 'Los Angeles', revenue: 52370 },
    { city: 'Chicago', revenue: 37920 },
    { city: 'Houston', revenue: 31580 },
    { city: 'Phoenix', revenue: 28140 },
    { city: 'Other', revenue: 27120 }
  ]
};

export default Dashboard;