import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Layout from './components/Layout/Layout';
import Dashboard from './pages/Dashboard';
import Reports from './pages/Reports';
import DataExploration from './pages/DataExploration';
import Predictions from './pages/Predictions';
import Customers from './pages/Customers';
import Products from './pages/Products';
import TimeAnalysis from './pages/TimeAnalysis';
import Settings from './pages/Settings';

function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Dashboard />} />
        <Route path="reports" element={<Reports />} />
        <Route path="data-exploration" element={<DataExploration />} />
        <Route path="predictions" element={<Predictions />} />
        <Route path="customers" element={<Customers />} />
        <Route path="products" element={<Products />} />
        <Route path="time-analysis" element={<TimeAnalysis />} />
        <Route path="settings" element={<Settings />} />
      </Route>
    </Routes>
  );
}

export default App;