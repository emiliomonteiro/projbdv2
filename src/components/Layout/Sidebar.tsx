import React from 'react';
import { NavLink } from 'react-router-dom';
import { 
  LayoutDashboard, 
  BarChart2, 
  Database, 
  TrendingUp,
  Users,
  ShoppingCart,
  Calendar,
  Settings
} from 'lucide-react';

interface SidebarProps {
  isOpen: boolean;
}

const navItems = [
  { name: 'Dashboard', icon: <LayoutDashboard className="w-5 h-5" />, path: '/' },
  { name: 'Reports', icon: <BarChart2 className="w-5 h-5" />, path: '/reports' },
  { name: 'Data Exploration', icon: <Database className="w-5 h-5" />, path: '/data-exploration' },
  { name: 'Predictions', icon: <TrendingUp className="w-5 h-5" />, path: '/predictions' },
  { name: 'Customers', icon: <Users className="w-5 h-5" />, path: '/customers' },
  { name: 'Products', icon: <ShoppingCart className="w-5 h-5" />, path: '/products' },
  { name: 'Time Analysis', icon: <Calendar className="w-5 h-5" />, path: '/time-analysis' },
];

const Sidebar: React.FC<SidebarProps> = ({ isOpen }) => {
  return (
    <aside
      className={`fixed z-20 h-full top-0 left-0 pt-16 bg-white border-r border-gray-200 transition-all duration-300 ${
        isOpen ? 'w-64' : 'w-0 -translate-x-full'
      }`}
      aria-label="Sidebar"
    >
      <div className="h-full px-3 py-4 overflow-y-auto bg-white">
        <ul className="space-y-2">
          {navItems.map((item) => (
            <li key={item.name}>
              <NavLink
                to={item.path}
                className={({ isActive }) =>
                  `flex items-center p-2 text-base font-normal rounded-lg ${
                    isActive
                      ? 'bg-primary-100 text-primary-700'
                      : 'text-gray-900 hover:bg-gray-100'
                  }`
                }
              >
                {item.icon}
                <span className="ml-3">{item.name}</span>
              </NavLink>
            </li>
          ))}
        </ul>
        <div className="pt-5 mt-5 border-t border-gray-200">
          <ul className="space-y-2">
            <li>
              <NavLink
                to="/settings"
                className={({ isActive }) =>
                  `flex items-center p-2 text-base font-normal rounded-lg ${
                    isActive
                      ? 'bg-primary-100 text-primary-700'
                      : 'text-gray-900 hover:bg-gray-100'
                  }`
                }
              >
                <Settings className="w-5 h-5" />
                <span className="ml-3">Settings</span>
              </NavLink>
            </li>
          </ul>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;