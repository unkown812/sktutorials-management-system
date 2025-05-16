import React, { useState } from 'react';
import { PlusCircle, Search, Filter, Download, LineChart, Users, Award } from 'lucide-react';
import { MOCK_STUDENTS, MOCK_PERFORMANCE } from '../data/mockData';

const Performance: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedExamType, setSelectedExamType] = useState('All');
  
  // Get categories for filter
  const categories = ['All', 'School (8-10th)', 'Junior College (11-12th)', 'Diploma', 'Degree', 'JEE', 'NEET', 'MHCET'];
  
  // Get exam types for filter
  const examTypes = ['All', 'Monthly Test', 'Quarterly Exam', 'Mock Test'];
  
  // Create performance summary data by student
  const performanceSummary = MOCK_STUDENTS.map(student => {
    // Get all performance records for this student
    const records = MOCK_PERFORMANCE.filter(record => record.studentId === student.id);
    
    // Calculate performance statistics
    const totalExams = records.length;
    const avgPerformance = totalExams > 0
      ? Math.round(records.reduce((sum, record) => sum + record.percentage, 0) / totalExams)
      : 0;
    
    // Find highest and lowest scores
    const highestScore = totalExams > 0
      ? Math.max(...records.map(record => record.percentage))
      : 0;
    
    const lowestScore = totalExams > 0
      ? Math.min(...records.map(record => record.percentage))
      : 0;
    
    // Get latest exam result
    const latestExam = records.length > 0 
      ? records.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())[0]
      : null;
    
    return {
      id: student.id,
      name: student.name,
      category: student.category,
      course: student.course,
      totalExams,
      avgPerformance,
      highestScore,
      lowestScore,
      latestExam: latestExam ? {
        name: latestExam.examName,
        date: latestExam.date,
        percentage: latestExam.percentage
      } : null
    };
  });
  
  // Filter performance summary based on search term and filters
  const filteredPerformanceSummary = performanceSummary.filter(summary => {
    const matchesSearch = 
      summary.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      summary.id.toString().includes(searchTerm);
    
    const matchesCategory = selectedCategory === 'All' || summary.category === selectedCategory;
    
    return matchesSearch && matchesCategory;
  });
  
  // Calculate overall statistics
  const overallPerformance = performanceSummary.length > 0
    ? Math.round(performanceSummary.reduce((sum, summary) => sum + summary.avgPerformance, 0) / performanceSummary.length)
    : 0;
  
  const topPerformer = performanceSummary.length > 0
    ? performanceSummary.reduce((prev, current) => 
        prev.avgPerformance > current.avgPerformance ? prev : current
      )
    : null;
  
  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-2xl font-semibold text-gray-900">Performance Tracking</h1>
          <p className="mt-1 text-sm text-gray-500">
            Monitor student academic performance and progress
          </p>
        </div>
        <div className="mt-4 md:mt-0">
          <button className="btn-primary flex items-center">
            <PlusCircle className="h-5 w-5 mr-2" />
            Add New Exam Result
          </button>
        </div>
      </div>
      
      {/* Performance stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="card bg-blue-50 border-none">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500">Average Performance</p>
              <p className="text-2xl font-semibold">{overallPerformance}%</p>
            </div>
            <div className="p-3 rounded-full bg-blue-100">
              <LineChart className="h-6 w-6 text-primary" />
            </div>
          </div>
        </div>
        
        <div className="card bg-purple-50 border-none">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500">Total Students</p>
              <p className="text-2xl font-semibold">{MOCK_STUDENTS.length}</p>
            </div>
            <div className="p-3 rounded-full bg-purple-100">
              <Users className="h-6 w-6 text-purple-700" />
            </div>
          </div>
        </div>
        
        <div className="card bg-yellow-50 border-none">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500">Top Performer</p>
              <p className="text-xl font-semibold">{topPerformer?.name || 'N/A'}</p>
              <p className="text-sm text-yellow-700">{topPerformer ? `${topPerformer.avgPerformance}%` : 'N/A'}</p>
            </div>
            <div className="p-3 rounded-full bg-yellow-100">
              <Award className="h-6 w-6 text-yellow-700" />
            </div>
          </div>
        </div>
      </div>
      
      {/* Filters and search */}
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
          
          <div className="relative">
            <select
              className="input-field appearance-none pr-8"
              value={selectedExamType}
              onChange={(e) => setSelectedExamType(e.target.value)}
            >
              {examTypes.map(type => (
                <option key={type} value={type}>{type}</option>
              ))}
            </select>
            <div className="absolute inset-y-0 right-0 flex items-center px-2 pointer-events-none">
              <Filter className="h-4 w-4 text-gray-400" />
            </div>
          </div>
          
          <button className="btn-secondary flex items-center">
            <Download className="h-5 w-5 mr-2" />
            Export
          </button>
        </div>
      </div>
      
      {/* Performance table */}
      <div className="table-container">
        <table className="data-table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Student</th>
              <th>Course</th>
              <th>Average</th>
              <th>Highest</th>
              <th>Lowest</th>
              <th>Latest Exam</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {filteredPerformanceSummary.map((summary) => (
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
                          summary.avgPerformance >= 80 ? 'bg-green-600' : 
                          summary.avgPerformance >= 60 ? 'bg-yellow-500' : 'bg-red-600'
                        }`}
                        style={{ width: `${summary.avgPerformance}%` }}
                      ></div>
                    </div>
                    <span className="text-sm font-medium">{summary.avgPerformance}%</span>
                  </div>
                </td>
                <td className="text-green-700">{summary.highestScore}%</td>
                <td className="text-red-700">{summary.lowestScore}%</td>
                <td>
                  {summary.latestExam ? (
                    <div>
                      <div className="text-sm font-medium">{summary.latestExam.name}</div>
                      <div className="flex items-center">
                        <span 
                          className={`badge ${
                            summary.latestExam.percentage >= 80 ? 'badge-green' : 
                            summary.latestExam.percentage >= 60 ? 'badge-yellow' : 'badge-red'
                          }`}
                        >
                          {summary.latestExam.percentage}%
                        </span>
                        <span className="text-xs text-gray-500 ml-2">
                          {summary.latestExam.date}
                        </span>
                      </div>
                    </div>
                  ) : (
                    <span className="text-gray-500">No exams yet</span>
                  )}
                </td>
                <td>
                  <button className="text-primary hover:text-primary-dark font-medium">
                    View Details
                  </button>
                </td>
              </tr>
            ))}
            {filteredPerformanceSummary.length === 0 && (
              <tr>
                <td colSpan={8} className="text-center py-4 text-gray-500">
                  No performance records found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
      
      {/* Pagination */}
      <div className="flex items-center justify-between">
        <div className="text-sm text-gray-700">
          Showing <span className="font-medium">1</span> to <span className="font-medium">10</span> of{' '}
          <span className="font-medium">{filteredPerformanceSummary.length}</span> results
        </div>
        <div className="flex space-x-2">
          <button className="px-3 py-1 border rounded text-sm font-medium bg-gray-50">Previous</button>
          <button className="px-3 py-1 border rounded text-sm font-medium bg-primary text-white">1</button>
          <button className="px-3 py-1 border rounded text-sm font-medium">2</button>
          <button className="px-3 py-1 border rounded text-sm font-medium">Next</button>
        </div>
      </div>
    </div>
  );
};

export default Performance;