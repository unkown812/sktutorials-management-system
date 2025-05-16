import React from 'react';

const AttendanceChart: React.FC = () => {
  // In a real app, we would use a charting library like Chart.js or Recharts
  // For simplicity, we're creating a visual representation with divs
  const attendanceData = [
    { name: '8th', value: 94 },
    { name: '9th', value: 88 },
    { name: '10th', value: 92 },
    { name: '11th', value: 85 },
    { name: '12th', value: 90 },
    { name: 'JEE', value: 96 },
    { name: 'NEET', value: 97 }
  ];

  return (
    <div className="space-y-4">
      {attendanceData.map((item) => (
        <div key={item.name} className="space-y-1">
          <div className="flex justify-between text-sm">
            <span className="font-medium">{item.name}</span>
            <span className="text-gray-500">{item.value}%</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2.5">
            <div 
              className="bg-blue-600 h-2.5 rounded-full transition-all duration-500 ease-in-out" 
              style={{ width: `${item.value}%` }}
            ></div>
          </div>
        </div>
      ))}
      <div className="pt-2 text-sm text-gray-500 text-right">
        Last updated: 2 hours ago
      </div>
    </div>
  );
};

export default AttendanceChart;