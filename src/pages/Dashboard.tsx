import React from 'react';
import { Users, CreditCard, CalendarCheck, TrendingUp } from 'lucide-react';
import StatCard from '../components/dashboard/StatCard';
import RecentFeePayments from '../components/dashboard/RecentFeePayments';
import AttendanceChart from '../components/dashboard/AttendanceChart';
import PerformanceWidget from '../components/dashboard/PerformanceWidget';
import UpcomingExams from '../components/dashboard/UpcomingExams';

const Dashboard: React.FC = () => {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-semibold text-gray-900">Dashboard</h1>
        <p className="mt-1 text-sm text-gray-500">
          Overview of SK Tutorials management system
        </p>
      </div>
      
      {/* Key metrics */}
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard 
          title="Total Students" 
          value={438} 
          change={+12}
          icon={<Users className="h-6 w-6" />}
          color="bg-blue-50 text-blue-700"
        />
        <StatCard 
          title="Fee Collection" 
          value="₹3,25,800" 
          change={+8.2}
          icon={<CreditCard className="h-6 w-6" />}
          color="bg-green-50 text-green-700"
        />
        <StatCard 
          title="Attendance Rate" 
          value="92%" 
          change={+2.5}
          icon={<CalendarCheck className="h-6 w-6" />}
          color="bg-purple-50 text-purple-700"
        />
        <StatCard 
          title="Avg. Performance" 
          value="76%" 
          change={+4.75}
          icon={<TrendingUp className="h-6 w-6" />}
          color="bg-orange-50 text-orange-700"
        />
      </div>
      
      {/* Charts and tables section */}
      <div className="grid grid-cols-1 gap-5 lg:grid-cols-2">
        <div className="card">
          <h2 className="text-lg font-medium text-gray-900 mb-4">Attendance Overview</h2>
          <AttendanceChart />
        </div>
        
        <div className="card">
          <h2 className="text-lg font-medium text-gray-900 mb-4">Performance Overview</h2>
          <PerformanceWidget />
        </div>
      </div>
      
      {/* Tables section */}
      <div className="grid grid-cols-1 gap-5 lg:grid-cols-2">
        <div className="card overflow-hidden">
          <h2 className="text-lg font-medium text-gray-900 mb-4">Recent Fee Payments</h2>
          <RecentFeePayments />
        </div>
        
        <div className="card">
          <h2 className="text-lg font-medium text-gray-900 mb-4">Upcoming Exams</h2>
          <UpcomingExams />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;