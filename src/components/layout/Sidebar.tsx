import React from 'react';
import { NavLink } from 'react-router-dom';
import { 
  LayoutDashboard, 
  Users, 
  BookOpen, 
  CalendarCheck, 
  TrendingUp, 
  CreditCard, 
  Settings, 
  LogOut, 
  GraduationCap
} from 'lucide-react';
import { useUser } from '../../context/UserContext';

const Sidebar: React.FC = () => {
  const { logout } = useUser();
  
  return (
    <div className="flex flex-col flex-grow bg-white pt-5 pb-4 overflow-y-auto border-r border-gray-200">
      <div className="flex items-center flex-shrink-0 px-4">
        <GraduationCap className="h-8 w-8 text-primary" />
        <h1 className="ml-2 text-xl font-bold text-gray-900">SK Tutorials</h1>
      </div>
      
      <div className="mt-8 flex flex-col flex-grow px-4">
        <nav className="flex-1 space-y-1">
          <NavLink 
            to="/" 
            end
            className={({ isActive }) => 
              isActive ? 'nav-link nav-link-active' : 'nav-link'
            }
          >
            <LayoutDashboard className="h-5 w-5" />
            <span>Dashboard</span>
          </NavLink>
          
          <NavLink 
            to="/students" 
            className={({ isActive }) => 
              isActive ? 'nav-link nav-link-active' : 'nav-link'
            }
          >
            <Users className="h-5 w-5" />
            <span>Students</span>
          </NavLink>
          
          <NavLink 
            to="/fees" 
            className={({ isActive }) => 
              isActive ? 'nav-link nav-link-active' : 'nav-link'
            }
          >
            <CreditCard className="h-5 w-5" />
            <span>Fees</span>
          </NavLink>
          
          <NavLink 
            to="/attendance" 
            className={({ isActive }) => 
              isActive ? 'nav-link nav-link-active' : 'nav-link'
            }
          >
            <CalendarCheck className="h-5 w-5" />
            <span>Attendance</span>
          </NavLink>
          
          <NavLink 
            to="/performance" 
            className={({ isActive }) => 
              isActive ? 'nav-link nav-link-active' : 'nav-link'
            }
          >
            <TrendingUp className="h-5 w-5" />
            <span>Performance</span>
          </NavLink>
          
          <NavLink 
            to="/courses" 
            className={({ isActive }) => 
              isActive ? 'nav-link nav-link-active' : 'nav-link'
            }
          >
            <BookOpen className="h-5 w-5" />
            <span>Courses</span>
          </NavLink>
          
          <NavLink 
            to="/settings" 
            className={({ isActive }) => 
              isActive ? 'nav-link nav-link-active' : 'nav-link'
            }
          >
            <Settings className="h-5 w-5" />
            <span>Settings</span>
          </NavLink>
        </nav>
        
        <div className="mt-auto pt-4">
          <button 
            onClick={logout}
            className="nav-link text-red-600 hover:bg-red-50 hover:text-red-700"
          >
            <LogOut className="h-5 w-5" />
            <span>Logout</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;