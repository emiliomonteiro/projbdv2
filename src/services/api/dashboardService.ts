import axios from 'axios';

const API_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:3000/api';

export const fetchDashboardData = async () => {
  try {
    const response = await axios.get(`${API_URL}/dashboard`);
    return response.data;
  } catch (error) {
    console.error('Error fetching dashboard data:', error);
    throw error;
  }
};

export const fetchKPIs = async () => {
  try {
    const response = await axios.get(`${API_URL}/dashboard/kpis`);
    return response.data;
  } catch (error) {
    console.error('Error fetching KPIs:', error);
    throw error;
  }
};

export const fetchSalesTrend = async (timeframe: string) => {
  try {
    const response = await axios.get(`${API_URL}/dashboard/sales-trend?timeframe=${timeframe}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching sales trend:', error);
    throw error;
  }
};

export const fetchTopProducts = async (sortBy: string, limit: number) => {
  try {
    const response = await axios.get(`${API_URL}/dashboard/top-products?sortBy=${sortBy}&limit=${limit}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching top products:', error);
    throw error;
  }
};

export const fetchRevenueByLocation = async () => {
  try {
    const response = await axios.get(`${API_URL}/dashboard/revenue-by-location`);
    return response.data;
  } catch (error) {
    console.error('Error fetching revenue by location:', error);
    throw error;
  }
};