import React, { useState } from 'react';
import { Calendar, Search, Filter, Download, CalendarCheck, Users } from 'lucide-react';
import { MOCK_STUDENTS, MOCK_ATTENDANCE } from '../data/mockData';
import TabNav from '../components/ui/TabNav';

const Attendance: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedSubject, setSelectedSubject] = useState('All');
  const [activeTab, setActiveTab] = useState('mark');
  
  // Get unique subjects for filter
  const subjects = ['All', ...new Set(MOCK_ATTENDANCE.map(item => item.subject))];
  
  // Get categories for filter
  const categories = ['All', 'School (8-10th)', 'Junior College (11-12th)', 'Diploma', 'Degree', 'JEE', 'NEET', 'MHCET'];
  
  // Create attendance summary data by student
  const attendanceSummary = MOCK_STUDENTS.map(student => {
    // Get all attendance records for this student
    const records = MOCK_ATTENDANCE.filter(record => record.studentId === student.id);
    
    // Calculate attendance statistics
    const totalClasses = records.length;
    const presentClasses = records.filter(record => record.status === 'Present').length;
    const attendanceRate = totalClasses > 0 ? Math.round((presentClasses / totalClasses) * 100) : 0;
    
    // Get last attendance date
    const lastAttendance = records.length > 0 
      ? records.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())[0]
      : null;
    
    return {
      id: student.id,
      name: student.name,
      category: student.category,
      course: student.course,
      totalClasses,
      presentClasses,
      attendanceRate,
      lastAttendance: lastAttendance ? lastAttendance.date : '-',
      lastStatus: lastAttendance ? lastAttendance.status : '-'
    };
  });
  
  // Filter attendance summary based on search term and category filter
  const filteredAttendanceSummary = attendanceSummary.filter(summary => {
    const matchesSearch = 
      summary.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      summary.id.toString().includes(searchTerm);
    
    const matchesCategory = selectedCategory === 'All' || summary.category === selectedCategory;
    
    return matchesSearch && matchesCategory;
  });
  
  // Calculate overall statistics
  const overallAttendanceRate = attendanceSummary.length > 0
    ? Math.round(attendanceSummary.reduce((sum, summary) => sum + summary.attendanceRate, 0) / attendanceSummary.length)
    : 0;
  
  const currentDate = new Date().toISOString().split('T')[0];
  
  // Prepare dummy data for mark attendance view
  const studentsForAttendance = MOCK_STUDENTS
    .filter(student => selectedCategory === 'All' || student.category === selectedCategory)
    .filter(student => 
      student.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      student.id.toString().includes(searchTerm)
    )
    .map(student => ({
      ...student,
      attendance: 'Present' // Default value
    }));
  
  const tabs = [
    { id: 'mark', label: 'Mark Attendance' },
    { id: 'summary', label: 'Attendance Summary' }
  ];
  
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-semibold text-gray-900">Attendance</h1>
        <p className="mt-1 text-sm text-gray-500">
          Track and manage student attendance
        </p>
      </div>
      
      {/* Attendance stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="card bg-blue-50 border-none">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500">Overall Attendance</p>
              <p className="text-2xl font-semibold">{overallAttendanceRate}%</p>
            </div>
            <div className="p-3 rounded-full bg-blue-100">
              <CalendarCheck className="h-6 w-6 text-primary" />
            </div>
          </div>
        </div>
        
        <div className="card bg-green-50 border-none">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500">Total Students</p>
              <p className="text-2xl font-semibold">{MOCK_STUDENTS.length}</p>
            </div>
            <div className="p-3 rounded-full bg-green-100">
              <Users className="h-6 w-6 text-green-700" />
            </div>
          </div>
        </div>
        
        <div className="card bg-purple-50 border-none">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500">Today's Date</p>
              <p className="text-2xl font-semibold">{new Date().toLocaleDateString('en-US', { day: 'numeric', month: 'short', year: 'numeric' })}</p>
            </div>
            <div className="p-3 rounded-full bg-purple-100">
              <Calendar className="h-6 w-6 text-purple-700" />
            </div>
          </div>
        </div>
      </div>
      
      {/* Tab navigation */}
      <TabNav tabs={tabs} activeTab={activeTab} setActiveTab={setActiveTab} />
      
      {/* Filters */}
      <div className="flex flex-col md:flex-row space-y-4 md:space-y-0 md:space-x-4">
        <div className="relative flex-grow">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Search className="h-5 w-5 text-gray-400" />
          </div>
          <input
            type="text"
            placeholder="Search by student name or ID..."
            className="input-field pl-10"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        
        <div className="flex space-x-4">
          <div className="relative">
            <select
              className="input-field appearance-none pr-8"
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
            >
              {categories.map(category => (
                <option key={category} value={category}>{category}</option>
              ))}
            </select>
            <div className="absolute inset-y-0 right-0 flex items-center px-2 pointer-events-none">
              <Filter className="h-4 w-4 text-gray-400" />
            </div>
          </div>
          
          {activeTab === 'mark' && (
            <div className="relative">
              <select
                className="input-field appearance-none pr-8"
                value={selectedSubject}
                onChange={(e) => setSelectedSubject(e.target.value)}
              >
                {subjects.map(subject => (
                  <option key={subject} value={subject}>{subject}</option>
                ))}
              </select>
              <div className="absolute inset-y-0 right-0 flex items-center px-2 pointer-events-none">
                <Filter className="h-4 w-4 text-gray-400" />
              </div>
            </div>
          )}
          
          {activeTab === 'summary' && (
            <button className="btn-secondary flex items-center">
              <Download className="h-5 w-5 mr-2" />
              Export
            </button>
          )}
        </div>
      </div>
      
      {/* Tab content */}
      {activeTab === 'mark' && (
        <div className="space-y-6">
          <div className="flex flex-col sm:flex-row justify-between bg-white p-4 rounded-lg shadow-sm">
            <div className="flex space-x-4 mb-4 sm:mb-0">
              <div>
                <label htmlFor="date" className="block text-sm text-gray-500">Date</label>
                <input 
                  type="date" 
                  id="date" 
                  className="input-field mt-1"
                  defaultValue={currentDate}
                />
              </div>
              <div>
                <label htmlFor="subject" className="block text-sm text-gray-500">Subject</label>
                <select 
                  id="subject" 
                  className="input-field mt-1"
                  value={selectedSubject}
                  onChange={(e) => setSelectedSubject(e.target.value)}
                >
                  {subjects.map(subject => (
                    <option key={subject} value={subject}>{subject}</option>
                  ))}
                </select>
              </div>
            </div>
            <div className="flex space-x-2">
              <button className="btn-secondary">
                Mark All Present
              </button>
              <button className="btn-primary">
                Save Attendance
              </button>
            </div>
          </div>
          
          <div className="table-container">
            <table className="data-table">
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Student</th>
                  <th>Course</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {studentsForAttendance.map((student) => (
                  <tr key={student.id}>
                    <td>{student.id}</td>
                    <td className="font-medium">{student.name}</td>
                    <td>
                      <span className="badge badge-blue">{student.category}</span>
                    </td>
                    <td>
                      <select 
                        className="block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring focus:ring-primary focus:ring-opacity-50"
                        defaultValue="Present"
                      >
                        <option value="Present">Present</option>
                        <option value="Absent">Absent</option>
                        <option value="Late">Late</option>
                        <option value="Excused">Excused</option>
                      </select>
                    </td>
                  </tr>
                ))}
                {studentsForAttendance.length === 0 && (
                  <tr>
                    <td colSpan={4} className="text-center py-4 text-gray-500">
                      No students found
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      )}
      
      {activeTab === 'summary' && (
        <div className="table-container">
          <table className="data-table">
            <thead>
              <tr>
                <th>ID</th>
                <th>Student</th>
                <th>Course</th>
                <th>Attendance</th>
                <th>Present/Total</th>
                <th>Last Attendance</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {filteredAttendanceSummary.map((summary) => (
                <tr key={summary.id}>
                  <td>{summary.id}</td>
                  <td className="font-medium">{summary.name}</td>
                  <td>
                    <span className="badge badge-blue">{summary.category}</span>
                  </td>
                  <td>
                    <div className="flex items-center">
                      <div className="w-full bg-gray-200 rounded-full h-2.5 mr-2 max-w-[100px]">
                        <div 
                          className={`h-2.5 rounded-full ${
                            summary.attendanceRate >= 75 ? 'bg-green-600' : 
                            summary.attendanceRate >= 60 ? 'bg-yellow-500' : 'bg-red-600'
                          }`}
                          style={{ width: `${summary.attendanceRate}%` }}
                        ></div>
                      </div>
                      <span className="text-sm font-medium">{summary.attendanceRate}%</span>
                    </div>
                  </td>
                  <td>{summary.presentClasses}/{summary.totalClasses}</td>
                  <td>
                    <div>{summary.lastAttendance}</div>
                    {summary.lastStatus !== '-' && (
                      <span 
                        className={`badge ${summary.lastStatus === 'Present' ? 'badge-green' : 'badge-red'}`}
                      >
                        {summary.lastStatus}
                      </span>
                    )}
                  </td>
                  <td>
                    <button className="text-primary hover:text-primary-dark font-medium">
                      View Details
                    </button>
                  </td>
                </tr>
              ))}
              {filteredAttendanceSummary.length === 0 && (
                <tr>
                  <td colSpan={7} className="text-center py-4 text-gray-500">
                    No attendance records found
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default Attendance;