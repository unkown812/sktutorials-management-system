import React from 'react';
import { Bell, Settings, Search, Menu } from 'lucide-react';
import { useUser } from '../../context/UserContext';

interface HeaderProps {
  openSidebar: () => void;
}

const Header: React.FC<HeaderProps> = ({ openSidebar }) => {
  const { user } = useUser();

  return (
    <header className="sticky top-0 z-10 flex h-16 flex-shrink-0 bg-white shadow-sm">
      <button
        type="button"
        className="border-r border-gray-200 px-4 text-gray-500 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-primary md:hidden"
        onClick={openSidebar}
      >
        <span className="sr-only">Open sidebar</span>
        <Menu className="h-6 w-6" />
      </button>
      
      <div className="flex flex-1 justify-between px-4">
        <div className="flex flex-1">
          <div className="flex w-full md:ml-0">
            <div className="relative w-full max-w-2xl">
              <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                <Search className="h-5 w-5 text-gray-400" />
              </div>
              <input
                id="search-field"
                className="block h-full w-full border-transparent py-2 pl-10 pr-3 text-gray-900 placeholder-gray-500 focus:border-transparent focus:placeholder-gray-400 focus:outline-none focus:ring-0 sm:text-sm"
                placeholder="Search students, fees, courses..."
                type="search"
              />
            </div>
          </div>
        </div>
        
        <div className="ml-4 flex items-center md:ml-6">
          <button className="rounded-full bg-white p-1 text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2">
            <span className="sr-only">View notifications</span>
            <Bell className="h-6 w-6" />
          </button>

          <button className="ml-3 rounded-full bg-white p-1 text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2">
            <span className="sr-only">Settings</span>
            <Settings className="h-6 w-6" />
          </button>

          {/* User profile dropdown */}
          <div className="relative ml-3">
            <div>
              <button className="flex max-w-xs items-center rounded-full bg-white text-sm focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2">
                <span className="sr-only">Open user menu</span>
                <div className="h-8 w-8 rounded-full bg-primary text-white flex items-center justify-center">
                  {user?.name?.charAt(0) || 'A'}
                </div>
                <span className="ml-2 hidden md:block font-medium text-gray-700">{user?.name || 'Admin'}</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;