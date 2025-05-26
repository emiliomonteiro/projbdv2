import React from 'react';
import { FilmIcon, Menu, BellIcon, UserIcon } from 'lucide-react';

interface NavbarProps {
  toggleSidebar: () => void;
}

const Navbar: React.FC<NavbarProps> = ({ toggleSidebar }) => {
  return (
    <nav className="bg-white border-b border-gray-200 fixed z-30 w-full">
      <div className="px-3 py-3 lg:px-5 lg:pl-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center justify-start">
            <button
              onClick={toggleSidebar}
              aria-expanded="true"
              aria-controls="sidebar"
              className="lg:hidden mr-2 text-gray-600 hover:text-gray-900 focus:outline-none"
            >
              <Menu className="w-6 h-6" />
            </button>
            <div className="flex items-center">
              <FilmIcon className="h-8 w-8 text-primary-600 mr-2" />
              <span className="self-center text-xl font-semibold whitespace-nowrap">VideoInsight</span>
            </div>
          </div>
          <div className="flex items-center">
            <button className="p-1 mr-4 text-gray-500 rounded-lg hover:text-gray-900 focus:outline-none">
              <BellIcon className="w-6 h-6" />
            </button>
            <div className="flex items-center">
              <div className="mr-3 font-medium">Admin User</div>
              <div className="relative w-8 h-8 rounded-full bg-primary-600 flex items-center justify-center text-white">
                <UserIcon className="w-5 h-5" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;